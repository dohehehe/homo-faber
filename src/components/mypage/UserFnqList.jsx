'use client';

import { useFnqs } from '@/hooks/useFnq';
import { useAuth } from '@/contexts/AuthContext';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import * as S from '@/styles/user/mypageContainer.style';
import Link from 'next/link';

function UserFnqList() {
  const { user } = useAuth();
  const { isMobile, isReady } = useWindowSize();
  const { fnqs, loading: fnqsLoading } = useFnqs('', user?.id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const handleFnqClick = (fnqId) => {
    // fnq 상세 페이지로 이동 (필요시 구현)
    console.log('fnq clicked:', fnqId);
  };

  return (
    <S.BookmarkSection>
      <S.BookmarkTableWrapper>
        <S.BookmarkTable>
          <S.BookmarkTableHeader>
            <tr style={{ display: 'flex' }}>
              <S.BookmarkTableHeaderCell style={{ width: isReady && isMobile ? '120px' : '200px' }}>제목</S.BookmarkTableHeaderCell>
              <S.BookmarkTableHeaderCell style={{ width: isReady && isMobile ? '300px' : '572px' }}>내용</S.BookmarkTableHeaderCell>
              {isReady && !isMobile && (
                <S.BookmarkTableHeaderCell style={{ width: '148px' }}>등록일</S.BookmarkTableHeaderCell>
              )}
            </tr>
          </S.BookmarkTableHeader>

          <S.BookmarkTableBody>
            {fnqsLoading ? (
              <tr>
                <td colSpan={isReady && isMobile ? 2 : 3}>
                  <Loader baseColor="rgb(255, 255, 255)" style={{ marginTop: '5px' }} />
                </td>
              </tr>
            ) : fnqs.length > 0 ? (
              fnqs.map((fnq) => (
                <S.BookmarkTableRow key={fnq.id} onClick={() => handleFnqClick(fnq.id)}>
                  <S.BookmarkTitleCell>
                    <S.BookmarkName>{fnq.title}</S.BookmarkName>
                    <S.BookmarkLine></S.BookmarkLine>
                  </S.BookmarkTitleCell>

                  <S.BookmarkKeywordCell>
                    {fnq.detail ? (
                      <>
                        {fnq.detail.length > 50
                          ? `${fnq.detail.substring(0, 50)}...`
                          : fnq.detail
                        }
                        <S.BookmarkLine></S.BookmarkLine>
                      </>
                    ) : (
                      <S.BookmarkLine style={{ marginLeft: '-9px' }}></S.BookmarkLine>
                    )}
                  </S.BookmarkKeywordCell>

                  {isReady && !isMobile && (
                    <S.BookmarkContactCell>
                      {fnq.created_at ? formatDate(fnq.created_at) : <S.BookmarkLine style={{ marginLeft: '-14px', marginRight: '-4px' }}></S.BookmarkLine>}
                    </S.BookmarkContactCell>
                  )}
                </S.BookmarkTableRow>
              ))
            ) : (
              <tr>
                <td colSpan={isReady && isMobile ? 2 : 3}>
                  <S.NoBookmarks>
                    등록한 문의가 없습니다<br />
                    <Link href="/fnq" style={{ paddingTop: '15px', display: 'block', fontWeight: '800' }}>
                      - 문의 등록하러 가기 -
                    </Link>
                  </S.NoBookmarks>
                </td>
              </tr>
            )}
          </S.BookmarkTableBody>
        </S.BookmarkTable>
      </S.BookmarkTableWrapper>
    </S.BookmarkSection>
  );
}

export default UserFnqList;
