"use client";

import { useState, useRef, useEffect } from 'react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { getPublicGalleryImages } from '@/utils/api/gallery-api';
import styled from '@emotion/styled';
import Image from 'next/image';
import Button from '@/components/admin/Button';

const GalleryContainer = styled.div`
  padding: 20px;
  background: white;
  font-family: var(--font-gothic);
`;

const GalleryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e1e5e9;

  h1 {
    margin: 0;
    color: #333;
    font-size: 1.7rem;
    font-weight: 700;
  }
`;

const UploadSection = styled.div`
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: #007bff;
    background-color: #f0f8ff;
  }

  &.dragover {
    border-color: #007bff;
    background-color: #e3f2fd;
  }
`;

const UploadButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const GalleryItem = styled.div`
  position: relative;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
`;

const GalleryImage = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: #666;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 40px;
  color: red;
  font-size: 1.1rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 1.1rem;

  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }
`;

const GalleryAdminPage = () => {
  const { uploadImageToServer, deleteImageFromServer } = useImageUpload({ bucket: 'gallery', maxSizeInMB: 1 });

  const [galleryImages, setGalleryImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // 모든 이미지를 한 번에 가져오기
  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // 큰 limit 값으로 모든 이미지를 한 번에 가져오기
        const result = await getPublicGalleryImages(0, 1000);
        setGalleryImages(result.data);
      } catch (err) {
        console.error('Error fetching gallery images:', err);
        setError(err.message || '갤러리 이미지를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllImages();
  }, []);

  const handleFileSelect = async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
          continue;
        }

        // 이미지 업로드
        const result = await uploadImageToServer(file);
        if (result.success) {
          alert(`${file.name} 업로드 완료`);
          // 이미지 목록 새로고침
          const refreshResult = await getPublicGalleryImages(0, 1000);
          setGalleryImages(refreshResult.data);
        } else {
          alert(`이미지 업로드 실패: ${result.error}`);
        }
      }
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e) => {
    handleFileSelect(Array.from(e.target.files));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDelete = async (imageName) => {
    if (confirm('이 이미지를 삭제하시겠습니까?')) {
      try {
        // 파일 경로를 배열로 전달 (Supabase Storage 요구사항)
        const result = await deleteImageFromServer([imageName]);
        if (result.success) {
          alert('이미지가 삭제되었습니다.');
          // 이미지 목록 새로고침
          const refreshResult = await getPublicGalleryImages(0, 1000);
          setGalleryImages(refreshResult.data);
        } else {
          alert(`이미지 삭제 실패: ${result.error}`);
        }
      } catch (error) {
        console.error('이미지 삭제 오류:', error);
        alert('이미지 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  if (isLoading) {
    return (
      <GalleryContainer>
        <GalleryHeader>
          <h1>갤러리 관리</h1>
        </GalleryHeader>
        <LoadingMessage>갤러리 이미지를 불러오는 중...</LoadingMessage>
      </GalleryContainer>
    );
  }

  if (error) {
    return (
      <GalleryContainer>
        <GalleryHeader>
          <h1>갤러리 관리</h1>
        </GalleryHeader>
        <ErrorMessage>오류가 발생했습니다: {error}</ErrorMessage>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <GalleryHeader>
        <h1>갤러리 관리</h1>
      </GalleryHeader>

      {galleryImages.length === 0 ? (
        <EmptyMessage>
          <h3>등록된 이미지가 없습니다</h3>
          <p>위에서 이미지를 업로드해주세요.</p>
        </EmptyMessage>
      ) : (
        <GalleryGrid>
          {galleryImages.map((image, index) => (
            <GalleryItem key={`${image.id || image.name}-${index}`}>
              <GalleryImage>
                <Image
                  src={image.publicUrl}
                  alt={image.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <DeleteButton onClick={() => handleDelete(image.name)}>
                  ×
                </DeleteButton>
              </GalleryImage>
            </GalleryItem>
          ))}
        </GalleryGrid>
      )}
    </GalleryContainer>
  );
};

export default GalleryAdminPage;
