'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useWords } from '@/hooks/useWord';
import * as S from '@/styles/word/wordContainer.style';


function WordContainer({ onLoadComplete, selectedWordId: initialSelectedWordId }) {
  const pathname = usePathname();
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [cursorPositionPercent, setCursorPositionPercent] = useState({ x: 50, y: 50 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWordIds, setSelectedWordIds] = useState(initialSelectedWordId ? [initialSelectedWordId] : []);

  const handleMouseMove = useCallback((event) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const toPercent = (v) => Math.max(0, Math.min(100, Math.round(v * 100)));
    setCursorPositionPercent({ x: toPercent(relativeX), y: toPercent(relativeY) });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPositionPercent({ x: 50, y: 50 });
  }, []);

  const gradientCss = useMemo(() => {
    const baseStops = [22, 53, 78, 100];
    const yNormalized = cursorPositionPercent.y / 100;
    const delta = (yNormalized - 0.5) * 30;

    const adjusted = [
      Math.max(0, Math.min(100, baseStops[0] + delta)),
      Math.max(0, Math.min(100, baseStops[1] + delta)),
      Math.max(0, Math.min(100, baseStops[2] + delta)),
      100,
    ];

    for (let i = 1; i < adjusted.length; i += 1) {
      adjusted[i] = Math.max(adjusted[i], adjusted[i - 1] + 1);
      adjusted[i] = Math.min(adjusted[i], 100);
    }

    const [s1, s2, s3] = adjusted;

    return `radial-gradient(circle at ${cursorPositionPercent.x}% ${cursorPositionPercent.y}%, rgba(74, 144, 226, 1) ${s1}%, rgba(255, 255, 255, 1) ${s2}%, rgba(46, 91, 186, 1) ${s3}%, rgba(255, 255, 255, 1) 100%)`;
  }, [cursorPositionPercent.x, cursorPositionPercent.y]);

  const handleWordWrapperClick = () => {
    if (pathname === '/') {
      router.push('/word');
    }
  };

  const { words, loading, error, searchWordsByName, fetchWords } = useWords();


  const handleWordClick = (wordId, e) => {
    e.stopPropagation();

    // 이미 선택된 단어인지 확인
    if (selectedWordIds.includes(wordId)) {
      // 이미 선택된 단어라면 제거
      setSelectedWordIds(prev => {
        const newIds = prev.filter(id => id !== wordId);
        return newIds;
      });
    } else {
      // 새로운 단어라면 추가
      setSelectedWordIds(prev => {
        const newIds = [...prev, wordId];
        return newIds;
      });
    }
  };

  const handleSearch = () => {
    searchWordsByName(searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchWords();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // initialSelectedWordId가 변경될 때 selectedWordIds 업데이트
  useEffect(() => {
    if (initialSelectedWordId) {
      setSelectedWordIds([initialSelectedWordId]);
    } else {
      setSelectedWordIds([]);
    }
  }, [initialSelectedWordId]);

  return (
    <S.WordWrapper
      ref={wrapperRef}
      pathname={pathname}
      gradientCss={gradientCss}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={pathname === '/' ? handleWordWrapperClick : undefined}
    >
      <S.WordPageName>단어 목록</S.WordPageName>

      <S.SearchContainer onClick={(e) => e.stopPropagation()}>
        <S.SearchInput
          type="text"
          placeholder="단어 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <S.SearchButton onClick={handleSearch}>
          검색
        </S.SearchButton>

        {searchQuery && (
          <S.ClearButton onClick={handleClearSearch} title="검색 초기화">
            ✕
          </S.ClearButton>
        )}
      </S.SearchContainer>

      <S.WordItemWrapper>
        <S.WordList>
          {loading ? (
            <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
              단어 목록을 불러오는 중...
            </div>
          ) : error ? (
            <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
              오류가 발생했습니다: {error}
            </div>
          ) : words.length === 0 ? (
            <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
              {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : '등록된 단어가 없습니다.'}
            </div>
          ) : (
            words.map((word) => (
              <S.WordItem
                key={word.id}
                onClick={(e) => handleWordClick(word.id, e)}
                className={selectedWordIds.includes(word.id) ? 'active' : ''}
              >
                <S.WordTitle>{word.name}</S.WordTitle>
              </S.WordItem>
            ))
          )}
        </S.WordList>
        {selectedWordIds.length > 0 && (
          <S.WordMeaningsContainer>
            {selectedWordIds.map((wordId, index) => {
              const selectedWord = words.find(word => word.id === wordId);
              return selectedWord ? (
                <S.WordMeaning
                  key={wordId}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                    <h3 style={{ margin: '0', fontSize: '1.5rem', color: '#2E5BBA' }}>
                      {selectedWord.name}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWordIds(prev => prev.filter(id => id !== wordId));
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '1.2rem',
                        color: '#666',
                        cursor: 'pointer',
                        padding: '0',
                        marginLeft: '10px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                  <p style={{ margin: '0 0 20px 0' }}>
                    {selectedWord.meaning}
                  </p>
                  {selectedWord.img && selectedWord.img.length > 0 && (
                    <div style={{ marginTop: '20px' }}>
                      {selectedWord.img.map((img) => (
                        <img
                          key={img.id}
                          src={img.url}
                          alt={img.caption || selectedWord.name}
                          style={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: '8px',
                            marginBottom: '10px'
                          }}
                        />
                      ))}
                    </div>
                  )}
                </S.WordMeaning>
              ) : null;
            })}
          </S.WordMeaningsContainer>
        )}
      </S.WordItemWrapper>
    </S.WordWrapper>
  );
}

export default WordContainer;
