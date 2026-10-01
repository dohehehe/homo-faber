'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import StoreList from '@/components/store/StoreList';
import { useStores, useStoreFilters } from '@/hooks/useStores';
import { getStoreTypes } from '@/utils/api/stores-api';
import { convertIndustryNameToKorean } from '@/utils/converters';
import * as S from '@/styles/store/storeContainer.style';
import * as ListS from '@/styles/store/storeList.style';

function StoreContainer() {
  const pathname = usePathname();
  const { stores, isLoading, isLoadingMore, error, hasMore, loadMore, loadAll } = useStores();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState({
    industry: [],
    capacity: [],
    material: [],
    category: [],
  });
  const [sortBy, setSortBy] = useState('labelAsc');
  const [allTags, setAllTags] = useState({
    industry: [],
    capacity: [],
    material: [],
    category: [],
  });

  const filteredStores = useStoreFilters(stores, searchKeyword, selectedTags, sortBy);
  const chromeRef = useRef(null);
  const hasDetail = pathname?.startsWith('/store/') && pathname !== '/store';

  useEffect(() => {
    const el = chromeRef.current;
    if (!el) return undefined;

    const updateChrome = () => {
      const bottom = `${Math.round(el.getBoundingClientRect().bottom)}px`;
      document.documentElement.style.setProperty('--store-chrome-bottom', bottom);
    };

    updateChrome();
    const observer = new ResizeObserver(updateChrome);
    observer.observe(el);
    window.addEventListener('resize', updateChrome);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateChrome);
    };
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const types = await getStoreTypes();
        setAllTags({
          industry: types.industryTypes?.map((t) => t.name) || [],
          capacity: types.capacityTypes?.map((t) => t.name) || [],
          material: types.materialTypes?.map((t) => t.name) || [],
          category: types.categoryTypes?.map((t) => t.name) || [],
        });
      } catch (err) {
        console.error('태그 목록 가져오기 실패:', err);
      }
    };
    fetchTags();
  }, []);

  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleIndustryChange = (event) => {
    const value = event.target.value;
    setSelectedTags((prev) => ({
      ...prev,
      industry: value ? [value] : [],
    }));
  };

  const handleTagClick = (tagType, tagName) => {
    setSelectedTags((prev) => {
      const current = prev[tagType];
      const next = current.includes(tagName)
        ? current.filter((tag) => tag !== tagName)
        : [...current, tagName];
      return { ...prev, [tagType]: next };
    });
  };

  const clearMaterialTags = () => {
    setSelectedTags((prev) => ({
      ...prev,
      material: [],
    }));
  };

  const clearCategoryTags = () => {
    setSelectedTags((prev) => ({
      ...prev,
      category: [],
    }));
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const isLabelSort = sortBy === 'labelAsc' || sortBy === 'labelDesc' || sortBy === 'recommended';
  const isNameSort = sortBy === 'nameAsc' || sortBy === 'nameDesc';
  const isReviewSort = sortBy === 'reviews';

  const handleLabelSort = () => {
    setSortBy(sortBy === 'labelAsc' || sortBy === 'recommended' ? 'labelDesc' : 'labelAsc');
  };

  const handleNameSort = () => {
    setSortBy(sortBy === 'nameAsc' ? 'nameDesc' : 'nameAsc');
  };

  const handleReviewSort = () => {
    setSortBy(sortBy === 'reviews' ? 'labelAsc' : 'reviews');
  };

  const needsFullCatalog =
    searchKeyword.trim().length > 0 ||
    selectedTags.industry.length > 0 ||
    selectedTags.capacity.length > 0 ||
    selectedTags.material.length > 0 ||
    selectedTags.category.length > 0;

  useEffect(() => {
    if (!needsFullCatalog) return;
    loadAll();
  }, [needsFullCatalog, loadAll]);

  const shouldUseInfiniteScroll = !needsFullCatalog;
  const catalogPending = needsFullCatalog && hasMore && !error;

  return (
    <S.StoreWrapper hasDetail={hasDetail}>
      <S.StoreChrome ref={chromeRef}>
      <S.StoreToolbar>
        <S.SearchRow>
        <S.SearchField>
          <S.SearchLabel>검색</S.SearchLabel>
          <S.SearchInput
            type="search"
            value={searchKeyword}
            onChange={handleSearch}
            placeholder="Type to search..."
          />
        </S.SearchField>

        <S.FieldSelect>
          <S.SearchLabel>분야</S.SearchLabel>
          <S.IndustrySelect
            value={selectedTags.industry[0] || ''}
            onChange={handleIndustryChange}
          >
            <option value="">전체</option>
            {allTags.industry.map((tag) => (
              <option key={tag} value={tag}>
                {convertIndustryNameToKorean(tag)}
              </option>
            ))}
          </S.IndustrySelect>
          <S.SelectChevron src="/img/icons/icon-chevron-down.svg" alt="" />
        </S.FieldSelect>
        </S.SearchRow>

        <S.TagPanel>
          <S.TagRow>
            <S.TagItems>
              <S.TagLegend>제품개발/부품제조:</S.TagLegend>
              {allTags.category.map((tag) => (
                <S.Tag
                  key={tag}
                  type="button"
                  active={selectedTags.category.includes(tag)}
                  onClick={() => handleTagClick('category', tag)}
                >
                  {tag}
                </S.Tag>
              ))}
            </S.TagItems>
            {selectedTags.category.length > 0 && (
              <S.TagClearButton
                type="button"
                aria-label="제품개발/부품제조 필터 초기화"
                onClick={clearCategoryTags}
              >
                <svg viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </S.TagClearButton>
            )}
          </S.TagRow>
          <S.TagRow>
            <S.TagItems>
              <S.TagLegend>공정:</S.TagLegend>
              {allTags.material.map((tag) => (
                <S.Tag
                  key={tag}
                  type="button"
                  active={selectedTags.material.includes(tag)}
                  onClick={() => handleTagClick('material', tag)}
                >
                  {tag}
                </S.Tag>
              ))}
            </S.TagItems>
            {selectedTags.material.length > 0 && (
              <S.TagClearButton
                type="button"
                aria-label="공정 필터 초기화"
                onClick={clearMaterialTags}
              >
                <svg viewBox="0 0 11 11" fill="none" aria-hidden="true">
                  <path d="M1.5 1.5l8 8M9.5 1.5l-8 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </S.TagClearButton>
            )}
          </S.TagRow>
        </S.TagPanel>
      </S.StoreToolbar>
      <ListS.ListLabelBar>
        <ListS.ListLabel $active={isLabelSort}>
          <ListS.SortButton type="button" onClick={handleLabelSort}>
            라벨
            <ListS.SortIcon
              src="/img/icons/icon-sort.svg"
              alt=""
              $asc={sortBy !== 'labelDesc'}
              $active={isLabelSort}
            />
          </ListS.SortButton>
        </ListS.ListLabel>
        <ListS.ListLabel $active={isNameSort}>
          <ListS.SortButton type="button" onClick={handleNameSort}>
            이름
            <ListS.SortIcon
              src="/img/icons/icon-sort.svg"
              alt=""
              $asc={sortBy !== 'nameDesc'}
              $active={isNameSort}
            />
          </ListS.SortButton>
        </ListS.ListLabel>
        <ListS.ListLabel>분야</ListS.ListLabel>
        <ListS.ListLabel>공정</ListS.ListLabel>
        <ListS.ListLabel $active={isReviewSort}>
          <ListS.SortButton type="button" onClick={handleReviewSort}>
            후기
            {isReviewSort && (
              <ListS.SortIcon
                src="/img/icons/icon-sort.svg"
                alt=""
                $asc
              />
            )}
          </ListS.SortButton>
        </ListS.ListLabel>
      </ListS.ListLabelBar>
      </S.StoreChrome>

      <StoreList
        stores={filteredStores}
        isLoading={isLoading || catalogPending}
        isLoadingMore={isLoadingMore}
        error={error}
        hasMore={shouldUseInfiniteScroll ? hasMore : false}
        onLoadMore={shouldUseInfiniteScroll ? loadMore : undefined}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
    </S.StoreWrapper>
  );
}

export default StoreContainer;
