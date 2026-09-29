export async function getLandingSections() {
  const response = await fetch('/api/landing', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('랜딩 정보를 불러오지 못했습니다.');
  }
  const data = await response.json();
  return data.sections || [];
}

export async function saveLandingSections(sections) {
  const response = await fetch('/api/landing', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sections }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || '랜딩 정보 저장에 실패했습니다.');
  }
  return data.sections || sections;
}
