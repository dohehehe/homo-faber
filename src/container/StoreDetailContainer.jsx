'use client';

import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useStoreDetail } from '@/hooks/useStores';
import { getStoreTypes } from '@/utils/api/stores-api';
import { getInterviewsByStore } from '@/utils/supabase/interview';
import { getCommentsByStore } from '@/utils/api/comments-api';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import * as S from '@/styles/store/storeDetailContainer.style';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import * as S2 from '@/styles/store/storeComment.style';
import StoreComment from '@/components/store/StoreComment';
import StoreCommentForm from '@/components/store/StoreCommentForm';

function StoreDetailContainer({ }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();
  const [right, setRight] = useState('-100dvw');
  const [bottom, setBottom] = useState('-100dvh');
  const [capacityTypes, setCapacityTypes] = useState([]);
  const [industryTypes, setIndustryTypes] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [comments, setComments] = useState([]);
  const storeId = pathname.startsWith('/store/') && pathname !== '/store' ? pathname.split('/')[2] : null;

  const { user } = useAuth();
  const { toggleBookmark, isStoreBookmarked, loading } = useBookmarks();
  const { store, isLoading, error } = useStoreDetail(storeId);

  // capacity와 industry 타입들을 가져오는 useEffect
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const typesData = await getStoreTypes();
        setCapacityTypes(typesData.capacityTypes);
        setIndustryTypes(typesData.industryTypes);
      } catch (error) {
        console.error('Types 가져오기 실패:', error);
      }
    };
    fetchTypes();
  }, []);

  // store와 연결된 interview들을 가져오는 useEffect
  useEffect(() => {
    const fetchInterviews = async () => {
      if (!storeId) return;
      try {
        const interviewData = await getInterviewsByStore(storeId);
        setInterviews(interviewData);
      } catch (error) {
        console.error('Interviews 가져오기 실패:', error);
      }
    };
    fetchInterviews();
  }, [storeId]);

  // store와 연결된 comments들을 가져오는 useEffect
  useEffect(() => {
    const fetchComments = async () => {
      if (!storeId) return;
      try {
        const commentsData = await getCommentsByStore(storeId);
        setComments(commentsData);
      } catch (error) {
        console.error('Comments 가져오기 실패:', error);
      }
    };
    fetchComments();
  }, [storeId]);

  // pathname 변경 시 위치 업데이트
  useLayoutEffect(() => {
    // isReady가 false면 아직 초기값이 설정되지 않았으므로 실행하지 않음
    if (!isReady) return;

    if (isMobile) {
      const newBottom = getMobileBottomPosition(pathname);
      setBottom(newBottom);
    } else {
      const newRight = getDesktopRightPosition(pathname);
      setRight(newRight);
    }
  }, [pathname, isMobile, isReady]);

  // 모바일에서 사용할 bottom 위치를 계산하는 함수
  const getMobileBottomPosition = (pathname) => {
    if (pathname.startsWith('/store/') && pathname !== '/store') {
      return '0px';
    } else {
      return '-100dvh';
    }
  };

  // 데스크톱에서 사용할 right 위치를 계산하는 함수
  const getDesktopRightPosition = (pathname) => {
    if (pathname.startsWith('/store/') && pathname !== '/store') {
      return '0px';
    } else {
      return '-100dvw';
    }
  };

  const handleBookmarkClick = () => {
    if (user && storeId) {
      toggleBookmark(storeId);
    }
  };


  // 댓글 추가 핸들러
  const handleCommentAdded = (newComment) => {
    setComments(prev => [newComment, ...prev]);
  };

  // 댓글 수정 핸들러
  const handleCommentUpdate = (commentId, updatedData) => {
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId ? { ...comment, ...updatedData } : comment
      )
    );
  };

  // 댓글 삭제 핸들러
  const handleCommentDelete = (commentId) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  return (
    <AnimatePresence mode="wait">
      {storeId && (
        <S.DetailWrapper
          key={storeId}
          right={right}
          bottom={bottom}
          isMobile={isMobile}
          initial={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          animate={isMobile ? { bottom: bottom } : { right: right }}
          exit={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >


          <>
            <S.DetailPageName>업체 상세</S.DetailPageName>
            {interviews.length > 0 && (
              <S.InterviewButton
                onClick={() => router.push(`/interview/${interviews[0].id}`)}
              >
                {store?.person} 기술자 인터뷰
              </S.InterviewButton>
            )}


            {error ? (
              <Error />
            ) : isLoading ? (
              <Loader baseColor="#F7F7F7" style={{ marginTop: isMobile ? '0px' : '-3px', transform: isMobile ? 'none' : 'rotate(90deg)', transformOrigin: isMobile ? 'none' : 'top left', position: "relative", zIndex: "-10" }} />
            ) : !store ? (
              <Error style={{ marginTop: isMobile ? '40px' : '4px' }} message="업체를 찾을 수 없습니다." />
            ) : (
              <S.StoreDetailCard>
                <S.StoreDetailSection>
                  <S.StoreName>
                    {store.name}
                    {/* 북마크 버튼 */}
                    {user && (
                      <S.BookmarkButton
                        onClick={handleBookmarkClick}
                        disabled={loading}
                        title={isStoreBookmarked(storeId) ? '북마크 제거' : '북마크 추가'}
                      >
                        <S.BookmarkIcon isBookmarked={isStoreBookmarked(storeId)}>
                          {isStoreBookmarked(storeId) ? '★' : '☆'}
                        </S.BookmarkIcon>
                      </S.BookmarkButton>
                    )}
                  </S.StoreName>
                  {store.address && (
                    <S.StoreAdress>
                      <a
                        href={`https://map.naver.com/v5/search/${encodeURIComponent(store.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: (store.move || store.close) ? 'line-through' : 'none',
                          color: (store.move || store.close) ? '#9999' : 'inherit',
                        }}
                      >
                        {store.address}
                      </a>
                    </S.StoreAdress>
                  )}
                  {store.move && store.move_address && (
                    <S.StoreAdress>
                      <a
                        href={`https://map.naver.com/v5/search/${encodeURIComponent(store.move_address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {store.move_address}
                      </a>
                    </S.StoreAdress>
                  )}

                  {/* {store.store_industry?.some(industry => industry.industry_types?.name) && (
                    <S.StoreIndustry>
                      {store.store_industry
                        .map(industry => industry.industry_types?.name)
                        .filter(Boolean)
                        .join(' • ')}
                    </S.StoreIndustry>
                  )} */}

                  <S.StoreTagList>
                    {store.keyword?.length > 0 && (
                      <S.StoreTag>
                        {store.keyword.join(', ')}
                      </S.StoreTag>
                    )}
                  </S.StoreTagList>

                  {store.store_capacity?.some(capacity => capacity.capacity_types?.name) && (
                    <S.StoreCapacity>
                      {store.store_capacity
                        .map(capacity => {
                          const capacityTypeId = capacity.capacity_types?.id;
                          if (capacityTypeId === '7346574b-f036-4be2-803b-7614a908b53c') {
                            return '- 개인 • 학생 작업 가능';
                          }
                        })
                      }
                    </S.StoreCapacity>
                  )}

                  {store.description && (
                    <S.StoreDescription>{store.description}</S.StoreDescription>
                  )}


                  <S.StoreContactList>
                    {store.store_contacts?.length > 0 &&
                      [
                        { key: 'phone', label: 'Phone.', value: store.store_contacts[0]?.phone },
                        { key: 'fax', label: 'Fax.', value: store.store_contacts[0]?.fax },
                        { key: 'email', label: 'Mail.', value: store.store_contacts[0]?.email },
                        { key: 'website', label: 'Website.', value: store.store_contacts[0]?.website }
                      ]
                        .filter(contact => contact.value)
                        .map(contact => {
                          let content = contact.value;

                          if (contact.key === 'phone' || 'fax') {
                            content = <a href={`tel:${contact.value}`}>{contact.value}</a>;
                          } else if (contact.key === 'email') {
                            content = <a href={`mailto:${contact.value}`}>{contact.value}</a>;
                          } else if (contact.key === 'website') {
                            const url = contact.value.startsWith('http') ? contact.value : `https://${contact.value}`;
                            content = <a href={url} target="_blank" rel="noopener noreferrer">{contact.value}</a>;
                          }

                          return (
                            <S.StoreContact key={contact.key}>
                              <S.StoreContactTxt>{contact.label}</S.StoreContactTxt>
                              <S.StoreContactContent>{content}</S.StoreContactContent>
                            </S.StoreContact>
                          );
                        })
                    }
                  </S.StoreContactList>


                  {/* 댓글 섹션 - 웹에서만 표시 */}
                  {!isMobile && (
                    <S2.CommentsSection>
                      <S2.CommentsTitle>후기 ({comments.length})</S2.CommentsTitle>

                      {/* 댓글 작성 폼 */}
                      <StoreCommentForm
                        storeId={storeId}
                        onCommentAdded={handleCommentAdded}
                      />

                      {/* 댓글 목록 */}
                      <S2.CommentsList>
                        {comments.length > 0 ? (
                          comments.map((comment) => (
                            <StoreComment
                              key={comment.id}
                              comment={comment}
                              onUpdate={handleCommentUpdate}
                              onDelete={handleCommentDelete}
                            />
                          ))
                        ) : (
                          <S2.NoComments>아직 후기가 없습니다.</S2.NoComments>
                        )}
                      </S2.CommentsList>
                    </S2.CommentsSection>
                  )}
                </S.StoreDetailSection>

                <S.StoreImgSection>
                  {store.card_img && (
                    <S.StoreCardImg src={`${store.card_img}`} />
                  )}

                  {store.store_gallery?.length > 0 && (
                    <S.StoreImgList>
                      {store.store_gallery
                        .map(tag => tag?.image_url)
                        .map((imgURL, index) => (
                          <S.StoreImg key={index} src={`${imgURL}`} />
                        ))}
                    </S.StoreImgList>
                  )}
                </S.StoreImgSection>
              </S.StoreDetailCard>
            )}

            {/* 댓글 섹션 - 모바일에서만 표시 */}
            {isMobile && (
              <S2.CommentsSection>
                <S2.CommentsTitle>후기 ({comments.length})</S2.CommentsTitle>

                {/* 댓글 작성 폼 */}
                <StoreCommentForm
                  storeId={storeId}
                  onCommentAdded={handleCommentAdded}
                />

                {/* 댓글 목록 */}
                <S2.CommentsList>
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <StoreComment
                        key={comment.id}
                        comment={comment}
                        onUpdate={handleCommentUpdate}
                        onDelete={handleCommentDelete}
                      />
                    ))
                  ) : (
                    <S2.NoComments>아직 후기가 없습니다.</S2.NoComments>
                  )}
                </S2.CommentsList>
              </S2.CommentsSection>
            )}
          </>
        </S.DetailWrapper>
      )
      }
    </AnimatePresence >
  );
}

export default StoreDetailContainer; 