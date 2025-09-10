'use client';

import dynamic from 'next/dynamic';
import { useStores } from '@/hooks/useStores';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

// Map3D를 dynamic import로 로드하여 ExitStatus 오류 방지
const Map3D = dynamic(() => import('../components/common/Map3D'), {
  ssr: false,
  loading: () => <Loader text="지도를 불러오는 중..." />
});

export default function Map3DWrapper() {
  const { stores, isLoading, error } = useStores();

  if (isLoading) {
    return <Loader text="지도를 불러오는 중..." />;
  }

  if (error) {
    return <Error message="Error loading stores" />;
  }

  return <Map3D stores={stores} />
} 