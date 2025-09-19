'use client';

import { usePathname } from 'next/navigation';
import Map3DWrapper from '@/container/Map3DWrapper';
import AnimatedPanel from '@/components/common/AnimatedPanel';
import LandingPage from '@/components/common/LandingPage';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';

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


  return (
    <>
      <LandingPage />
      <Map3DWrapper />
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
      <AnimatedPanel baseRoute='store' />
      <AnimatedPanel baseRoute='interview' />
      <AnimatedPanel baseRoute='word' />
      <AnimatedPanel baseRoute='info' />
      <AnimatedPanel baseRoute='login' />
      <AnimatedPanel baseRoute='signup' />
      <AnimatedPanel baseRoute='mypage' />
    </>
  );
}
