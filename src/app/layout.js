import { Gothic_A1, Noto_Serif_KR, ABeeZee, Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';
import ConditionalLayout from '@/components/common/ConditionalLayout';
import Navigation from '@/components/common/Navigation';

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
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});
const abeezee = ABeeZee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-abeezee',
  display: 'swap',
  preload: false,
});


export const metadata = {
  title: '청계천을지로 기술유통중개소',
  description: '을지로의 제조업을 살리다! 기술유통중개소에서 기술자들을 쉽게 만나보세요.',
  keywords: '청계천을지로 기술유통중개소, 기술자, 을지로, 제조업',
  openGraph: {
    title: '청계천을지로 기술유통중개소',
    description: '을지로의 제조업을 살리다! 기술유통중개소에서 기술자들을 쉽게 만나보세요.',
    keywords: '청계천을지로 기술유통중개소, 기술자, 을지로, 제조업',
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
    title: '청계천을지로 기술유통중개소',
    description: '을지로의 제조업을 살리다! 기술유통중개소에서 기술자들을 쉽게 만나보세요.',
    keywords: '청계천을지로 기술유통중개소, 기술자, 을지로, 제조업',
    images: ['/img/DSC03100.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${gothic.variable} ${noto.variable} ${abeezee.variable} ${inter.variable}`}
        suppressHydrationWarning
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
