'use client';

import { useState, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useFnq } from '@/hooks/useFnq';
import { useCustomScrollbar } from '@/hooks/useCustomScrollbar';
import { AnimatePresence } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';
import * as S from '@/styles/fnq/fnqDeatilContainer.style';
import FnqStatus from '@/components/fnq/FnqStatus';
import EditorFnqRenderer from '@/components/fnq/EditorFnqRenderer';

function MypageFnqDeatilContainer() {
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();
  const [right, setRight] = useState('-100dvw');
  const [bottom, setBottom] = useState('-100dvh');
  const fnqId = pathname.startsWith('/mypage/fnq/') && pathname !== '/mypage/fnq' ? pathname.split('/')[3] : null;
  const { fnq, isLoading, error } = useFnq(fnqId);
  const { containerRef, scrollState, scrollToRatio } = useCustomScrollbar();

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

  return (
    <AnimatePresence mode="wait">
      {fnqId && (
        <S.DetailWrapper
          key={fnqId}
          ref={containerRef}
          right={right}
          bottom={bottom}
          isMobile={isMobile}
          initial={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          animate={isMobile ? { bottom: bottom } : { right: right }}
          exit={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}

        >
          <S.DetailPageName>문의 상세</S.DetailPageName>

          {error ? (
            <Error style={{ marginTop: isMobile ? '20px' : '-4px' }} />
          ) : isLoading ? (
            <Loader baseColor="#F7F7F7" style={{ marginTop: isMobile ? '-22px' : '-10px', marginLeft: isMobile ? '-12px' : '-10px', transform: isMobile ? 'none' : 'rotate(90deg)', transformOrigin: isMobile ? 'none' : 'top left', position: "relative", zIndex: "-10" }} />
          ) : !fnq ? (
            <Error style={{ marginTop: isMobile ? '20px' : '-4px' }} message="프로젝트를 찾을 수 없습니다." />
          ) : (
            <>
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

                <S.ButtonWrapper>
                  <S.Button>수정</S.Button>
                  <S.Button>삭제</S.Button>
                </S.ButtonWrapper>
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
                          key={idx}
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

            </>
          )}
        </S.DetailWrapper>
      )}
    </AnimatePresence>
  );
}

export default MypageFnqDeatilContainer;
