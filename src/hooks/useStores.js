import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getStores, getStoreById } from '@/utils/api/stores-api';
import { storeMatchesCategory, storeMatchesProcess } from '@/config/storeCategories';

// 전역 캐시 객체
let storesCache = null;
let storesCacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

// 전역 캐시 객체 (스토어 ID별로 캐시)
const storeDetailCache = new Map();
const STORE_DETAIL_CACHE_DURATION = 10 * 60 * 1000; // 10분

// 지도용 캐시 (별도 관리)
let allStoresCache = null;
let allStoresCacheTimestamp = null;
const ALL_STORES_CACHE_DURATION = 5 * 60 * 1000; // 5분

/**
 * 스토어 목록을 가져오는 훅 (무한 스크롤링 지원)
 * @returns {Object} stores, isLoading, error, loadMore, hasMore, refetch, invalidateCache
 */
export function useStores() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const offsetRef = useRef(0);
  const INITIAL_LIMIT = 20;

  const fetchStores = useCallback(async (forceRefresh = false, append = false) => {
    // 첫 로드이고 캐시가 유효하고 강제 새로고침이 아닌 경우 캐시 사용
    if (!append && !forceRefresh && storesCache && storesCacheTimestamp &&
      storesCache[0]?.labelNumber &&
      (Date.now() - storesCacheTimestamp) < CACHE_DURATION) {
      setStores(storesCache);
      setIsLoading(false);
      setHasMore(storesCache.length >= INITIAL_LIMIT);
      offsetRef.current = storesCache.length;
      return;
    }

    try {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        offsetRef.current = 0;
      }
      setError(null);

      // 현재 offset 계산
      const currentOffset = append ? offsetRef.current : 0;
      const result = await getStores('', INITIAL_LIMIT, currentOffset);
      const storesArray = (Array.isArray(result.data) ? result.data : []).map((store, i) => ({
        ...store,
        labelNumber: currentOffset + i + 1,
      }));

      if (append) {
        setStores(prev => [...prev, ...storesArray]);
        offsetRef.current += storesArray.length;
      } else {
        setStores(storesArray);
        offsetRef.current = storesArray.length;
        // 캐시 업데이트 (첫 로드만)
        storesCache = storesArray;
        storesCacheTimestamp = Date.now();
      }

      setHasMore(result.pagination?.hasMore || false);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  // 더 많은 데이터 로드
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore && !isLoading) {
      fetchStores(false, true);
    }
  }, [isLoadingMore, hasMore, isLoading, fetchStores]);

  // 캐시 무효화 함수
  const invalidateCache = useCallback(() => {
    storesCache = null;
    storesCacheTimestamp = null;
  }, []);

  // 새로고침 함수
  const refetch = useCallback(() => {
    offsetRef.current = 0;
    setHasMore(true);
    fetchStores(true, false);
  }, [fetchStores]);

  return {
    stores,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    loadMore,
    refetch,
    invalidateCache
  };
}

/**
 * 스토어 상세 정보를 가져오는 훅
 * @param {string} storeId - 스토어 ID
 * @returns {Object} store, isLoading, error, refetch, invalidateCache
 */
