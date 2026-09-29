'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useInterviewDetail } from '@/hooks/useInterviews';
import EditorInterviewRender from '@/components/interview/EditorInterviewRenderer';
import { AnimatePresence } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';
import * as S from '@/styles/interview/interviewDetailContainer.style';
import Link from 'next/link';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

function InterviewDetailContainer() {
  const pathname = usePathname();
  const router = useRouter();
  const { isMobile, isReady } = useWindowSize();
  const [panelState, setPanelState] = useState('hidden');
  const prevInterviewIdRef = useRef(null);
  const interviewId = pathname.startsWith('/interview/') && pathname !== '/interview' ? pathname.split('/')[2] : null;
  const { interview, isLoading, error } = useInterviewDetail(interviewId);

  useEffect(() => {
    if (interviewId && isReady) {
      if (prevInterviewIdRef.current !== interviewId) {
        setPanelState('expanded');
        prevInterviewIdRef.current = interviewId;
      }
    } else if (!interviewId) {
      setPanelState('hidden');
      prevInterviewIdRef.current = null;
    }
  }, [interviewId, isReady]);

  const animateValue = useMemo(() => {
    if (panelState === 'hidden') {
      return isMobile ? { y: '100dvh' } : { x: '100%' };
    }
    return isMobile ? { y: 0 } : { x: 0 };
  }, [panelState, isMobile]);

  return (
    <AnimatePresence>
      {interviewId && isReady && (
        <S.DetailWrapper
          key={interviewId}
          isMobile={isMobile}
          initial={isMobile ? { y: '100dvh' } : { x: '100%' }}
          animate={animateValue}
          exit={isMobile ? { y: '100dvh' } : { x: '100%' }}
          transition={{ duration: 0.35, ease: [0.2, 0, 0.4, 1] }}
        >
          <S.DetailPageName>인터뷰: {interview?.stores?.name} {interview?.stores?.person} 기술자 </S.DetailPageName>
          <S.DetailHeader>
            <S.InterviewTitle>
              <S.InterviewStore>{interview?.stores?.name || '인터뷰'}</S.InterviewStore>
              {interview?.stores?.person && (
                <S.InterviewPerson>{interview.stores.person}</S.InterviewPerson>
              )}
            </S.InterviewTitle>
            <S.CloseButton type="button" aria-label="닫기" onClick={() => router.push('/interview')}>
              <img src="/img/icons/icon-minus.svg" alt="" />
            </S.CloseButton>
          </S.DetailHeader>

          {error ? (
            <Error />
          ) : isLoading ? (
            <Loader baseColor="#F7F7F7" />
          ) : !interview ? (
            <Error message="인터뷰를 찾을 수 없습니다." />
          ) : (
            <>
              {interview.cover_img && (
                <S.InterviewCoverImg src={interview.cover_img} alt="" />
              )}
              {interview.intro && (
                <S.InterviewIntro>{interview.intro}</S.InterviewIntro>
              )}
              {Array.isArray(interview.contents) && (
                <EditorInterviewRender item={interview.contents} />
              )}
              <S.InterviewLink>
                {interview?.stores?.name} {interview?.stores?.person} 기술자와 산림동의 다른 기술자들의 이야기를{' '}
                <span>&lt;산림동의 만드는 사람들&gt;</span> 책에서 계속 만나 보실 수 있습니다
                <Link href="https://smartstore.naver.com/listentothecity/products/12477105528" target="_blank">
                  구매 링크 바로가기
                </Link>
              </S.InterviewLink>
            </>
          )}
        </S.DetailWrapper>
      )}
    </AnimatePresence>
  );
}

export default InterviewDetailContainer;
