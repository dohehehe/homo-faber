export const metadata = {
  title: '소개 - 청계천을지로 기술유통중개소',
  description: '청계천을지로 기술유통중개소에 대한 소개를 확인할 수 있습니다. 청계천을지로 기술유통중개소에 대한 소개를 확인할 수 있습니다.',
  openGraph: {
    title: '소개 - 청계천을지로 기술유통중개소',
    description: '청계천을지로 기술유통중개소에 대한 소개를 확인할 수 있습니다. 청계천을지로 기술유통중개소에 대한 소개를 확인할 수 있습니다.',
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
    title: '소개 - 청계천을지로 기술유통중개소',
    description: '청계천을지로 기술유통중개소에 대한 소개를 확인할 수 있습니다. 청계천을지로 기술유통중개소에 대한 소개를 확인할 수 있습니다.',
    images: ['/img/DSC03100.jpg'],
  },
};

export default function InfoLayout({ children }) {
  return <div>{children}</div>;
}