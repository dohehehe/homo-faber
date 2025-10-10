import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useImageUpload } from '@/hooks/useImageUpload';
import { createComment } from '@/utils/api/comments-api';
import * as S from '@/styles/store/storeComment.style';

const StoreCommentForm = ({ storeId, onCommentAdded }) => {
  const { user } = useAuth();
  const { processImageForPreview, uploadImageToServer } = useImageUpload({ bucket: 'gallery', maxSizeInMB: 0.5 });

  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentImages, setCommentImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  // 이미지 선택 핸들러
  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // 최대 4개 이미지 제한
    if (commentImages.length + files.length > 4) {
      alert('최대 4개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    try {
      const newImages = [];
      const newPreviews = [];

      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          alert('이미지 파일만 선택할 수 있습니다.');
          continue;
        }

        const result = await processImageForPreview(file);
        if (result.success) {
          newImages.push(result.file.originalFile);
          newPreviews.push(result.file.url);
        } else {
          alert(`이미지 처리 실패: ${result.error}`);
        }
      }

      setCommentImages(prev => [...prev, ...newImages]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    } catch (error) {
      console.error('이미지 처리 오류:', error);
      alert('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  // 이미지 제거 핸들러
  const handleImageRemove = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setCommentImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 후기 작성 핸들러
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!newComment.trim() && commentImages.length === 0) {
      alert('후기를 입력해주세요.');
      return;
    }

    setIsSubmittingComment(true);
    try {
      let galleryUrls = [];

      // 이미지가 있는 경우 업로드
      if (commentImages.length > 0) {
        for (const imageFile of commentImages) {
          const result = await uploadImageToServer(imageFile);
          if (result.success) {
            galleryUrls.push(result.file.url);
          } else {
            throw new Error(`이미지 업로드 실패: ${result.error}`);
          }
        }
      }

      const commentData = {
        store_id: storeId,
        contents: newComment.trim(),
        gallery: galleryUrls.length > 0 ? galleryUrls : null
      };

      const newCommentData = await createComment(commentData);
      onCommentAdded(newCommentData);

      // 폼 초기화
      setNewComment('');
      setCommentImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error('후기 작성 실패:', error);
      alert('후기 작성에 실패했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };


  return (
    <S.CommentForm onSubmit={handleCommentSubmit}>
      <S.CommentInput
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={user ? "후기를 입력하세요..." : "로그인한 사용자만 작성할 수 있습니다"}
        disabled={isSubmittingComment || !user}
      />

      {/* 이미지 업로드 섹션 */}
      <S.ImageUploadSection>
        <S.ImageUploadButton>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            disabled={isSubmittingComment || !user}
            style={{ display: 'none' }}
            id="comment-image-upload"
          />
          <label htmlFor="comment-image-upload">
            이미지 추가 ({commentImages.length}/4)
          </label>
        </S.ImageUploadButton>

        {/* 이미지 미리보기 */}
        {imagePreviews.length > 0 && (
          <S.ImagePreviewList>
            {imagePreviews.map((preview, index) => (
              <S.ImagePreviewItem key={index}>
                <S.ImagePreview
                  src={preview}
                  alt={`미리보기 ${index + 1}`}
                />
                <S.ImageRemoveButton
                  onClick={(e) => handleImageRemove(e, index)}
                  disabled={isSubmittingComment}
                  type="button"
                >
                  ✕
                </S.ImageRemoveButton>
              </S.ImagePreviewItem>
            ))}
          </S.ImagePreviewList>
        )}
      </S.ImageUploadSection>

      <S.CommentSubmitButton
        type="submit"
        disabled={isSubmittingComment || !user || (!newComment.trim() && commentImages.length === 0)}
      >
        {isSubmittingComment ? '작성 중...' : '후기 작성'}
      </S.CommentSubmitButton>
    </S.CommentForm>
  );
};

export default StoreCommentForm;
