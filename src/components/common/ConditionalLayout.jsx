'use client';

import { usePathname } from 'next/navigation';
import Map3DWrapper from '@/container/Map3DWrapper';
import AnimatedPanel from '@/components/common/AnimatedPanel';
import LandingPage from '@/components/common/LandingPage';

export default function ConditionalLayout() {
  const pathname = usePathname();

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
