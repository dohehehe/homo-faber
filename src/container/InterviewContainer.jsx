'use client';

import { usePathname, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useInterviews } from '@/hooks/useInterviews';
import * as S from '@/styles/interview/interviewContainer.style';


function InterviewContainer({ onLoadComplete }) {
  const pathname = usePathname();
  const router = useRouter();
  const wrapperRef = useRef(null);

  const [cursorPositionPercent, setCursorPositionPercent] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((event) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width;
    const relativeY = (event.clientY - rect.top) / rect.height;
    const toPercent = (v) => Math.max(0, Math.min(100, Math.round(v * 100)));
    setCursorPositionPercent({ x: toPercent(relativeX), y: toPercent(relativeY) });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursorPositionPercent({ x: 50, y: 50 });
  }, []);

  const gradientCss = useMemo(() => {
    const baseStops = [22, 53, 78, 100];
    const yNormalized = cursorPositionPercent.y / 100; // 0..1
    const delta = (yNormalized - 0.5) * 30; // range about [-15, 15]

    const adjusted = [
      Math.max(0, Math.min(100, baseStops[0] + delta)),
      Math.max(0, Math.min(100, baseStops[1] + delta)),
      Math.max(0, Math.min(100, baseStops[2] + delta)),
      100,
    ];

    // Ensure monotonic increase of stops
    for (let i = 1; i < adjusted.length; i += 1) {
      adjusted[i] = Math.max(adjusted[i], adjusted[i - 1] + 1);
      adjusted[i] = Math.min(adjusted[i], 100);
    }

    const [s1, s2, s3] = adjusted;

    return `radial-gradient(circle at ${cursorPositionPercent.x}% ${cursorPositionPercent.y}%, rgba(198, 198, 198, 1) ${s1}%, rgba(255, 255, 255, 1) ${s2}%, rgba(196, 196, 196, 1) ${s3}%, rgba(255, 255, 255, 1) 100%)`;
  }, [cursorPositionPercent.x, cursorPositionPercent.y]);

  // 홈 페이지에서 StoreWrapper 클릭 시 /store로 이동
  // 개별 스토어 페이지에서 StoreWrapper 클릭 시 /store로 이동  
  const handleInterviewWrapperClick = () => {
    if (pathname === '/') {
      router.push('/interview');
    } else if (pathname.startsWith('/interview/')) {
      router.push('/interview');
    }
  };

  const handleInterviewClick = (interviewId) => {
    router.push(`/interview/${interviewId}`);
  }

  const { interviews, isLoading, error } = useInterviews();

  // 데이터 로딩 완료 시 부모 컴포넌트에 알림
  useEffect(() => {
    if (!isLoading && interviews.length > 0 && onLoadComplete) {
      onLoadComplete();
    }
  }, [isLoading, interviews, onLoadComplete]);

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <>
      <S.InterviewWrapper
        ref={wrapperRef}
        gradientCss={gradientCss}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleInterviewWrapperClick}
      >
        <S.InterviwPageName>인터뷰 목록</S.InterviwPageName>

        {isLoading ? (
          <div style={{ padding: '16px' }}>로딩 중...</div>
        ) : (
          <S.InterviewList>
            {interviews.map((interview) => (
              <S.InterviewItem key={interview.id} onClick={() => handleInterviewClick(interview.id)}>
                <S.InterviewStore>{interview.stores?.name}</S.InterviewStore>
                <S.InterviewPerson>{interview.stores?.person}</S.InterviewPerson>
              </S.InterviewItem>
            ))}
          </S.InterviewList>
        )}
      </S.InterviewWrapper>
    </>
  );
}

export default InterviewContainer;