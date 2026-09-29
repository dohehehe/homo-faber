export const STORE_PRODUCT_CATEGORIES = [
  '원스톱 실험기구',
  '의료기구',
  '인테리어/가구',
  '예술작품/무대',
  '조명, 카메라',
  '뱃지',
  '소량 부품',
  '학생 작품',
  '각종 수리',
];

export const STORE_PROCESSES = [
  '절단/절곡',
  '밀링/선반',
  'CNC',
  '금형',
  '후렉숀',
  '파워프레스',
  '시보리',
  '목형',
  '주물',
  '용접',
  '빠우',
  '분채',
  '조각',
];

export const STORE_CATEGORIES = STORE_PRODUCT_CATEGORIES;

function storeText(store) {
  const materials = (store.store_material || [])
    .map((item) => item.material_types?.name)
    .filter(Boolean)
    .join(' ');
  const categories = (store.store_category || [])
    .map((item) => item.category_types?.name)
    .filter(Boolean)
    .join(' ');
  return [
    store.name,
    store.description,
    materials,
    categories,
    ...(Array.isArray(store.keyword) ? store.keyword : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

const CATEGORY_NEEDLES = {
  '원스톱 실험기구': ['원스톱 실험기구', '실험기구', '실험'],
  '의료기구': ['의료기구', '의료기기', '의료'],
  '인테리어/가구': ['인테리어/가구', '인테리어 및 가구', '인테리어', '가구'],
  '예술작품/무대': ['예술작품/무대', '예술작품', '예술', '무대'],
  '조명, 카메라': ['조명, 카메라', '조명', '카메라'],
  '뱃지': ['뱃지'],
  '소량 부품': ['소량 부품', '소량부품', '소량'],
  '학생 작품': ['학생 작품', '학생작품', '학생'],
  '각종 수리': ['각종 수리', '수리'],
};

const PROCESS_NEEDLES = {
  '절단/절곡': ['절단', '절곡'],
  '밀링/선반': ['밀링', '선반'],
  CNC: ['cnc', 'CNC'],
  '금형': ['금형'],
  '후렉숀': ['후렉숀', '후렉션'],
  '파워프레스': ['파워프레스', '프레스', 'press'],
  '시보리': ['시보리'],
  '목형': ['목형'],
  '주물': ['주물'],
  '용접': ['용접'],
  '빠우': ['빠우'],
  '분채': ['분채', '분체'],
  '조각': ['조각'],
};

function matchesNeedles(hay, needles, label) {
  return (needles || [label]).some((needle) => hay.includes(String(needle).toLowerCase()));
}

export function storeMatchesCategory(store, category) {
  const assigned = (store.store_category || [])
    .map((item) => item.category_types?.name)
    .filter(Boolean);
  if (assigned.length > 0) {
    const needles = CATEGORY_NEEDLES[category] || [category];
    return assigned.some((name) =>
      needles.some((needle) => name === needle || name === category),
    );
  }

  if (category === '학생 작품' || category === '학생작품') {
    const isStudent = store.store_capacity?.some(
      (item) => item.capacity_types?.name === '소량 생산',
    );
    if (isStudent) return true;
  }

  return matchesNeedles(storeText(store), CATEGORY_NEEDLES[category], category);
}

export function storeMatchesProcess(store, process) {
  const hay = storeText(store);
  return matchesNeedles(hay, PROCESS_NEEDLES[process], process);
}
