'use client';

import { useState, useLayoutEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useInterviewDetail } from '@/hooks/useInterviews';
import EditorInterviewRender from '@/components/interview/EditorInterviewRenderer';
import { useCustomScrollbar } from '@/hooks/useCustomScrollbar';
import { AnimatePresence } from 'motion/react';
import CustomScrollbar from '@/components/common/CustomScrollbar';
import useWindowSize from '@/hooks/useWindowSize';
import * as S from '@/styles/interview/interviewDetailContainer.style';
import Link from 'next/link';

function InterviewDetailContainer({ }) {
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();
  const [right, setRight] = useState('-100dvw');
  const [bottom, setBottom] = useState('-100dvh');
  const interviewId = pathname.startsWith('/interview/') && pathname !== '/interview' ? pathname.split('/')[2] : null;
  const { interview, isLoading, error } = useInterviewDetail(interviewId);
  const { containerRef, scrollState, scrollToRatio } = useCustomScrollbar();

  // 모바일에서 사용할 bottom 위치를 계산하는 함수
  const getMobileBottomPosition = (pathname) => {
    if (pathname.startsWith('/interview/') && pathname !== '/interview') {
      return '0px';
    } else {
      return '-100dvh';
    }
  };

  // 데스크톱에서 사용할 right 위치를 계산하는 함수
  const getDesktopRightPosition = (pathname) => {
    if (pathname.startsWith('/interview/') && pathname !== '/interview') {
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

  // isReady가 false면 로딩 상태 표시
  if (!isReady) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {interviewId && (
        <S.DetailWrapper
          key={interviewId}
          ref={containerRef}
          right={right}
          bottom={bottom}
          isMobile={isMobile}
          initial={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          animate={isMobile ? { bottom: bottom } : { right: right }}
          exit={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
        >
          {error ? (
            <S.ErrorContainer>
              <div>에러가 발생했습니다: {error.message}</div>
            </S.ErrorContainer>
          ) : isLoading ? (
            <S.LoadingContainer>
              <div>로딩 중...</div>
            </S.LoadingContainer>
          ) : !interview ? (
            <S.ErrorContainer>
              <div>인터뷰를 찾을 수 없습니다.</div>
            </S.ErrorContainer>
          ) : (
            <>
              <S.DetailPageName>{interview?.stores.name}</S.DetailPageName>

              <S.InterviewHeader>
                <S.InterviewTitle>
                  <S.InterviewStore data-text={interview?.stores.name}>{interview?.stores.name}</S.InterviewStore>
                  <S.InterviewPerson>{interview?.stores.person}</S.InterviewPerson>

                </S.InterviewTitle>
                <S.InterviewIntro>{interview?.intro}</S.InterviewIntro>
                <S.InterviewCoverImg src={interview?.cover_img} alt="이미지" />
              </S.InterviewHeader>

              <EditorInterviewRender item={interview?.contents} />
              <S.InterviewLink> {interview?.stores.name} {interview?.stores.person} 기술자와 <br />산림동의 다른 기술자들의 이야기를 <br /><span style={{ fontWeight: '900', padding: '8px 0px', color: 'rgb(71, 71, 71)' }}> &lt;산림동의 만드는 사람들&gt;</span> 책에서 계속 만나 보실 수 있습니다<Link href='https://tumblbug.com/homofaber' target='_blank'> 구매 링크 바로가기</Link></S.InterviewLink>
            </>
          )}

          {/* 커스텀 스크롤바 */}
          {!isMobile && (
            <CustomScrollbar
              scrollState={scrollState}
              onScrollToRatio={scrollToRatio}
            />
          )}
        </S.DetailWrapper>
      )}
    </AnimatePresence>
  );
}

export default InterviewDetailContainer;