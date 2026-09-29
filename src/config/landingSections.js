export const DEFAULT_LANDING_SECTIONS = [
  {
    id: 'hero',
    sort_order: 1,
    media_url: '/video/cover.mp4',
    media_type: 'video',
    title: '아직 세상에 없던 것을 만들고 있나요?',
    body: '을지로 기술자 네트워크, 산업용재 네트워크가 당신의 제작 여정에 함께합니다.',
    button_label: 'Our Vision',
    button_href: '/info',
  },
  {
    id: 'find',
    sort_order: 2,
    media_url: '/img/landing-find.png',
    media_type: 'image',
    title: 'Find',
    body: '내 작업에 맞는 청계천, 을지로 기술자들을 직접 찾아볼 수 있습니다. 나에게 맞는 키워드를 선택하거나 검색하며 내 작업에 꼭 맞는 기술자를 만나보세요!',
    button_label: '기술자 찾기',
    button_href: '/store',
  },
  {
    id: 'ask',
    sort_order: 3,
    media_url: '/img/landing-ask.jpg',
    media_type: 'image',
    title: 'Ask',
    body: '내 작업에 맞는 청계천, 을지로 기술자들을 직접 찾아볼 수 있습니다. 나에게 맞는 키워드를 선택하거나 검색하며 내 작업에 꼭 맞는 기술자를 만나보세요!',
    button_label: '작업 의뢰하기',
    button_href: '/fnq',
  },
];

export function mergeLandingSections(rows = []) {
  return DEFAULT_LANDING_SECTIONS.map((fallback) => {
    const row = rows.find((item) => item.id === fallback.id);
    if (!row) return fallback;
    return {
      ...fallback,
      ...row,
      media_url: row.media_url || fallback.media_url,
      media_type: row.media_type || fallback.media_type,
    };
  });
}

export function isLandingVideo(section) {
  if (section?.media_type === 'video') return true;
  const url = section?.media_url || '';
  return /\.(mp4|webm|mov)(\?|$)/i.test(url);
}
