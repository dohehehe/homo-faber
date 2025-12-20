import { Gothic_A1, Noto_Serif_KR, ABeeZee } from 'next/font/google';
import dynamic from 'next/dynamic';
import './globals.css';
import Providers from '@/app/providers';
import ConditionalLayout from '@/components/common/ConditionalLayout';

// Navigation을 동적 로딩하여 초기 로딩 속도 개선
const Navigation = dynamic(() => import('@/components/common/Navigation'), {
  ssr: false,
  loading: () => null,
});

// 필요한 weight만 로드하여 초기 로딩 속도 개선
const gothic = Gothic_A1({
  weight: ['400', '500', '600', '700', '800', '900'], // 자주 사용하는 weight만 로드
  subsets: ['latin'],
  variable: '--font-gothic',
  display: 'swap',
  preload: true, // 폰트 우선 로드
});
const noto = Noto_Serif_KR({
  weight: ['400', '500', '600', '700', '900'], // 자주 사용하는 weight만 로드
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
  preload: false, // 필요시 로드
});
const abeezee = ABeeZee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-abeezee',
  display: 'swap',
  preload: false, // 필요시 로드
});


export const metadata = {
  title: '산림동의 만드는 사람들: 호모파베르',
  description: '',
  openGraph: {
    title: '산림동의 만드는 사람들: 호모파베르',
    description: '',
    type: 'website',
    locale: 'ko_KR',
    images: [
      {
        url: '/img/DSC03100.jpg',
        width: 1200,
        height: 630,
        alt: '산림동의 만드는 사람들: 호모파베르',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '산림동의 만드는 사람들: 호모파베르',
    description: '',
    images: ['/img/DSC03100.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${gothic.variable} ${noto.variable} ${abeezee.variable}`}
      >
        <Providers>
          <ConditionalLayout />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
