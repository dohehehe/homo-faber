'use client';

import { useStores } from '@/hooks/useStores';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function Map2D() {
  const { stores } = useStores();
  const pathname = usePathname();
  const router = useRouter();

  // POI 클릭 핸들러
  const handlePOIClick = useCallback((storeId) => {
    router.push(`/store/${storeId}`);
  }, [router]);

  // /store 페이지 또는 개별 스토어 페이지에서 Map2D 클릭 시 홈으로 이동
  const handleMapClick = (e) => {
    if (pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        cursor: 'pointer',
        backgroundImage: 'url(/2Dmap.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={handleMapClick}
    >
      {/* 2D 지도에서 POI 마커들을 렌더링 */}
      {stores?.map((store) => (
        <div
          key={store.id}
          style={{
            position: 'absolute',
            left: `${store.longitude}%`, // 실제 좌표에 맞게 조정 필요
            top: `${store.latitude}%`, // 실제 좌표에 맞게 조정 필요
            width: '20px',
            height: '20px',
            backgroundColor: '#ff6b6b',
            borderRadius: '50%',
            cursor: 'pointer',
            border: '2px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            handlePOIClick(store.id);
          }}
        />
      ))}
    </div>
  );
};