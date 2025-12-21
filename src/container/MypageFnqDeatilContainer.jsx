'use client';

import { useState, useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useFnq } from '@/hooks/useFnq';
import { useCustomScrollbar } from '@/hooks/useCustomScrollbar';
import { AnimatePresence } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import * as S from '@/styles/fnq/fnqDeatilContainer.style';
import FnqStatus from '@/components/fnq/FnqStatus';
import EditorFnqRenderer from '@/components/fnq/EditorFnqRenderer';
import { deleteFnq } from '@/utils/api/fnq-api';
import Popup from '@/components/common/Popup';

function MypageFnqDeatilContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, isReady } = useWindowSize();
  const [right, setRight] = useState('-100dvw');
  const [bottom, setBottom] = useState('-100dvh');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fnqId = pathname.startsWith('/mypage/fnq/') && pathname !== '/mypage/fnq' ? pathname.split('/')[3] : null;
  const { fnq, isLoading, error, loading } = useFnq(fnqId);
  const { containerRef, scrollState, scrollToRatio } = useCustomScrollbar();

  // 상태 확인 (확인중이 아닌 경우 수정/삭제 비활성화)
  const isProcessing = fnq?.fnq_status?.status !== 'pending';
  const canEdit = !isProcessing;

  // 모바일에서 사용할 bottom 위치를 계산하는 함수
  const getMobileBottomPosition = (pathname) => {
    if (pathname.startsWith('/mypage/fnq/') && pathname !== '/mypage/fnq') {
      return '0px';
    } else {
      return '-100dvh';
    }
  };

  // 데스크톱에서 사용할 right 위치를 계산하는 함수
  const getDesktopRightPosition = (pathname) => {
    if (pathname.startsWith('/mypage/fnq/') && pathname !== '/mypage/fnq') {
      return '0px';
    } else {
      return '-100dvw';
    }
  };

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // 숫자 포맷팅 함수 (천 단위 구분자)
  const formatNumber = (value) => {
    if (!value) return '-';
    const numericValue = typeof value === 'number' ? value : parseInt(value);
    if (isNaN(numericValue)) return '-';
    return numericValue.toLocaleString('ko-KR') + ' 원';
  };

  // 삭제 확인 핸들러
  const handleDeleteClick = () => {
    if (!fnqId) return;

    // 처리중인 경우 팝업 표시
    if (isProcessing) {
      setShowProcessingPopup(true);
      return;
    }

    setShowDeleteConfirm(true);
  };

  // 실제 삭제 실행 핸들러
  const handleDeleteConfirm = async () => {
    if (!fnqId) return;

    try {
      setIsDeleting(true);
      setShowDeleteConfirm(false);
      await deleteFnq(fnqId);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error('삭제 오류:', error);
      setErrorMessage('삭제 중 오류가 발생했습니다');
      setShowErrorPopup(true);
    } finally {
      setIsDeleting(false);
    }
  };

  // 삭제 취소 핸들러
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  // 성공 팝업 닫기 핸들러
  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    router.push('/mypage');
  };

  // 오류 팝업 닫기 핸들러
  const handleErrorClose = () => {
    setShowErrorPopup(false);
    setErrorMessage('');
  };

  // 처리중 팝업 닫기 핸들러
  const handleProcessingClose = () => {
    setShowProcessingPopup(false);
  };

  // 수정 핸들러
  const handleEdit = () => {
    if (!fnqId) return;

    console.log('수정 버튼 클릭됨');
    console.log('isProcessing:', isProcessing);
    console.log('canEdit:', canEdit);

    // 처리중인 경우 팝업 표시
    if (isProcessing) {
      console.log('처리중 팝업 표시');
      setShowProcessingPopup(true);
      return;
    }

    console.log('수정 페이지로 이동');
    router.push(`/mypage/fnq/${fnqId}/edit`);
  };

  return (
    <AnimatePresence mode="wait">
      {fnqId && (
        <S.DetailWrapper
          key={`detail-${fnqId}-${pathname}`}
          right={right}
          bottom={bottom}
          isMobile={isMobile}
          initial={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          animate={isMobile ? { bottom: bottom } : { right: right }}
          exit={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}

        >
          <S.DetailPageName>문의 상세</S.DetailPageName>
          <S.ButtonWrapper>
            <S.Button onClick={handleEdit} disabled={isDeleting}>
              수정
            </S.Button>
            <S.Button onClick={handleDeleteClick} disabled={isDeleting}>
              {isDeleting ? '삭제 중...' : '삭제'}
            </S.Button>
          </S.ButtonWrapper>

          {loading && (
            <Loader
              key="loading-loader"
              baseColor="#F7F7F7"
              style={{ marginTop: isMobile ? '-22px' : '-10px', marginLeft: isMobile ? '-12px' : '-10px', transform: isMobile ? 'none' : 'rotate(90deg)', transformOrigin: isMobile ? 'none' : 'top left', position: "relative", zIndex: "-10" }}
            />
          )}
          {error ? (
            <Error
              key="error-component"
              style={{ marginTop: isMobile ? '20px' : '-4px' }}
            />
          ) : isLoading ? (
            <Loader
              key="isloading-loader"
              baseColor="#F7F7F7"
              style={{
                marginTop: isMobile ? '-22px' : '-10px',
                marginLeft: isMobile ? '-12px' : '-10px',
                transform: isMobile ? 'none' : 'rotate(90deg)',
                transformOrigin: isMobile ? 'none' : 'top left',
                position: "relative",
                zIndex: "-10"
              }}
            />
          ) : !fnq ? (
            <Error
              key="not-found-error"
              style={{ marginTop: isMobile ? '20px' : '-4px' }}
              message="프로젝트를 찾을 수 없습니다."
            />
          ) : (
            <S.DetailContextWrapper key="main-content" style={{ overflowY: 'auto' }}>
              <S.Header>
                <S.HeaderTitle>
                  <S.Title>{fnq?.title}</S.Title>
                  <S.CreatedAt>{fnq?.created_at && formatDate(fnq?.created_at)}</S.CreatedAt>
                  <S.StatusWrapper>
                    <FnqStatus
                      currentStatus={fnq.fnq_status}
                      allStatuses={[]}
                    />
                  </S.StatusWrapper>
                  <S.InfoWrapper>
                    <S.InfoTitle>수량</S.InfoTitle>
                    <S.InfoValue>{fnq?.count ? fnq?.count : '-'}</S.InfoValue>
                    <S.InfoTitle>예산</S.InfoTitle>
                    <S.InfoValue>{formatNumber(fnq?.budget)}</S.InfoValue>
                    <S.InfoTitle>희망 납기일</S.InfoTitle>
                    <S.InfoValue>{fnq?.due_date ? formatDate(fnq?.due_date) : '-'}</S.InfoValue>
                  </S.InfoWrapper>
                </S.HeaderTitle>
              </S.Header>

              {fnq?.img && fnq?.img.length > 0 && (
                <S.FileWrapper>
                  <S.FileList>
                    {fnq.img.map((file, idx) => {
                      let fileData;

                      try {
                        // JSON 문자열인 경우 파싱
                        if (typeof file === 'string' && file.startsWith('{')) {
                          fileData = JSON.parse(file);
                        } else if (typeof file === 'object') {
                          fileData = file;
                        } else {
                          fileData = { url: file, name: `첨부 파일 ${idx + 1}` };
                        }
                      } catch (error) {
                        console.error('파일 데이터 파싱 오류:', error);
                        fileData = { url: file, name: `첨부 파일 ${idx + 1}` };
                      }

                      return (
                        <S.File
                          key={`file-${fnqId}-${idx}-${fileData.name || idx}`}
                          href={fileData.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📎 {fileData.name}
                        </S.File>
                      );
                    })}
                  </S.FileList>
                </S.FileWrapper>
              )}

              <EditorFnqRenderer item={fnq?.detail} />

            </S.DetailContextWrapper>
          )}
        </S.DetailWrapper>
      )}

      {/* 삭제 확인 팝업 */}
      {showDeleteConfirm && (
        <Popup
          key="delete-confirm-popup"
          isVisible={showDeleteConfirm}
          title="삭제하시겠습니까?"
          message="삭제된 문의는 복구할 수 없습니다."
          type="warning"
          buttons={[
            {
              text: '취소',
              onClick: handleDeleteCancel,
              variant: 'secondary'
            },
            {
              text: '삭제',
              onClick: handleDeleteConfirm,
              variant: 'danger'
            }
          ]}
          onOverlayClick={handleDeleteCancel}
        />
      )}

      {/* 삭제 성공 팝업 */}
      {showSuccessPopup && (
        <Popup
          key="delete-success-popup"
          isVisible={showSuccessPopup}
          title="삭제 완료"
          message="문의하신 프로젝트가 삭제되었습니다"
          type="success"
          buttons={[
            {
              text: '확인',
              onClick: handleSuccessClose,
              variant: 'primary'
            }
          ]}
          onOverlayClick={handleSuccessClose}
        />
      )}

      {/* 삭제 오류 팝업 */}
      {showErrorPopup && (
        <Popup
          key="delete-error-popup"
          isVisible={showErrorPopup}
          title="오류 발생"
          message={errorMessage}
          type="error"
          buttons={[
            {
              text: '확인',
              onClick: handleErrorClose,
              variant: 'primary'
            }
          ]}
          onOverlayClick={handleErrorClose}
        />
      )}

      {/* 처리중 팝업 */}
      {showProcessingPopup && (
        <Popup
          key="processing-popup"
          isVisible={showProcessingPopup}
          title="수정 불가"
          message="현재 중개중인 문의는 수정하거나 삭제할 수 없습니다. 관리자에게 문의해주세요."
          type="warning"
          buttons={[
            {
              text: '확인',
              onClick: handleProcessingClose,
              variant: 'primary'
            }
          ]}
          onOverlayClick={handleProcessingClose}
        />
      )}
    </AnimatePresence>
  );
}

export default MypageFnqDeatilContainer;
