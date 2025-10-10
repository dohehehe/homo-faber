import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useImageUpload } from '@/hooks/useImageUpload';
import { updateComment, deleteComment } from '@/utils/api/comments-api';
import * as S from '@/styles/store/storeComment.style';
import ImageModal from '@/components/common/ImageModal';

const StoreComment = ({ comment, onUpdate, onDelete }) => {
  const { user } = useAuth();
  const { processImageForPreview, uploadImageToServer } = useImageUpload({ bucket: 'gallery', maxSizeInMB: 0.5 });

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.contents || '');
  const [editImages, setEditImages] = useState([]); // 새로 추가된 이미지 파일들
  const [editImagePreviews, setEditImagePreviews] = useState([]); // 모든 이미지 미리보기 (기존 + 새로 추가)
  const [existingImages, setExistingImages] = useState([]); // 기존 이미지 URL들
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOwner = user && comment.user_id === user.id;

  // 이미지 클릭 핸들러
  const handleImageClick = (imageUrl, imageName) => {
    setSelectedImage({ publicUrl: imageUrl, name: imageName });
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(comment.contents || '');
    // 기존 이미지를 편집 상태로 초기화
    setEditImages([]);
    setExistingImages(comment.gallery || []);
    setEditImagePreviews(comment.gallery || []);
  };

  // 이미지 선택 핸들러
  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // 최대 4개 이미지 제한
    if (editImagePreviews.length + files.length > 4) {
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

      setEditImages(prev => [...prev, ...newImages]);
      setEditImagePreviews(prev => [...prev, ...newPreviews]);
    } catch (error) {
      console.error('이미지 처리 오류:', error);
      alert('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  // 이미지 제거 핸들러
  const handleImageRemove = (e, index) => {
    e.preventDefault();
    e.stopPropagation();

    const isExistingImage = index < existingImages.length;

    if (isExistingImage) {
      // 기존 이미지 삭제
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      // 새로 추가된 이미지 삭제
      const newImageIndex = index - existingImages.length;
      setEditImages(prev => prev.filter((_, i) => i !== newImageIndex));
    }

    // 미리보기에서도 제거
    setEditImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSubmittingEdit(true);
    try {
      let newGalleryUrls = [];

      // 새로 추가된 이미지가 있는 경우 업로드
      if (editImages.length > 0) {
        for (const imageFile of editImages) {
          const result = await uploadImageToServer(imageFile);
          if (result.success) {
            newGalleryUrls.push(result.file.url);
          } else {
            throw new Error(`이미지 업로드 실패: ${result.error}`);
          }
        }
      }

      // 남아있는 기존 이미지와 새로 업로드된 이미지 합치기
      const finalGallery = [...existingImages, ...newGalleryUrls];

      await updateComment(comment.id, {
        contents: editContent,
        gallery: finalGallery.length > 0 ? finalGallery : null
      });

      onUpdate(comment.id, {
        contents: editContent,
        gallery: finalGallery.length > 0 ? finalGallery : null
      });
      setIsEditing(false);
    } catch (error) {
      console.error('후기 수정 실패:', error);
      alert('후기 수정에 실패했습니다.');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(comment.contents || '');
    setEditImages([]);
    setExistingImages([]);
    setEditImagePreviews([]);
  };

  const handleDelete = async () => {
    if (window.confirm('후기를 삭제하시겠습니까?')) {
      try {
        await deleteComment(comment.id);
        onDelete(comment.id);
      } catch (error) {
        console.error('후기 삭제 실패:', error);
        alert('후기 삭제에 실패했습니다.');
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <S.CommentItem>
      {isEditing ? (
        <S.CommentEditWrapper>
          <S.CommentEditInput
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            placeholder="후기를 입력하세요..."
          />

          {/* 이미지 편집 섹션 */}
          <S.ImageUploadSection>
            <S.ImageUploadButton>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                disabled={isSubmittingEdit}
                style={{ display: 'none' }}
                id={`comment-edit-image-upload-${comment.id}`}
              />
              <label htmlFor={`comment-edit-image-upload-${comment.id}`}>
                이미지 추가 ({editImagePreviews.length}/4)
              </label>
            </S.ImageUploadButton>

            {/* 이미지 미리보기 */}
            {editImagePreviews.length > 0 && (
              <S.ImagePreviewList>
                {editImagePreviews.map((preview, index) => (
                  <S.ImagePreviewItem key={index}>
                    <S.ImagePreview
                      src={preview}
                      alt={`미리보기 ${index + 1}`}
                    />
                    <S.ImageRemoveButton
                      onClick={(e) => handleImageRemove(e, index)}
                      disabled={isSubmittingEdit}
                      type="button"
                    >
                      ✕
                    </S.ImageRemoveButton>
                  </S.ImagePreviewItem>
                ))}
              </S.ImagePreviewList>
            )}
          </S.ImageUploadSection>

          <S.CommentEditButtons>
            <S.CommentButton
              onClick={handleSave}
              disabled={isSubmittingEdit}
            >
              {isSubmittingEdit ? '저장 중...' : '저장'}
            </S.CommentButton>
            <S.CommentButton
              onClick={handleCancel}
              disabled={isSubmittingEdit}
            >
              취소
            </S.CommentButton>
          </S.CommentEditButtons>
        </S.CommentEditWrapper>
      ) : (
        <>
          <S.CommentContent>
            {comment.contents || '아직 후기가 없습니다.'}
          </S.CommentContent>

          {/* 갤러리 이미지 표시 */}
          {comment.gallery && comment.gallery.length > 0 && (
            <S.CommentGallery>
              {comment.gallery.map((imageUrl, index) => (
                <S.CommentGalleryImage
                  key={index}
                  src={imageUrl}
                  alt={`후기 이미지 ${index + 1}`}
                  onClick={() => handleImageClick(imageUrl, `후기 이미지 ${index + 1}`)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </S.CommentGallery>
          )}

          <S.CommentInfoWrapper>
            <S.CommentUser>
              {comment.users?.name || (comment.user_id ? `사용자 ${comment.user_id.slice(0, 8)}` : '익명')}
            </S.CommentUser>
            <S.CommentTime>
              {formatDate(comment.created_at)}
            </S.CommentTime>

            {isOwner && (
              <S.CommentButtonWrapper>
                <S.CommentButton onClick={handleEdit}>수정</S.CommentButton>
                <S.CommentButton onClick={handleDelete}>삭제</S.CommentButton>
              </S.CommentButtonWrapper>
            )}
          </S.CommentInfoWrapper>
        </>
      )}

      {/* 이미지 모달 */}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={selectedImage?.publicUrl}
        imageName={selectedImage?.name}
        onClose={handleCloseModal}
      />
    </S.CommentItem>
  );
}

export default StoreComment;