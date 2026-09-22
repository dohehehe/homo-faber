'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { useStoreDetail } from '@/hooks/useStores';
import { getStoreTypes } from '@/utils/api/stores-api';
import { getInterviews } from '@/utils/api/interview-api';
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
import ImageModal from '@/components/common/ImageModal';

function StoreDetailContainer({ }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();
  // 패널 상태: 'hidden' | 'expanded' | 'collapsed'
  const [panelState, setPanelState] = useState('hidden');
  const prevStoreIdRef = useRef(null); // 이전 storeId 추적
  const [capacityTypes, setCapacityTypes] = useState([]);
  const [industryTypes, setIndustryTypes] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storeId = pathname.startsWith('/store/') && pathname !== '/store' ? pathname.split('/')[2] : null;

  const { user } = useAuth();
  const { toggleBookmark, isStoreBookmarked, loading } = useBookmarks();
  const { store, isLoading, error } = useStoreDetail(storeId);

  // 이미지 클릭 핸들러
  const handleImageClick = (imageUrl, imageName) => {
    setSelectedImage({ publicUrl: imageUrl, name: imageName });
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

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
        const interviewData = await getInterviews(storeId);
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

  // 분기점 1: storeId가 나타날 때 (마운트) - expanded 상태로 시작
  useEffect(() => {
    if (storeId && isReady) {
      // 새로운 storeId로 변경되었을 때만 expanded로 설정
      if (prevStoreIdRef.current !== storeId) {
        setPanelState('expanded');
        prevStoreIdRef.current = storeId;
        // StoreContainer도 expanded 되도록 이벤트 발생
        window.dispatchEvent(new CustomEvent('expandPanel', { detail: { route: 'store' } }));
      }
    } else if (!storeId) {
      setPanelState('hidden');
      prevStoreIdRef.current = null;
    }
  }, [storeId, isReady]);

  // 분기점 2: 지도 클릭 시 - collapsed 상태로 변경
  useEffect(() => {
    if (!storeId) return;

    const handleCollapsePanel = () => {
      if (panelState === 'expanded') {
        setPanelState('collapsed');
      }
    };

    window.addEventListener('collapsePanel', handleCollapsePanel);
    return () => {
      window.removeEventListener('collapsePanel', handleCollapsePanel);
    };
  }, [storeId, panelState]);

  // 분기점 3: 패널 클릭 시 - expanded 상태로 변경
  const handlePanelClick = (e) => {
    const target = e.target;
    const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], [onClick], img');

    if (!isInteractive) {
      e.stopPropagation();
      if (panelState === 'collapsed') {
        setPanelState('expanded');
        window.dispatchEvent(new CustomEvent('expandPanel', { detail: { route: 'store' } }));
      }
    }
  };

  const animateValue = useMemo(() => {
    if (panelState === 'hidden') {
      return isMobile ? { y: '100dvh' } : { x: '100%' };
    }
    if (panelState === 'expanded') {
      return isMobile ? { y: 0 } : { x: 0 };
    }
    return isMobile ? { y: 0 } : { x: 0 };
  }, [panelState, isMobile]);

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
    <>
      <AnimatePresence>
        {storeId && isReady && (
          <S.DetailWrapper
            key={storeId}
            isMobile={isMobile}
            initial={isMobile ? { y: '100dvh' } : { x: '100%' }}
            animate={animateValue}
            exit={isMobile ? { y: '100dvh' } : { x: '100%' }}
            transition={{ duration: 0.35, ease: [0.2, 0, 0.4, 1] }}
            onClick={handlePanelClick}
          >
            <>
              <S.DetailHeader>
                <S.StoreName>
                  <S.StoreNameTxt>{store?.name || '업체 상세'}</S.StoreNameTxt>
                  {user && store && (
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
                <S.CloseButton type="button" aria-label="닫기" onClick={() => router.push('/store')}>
                  <img src="/img/icons/icon-minus.svg" alt="" />
                </S.CloseButton>
              </S.DetailHeader>


              {error ? (
                <Error />
              ) : isLoading ? (
                <Loader baseColor="#F7F7F7" style={{ marginTop: isMobile ? '0px' : '-3px', transform: isMobile ? 'none' : 'rotate(90deg)', transformOrigin: isMobile ? 'none' : 'top left', position: "relative", zIndex: "-10" }} />
              ) : !store ? (
                <Error style={{ marginTop: isMobile ? '40px' : '4px' }} message="업체를 찾을 수 없습니다." />
              ) : (
                <S.StoreDetailCard>
                  <S.StoreDetailSection>
                    <S.InfoGroup>
                    <S.InfoBlock>
                      <S.SectionLabel>제조 서비스</S.SectionLabel>
                      {store.keyword?.length > 0 && (
                        <S.StoreTagList>
                          {store.keyword.map((tag) => (
                            <S.StoreTag key={tag}>{tag}</S.StoreTag>
                          ))}
                        </S.StoreTagList>
                      )}
                    </S.InfoBlock>

                    <S.InfoBlock>
                      <S.SectionLabel>가게 정보</S.SectionLabel>
                      {store.address && (
                      <S.StoreAdress>
                        <a
                          href={`https://map.naver.com/v5/search/${encodeURIComponent(store.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
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
                      {(() => {
                        const contacts = [
                          { key: 'phone', label: 'Phone.', value: store.store_contacts[0]?.phone },
                          { key: 'fax', label: 'Fax.', value: store.store_contacts[0]?.fax },
                          { key: 'email', label: 'Mail.', value: store.store_contacts[0]?.email },
                          { key: 'website', label: 'Website.', value: store.store_contacts[0]?.website },
                        ].filter((contact) => contact.value);
                        const hiddenKeys = ['phone', 'fax', 'email'];
                        const lockedContacts = !user
                          ? contacts.filter((contact) => hiddenKeys.includes(contact.key))
                          : [];
                        const openContacts = !user
                          ? contacts.filter((contact) => !hiddenKeys.includes(contact.key))
                          : contacts;

                        const renderContact = (contact) => {
                          let content = contact.value;
                          if (contact.key === 'phone' || contact.key === 'fax') {
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
                        };

                        return (
                          <>
                            {lockedContacts.length > 0 && (
                              <S.LockedContactGroup
                                type="button"
                                onClick={() => window.dispatchEvent(new Event('openLogin'))}
                              >
                                {lockedContacts.map((contact) => (
                                  <S.StoreContact key={contact.key}>
                                    <S.StoreContactTxt>{contact.label}</S.StoreContactTxt>
                                    <S.StoreContactContent>로그인 후 확인 가능</S.StoreContactContent>
                                  </S.StoreContact>
                                ))}
                              </S.LockedContactGroup>
                            )}
                            {openContacts.map(renderContact)}
                          </>
                        );
                      })()}
                      {!user && (
                        <S.SignupHint>
                          업체 문의는 <a href="/signup">회원가입</a> 후 가능합니다.
                        </S.SignupHint>
                      )}
                    </S.StoreContactList>
                    </S.InfoBlock>
                    </S.InfoGroup>

                    {interviews.length > 0 && (
                      <S.InterviewButton
                        onClick={() => router.push(`/interview/${interviews[0].id}`)}
                      >
                        <S.InterviewLabel>{store?.person} 기술자 인터뷰</S.InterviewLabel>
                        <S.InterviewArrow>
                          <img src="/img/icons/icon-chevron-right.svg" alt="" />
                        </S.InterviewArrow>
                      </S.InterviewButton>
                    )}

                    <S.StoreImgSection>
                      {store.card_img && (
                        <S.StoreCardImg
                          src={`${store.card_img}`}
                          onClick={() => handleImageClick(store.card_img, '스토어 대표 이미지')}
                        />
                      )}
                      {store.store_gallery?.length > 0 &&
                        store.store_gallery
                          .map((tag) => tag?.image_url)
                          .map((imgURL, index) => (
                            <S.StoreImg
                              key={index}
                              src={`${imgURL}`}
                              onClick={() => handleImageClick(imgURL, `갤러리 이미지 ${index + 1}`)}
                            />
                          ))}
                    </S.StoreImgSection>

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
        )}
      </AnimatePresence>

      {/* 이미지 모달 - AnimatePresence 밖으로 이동 */}
      <ImageModal
        isOpen={isModalOpen}
        imageUrl={selectedImage?.publicUrl}
        imageName={selectedImage?.name}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default StoreDetailContainer; 