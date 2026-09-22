'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import { convertIndustryNameToKorean } from '@/utils/converters';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import * as S from '@/styles/store/storeList.style';

const StoreList = ({ stores, isLoading, isLoadingMore, error, hasMore, onLoadMore, sortBy, onSortChange }) => {
  const sentinelRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth();
  const { toggleBookmark, isStoreBookmarked, loading } = useBookmarks();
  const [hoveredStoreId, setHoveredStoreId] = useState(null);

  const handleStoreClick = (storeId) => {
    router.push(`/store/${storeId}`);
  };

  const handleBookmarkClick = (e, storeId) => {
    e.stopPropagation();
    if (user) {
      toggleBookmark(storeId);
    }
  };

  useEffect(() => {
    const handleStoreHover = (event) => {
      setHoveredStoreId(event.detail.id);
    };
    const handleStoreLeave = () => {
      setHoveredStoreId(null);
    };
    window.addEventListener('storeHover', handleStoreHover);
    window.addEventListener('storeLeave', handleStoreLeave);
    return () => {
      window.removeEventListener('storeHover', handleStoreHover);
      window.removeEventListener('storeLeave', handleStoreLeave);
    };
  }, []);

  useEffect(() => {
    if (!onLoadMore || !hasMore || isLoading || isLoadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading && !isLoadingMore && onLoadMore) {
          onLoadMore();
        }
      },
      { root: null, rootMargin: '100px', threshold: 0.1 }
    );
    const sentinel = sentinelRef.current;
    if (sentinel) observer.observe(sentinel);
    return () => {
      if (sentinel) observer.unobserve(sentinel);
      observer.disconnect();
    };
  }, [hasMore, isLoading, isLoadingMore, onLoadMore]);

  return (
    <S.TableWrapper>
      <S.StoreTable>
        <S.TableHeader>
          <tr>
            {user && <S.TableHeaderCellBookmark />}
            <S.TableHeaderCell>라벨</S.TableHeaderCell>
            <S.TableHeaderCell>이름</S.TableHeaderCell>
            <S.TableHeaderCell>분야</S.TableHeaderCell>
            <S.TableHeaderCell>취급 품목</S.TableHeaderCell>
            <S.TableHeaderCell>후기</S.TableHeaderCell>
          </tr>
        </S.TableHeader>

        <S.TableBody>
          {isLoading ? (
            <S.StatusRow>
              <td colSpan={6}>
                <Loader baseColor="#efefef" style={{ marginTop: '5px' }} />
              </td>
            </S.StatusRow>
          ) : error ? (
            <S.StatusRow>
              <td colSpan={6}>
                <Error />
              </td>
            </S.StatusRow>
          ) : (
            stores.map((store, index) => {
              const industries = store.store_industry
                ?.map((item) => item.industry_types?.name)
                .filter(Boolean)
                .map(convertIndustryNameToKorean) || [];
              const keywords = Array.isArray(store.keyword) ? store.keyword : [];
              const reviewCount = Array.isArray(store.comments)
                ? (typeof store.comments[0]?.count === 'number'
                  ? store.comments[0].count
                  : store.comments.length)
                : (store.comment_count ?? 0);

              return (
                <S.TableRow
                  key={store.id}
                  onClick={() => handleStoreClick(store.id)}
                  isHovered={hoveredStoreId === store.id}
                >
                  {user && (
                    <S.BookmarkCell>
                      <S.BookmarkButton
                        onClick={(e) => handleBookmarkClick(e, store.id)}
                        disabled={loading}
                        title={isStoreBookmarked(store.id) ? '북마크 제거' : '북마크 추가'}
                      >
                        <S.BookmarkIcon isBookmarked={isStoreBookmarked(store.id)}>
                          {isStoreBookmarked(store.id) ? '★' : ''}
                        </S.BookmarkIcon>
                      </S.BookmarkButton>
                    </S.BookmarkCell>
                  )}
                  <S.LabelCell>{String(store.labelNumber || index + 1).padStart(2, '0')}</S.LabelCell>
                  <S.TitleCell>
                    <S.Name>{store.name}</S.Name>
                  </S.TitleCell>
                  <S.IndustryCell>
                    <S.Industry>
                      {industries.map((name) => (
                        <span key={name}>{name}</span>
                      ))}
                    </S.Industry>
                  </S.IndustryCell>
                  <S.KeywordCell>{keywords.join(', ')}</S.KeywordCell>
                  <S.ContactCell>{reviewCount}</S.ContactCell>
                </S.TableRow>
              );
            })
          )}
          {isLoadingMore && (
            <S.StatusRow>
              <td colSpan={6}>
                <Loader baseColor="#efefef" style={{ marginTop: '5px' }} />
              </td>
            </S.StatusRow>
          )}
          {hasMore && !isLoading && !isLoadingMore && (
            <S.StatusRow>
              <td colSpan={6}>
                <div ref={sentinelRef} style={{ height: '1px' }} />
              </td>
            </S.StatusRow>
          )}
        </S.TableBody>
      </S.StoreTable>
    </S.TableWrapper>
  );
};

export default StoreList;
