'use client';

import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { useCallback, useMemo, useState, useEffect, lazy, Suspense, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';

// Lazy loading으로 컨테이너들을 동적으로 import
const InterviewContainer = lazy(() => import('@/container/InterviewContainer'));
const WordContainer = lazy(() => import('@/container/WordContainer'));
const InfoContainer = lazy(() => import('@/container/InfoContainer'));
const LoginContainer = lazy(() => import('@/container/LoginContainer'));
const SignupContainer = lazy(() => import('@/container/SignupContainer'));
const MypageContainer = lazy(() => import('@/container/MypageContainer'));
const StoreContainer = lazy(() => import('@/container/StoreContainer'));

const SidePanelWrapper = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'right' && prop !== 'bottom',
})`
  width: ${(props) => props.isMobile ? '100vw' : '80dvw'};
  height: ${(props) => props.isMobile ? '87dvh' : '100dvh'};
  position: fixed;
  right: ${(props) => props.isMobile ? 'unset' : props.right};
  bottom: ${(props) => props.isMobile ? props.bottom : 'unset'};
  top: ${(props) => props.isMobile ? 'unset' : '0px'};
  z-index: 2;
  overflow: hidden;
  background: orange;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
`;

const LoadingFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: var(--font-gothic);
`;

function AnimatedPanel({
  baseRoute,
  onWrapperClick,
  className
}) {
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();
  const [right, setRight] = useState(() => {
    if (baseRoute === 'store') {
      return 'calc(-80dvw + 120px)';
    }
    return '-81dvw';
  });
  const [bottom, setBottom] = useState(() => {
    if (baseRoute === 'store') {
      return 'calc(-80dvh + 20px)';
    }
    return '-100dvh';
  });
  const [isVisible, setIsVisible] = useState(() => {
    if (baseRoute === 'store') {
      return true;
    }
    return false;
  });
  const [isLoaded, setIsLoaded] = useState(() => {
    if (baseRoute === 'store') {
      return true;
    }
    return false;
  });
  const [isClient, setIsClient] = useState(false);

  // 현재 경로가 이 패널의 baseRoute와 일치하는지 확인
  const isActiveRoute = useMemo(() => {
    if (baseRoute === 'store') {
      // store는 홈(/) 또는 /store로 시작하는 라우터에서 활성화
      return pathname === '/' || pathname.startsWith('/store');
    }
    return pathname.startsWith(`/${baseRoute}`);
  }, [pathname, baseRoute]);


  const getMobileBottomPosition = (isActive) => {
    if (baseRoute === 'store') {
      if (pathname === '/') {
        return 'calc(-80dvh + 20px)';
      } else if (pathname.startsWith('/store')) {
        return '0px';
      } else {
        return 'calc(-80dvh + 20px)';
      }
    }

    if (isActive) {
      return '0px';
    } else {
      return '-100dvh';
    }
  };


  const getDesktopRightPosition = (isActive) => {
    if (baseRoute === 'store') {
      if (pathname === '/') {
        return 'calc(-80dvw + 120px)';
      } else if (pathname.startsWith('/store')) {
        return '0px';
      } else {
        return 'calc(-80dvw + 120px)';
      }
    }

    if (isActive) {
      return '0';
    } else {
      return '-81dvw';
    }
  };

  // 초기 상태 설정 및 pathname/isMobile 변경 시 업데이트
  useLayoutEffect(() => {
    if (!isReady) return;

    if (isMobile) {
      const newBottom = getMobileBottomPosition(isActiveRoute);
      setBottom(newBottom);
    } else {
      const newRight = getDesktopRightPosition(isActiveRoute);
      setRight(newRight);
    }
  }, [pathname, isMobile, isReady, isActiveRoute, baseRoute]);

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // store 라우터의 경우 항상 렌더링
    if (baseRoute === 'store') {
      setIsVisible(true);
      setIsLoaded(true);
      return;
    }

    // 패널이 활성화되면 렌더링 시작
    if (isActiveRoute) {
      setIsVisible(true);
      setIsLoaded(true);
    } else {
      // 패널이 비활성화되면 애니메이션 완료 후 렌더링 중지
      const timer = setTimeout(() => {
        setIsVisible(false);
        // 메모리 절약을 위해 로드 상태도 리셋
        setTimeout(() => {
          if (!isActiveRoute) {
            setIsLoaded(false);
          }
        }, 500);
      }, 1000); // 애니메이션 duration과 동일

      return () => clearTimeout(timer);
    }
  }, [isActiveRoute, isClient, baseRoute]);

  // baseRoute에 따라 컴포넌트 렌더링
  const renderComponent = useCallback(() => {
    if (!isVisible || !isLoaded) return null;

    const Component = (() => {
      switch (baseRoute) {
        case 'interview':
          return InterviewContainer;
        case 'word':
          return WordContainer;
        case 'info':
          return InfoContainer;
        case 'login':
          return LoginContainer;
        case 'signup':
          return SignupContainer;
        case 'mypage':
          return MypageContainer;
        case 'store':
          return StoreContainer;
        default:
          return null;
      }
    })();

    if (!Component) return null;

    return (
      <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
        <Component />
      </Suspense>
    );
  }, [baseRoute, isVisible, isLoaded]);

  // isReady가 false면 로딩 상태 표시
  if (!isReady) {
    return null;
  }

  // 패널이 완전히 숨겨져 있으면 렌더링하지 않음
  if (!isVisible && !isActiveRoute) {
    return null;
  }

  // 클라이언트 사이드에서만 애니메이션 적용
  const currentRight = isClient && !isMobile ? right : null;
  const currentBottom = isClient && isMobile ? bottom : null;

  return (
    <AnimatePresence mode="wait">
      <SidePanelWrapper
        onClick={onWrapperClick}
        initial={isMobile ? { bottom: '-100dvh' } : { right: '-81dvw' }}
        animate={isMobile ? { bottom: currentBottom } : { right: currentRight }}
        exit={isMobile ? { bottom: '-100dvh' } : { right: '-81dvw' }}
        transition={{ duration: 1, ease: [0.2, 0, 0.4, 1] }}
        right={isMobile ? 'unset' : currentRight}
        bottom={isMobile ? currentBottom : 'unset'}
        isMobile={isMobile}
        className={className}
      >
        {renderComponent()}
      </SidePanelWrapper>
    </AnimatePresence>
  );
}

export default AnimatedPanel;