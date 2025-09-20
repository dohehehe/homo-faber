'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Search from '@/components/common/Search';
import StoreFilters from '@/components/store/StoreFilters';
import StoreList from '@/components/store/StoreList';
import { useStores, useStoreFilters, extractAllTags } from '@/hooks/useStores';
import * as S from '@/styles/store/storeContainer.style';

function StoreContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const { stores, isLoading, error } = useStores();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isExiting, setIsExiting] = useState(false);

  // pathname 변경 시 언마운트 상태 설정
  useEffect(() => {
    // 홈(/)이나 /store가 아닌 다른 페이지로 이동할 때만 애니메이션 실행
    if (pathname !== '/' && !pathname.startsWith('/store')) {
      setIsExiting(true);
    }
  }, [pathname]);

  // 태그 필터링을 위한 상태
  const [selectedTags, setSelectedTags] = useState({
    industry: [],
    capacity: [],
    material: [],
  });

  // 정렬 방식을 위한 상태
  const [sortBy, setSortBy] = useState('recommended');

  // 필터 표시/숨김을 위한 상태
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 모든 가능한 태그 목록
  const [allTags, setAllTags] = useState({
    industry: [],
    capacity: [],
    material: [],
  });

  // 필터링된 스토어 목록
  const filteredStores = useStoreFilters(stores, searchKeyword, selectedTags, sortBy);

  // 모든 가능한 태그 목록 업데이트
  useEffect(() => {
    if (stores.length > 0) {
      const tags = extractAllTags(stores);
      setAllTags(tags);
    }
  }, [stores]);

  // 검색 키워드 처리
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  // 태그 클릭 처리
  const handleTagClick = (tagType, tagName) => {
    setSelectedTags((prev) => {
      const newTags = { ...prev };

      // 이미 선택된 태그인 경우 제거, 아니면 추가
      if (newTags[tagType].includes(tagName)) {
        newTags[tagType] = newTags[tagType].filter((tag) => tag !== tagName);
      } else {
        newTags[tagType] = [...newTags[tagType], tagName];
      }

      return newTags;
    });
  };

  // 정렬 방식 변경 처리
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  // 필터 토글 처리
  const handleFilterToggle = () => {
    setIsFilterOpen((prev) => !prev);
  };

  // 활성화된 필터가 있는지 확인
  const hasActiveFilters = () => {
    return (
      selectedTags.industry.length > 0 ||
      selectedTags.capacity.length > 0 ||
      selectedTags.material.length > 0
    );
  };

  // 모든 필터 초기화
  const handleResetFilters = () => {
    setSelectedTags({
      industry: [],
      capacity: [],
      material: [],
    });
  };

  const handleStoreWrapperClick = () => {
    if (pathname === '/') {
      router.push('/store');
    } else if (pathname.startsWith('/store/')) {
      router.push('/store');
    }
  };

  return (
    <S.StoreWrapper
      onClick={handleStoreWrapperClick}
      pathname={pathname}
    >
      <S.StorePageName>업체 목록</S.StorePageName>
      <Search onSearch={handleSearch} showClear={true} isExiting={isExiting} />

      <S.StoreFilterWrapper isFilterOpen={isFilterOpen}>
        <S.StoreFilterBtn onClick={handleFilterToggle}>
          {isFilterOpen ? '필터링 닫기' : '필터링 열기'}
          {hasActiveFilters() && ' [사용중]'}
        </S.StoreFilterBtn>
        {hasActiveFilters() && (
          <S.ResetFilterBtn onClick={handleResetFilters}>
            / 초기화 하기
          </S.ResetFilterBtn>
        )}

        {isFilterOpen && (
          <StoreFilters
            allTags={allTags}
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        )}
      </S.StoreFilterWrapper>

      <StoreList stores={filteredStores} isLoading={isLoading} error={error} />
    </S.StoreWrapper>
  );
}

export default StoreContainer; 
