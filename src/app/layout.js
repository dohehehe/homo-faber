import { Gothic_A1, Noto_Serif_KR, ABeeZee } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';
import ConditionalLayout from '@/components/common/ConditionalLayout';
import Navigation from '@/components/common/Navigation';

const gothic = Gothic_A1({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-gothic',
  display: 'swap',
});
const noto = Noto_Serif_KR({
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto',
  display: 'swap',
});
const abeezee = ABeeZee({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-abeezee',
  display: 'swap',
});


export const metadata = {
  title: '산림동의 만드는 사람들: 호모파베르',
  description: '',
  openGraph: {
    title: '산림동의 만드는 사람들: 호모파베르',
    description: '',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: '',
    title: '산림동의 만드는 사람들: 호모파베르',
    description: '',
    images: '',
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
