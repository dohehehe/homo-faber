'use client'

import { useEffect, useState, useCallback, useRef } from 'react';
import Masonry from 'react-masonry-css';
import * as S from '@/styles/gallery/galleryContainer.style';
import { useGallery } from '@/hooks/useGallery';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import ImageModal from '@/components/common/ImageModal';

function GalleryContainer({ onLoadComplete }) {
  const { galleryImages, isLoading, isLoadingMore, error, hasMore, loadMore } = useGallery();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observerRef = useRef(null);

  // Masonry breakpoints 설정
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2
  };

  // 데이터 로딩 완료 시 부모 컴포넌트에 알림
  useEffect(() => {
    if (!isLoading && galleryImages.length > 0 && onLoadComplete) {
      onLoadComplete();
    }
  }, [isLoading, galleryImages, onLoadComplete]);

  // 이미지 클릭 핸들러
  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Intersection Observer를 사용한 인피니트 스크롤
  const lastImageElementRef = useCallback((node) => {
    if (isLoading || isLoadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, isLoadingMore, hasMore, loadMore]);

  // 컴포넌트 언마운트 시 observer 정리
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <S.GalleryWrapper>
      <S.GalleryName>갤러리</S.GalleryName>
      <S.GalleryContent>
        {isLoading ? (
          <Loader style={{ marginTop: '20px' }} baseColor="rgb(224, 224, 224)" />
        ) : error ? (
          <Error
            message={error}
            style={{ marginTop: '20px', position: 'relative', zIndex: '2' }}
          />
        ) : galleryImages.length === 0 ? (
          <Error message="갤러리 이미지를 찾을 수 없습니다." />
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {galleryImages.map((image, index) => (
              <S.GalleryImage
                src={image.publicUrl}
                alt={image.name}
                loading="lazy"
                key={image.id}
                onClick={() => handleImageClick(image)}
                style={{ cursor: 'pointer' }}
                ref={index === galleryImages.length - 1 ? lastImageElementRef : null}
              />
            ))}
            {isLoadingMore && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px',
                width: '100%'
              }}>
                <Loader baseColor="rgb(224, 224, 224)" />
              </div>
            )}

          </Masonry>
        )}
      </S.GalleryContent>

      {/* 이미지 모달 */}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={selectedImage?.publicUrl}
        imageName={selectedImage?.name}
        onClose={handleCloseModal}
      />
    </S.GalleryWrapper>
  );
}

export default GalleryContainer;