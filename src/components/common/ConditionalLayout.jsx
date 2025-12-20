'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import AnimatedPanel from '@/components/common/AnimatedPanel';
import LandingPage from '@/components/common/LandingPage';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';

// MapContainer를 동적 로딩하여 초기 로딩 속도 개선
// LandingPage가 먼저 표시된 후 지도 로드
const MapContainer = dynamic(() => import('@/container/MapContainer'), {
  ssr: false,
  loading: () => null, // 로딩 중에는 아무것도 표시하지 않음
});

const MobileBg = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'isVisible' && prop !== 'pathname',
})`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.23);
  backdrop-filter: blur(3px);
  pointer-events: none;
`;

export default function ConditionalLayout() {
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();

  // admin 라우터인지 확인
  const isAdminRoute = pathname?.startsWith('/admin');

  // admin 라우터가 아닐 때만 Map3D, AnimatedPanel 렌더링
  if (isAdminRoute) {
    return null;
  }

  // 초기 로딩 시 필요한 패널만 렌더링 (홈 페이지는 store만)
  const isHomePage = pathname === '/';
  const shouldLoadStore = isHomePage || pathname?.startsWith('/store');
  const shouldLoadInterview = pathname?.startsWith('/interview');
  const shouldLoadWord = pathname?.startsWith('/word');
  const shouldLoadInfo = pathname?.startsWith('/info');
  const shouldLoadLogin = pathname?.startsWith('/login');
  const shouldLoadSignup = pathname?.startsWith('/signup');
  const shouldLoadMypage = pathname?.startsWith('/mypage');
  const shouldLoadFnq = pathname?.startsWith('/fnq');

  // isReady가 false면 로딩 상태 표시 (하이드레이션 오류 방지)
  if (!isReady) {
    return (
      <>
        <LandingPage />
        <MapContainer />
        {shouldLoadStore && <AnimatedPanel baseRoute='store' />}
        {shouldLoadInterview && <AnimatedPanel baseRoute='interview' />}
        {shouldLoadWord && <AnimatedPanel baseRoute='word' />}
        {shouldLoadInfo && <AnimatedPanel baseRoute='info' />}
        {shouldLoadLogin && <AnimatedPanel baseRoute='login' />}
        {shouldLoadSignup && <AnimatedPanel baseRoute='signup' />}
        {shouldLoadMypage && <AnimatedPanel baseRoute='mypage' />}
        {shouldLoadFnq && <AnimatedPanel baseRoute='fnq' />}
      </>
    );
  }

  return (
    <>
      <LandingPage />
      <MapContainer />
      {isMobile && (
        <MobileBg
          pathname={pathname}
          isVisible={pathname !== '/'}
          initial={{ opacity: 0 }}
          animate={{
            opacity: pathname === '/' ? 0 : 1
          }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
          }}
        />
      )}
      {shouldLoadStore && <AnimatedPanel baseRoute='store' />}
      {shouldLoadInterview && <AnimatedPanel baseRoute='interview' />}
      {shouldLoadWord && <AnimatedPanel baseRoute='word' />}
      {shouldLoadInfo && <AnimatedPanel baseRoute='info' />}
      {shouldLoadLogin && <AnimatedPanel baseRoute='login' />}
      {shouldLoadSignup && <AnimatedPanel baseRoute='signup' />}
      {shouldLoadMypage && <AnimatedPanel baseRoute='mypage' />}
      {shouldLoadFnq && <AnimatedPanel baseRoute='fnq' />}
    </>
  );
}
