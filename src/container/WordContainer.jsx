'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useWords } from '@/hooks/useWord';
import * as S from '@/styles/word/wordContainer.style';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import Search from '@/components/common/Search';
import useWindowSize from '@/hooks/useWindowSize';
import CustomScrollbar from '@/components/common/CustomScrollbar';
import { useCustomScrollbar } from '@/hooks/useCustomScrollbar';
import Image from 'next/image';

function WordContainer({ onLoadComplete, selectedWordId: initialSelectedWordId }) {
  const pathname = usePathname();
  const router = useRouter();
  const wrapperRef = useRef(null);
  const [cursorPositionPercent, setCursorPositionPercent] = useState({ x: 50, y: 50 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWordIds, setSelectedWordIds] = useState(initialSelectedWordId ? [initialSelectedWordId] : []);
  const [isExiting, setIsExiting] = useState(false);
  const { words, loading, error, searchWordsByName, fetchWords } = useWords();

  // pathname 변경 시 언마운트 상태 설정
  useEffect(() => {
    if (!pathname.startsWith('/word')) {
      setIsExiting(true);
    }
  }, [pathname]);
  const { isMobile } = useWindowSize();
  const { containerRef, scrollState, scrollToRatio } = useCustomScrollbar();

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

  const handleSearch = (keyword) => {
    setSearchQuery(keyword);
    searchWordsByName(keyword);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    fetchWords();
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

      <S.WordSearchWrapper onClick={(e) => e.stopPropagation()}>
        <Search
          placeholder="단어 검색"
          showClear={true}
          onSearch={handleSearch}
          onClear={handleClearSearch}
          isExiting={isExiting}
          backgroundColor="rgba(253, 253, 253, 0.82)"
          textColor="#2E5BBA"
          inputBackgroundColor="rgba(255, 255, 255, 0)"
          focusOutlineColor="rgba(255, 255, 255, 0.8)"
        />
      </S.WordSearchWrapper>

      {loading && (
        <Loader baseColor="rgb(255, 255, 255)" style={{ marginTop: isMobile ? '-32px' : '-30px', marginLeft: isMobile ? '46px' : '-19px', transform: isMobile ? 'none' : 'rotate(90deg)', transformOrigin: isMobile ? 'none' : 'top left', mixBlendMode: 'multiply' }} />
      )}
      {error && (
        <Error style={{ marginLeft: isMobile ? '-8px' : '-23px', marginTop: isMobile ? '20px' : '24px', zIndex: '3' }} />
      )}
      {!loading && words.length === 0 && (
        <Error message={searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다.` : '등록된 단어가 없습니다.'} style={{ marginLeft: isMobile ? '-8px' : '-23px', marginTop: isMobile ? '20px' : '24px', zIndex: '3' }} />
      )}

      <S.WordItemWrapper>
        <S.WordList>
          <>
            {words.map((word) => (
              <S.WordItem
                key={word.id}
                onClick={(e) => handleWordClick(word.id, e)}
                className={selectedWordIds.includes(word.id) ? 'active' : ''}
              >
                <S.WordTitle>{word.name}</S.WordTitle>
              </S.WordItem>
            ))
            }
          </>
        </S.WordList>

        {selectedWordIds.length > 0 && (
          <S.WordMeaningsContainer ref={containerRef}>
            {selectedWordIds.map((wordId, index) => {
              const selectedWord = words.find(word => word.id === wordId);
              return selectedWord ? (
                <S.WordMeaning
                  key={wordId}
                >
                  <S.WordMeaningTitle>
                    {selectedWord.name}
                  </S.WordMeaningTitle>

                  <S.WordMeaningCloseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedWordIds(prev => prev.filter(id => id !== wordId));
                    }}>
                    ✕
                  </S.WordMeaningCloseButton>

                  <S.WordMeaningContent>
                    {selectedWord.meaning}
                  </S.WordMeaningContent>

                  {selectedWord.img && (
                    <S.WordMeaningImage src={selectedWord.img} alt={selectedWord.name} />
                  )}
                </S.WordMeaning>
              ) : null;
            })}
            {!isMobile && (
              <CustomScrollbar
                scrollState={scrollState}
                onScrollToRatio={scrollToRatio}
              />
            )}

          </S.WordMeaningsContainer>
        )}
      </S.WordItemWrapper>
    </S.WordWrapper >
  );
}

export default WordContainer;
