export const STORE_CATEGORIES = [
  '실험기구',
  '의료기기',
  '소량부품',
  '학생작품',
  '기계 제작',
  '예술작품',
  '인테리어 및 가구',
  '시제품',
  '각종 수리',
];

function storeText(store) {
  const materials = (store.store_material || [])
    .map((item) => item.material_types?.name)
    .filter(Boolean)
    .join(' ');
  return [
    store.name,
    store.description,
    materials,
    ...(Array.isArray(store.keyword) ? store.keyword : []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function storeMatchesCategory(store, category) {
  if (category === '학생작품') {
    return store.store_capacity?.some(
      (item) => item.capacity_types?.name === '소량 생산',
    );
  }

  const hay = storeText(store);
  const needles = {
    실험기구: ['실험', '실험기구'],
    의료기기: ['의료', 'medical_device'],
    소량부품: ['소량', '부품'],
    '기계 제작': ['기계', 'machine'],
    예술작품: ['예술', '작품'],
    '인테리어 및 가구': ['인테리어', '가구'],
    시제품: ['시제품', '프로토'],
    '각종 수리': ['수리'],
  }[category] || [category];

  return needles.some((needle) => hay.includes(needle.toLowerCase()));
}
