'use client';

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import AnimatedPanel from '@/components/common/AnimatedPanel';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';
import { MAP_FEATURE_ENABLED } from '@/config/features';

const MapContainer = dynamic(() => import('@/container/MapContainer'), {
  ssr: false,
  loading: () => null,
});

const HomeContainer = dynamic(() => import('@/container/HomeContainer'), {
  ssr: false,
  loading: () => null,
});

const StoreContainer = dynamic(() => import('@/container/StoreContainer'), {
  ssr: false,
  loading: () => null,
});

const FnqContainer = dynamic(() => import('@/container/FnqContainer'), {
  ssr: false,
  loading: () => null,
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

  const isAdminRoute = pathname?.startsWith('/admin');
  const showHome =
    pathname === '/' || pathname === '/login' || pathname === '/signup';
  const showStore = pathname?.startsWith('/store');
  const showFnq = pathname === '/fnq' || pathname?.startsWith('/fnq/');
  const showMap = pathname === '/map' || pathname?.startsWith('/map/');

  if (isAdminRoute || !isReady) {
    return null;
  }

  return (
    <>
      {(MAP_FEATURE_ENABLED || showMap) && <MapContainer />}
      {showHome && <HomeContainer />}
      {showStore && <StoreContainer />}
      {showFnq && <FnqContainer />}
      {isMobile && pathname !== '/' && pathname !== '/login' && !showStore && !showFnq && !showMap && (
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
      <AnimatedPanel baseRoute='interview' />
      <AnimatedPanel baseRoute='word' />
      <AnimatedPanel baseRoute='info' />
      <AnimatedPanel baseRoute='signup' />
      <AnimatedPanel baseRoute='mypage' />
    </>
  );
}
