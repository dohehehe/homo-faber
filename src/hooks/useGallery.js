import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client';

export function useGallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 8; // 한 번에 로드할 이미지 수 (더 작게 설정)

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

      const supabase = createClient();
      const offset = page * ITEMS_PER_PAGE;

      // Storage에서 이미지 파일 목록 가져오기 (페이지네이션)
      const { data: files, error: listError } = await supabase.storage
        .from('gallery')
        .list('', {
          limit: ITEMS_PER_PAGE,
          offset: offset,
        });

      if (listError) {
        throw listError;
      }

      // 각 파일에 대해 public URL 생성
      const imagesWithUrls = (files || [])
        .filter(file => {
          // 이미지 파일만 필터링
          const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
          return imageExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
        })
        .map(file => {
          const { data: { publicUrl } } = supabase.storage
            .from('gallery')
            .getPublicUrl(file.name);

          return {
            id: file.id,
            name: file.name,
            publicUrl,
            created_at: file.created_at,
            updated_at: file.updated_at
          };
        });

      // 더 이상 로드할 이미지가 없는지 확인
      if (imagesWithUrls.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      if (reset) {
        setGalleryImages(imagesWithUrls);
      } else {
        setGalleryImages(prev => [...prev, ...imagesWithUrls]);
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
