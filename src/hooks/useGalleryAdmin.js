import { useState, useEffect, useCallback } from 'react';
import {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage
} from '@/utils/api/gallery-api';

export function useGalleryAdmin() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGalleryImages = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getGalleryImages();
      setGalleryImages(data || []);
    } catch (err) {
      setError(err.message || '갤러리 이미지를 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching gallery images:', err);
      setGalleryImages([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addGalleryImage = useCallback(async (imageData) => {
    try {
      const newImage = await createGalleryImage(imageData);
      setGalleryImages(prev => [...prev, newImage]);
      return newImage;
    } catch (err) {
      console.error('Error adding gallery image:', err);
      throw err;
    }
  }, []);

  const removeGalleryImage = useCallback(async (imageId) => {
    try {
      await deleteGalleryImage(imageId);
      setGalleryImages(prev => prev.filter(img => img.id !== imageId));
    } catch (err) {
      console.error('Error removing gallery image:', err);
      throw err;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  return {
    galleryImages,
    isLoading,
    error,
    fetchGalleryImages,
    addGalleryImage,
    removeGalleryImage,
    clearError,
    refetch: fetchGalleryImages,
  };
}
