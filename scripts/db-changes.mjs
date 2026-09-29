import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshotPath = path.join(root, '.cache', 'remote-db-snapshot.json');
const pageSize = 1000;

loadEnv(path.join(root, '.env'));

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('SUPABASE_URL 또는 SUPABASE_SERVICE_ROLE_KEY 가 .env 에 없습니다.');
  process.exit(1);
}

let watchSeconds = 0;
let tableFilter = null;
try {
  ({ watchSeconds, tableFilter } = parseArgs(process.argv.slice(2)));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  Accept: 'application/json',
};

if (watchSeconds) {
  console.log(`원격 DB 감시 중. ${watchSeconds}초마다 변경만 출력합니다. 종료는 Ctrl+C.`);
  await poll(watchSeconds);
} else {
  await poll(0);
}

async function poll(intervalSeconds) {
  do {
    const started = new Date();
    try {
      const current = await fetchDatabase();
      const previous = readSnapshot();
      if (!previous) {
        writeSnapshot(current);
        console.log(`${stamp(started)} 기준 스냅샷을 저장했습니다. 다음 실행부터 변경만 출력합니다.`);
        printCounts(current);
      } else {
        const compared = Object.fromEntries(
          Object.keys(current.tables).map((name) => [name, previous.tables[name] || {}]),
        );
        const changes = diffDatabase(compared, current.tables);
        writeSnapshot({
          fetchedAt: current.fetchedAt,
          tables: { ...previous.tables, ...current.tables },
        });
        if (changes.length === 0) {
          if (!intervalSeconds) console.log(`${stamp(started)} 변경 없음`);
        } else {
          console.log(`${stamp(started)} 변경 ${countChanges(changes)}건`);
          for (const change of changes) console.log(change);
        }
      }
    } catch (error) {
      console.error(`${stamp(started)} 조회 실패: ${error.message}`);
      if (!intervalSeconds) process.exit(1);
    }
    if (!intervalSeconds) break;
    await sleep(intervalSeconds * 1000);
  } while (true);
}

async function fetchDatabase() {
  const tables = await listTables();
  const selected = tableFilter ? tables.filter((name) => tableFilter.has(name)) : tables;
  const missing = tableFilter
    ? [...tableFilter].filter((name) => !tables.includes(name))
    : [];
  if (missing.length) {
    throw new Error(`없는 테이블: ${missing.join(', ')}`);
  }

  const result = {};
  for (const name of selected) {
    result[name] = indexRows(await fetchTable(name));
  }
  return { fetchedAt: new Date().toISOString(), tables: result };
}

async function listTables() {
  const response = await fetch(`${supabaseUrl}/rest/v1/`, {
    headers: { ...headers, Accept: 'application/openapi+json' },
  });
  if (!response.ok) {
    throw new Error(`테이블 목록 조회 실패 (${response.status})`);
  }
  const spec = await response.json();
  return Object.keys(spec.paths || {})
    .map((item) => item.replace(/^\//, ''))
    .filter((item) => item && !item.includes('/'))
    .sort();
}

async function fetchTable(name) {
  const rows = [];
  for (let from = 0; ; from += pageSize) {
    const response = await fetch(`${supabaseUrl}/rest/v1/${name}?select=*`, {
      headers: {
        ...headers,
        Range: `${from}-${from + pageSize - 1}`,
        'Range-Unit': 'items',
      },
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`${name} 조회 실패 (${response.status}) ${body}`);
    }
    const batch = await response.json();
    rows.push(...batch);
    if (batch.length < pageSize) break;
  }
  return rows;
}

function indexRows(rows) {
  const indexed = {};
  for (const row of rows) {
    indexed[rowKey(row)] = row;
  }
  return indexed;
}

function rowKey(row) {
  if (row.id != null) return String(row.id);
  const keys = Object.keys(row).sort();
  return JSON.stringify(keys.map((key) => [key, row[key]]));
}

function diffDatabase(previous, current) {
  const lines = [];
  const names = [...new Set([...Object.keys(previous), ...Object.keys(current)])].sort();
  for (const name of names) {
    const before = previous[name] || {};
    const after = current[name] || {};
    const keys = [...new Set([...Object.keys(before), ...Object.keys(after)])].sort();
    for (const key of keys) {
      const oldRow = before[key];
      const newRow = after[key];
      if (!oldRow) {
        lines.push(`  ${name}  추가  ${rowLabel(newRow)}`);
        continue;
      }
      if (!newRow) {
        lines.push(`  ${name}  삭제  ${rowLabel(oldRow)}`);
        continue;
      }
      const fields = changedFields(oldRow, newRow);
      if (fields.length === 0) continue;
      lines.push(`  ${name}  수정  ${rowLabel(newRow)}`);
      for (const field of fields) {
        lines.push(`    ${field}: ${show(oldRow[field])} → ${show(newRow[field])}`);
      }
    }
  }
  return lines;
}

function changedFields(oldRow, newRow) {
  const fields = [...new Set([...Object.keys(oldRow), ...Object.keys(newRow)])].sort();
  return fields.filter((field) => stable(oldRow[field]) !== stable(newRow[field]));
}

function stable(value) {
  return JSON.stringify(sortValue(value));
}

function sortValue(value) {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value && typeof value === 'object') {
    return Object.keys(value)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = sortValue(value[key]);
        return sorted;
      }, {});
  }
  return value;
}

function rowLabel(row) {
  const title = row.name || row.title || row.word || row.email || '';
  const id = row.id ? String(row.id) : '';
  if (title && id) return `${id}  ${title}`;
  if (id) return id;
  return show(row);
}

function show(value) {
  if (value == null) return 'null';
  const text = typeof value === 'string' ? JSON.stringify(value) : JSON.stringify(value);
  if (text.length <= 80) return text;
  return `${text.slice(0, 77)}…`;
}

function countChanges(lines) {
  return lines.filter((line) => line.startsWith('  ') && !line.startsWith('    ')).length;
}

function printCounts(current) {
  const counts = Object.entries(current.tables)
    .map(([name, rows]) => `${name} ${Object.keys(rows).length}`)
    .join(', ');
  console.log(counts);
}

function readSnapshot() {
  if (!fs.existsSync(snapshotPath)) return null;
  return JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
}

function writeSnapshot(snapshot) {
  fs.mkdirSync(path.dirname(snapshotPath), { recursive: true });
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot));
}

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const index = trimmed.indexOf('=');
    if (index < 0) continue;
    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] == null) process.env[key] = value;
  }
}

function parseArgs(argv) {
  let watchSeconds = 0;
  let tableFilter = null;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--watch') {
      const next = argv[i + 1];
      watchSeconds = next && !next.startsWith('--') ? Number(next) : 5;
      if (next && !next.startsWith('--')) i += 1;
    } else if (arg.startsWith('--watch=')) {
      watchSeconds = Number(arg.slice('--watch='.length));
    } else if (arg === '--tables') {
      tableFilter = new Set(String(argv[i + 1] || '').split(',').filter(Boolean));
      i += 1;
    } else if (arg.startsWith('--tables=')) {
      tableFilter = new Set(arg.slice('--tables='.length).split(',').filter(Boolean));
    } else {
      throw new Error(`알 수 없는 옵션: ${arg}`);
    }
  }
  if (Number.isNaN(watchSeconds) || watchSeconds < 0) {
    throw new Error('--watch 간격은 초 단위 숫자입니다.');
  }
  return { watchSeconds, tableFilter };
}

function stamp(date) {
  return date.toLocaleString('sv-SE', { hour12: false }).replace('T', ' ');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
