'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useInterviews } from '@/hooks/useInterviews';
import * as S from '@/styles/interview/interviewContainer.style';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

function InterviewContainer({ onLoadComplete }) {
  const pathname = usePathname();
  const router = useRouter();
  const { interviews, isLoading, error } = useInterviews();
  const hasDetail = pathname?.startsWith('/interview/') && pathname !== '/interview';

  const handleInterviewClick = (interviewId) => {
    router.push(`/interview/${interviewId}`);
  };

  useEffect(() => {
    if (!isLoading && interviews.length > 0 && onLoadComplete) {
      onLoadComplete();
    }
  }, [isLoading, interviews, onLoadComplete]);

  return (
    <S.InterviewWrapper hasDetail={hasDetail}>
      <S.InterviwPageName>인터뷰 목록</S.InterviwPageName>
      <S.InterviewList>
        {isLoading ? (
          <Loader style={{ marginTop: '8px' }} baseColor="#efefef" />
        ) : error ? (
          <Error style={{ marginTop: '-15px', marginLeft: '-10px', position: 'relative', zIndex: '2' }} />
        ) : interviews.length === 0 ? (
          <Error message="인터뷰 목록을 찾을 수 없습니다." />
        ) : (
          interviews.map((interview) => (
            <S.InterviewItem key={interview.id} onClick={() => handleInterviewClick(interview.id)}>
              <S.InterviewStore>{interview.stores?.name}</S.InterviewStore>
              <S.InterviewPerson>{interview.stores?.person}</S.InterviewPerson>
            </S.InterviewItem>
          ))
        )}
      </S.InterviewList>
    </S.InterviewWrapper>
  );
}

export default InterviewContainer;