export function useStoreDetail(storeId) {
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStore = useCallback(async (forceRefresh = false) => {
    if (!storeId) {
      setStore(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    // 캐시 확인
    const cached = storeDetailCache.get(storeId);
    if (!forceRefresh && cached &&
      (Date.now() - cached.timestamp) < STORE_DETAIL_CACHE_DURATION) {
      setStore(cached.data);
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await getStoreById(storeId);

      if (!data) {
        throw new Error('스토어를 찾을 수 없습니다.');
      }

      // 캐시 업데이트
      storeDetailCache.set(storeId, {
        data,
        timestamp: Date.now()
      });

      setStore(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchStore();
  }, [fetchStore]);

  // 캐시 무효화 함수
  const invalidateCache = useCallback(() => {
    if (storeId) {
      storeDetailCache.delete(storeId);
    }
  }, [storeId]);

  return {
    store,
    isLoading,
    error,
    refetch: () => fetchStore(true),
    invalidateCache
  };
}

/**
 * 모든 스토어를 가져오는 훅 (지도용 - 페이지네이션 없음)
 * @returns {Object} stores, isLoading, error, refetch
 */
export function useAllStores() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllStores = useCallback(async (forceRefresh = false) => {
    // 캐시가 유효하고 강제 새로고침이 아닌 경우 캐시 사용
    if (!forceRefresh && allStoresCache && allStoresCacheTimestamp &&
      (Date.now() - allStoresCacheTimestamp) < ALL_STORES_CACHE_DURATION) {
      setStores(allStoresCache);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // 모든 데이터를 가져오기 위해 큰 limit 사용
      // 서버에서 모든 데이터를 한 번에 반환하도록 요청
      const result = await getStores('', 10000, 0); // 충분히 큰 limit
      let storesArray = Array.isArray(result.data) ? result.data : [];

      // pagination이 있으면 모든 페이지를 가져오기
      if (result.pagination?.hasMore) {
        let offset = storesArray.length;
        let hasMore = result.pagination.hasMore;
        
        while (hasMore) {
          const nextResult = await getStores('', 10000, offset);
          const nextStores = Array.isArray(nextResult.data) ? nextResult.data : [];
          
          if (nextStores.length === 0) break;
          
          storesArray = [...storesArray, ...nextStores];
          offset += nextStores.length;
          hasMore = nextResult.pagination?.hasMore || false;
        }
      }

      // 캐시 업데이트
      allStoresCache = storesArray;
      allStoresCacheTimestamp = Date.now();

      setStores(storesArray);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllStores();
  }, [fetchAllStores]);

  const refetch = useCallback(() => {
    allStoresCache = null;
    allStoresCacheTimestamp = null;
    fetchAllStores(true);
  }, [fetchAllStores]);

  return {
    stores,
    isLoading,
    error,
    refetch
  };
}

/**
 * 스토어 목록을 가져오는 간단한 훅 (캐시 없음)
 * @returns {Object} stores, loading, error
 */
export function useStoreList() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getStores('', 20, 0);
        setStores(result.data || []);
      } catch (err) {
        console.error('Store 목록 가져오기 오류:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return { stores, loading, error };
}

function getReviewCount(store) {
  if (Array.isArray(store?.comments)) {
    return typeof store.comments[0]?.count === 'number'
      ? store.comments[0].count
      : store.comments.length;
  }
  return store?.comment_count ?? 0;
}

/**
 * 스토어 검색, 태그 필터링, 정렬 기능을 제공하는 훅
 * @param {Array} stores - 필터링할 스토어 목록
 * @param {string} searchKeyword - 검색 키워드
 * @param {Object} selectedTags - 선택된 태그들 {industry: [], capacity: [], material: []}
 * @param {string} sortBy - 정렬 방식 ('labelAsc', 'labelDesc', 'nameAsc', 'nameDesc', 'reviews')
 * @returns {Array} - 필터링 및 정렬된 스토어 목록
 */
export function useStoreFilters(
  stores,
  searchKeyword,
  selectedTags = null,
  sortBy = 'labelAsc',
) {
  return useMemo(() => {
    // 1. 검색어 필터링
    let filteredStores = stores;

    if (searchKeyword && searchKeyword.trim().length > 0) {
      const keyword = searchKeyword.toLowerCase().trim();
      filteredStores = filteredStores.filter(
        (store) =>
          store.name?.toLowerCase().includes(keyword) ||
          (Array.isArray(store.keyword) &&
            store.keyword.some((k) => k.toLowerCase().includes(keyword))),
      );
    }

    // 2. 태그 필터링 (selectedTags가 제공된 경우에만)
    if (selectedTags) {
      const { industry, capacity, material, category } = selectedTags;

      // 선택된 태그가 있는 경우에만 필터링
      const hasIndustryFilter = industry?.length > 0;
      const hasCapacityFilter = capacity?.length > 0;
      const hasMaterialFilter = material?.length > 0;
      const hasCategoryFilter = category?.length > 0;

      if (hasIndustryFilter || hasCapacityFilter || hasMaterialFilter || hasCategoryFilter) {
        filteredStores = filteredStores.filter((store) => {
          // 각 카테고리 내에서는 OR 조건, 카테고리 간에는 AND 조건
          const matchesIndustry =
            !hasIndustryFilter ||
            store.store_industry?.some(
              (item) =>
                item.industry_types?.name &&
                industry.includes(item.industry_types.name),
            );

          const matchesCapacity =
            !hasCapacityFilter ||
            store.store_capacity?.some(
              (item) =>
                item.capacity_types?.name &&
                capacity.includes(item.capacity_types.name),
            );

          const matchesMaterial =
            !hasMaterialFilter ||
            material.some((label) => storeMatchesProcess(store, label));

          const matchesCategory =
            !hasCategoryFilter ||
            category.some((label) => storeMatchesCategory(store, label));

          return matchesIndustry && matchesCapacity && matchesMaterial && matchesCategory;
        });
      }
    }

    // 3. 정렬
    const sortedStores = [...filteredStores];

    const byLabel = (direction) => {
      sortedStores.sort((a, b) => {
        const aNo = a.labelNumber;
        const bNo = b.labelNumber;
        if (aNo != null && bNo != null && aNo !== bNo) {
          return direction * (aNo - bNo);
        }
        const aTime = new Date(a.created_at).getTime() || 0;
        const bTime = new Date(b.created_at).getTime() || 0;
        if (aTime !== bTime) return direction * (aTime - bTime);
        return direction * String(a.id || '').localeCompare(String(b.id || ''));
      });
    };

    switch (sortBy) {
      case 'nameDesc':
        sortedStores.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          if (nameB < nameA) return -1;
          if (nameB > nameA) return 1;
          return 0;
        });
        break;

      case 'nameAsc':
        sortedStores.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        break;

      case 'labelDesc':
        byLabel(-1);
        break;

      case 'reviews':
        sortedStores.sort((a, b) => getReviewCount(b) - getReviewCount(a));
        break;

      case 'labelAsc':
      case 'recommended':
      default:
        byLabel(1);
        break;
    }

    return sortedStores;
  }, [stores, searchKeyword, selectedTags, sortBy]);
}

/**
 * 모든 스토어에서 태그를 추출하는 함수
 * @param {Array} stores - 스토어 목록
 * @returns {Object} - 추출된 태그들 {industry: [], capacity: [], material: []}
 */
export function extractAllTags(stores) {
  const allTags = {
    industry: new Set(),
    capacity: new Set(),
    material: new Set(),
  };

  stores.forEach(store => {
    // store_industry에서 industry 태그 추출
    if (store.store_industry) {
      store.store_industry.forEach(item => {
        if (item.industry_types?.name) {
          allTags.industry.add(item.industry_types.name);
        }
      });
    }

    // store_capacity에서 capacity 태그 추출
    if (store.store_capacity) {
      store.store_capacity.forEach(item => {
        if (item.capacity_types?.name) {
          allTags.capacity.add(item.capacity_types.name);
        }
      });
    }

    // store_material에서 material 태그 추출
    if (store.store_material) {
      store.store_material.forEach(item => {
        if (item.material_types?.name) {
          allTags.material.add(item.material_types.name);
        }
      });
    }
  });

  return {
    industry: Array.from(allTags.industry).sort(),
    capacity: Array.from(allTags.capacity).sort(),
    material: Array.from(allTags.material).sort(),
  };
}
