export const metadata = {
  title: '지도 - 청계천을지로 기술유통중개소',
  description: '청계천·을지로 기술자 위치를 지도에서 찾아볼 수 있습니다.',
  openGraph: {
    title: '지도 - 청계천을지로 기술유통중개소',
    description: '청계천·을지로 기술자 위치를 지도에서 찾아볼 수 있습니다.',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/img/DSC03100.jpg',
        width: 1200,
        height: 630,
        alt: '청계천을지로 기술유통중개소',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '지도 - 청계천을지로 기술유통중개소',
    description: '청계천·을지로 기술자 위치를 지도에서 찾아볼 수 있습니다.',
    images: ['/img/DSC03100.jpg'],
  },
};

export default function MapLayout({ children }) {
  return <div>{children}</div>;
}
