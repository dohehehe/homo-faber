import { useState, useEffect, useCallback } from 'react';
import { getPublicGalleryImages } from '@/utils/api/gallery-api';

export function useGallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 8; // 한 번에 로드할 이미지 수

  const fetchGalleryImages = useCallback(async (page = 0, reset = false) => {
    try {
      if (reset) {
        setIsLoading(true);
        setGalleryImages([]);
        setCurrentPage(0);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      // API를 통해 갤러리 이미지 가져오기
      const result = await getPublicGalleryImages(page, ITEMS_PER_PAGE);

      // 더 이상 로드할 이미지가 없는지 확인
      setHasMore(result.hasMore);

      if (reset) {
        setGalleryImages(result.data);
      } else {
        setGalleryImages(prev => [...prev, ...result.data]);
      }

      setCurrentPage(page);
    } catch (err) {
      console.error('Error fetching gallery images:', err);
      setError(err.message || '갤러리 이미지를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [ITEMS_PER_PAGE]);

  // 초기 로드
  useEffect(() => {
    fetchGalleryImages(0, true);
  }, [fetchGalleryImages]);

  // 더 많은 이미지 로드
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      fetchGalleryImages(currentPage + 1, false);
    }
  }, [fetchGalleryImages, currentPage, isLoadingMore, hasMore]);

  return {
    galleryImages,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchGalleryImages(0, true)
  };
}
