'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useBookmarks } from '@/hooks/useBookmarks';
import { convertIndustryNameToKorean } from '@/utils/converters';
import Loader from '@/components/common/Loader';
import useWindowSize from '@/hooks/useWindowSize';
import * as S from '@/styles/user/mypageContainer.style';
import Link from 'next/link';

function MypageContainer({ onLoadComplete }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { bookmarks, loading: bookmarksLoading } = useBookmarks();
  const { isMobile, isReady } = useWindowSize();


  // 마이페이지 패널 클릭 시 홈으로 이동
  const handleMypageWrapperClick = () => {
    if (pathname === '/') {
      router.push('/mypage');
    } else if (pathname.startsWith('/mypage/')) {
      router.push('/mypage');
    }
  };

  useEffect(() => {
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    }
  };

  const handleBookmarkClick = (storeId) => {
    router.push(`/store/${storeId}`);
  };

  if (loading) {
    return (
      <S.MyPageWrapper>
        <Loader text="로딩 중..." />
      </S.MyPageWrapper>
    );
  }

  if (!user) {
    return (
      <S.MyPageWrapper>
        <Loader text="인증 중..." />
      </S.MyPageWrapper>
    );
  }

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
  };

  return (
    <S.MyPageWrapper onClick={handleMypageWrapperClick}>
      <S.MyPageName>내정보</S.MyPageName>

      <S.ProfileCard onClick={(e) => e.stopPropagation()}>
        <S.UserName>
          {user.user_metadata?.name || '사용자'}
        </S.UserName>
        <S.UserEmail>{user.email}</S.UserEmail>

        {/* 프로필 수정 버튼 */}
        <S.ButtonWrapper>
          <S.Button onClick={() => router.push('/mypage/edit')}>
            회원 정보 수정
          </S.Button>

          <S.Button onClick={handleLogout}>
            로그아웃
          </S.Button>
        </S.ButtonWrapper>
      </S.ProfileCard>

      {/* 북마크된 가게 리스트 */}
      <S.BookmarkSection>
        <S.BookmarkTitle>북마크 목록</S.BookmarkTitle>
        <S.BookmarkTableWrapper>
          <S.BookmarkTable>
            <S.BookmarkTableHeader>
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
            </S.BookmarkTableHeader>

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
                    <S.NoBookmarks>북마크한 가게가 없습니다<br /><Link href="/store" style={{ paddingTop: '15px', display: 'block', fontWeight: '800' }}>- 나에게 맞는 기술자 찾으러 가기 -</Link></S.NoBookmarks>
                  </td>
                </tr>
              )}
            </S.BookmarkTableBody>
          </S.BookmarkTable>
        </S.BookmarkTableWrapper>
      </S.BookmarkSection>

    </S.MyPageWrapper>
  );
}

export default MypageContainer;