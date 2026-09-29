import styled from '@emotion/styled';
import { captionText } from '@/styles/typography';

export const CommentsSection = styled.div`
  width: 100%;
  margin-top: 10px;
`;

export const CommentsTitle = styled.h3`
  font-weight: 400;
  color: #000;
  margin: 0;
  padding: 10px 15px;
  text-align: left;
  border-bottom: 0.5px solid rgba(227, 227, 227, 0.3);
`;

// 댓글 입력창
export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  resize: vertical;
  min-height: 60px;
  
  &:focus {
    outline: none;
    background: rgba(227, 227, 227, 0.5);
  }

  &:disabled {
    background-color: #f3f3f3;
    cursor: not-allowed;
  }
`;

export const CommentSubmitButton = styled.button`
  padding: 8px;
  background: rgba(239, 239, 239, 0.9);
  color: #000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 400;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background-color: #e4e4e4;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

// 댓글 목록
export const CommentsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-bottom: 40px;
`;

export const NoComments = styled.div`
  text-align: center;
  color: #999;
  padding: 20px;
`;

export const CommentActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: flex-start;
`;

export const CommentItem = styled.li`
  width: 100%;
  padding: 10px 15px;
  border-top: 0.5px solid #efefef;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CommentContent = styled.div`
  width: 100%;
  color: #000;
  word-break: keep-all;
  text-align: left;
`;

export const CommentGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0 10px;
`;

export const CommentGalleryImage = styled.img`
  width: calc( 50% - 5px);
  max-height: 200px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #ddd;
  
  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
    transition: all 0.2s ease;
  }
`;

export const CommentInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 0;
`;

export const CommentUser = styled.div`
  ${captionText}
  color: #a0a0a0;
  font-weight: 400;
`;

export const CommentTime = styled.div`
  ${captionText}
  color: #a0a0a0;
`;

export const CommentButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;
`;

export const CommentButton = styled.button`
  font-weight: 400;
  color: #666;
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 3px;
  
  &:hover {
    background-color: #f0f0f0;
    color: #333;
  }
`;


// 댓글 수정폼 
export const CommentEditWrapper = styled.div`
  width: 100%;
`;

export const CommentEditInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 60px;
  margin-bottom: 10px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const CommentEditButtons = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-end;
`;


export const ImageUploadSection = styled.div`
  margin: 0;
`;

export const ImageUploadButton = styled.div`
  margin-bottom: 0;

  label {
    display: inline-block;
    padding: 8px;
    background: rgba(239, 239, 239, 0.9);
    border: none;
    border-radius: 5px;
    color: #000;
    cursor: pointer;
  }

  input:disabled + label {
    background-color: #f5f5f5;
    color: #999;
    cursor: not-allowed;
    border-color: #ccc;
    
    &:hover {
      background-color: #f5f5f5;
      border-color: #ccc;
      color: #999;
    }
  }
`;

export const ImagePreviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
  padding-left: 6px;
`;

export const ImagePreviewItem = styled.div`
  position: relative;
  width: calc((100% - 30px) / 4);
  height: 90px;
`;

export const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #ddd;
`;

export const ImageRemoveButton = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #cc0000;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;