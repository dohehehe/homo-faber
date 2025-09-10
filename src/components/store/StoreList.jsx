'use client';

import { useRouter } from 'next/navigation';
import { convertIndustryNameToKorean } from '@/utils/converters';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import * as S from '@/styles/store/storeList.style';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

const StoreList = ({ stores, isLoading, error }) => {
  const router = useRouter();
  const { user } = useAuth();
  const { toggleBookmark, isStoreBookmarked, loading } = useBookmarks();
  const { isMobile, isReady } = useWindowSize();

  const handleStoreClick = (storeId) => {
    router.push(`/store/${storeId}`);
  };

  const handleBookmarkClick = (e, storeId) => {
    e.stopPropagation(); // 스토어 클릭 이벤트 전파 방지
    if (user) {
      toggleBookmark(storeId);
    }
  };

  return (
    <S.TableWrapper>
      <S.StoreTable>
        <S.TableHeader>
          <tr style={{ display: 'flex' }}>
            {user && <S.TableHeaderCellBookmark></S.TableHeaderCellBookmark>}
            <S.TableHeaderCell style={{ width: isReady && isMobile ? '120px' : '200px' }}>이름</S.TableHeaderCell>
            <S.TableHeaderCell style={{ width: isReady && isMobile ? '300px' : '572px' }}>취급 품목</S.TableHeaderCell>
            {isReady && !isMobile && (
              <>
                <S.TableHeaderCell style={{ width: '148px' }}>연락처</S.TableHeaderCell>
                <S.TableHeaderCell>주소</S.TableHeaderCell>
              </>)}
          </tr>
        </S.TableHeader>

        <S.TableBody>
          {isLoading ? (
            <tr>
              <td colSpan={user ? (isReady && isMobile ? 3 : 5) : (isReady && isMobile ? 2 : 4)}>
                <Loader baseColor="var(--yellow)" style={{ marginTop: '5px' }} />
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan={user ? (isReady && isMobile ? 3 : 5) : (isReady && isMobile ? 2 : 4)}>
                <Error />
              </td>
            </tr>
          ) : (
            stores.map((store) => (
              <S.TableRow key={store.id} onClick={() => handleStoreClick(store.id)}>
                {user && (
                  <S.BookmarkCell>
                    <S.BookmarkButton
                      onClick={(e) => handleBookmarkClick(e, store.id)}
                      disabled={loading}
                      title={isStoreBookmarked(store.id) ? '북마크 제거' : '북마크 추가'}
                    >
                      <S.BookmarkIcon isBookmarked={isStoreBookmarked(store.id)}>
                        {isStoreBookmarked(store.id) ? '★' : null}
                      </S.BookmarkIcon>
                    </S.BookmarkButton>
                  </S.BookmarkCell>
                )}

                <S.TitleCell>
                  <S.Name>{store.name}</S.Name>
                  {isReady && !isMobile && (
                    store.store_industry?.length > 0 && (
                      <S.Industry>
                        {store.store_industry
                          .map(item => item.industry_types?.name)
                          .filter(Boolean)
                          .map(convertIndustryNameToKorean)
                          .join(' • ')}
                      </S.Industry>
                    )
                  )}
                  <S.Line></S.Line>
                </S.TitleCell>

                <S.KeywordCell>
                  {Array.isArray(store.keyword) && store.keyword.length > 0
                    ? <>{store.keyword.join(', ')}</>
                    : <S.Line style={{ marginLeft: '-9px' }}></S.Line>}
                </S.KeywordCell>

                {isReady && !isMobile && (
                  <>
                    <S.ContactCell>
                      {store.store_contacts?.[0]?.phone || <S.Line style={{ marginLeft: '-14px', marginRight: '-4px' }}></S.Line>}
                    </S.ContactCell>

                    <S.TableCell style={{ paddingLeft: '19px' }}>{store.address}</S.TableCell></>
                )}
              </S.TableRow>
            ))
          )}
        </S.TableBody>
      </S.StoreTable>
    </S.TableWrapper>
  );
};

export default StoreList;
