'use client';

import Map3D from '../components/common/Map3D';
import { useStores } from '@/hooks/useStores';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

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