import { NextResponse } from 'next/server';
import { createServerSupabaseClientSimple } from '@/utils/supabase/server-client';
import { getKeywordKind } from '@/utils/keyword-kinds';

export async function GET(request, { params }) {
  try {
    const kind = getKeywordKind(params.kind);
    if (!kind) {
      return NextResponse.json({ error: '잘못된 키워드 종류입니다.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClientSimple();
    const [{ data: types, error: typeError }, { data: links, error: linkError }] = await Promise.all([
      supabase.from(kind.table).select('id, name').order('name', { ascending: true }),
      supabase.from(kind.junction).select(kind.foreignKey),
    ]);

    if (typeError || linkError) {
      console.error('Keyword list error:', typeError || linkError);
      return NextResponse.json(
        { error: '키워드를 불러오는 중 오류가 발생했습니다.' },
        { status: 500 },
      );
    }

    const counts = {};
    for (const link of links || []) {
      const typeId = link[kind.foreignKey];
      if (!typeId) continue;
      counts[typeId] = (counts[typeId] || 0) + 1;
    }

    const data = (types || []).map((type) => ({
      id: type.id,
      name: type.name,
      storeCount: counts[type.id] || 0,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const kind = getKeywordKind(params.kind);
    if (!kind) {
      return NextResponse.json({ error: '잘못된 키워드 종류입니다.' }, { status: 400 });
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    if (!name) {
      return NextResponse.json({ error: '이름을 입력해주세요.' }, { status: 400 });
    }

    const supabase = createServerSupabaseClientSimple();
    const duplicate = await findDuplicate(supabase, kind.table, name);
    if (duplicate.error) {
      return NextResponse.json({ error: '키워드 확인 중 오류가 발생했습니다.' }, { status: 500 });
    }
    if (duplicate.id) {
      return NextResponse.json({ error: '이미 있는 이름입니다.' }, { status: 409 });
    }

    const { data, error } = await supabase
      .from(kind.table)
      .insert({ name })
      .select('id, name')
      .single();

    if (error) {
      console.error('Keyword create error:', error);
      if (error.code === '23505') {
        return NextResponse.json({ error: '이미 있는 이름입니다.' }, { status: 409 });
      }
      return NextResponse.json({ error: '키워드 추가 중 오류가 발생했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ data: { ...data, storeCount: 0 } });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

async function findDuplicate(supabase, table, name, excludeId) {
  const { data, error } = await supabase.from(table).select('id').eq('name', name).limit(1);
  if (error) return { error };
  const row = data?.[0];
  if (!row || row.id === excludeId) return { id: null };
  return { id: row.id };
}
