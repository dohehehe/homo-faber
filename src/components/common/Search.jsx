'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import * as S from '@/styles/common/search.style';
import SearchIcon from './SearchIcon';

// 리스트업 항목(이름, 태그-industry, 핸드폰 번호, 주소) - 모든 데이터베이스(두글자 이상)
const Search = ({
  onSearch,
  placeholder = "'키워드' 검색",
  showButton = false,
  buttonText = "검색",
  onClear,
  showClear = false,
  isExiting = false, // AnimatedPanel에서 전달받는 언마운트 상태
  // 색상  props
  backgroundColor = '#322F18',
  textColor = '#FFF8B8',
  inputBackgroundColor = '#363315',
  focusOutlineColor = '#FFF8B8'
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isMobile } = useWindowSize();
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get('keyword') || '',
  );
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  // isExiting prop이 변경될 때 애니메이션 처리
  useEffect(() => {
    if (isExiting) {
      setIsVisible(false);
      // 애니메이션 완료 후 완전히 언마운트
      setTimeout(() => {
        setShouldRender(false);
      }, 800); // 애니메이션 duration과 동일
    }
  }, [isExiting]);

  const handleSearch = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set('keyword', value);
    } else {
      newParams.delete('keyword');
    }
    window.history.replaceState({}, '', `${pathname}?${newParams.toString()}`);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchKeyword);
    }
  };

  const handleIconClick = () => {
    handleSearch(searchKeyword);
  };

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleClear = () => {
    setSearchKeyword('');
    handleSearch('');
    if (onClear) {
      onClear();
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <S.SearchWrapper
      isMobile={isMobile}
      initial={isMobile ? {
        x: '100%',
        opacity: 0
      } : undefined}
      animate={isMobile ? {
        x: isVisible ? 0 : '100%',
        opacity: isVisible ? 1 : 0
      } : undefined}
      transition={isMobile ? {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        delay: isVisible ? 1 : 0
      } : undefined}
    >
      <S.SearchBox
        backgroundColor={backgroundColor}
        focusOutlineColor={focusOutlineColor}
      >
        {showClear && searchKeyword && (
          <S.ClearButton onClick={handleClear} title="검색 초기화" textColor={textColor}>
            ✕
          </S.ClearButton>
        )}

        <S.TextBox
          type="text"
          value={searchKeyword}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          textColor={textColor}
          inputBackgroundColor={inputBackgroundColor}
        />

        <S.SearchIcon onClick={handleIconClick}>
          <SearchIcon color={textColor} width={15} height={15} />
        </S.SearchIcon>
      </S.SearchBox>
    </S.SearchWrapper>
  );
};

export default Search;
