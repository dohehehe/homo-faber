'use client';

import { useComments } from '@/hooks/useComments';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import * as S2 from '@/styles/user/mypageContainer.style';
import * as S from '@/styles/user/userCommentList.style';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function UserCommentList() {
  const { comments, loading: commentsLoading } = useComments();
  const { isMobile, isReady } = useWindowSize();
  const router = useRouter();

  const handleCommentClick = (storeId) => {
    // 댓글이 작성된 가게 상세 페이지로 이동
    router.push(`/store/${storeId}`);
  };

  return (
    <S2.TableSection>
      <S2.TableWrapper>
        <S2.Table>
          <S2.TableHeader>
            <tr style={{ display: 'flex' }}>
              <S.CommentTableHeaderCell style={{ width: isReady && isMobile ? '120px' : '160px' }}>가게명</S.CommentTableHeaderCell>
              <S.CommentTableHeaderCell style={{ width: isReady && isMobile ? '300px' : '600px' }}>후기 내용</S.CommentTableHeaderCell>
              {isReady && !isMobile && (
                <>
                  <S.CommentTableHeaderCell style={{ width: '148px' }}>작성일</S.CommentTableHeaderCell>
                </>
              )}
            </tr>
          </S2.TableHeader>

          <S.CommentTableBody>
            {commentsLoading ? (
              <tr>
                <td colSpan={isReady && isMobile ? 2 : 4}>
                  <Loader baseColor="rgb(244, 244, 244)" style={{ marginTop: '5px' }} />
                </td>
              </tr>
            ) : comments.length > 0 ? (
              comments.map((comment) => {
                if (!comment || !comment.stores) return null;

                return (
                  <S.CommentTableRow key={comment.id} onClick={() => handleCommentClick(comment.stores.id)}>
                    <S.CommentTitleCell>
                      <S.CommentStoreName>{comment.stores.name}</S.CommentStoreName>
                      <S.CommentLine></S.CommentLine>
                    </S.CommentTitleCell>

                    <S.CommentContentCell>
                      <S.CommentText>{comment.contents}</S.CommentText>
                      <S.CommentLine></S.CommentLine>
                    </S.CommentContentCell>

                    {isReady && !isMobile && (
                      <>
                        <S.CommentDateCell>
                          {new Date(comment.created_at).toLocaleDateString('ko-KR')}
                        </S.CommentDateCell>
                      </>
                    )}
                  </S.CommentTableRow>
                );
              })
            ) : (
              <tr>
                <td colSpan={isReady && isMobile ? 2 : 4}>
                  <S.NoComments>
                    작성한 후기가 없습니다<br />
                    <Link href="/store" style={{ paddingTop: '15px', display: 'block', fontWeight: '800' }}>
                      - 나에게 맞는 기술자 찾으러 가기 -
                    </Link>
                  </S.NoComments>
                </td>
              </tr>
            )}
          </S.CommentTableBody>
        </S2.Table>
      </S2.TableWrapper>
    </S2.TableSection>
  );
}

export default UserCommentList;
