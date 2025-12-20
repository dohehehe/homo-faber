import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const CommentsSection = styled.div`
  width: 100%;
  margin-top: 140px;
  padding-top: 20px;

  ${theme.media.tablet} {
    padding: 20px 10px;
    margin-top: 20px;
  }
`;

export const CommentsTitle = styled.h3`
  font-family: var(--font-gothic);
  font-size: 1.1rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

// 댓글 입력창
export const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 30px;

  ${theme.media.tablet} {
    align-items: center;
    padding-top: 20px;
  }
`;

export const CommentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 4px;
  font-family: var(--font-gothic);
  font-size: 1rem;
  resize: vertical;
  min-height: 60px;
  
  &:focus {
    outline: none;
    background: var(--yellow);
  }

  &:disabled {
    background-color:rgb(200, 200, 200);
    cursor: not-allowed;
  }

  &:disabled::placeholder {
    color: black;
    text-align: center;
  }

`;

export const CommentSubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: var(--font-gothic);
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  font-weight: 600;
  
  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  ${theme.media.tablet} {
    width: 100%;
  }
`;

// 댓글 목록
export const CommentsList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 40px;
`;

export const NoComments = styled.div`
  text-align: center;
  color: #999;
  font-family: var(--font-gothic);
  font-size: 0.9rem;
  padding: 20px;
`;

export const CommentItem = styled.li`
  width: 100%;
  padding: 20px 10px 14px 10px;
  border-top: 1.5px dotted #999;
`;

export const CommentContent = styled.div`
  width: 100%;
  font-family: var(--font-gothic);
  letter-spacing: 0.04rem;
  font-size: 1rem;
  line-height: 1.85;
  color: #333;
  word-break: keep-all;
  text-align: left;

  ${theme.media.tablet} {
    font-size: 1.1rem;
  }
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
  margin-top: 25px;

  ${theme.media.tablet} {
    padding: 0 2px;
  }
`;

export const CommentUser = styled.div`
  font-family: var(--font-gothic);
  font-size: 0.85rem;
  color: #666;
  font-weight: 500;

  ${theme.media.tablet} {
    font-size: 1rem;
  }
`;

export const CommentTime = styled.div`
  font-family: var(--font-gothic);
  font-size: 0.8rem;
  color: #999;

  ${theme.media.tablet} {
    font-size: 0.9rem;
  }
`;

export const CommentButtonWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;
`;

export const CommentButton = styled.button`
  font-family: var(--font-gothic);
  font-size: 0.8rem;
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
  font-family: var(--font-gothic);
  font-size: 0.9rem;
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
  margin: 10px 0;
`;

export const ImageUploadButton = styled.div`
  margin-bottom: 10px;

  label {
    display: inline-block;
    padding: 8px 12px;
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: var(--font-gothic);
    font-size: 0.9rem;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #e9ecef;
      border-color: #007bff;
      color: #007bff;
    }
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
  font-size: 12px;
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