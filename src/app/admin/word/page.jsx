"use client";

import { useWords } from '@/hooks/useWord';
import { deleteWord } from '@/utils/supabase/word';
import AdminPage from '@/components/admin/AdminPage';
import styled from '@emotion/styled';

const WordInfo = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  align-items: flex-start;
  justify-content: flex-start;
`;

const WordName = styled.h3`
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  flex-shrink: 0;
  padding-top: 3px;
`;

const WordMeaning = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-right: 20px;
`;

const ImageStatus = styled.div`
  display: flex;
  gap: 15px;
  margin-left: auto;
  align-items: center;
  margin-right: 20px;
  flex-shrink: 0;
  margin-top: auto;
  margin-bottom: auto;
`;

const ImageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.8rem;
`;

const StatusIndicator = styled.span`
  font-weight: bold;
  font-size: 14px;
  color: ${props => props.hasImage ? '#28a745' : '#dc3545'};
`;

const WordAdminPage = () => {
  const { words, loading: isLoading, error } = useWords();

  const renderWordItem = (word) => (
    <WordInfo>
      <WordName>{word.name || '알 수 없음'}</WordName>
      <WordMeaning>
        {word.meaning || '의미가 없습니다.'}
      </WordMeaning>
      <ImageStatus>
        <ImageInfo>
          <span>이미지:</span>
          <StatusIndicator hasImage={word.img && word.img.length > 0}>
            {word.img && word.img.length > 0 ? 'O' : 'X'}
          </StatusIndicator>
        </ImageInfo>
      </ImageStatus>
    </WordInfo>
  );

  return (
    <AdminPage
      title="단어 관리"
      createPath="/admin/word"
      isLoading={isLoading}
      error={error}
      items={words}
      renderItem={renderWordItem}
      onDelete={deleteWord}
    />
  );
};

export default WordAdminPage;
