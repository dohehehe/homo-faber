'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
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
  // 색상  props
  backgroundColor = '#322F18',
  textColor = '#FFF8B8',
  inputBackgroundColor = '#363315',
  focusOutlineColor = '#FFF8B8'
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get('keyword') || '',
  );

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

  return (
    <S.SearchWrapper>

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
