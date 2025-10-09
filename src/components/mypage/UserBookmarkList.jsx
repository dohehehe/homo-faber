'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { convertIndustryNameToKorean } from '@/utils/converters';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import * as S2 from '@/styles/user/mypageContainer.style';
import * as S from '@/styles/user/userBookmarkList.style';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function UserBookmarkList() {
  const { bookmarks, loading: bookmarksLoading } = useBookmarks();
  const { isMobile, isReady } = useWindowSize();
  const router = useRouter();

  const handleBookmarkClick = (storeId) => {
    // 북마크된 가게 상세 페이지로 이동
    router.push(`/store/${storeId}`);
  };

  return (
    <S2.TableSection>
      <S2.TableWrapper>
        <S2.Table>
          <S2.TableHeader>
            <tr style={{ display: 'flex' }}>
              <S.BookmarkTableHeaderCell style={{ width: isReady && isMobile ? '120px' : '200px' }}>이름</S.BookmarkTableHeaderCell>
              <S.BookmarkTableHeaderCell style={{ width: isReady && isMobile ? '300px' : '572px' }}>취급 품목</S.BookmarkTableHeaderCell>
              {isReady && !isMobile && (
                <>
                  <S.BookmarkTableHeaderCell style={{ width: '148px' }}>연락처</S.BookmarkTableHeaderCell>
                  <S.BookmarkTableHeaderCell>주소</S.BookmarkTableHeaderCell>
                </>
              )}
            </tr>
          </S2.TableHeader>

          <S.BookmarkTableBody>
            {bookmarksLoading ? (
              <tr>
                <td colSpan={isReady && isMobile ? 2 : 4}>
                  <Loader baseColor="rgb(255, 255, 255)" style={{ marginTop: '5px' }} />
                </td>
              </tr>
            ) : bookmarks.length > 0 ? (
              bookmarks.map((bookmark) => {
                const store = bookmark.stores;
                if (!store) return null;

                return (
                  <S.BookmarkTableRow key={bookmark.id} onClick={() => handleBookmarkClick(store.id)}>
                    <S.BookmarkTitleCell>
                      <S.BookmarkName>{store.name}</S.BookmarkName>
                      {isReady && !isMobile && (
                        store.store_industry?.length > 0 && (
                          <S.BookmarkIndustry>
                            {store.store_industry
                              .map(item => item.industry_types?.name)
                              .filter(Boolean)
                              .map(convertIndustryNameToKorean)
                              .join(' • ')}
                          </S.BookmarkIndustry>
                        )
                      )}
                      <S.BookmarkLine></S.BookmarkLine>
                    </S.BookmarkTitleCell>

                    <S.BookmarkKeywordCell>
                      {Array.isArray(store.keyword) && store.keyword.length > 0
                        ? <>{store.keyword.join(', ')}<S.BookmarkLine></S.BookmarkLine></>
                        : <S.BookmarkLine style={{ marginLeft: '-9px' }}></S.BookmarkLine>}
                    </S.BookmarkKeywordCell>

                    {isReady && !isMobile && (
                      <>
                        <S.BookmarkContactCell>
                          {store.store_contacts?.[0]?.phone || <S.BookmarkLine style={{ marginLeft: '-14px', marginRight: '-4px' }}></S.BookmarkLine>}
                        </S.BookmarkContactCell>

                        <S.BookmarkTableCell style={{ paddingLeft: '19px' }}>{store.address}</S.BookmarkTableCell>
                      </>
                    )}
                  </S.BookmarkTableRow>
                );
              })
            ) : (
              <tr>
                <td colSpan={isReady && isMobile ? 2 : 4}>
                  <S.NoBookmarks>
                    북마크한 가게가 없습니다<br />
                    <Link href="/store" style={{ paddingTop: '15px', display: 'block', fontWeight: '800' }}>
                      - 나에게 맞는 기술자 찾으러 가기 -
                    </Link>
                  </S.NoBookmarks>
                </td>
              </tr>
            )}
          </S.BookmarkTableBody>
        </S2.Table>
      </S2.TableWrapper>
    </S2.TableSection>
  );
}

export default UserBookmarkList;
