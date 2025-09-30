'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useStores } from '@/hooks/useStores';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

// Map3D를 dynamic import로 로드하여 ExitStatus 오류 방지
const Map3D = dynamic(() => import('../components/common/Map3D'), {
  ssr: false,
  loading: () => <Loader text="지도를 불러오는 중..." />
});

// Map2D를 dynamic import로 로드
const Map2D = dynamic(() => import('../components/common/Map2D'), {
  ssr: false,
  loading: () => <Loader text="지도를 불러오는 중..." />
});

export default function MapContainer() {
  const { stores, isLoading, error } = useStores();
  const [isMap3D, setIsMap3D] = useState(true); // 기본값은 3D
  const [hoveredStore, setHoveredStore] = useState(null); // 호버된 store 상태
  const pathname = usePathname();
  const router = useRouter();

  // /store 페이지 또는 개별 스토어 페이지에서 Map3D 클릭 시 홈으로 이동
  const handleMapClick = (e) => {
    if (pathname !== '/') {
      router.push('/');
    }
  };

  // 지도 전환 함수
  const toggleMapView = () => {
    setIsMap3D(!isMap3D);
  };

  // Store hover 핸들러
  const handleStoreHover = (store) => {
    setHoveredStore(store);
    // 전역으로 hovered store 정보 저장 (StoreList에서 사용)
    window.hoveredStoreId = store.id;
    // 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('storeHover', { detail: store }));
  };

  const handleStoreLeave = () => {
    setHoveredStore(null);
    // 전역 hovered store 정보 제거
    window.hoveredStoreId = null;
    // 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('storeLeave'));
  };

  // 전역 이벤트 리스너 등록 (Navigation에서 호출할 수 있도록)
  useEffect(() => {
    const handleMapToggle = () => {
      toggleMapView();
    };

    // 커스텀 이벤트 리스너 등록
    window.addEventListener('toggleMapView', handleMapToggle);

    return () => {
      window.removeEventListener('toggleMapView', handleMapToggle);
    };
  }, [isMap3D]);

  if (isLoading) {
    return <Loader text="지도를 불러오는 중..." />;
  }

  if (error) {
    return <Error message="Error loading stores" />;
  }

  return (
    <>
      {/* Map2D - z-index로 전환 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100dvw',
        height: '100dvh',
        zIndex: isMap3D ? 1 : 2
      }} onClick={handleMapClick}>
        <Map2D
          stores={stores}
          onStoreHover={handleStoreHover}
          onStoreLeave={handleStoreLeave}
        />
      </div>

      {/* Map3D - z-index로 전환 */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100dvw',
        height: '100dvh',
        zIndex: isMap3D ? 2 : 1
      }} onClick={handleMapClick}>
        <Map3D
          stores={stores}
          onStoreHover={handleStoreHover}
          onStoreLeave={handleStoreLeave}
          onMapClick={handleMapClick}
        />
      </div>
    </>
  );
} 