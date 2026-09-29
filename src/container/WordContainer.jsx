'use client';

import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import { useWords } from '@/hooks/useWord';
import * as S from '@/styles/word/wordContainer.style';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

function WordContainer({ onLoadComplete, selectedWordId: initialSelectedWordId }) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const pathWordId = pathname?.startsWith('/word/') && pathname !== '/word'
    ? pathname.split('/')[2]
    : null;
  const [selectedWordIds, setSelectedWordIds] = useState(
    initialSelectedWordId || pathWordId ? [initialSelectedWordId || pathWordId] : []
  );
  const { words, loading, error } = useWords();

  const filteredWords = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return words;
    return words.filter((word) => word.name?.toLowerCase().includes(keyword));
  }, [words, searchQuery]);

  const handleWordClick = (wordId, e) => {
    e.stopPropagation();

    if (selectedWordIds.includes(wordId)) {
      setSelectedWordIds((prev) => prev.filter((id) => id !== wordId));
    } else {
      setSelectedWordIds((prev) => [...prev, wordId]);
    }
  };

  useEffect(() => {
    const nextId = initialSelectedWordId || pathWordId;
    if (nextId) {
      setSelectedWordIds([nextId]);
    }
  }, [initialSelectedWordId, pathWordId]);

  useEffect(() => {
    if (!loading && onLoadComplete) {
      onLoadComplete();
    }
  }, [loading, onLoadComplete]);

  return (
    <S.WordWrapper>
      <S.WordPageName>단어 목록</S.WordPageName>

      <S.WordSearchWrapper>
        <S.SearchField>
          <S.SearchLabel>검색</S.SearchLabel>
          <S.SearchInput
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Type to search..."
          />
        </S.SearchField>
      </S.WordSearchWrapper>

      {loading && (
        <Loader baseColor="#efefef" style={{ marginTop: '8px' }} />
      )}
      {error && (
        <Error style={{ marginTop: '24px', zIndex: '3' }} />
      )}
      {!loading && filteredWords.length === 0 && (
        <Error
          message={searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : '등록된 단어가 없습니다.'}
          style={{ marginTop: '24px', zIndex: '3' }}
        />
      )}

      <S.WordItemWrapper>
        <S.WordList>
          {filteredWords.map((word) => (
            <S.WordItem
              key={word.id}
              onClick={(e) => handleWordClick(word.id, e)}
              className={selectedWordIds.includes(word.id) ? 'active' : ''}
            >
              <S.WordTitle>{word.name}</S.WordTitle>
            </S.WordItem>
          ))}
        </S.WordList>
      </S.WordItemWrapper>

      {selectedWordIds.length > 0 && (
        <S.WordMeaningsContainer>
          {selectedWordIds.slice().reverse().map((wordId) => {
            const selectedWord = words.find((word) => word.id === wordId);
            return selectedWord ? (
              <S.WordMeaning key={wordId}>
                <S.WordMeaningTitle>
                  {selectedWord.name}
                </S.WordMeaningTitle>
                <S.WordMeaningContent>
                  {selectedWord.meaning}
                </S.WordMeaningContent>
                <S.WordMeaningCloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedWordIds((prev) => prev.filter((id) => id !== wordId));
                  }}
                >
                  ✕
                </S.WordMeaningCloseButton>
                {selectedWord.img && (
                  <S.WordMeaningImage src={selectedWord.img} alt={selectedWord.name} />
                )}
              </S.WordMeaning>
            ) : null;
          })}
        </S.WordMeaningsContainer>
      )}
    </S.WordWrapper>
  );
}

export default WordContainer;
