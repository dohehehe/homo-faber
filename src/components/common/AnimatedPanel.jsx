'use client';

import { usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { useCallback, useMemo, useState, useEffect, lazy, Suspense, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useWindowSize from '@/hooks/useWindowSize';
import theme from '@/styles/Theme';

// Lazy loading으로 컨테이너들을 동적으로 import
const InterviewContainer = lazy(() => import('@/container/InterviewContainer'));
const WordContainer = lazy(() => import('@/container/WordContainer'));
const InfoContainer = lazy(() => import('@/container/InfoContainer'));
const LoginContainer = lazy(() => import('@/container/LoginContainer'));
const SignupContainer = lazy(() => import('@/container/SignupContainer'));
const MypageContainer = lazy(() => import('@/container/MypageContainer'));
const StoreContainer = lazy(() => import('@/container/StoreContainer'));
const FnqContainer = lazy(() => import('@/container/FnqContainer'));
const HomeContainer = lazy(() => import('@/container/HomeContainer'));

const SidePanelWrapper = styled(motion.div, {
  shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'right' && prop !== 'bottom',
})`
  width: ${(props) => props.isMobile ? '100vw' : '80dvw'};
  height: ${(props) => props.isMobile ? '87dvh' : '100dvh'};
  position: fixed;
  right: ${(props) => props.isMobile ? 'unset' : props.right};
  bottom: ${(props) => props.isMobile ? props.bottom : 'unset'};
  top: ${(props) => props.isMobile ? 'unset' : '0px'};
  z-index: 6;
  // overflow: hidden;
  // background: orange;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);

  ${theme.media.mobile} {
    z-index: 2;
  }
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
      return 'calc(-80dvw + 400px)';
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
    if (baseRoute === 'home') {
      // home은 홈(/)에서 시작하므로 초기에 활성화
      return pathname === '/';
    }
    if (baseRoute === 'store') {
      // store는 /store로 시작하는 경로에서만 활성화
      return pathname?.startsWith('/store') || false;
    }
    return false;
  });

  const [isLoaded, setIsLoaded] = useState(() => {
    if (baseRoute === 'home') {
      // home은 홈(/)에서 시작하므로 초기에 로드
      return pathname === '/';
    }
    if (baseRoute === 'store') {
      // store는 /store로 시작하는 경로에서만 로드
      return pathname?.startsWith('/store') || false;
    }
    return false;
  });

  const [isClient, setIsClient] = useState(false);
  // 패널 확장/축소 상태 (true: 넓게, false: 좁게)
  const [isExpanded, setIsExpanded] = useState(() => {
    if (baseRoute === 'home') {
      // home은 처음에 좁게 시작
      return false;
    }
    // 다른 패널들은 기본적으로 활성화되면 넓게
    return false;
  });
  // 홈 패널이 처음 자동으로 넓게 나오는지 여부
  const [hasAutoExpanded, setHasAutoExpanded] = useState(false);

  // 현재 경로가 이 패널의 baseRoute와 일치하는지 확인
  const isActiveRoute = useMemo(() => {
    if (baseRoute === 'home') {
      // home은 홈(/)에서만 활성화
      return pathname === '/';
    }
    if (baseRoute === 'store') {
      // store는 /store로 시작하는 라우터에서만 활성화
      return pathname.startsWith('/store');
    }
    return pathname.startsWith(`/${baseRoute}`);
  }, [pathname, baseRoute]);

  // store 라우터의 활성화 상태를 별도로 관리
  const isStoreActive = useMemo(() => {
    return baseRoute === 'store' && pathname.startsWith('/store');
  }, [baseRoute, pathname]);


  // 초기 상태 설정 및 pathname/isMobile 변경 시 업데이트
  useLayoutEffect(() => {
    if (!isReady) return;

    const getMobileBottomPosition = (isActive, expanded) => {
      if (baseRoute === 'store') {
        if (pathname.startsWith('/store')) {
          return expanded ? '0px' : 'calc(-80dvh + 20px)';
        } else {
          return 'calc(-80dvh + 20px)';
        }
      }

      if (baseRoute === 'home') {
        // home은 확장 상태에 따라 위치 변경
        return expanded ? '0px' : 'calc(-80dvh + 20px)';
      }

      if (isActive) {
        return expanded ? '0px' : 'calc(-80dvh + 20px)';
      } else {
        return '-100dvh';
      }
    };

    const getDesktopRightPosition = (isActive, expanded) => {
      if (baseRoute === 'store') {
        if (pathname.startsWith('/store')) {
          return expanded ? '0px' : 'calc(-80dvw + 400px)';
        } else {
          return 'calc(-80dvw + 120px)';
        }
      }

      if (baseRoute === 'home') {
        // home은 확장 상태에 따라 위치 변경
        return expanded ? '0px' : 'calc(-80dvw + 400px)';
      }

      if (isActive) {
        return expanded ? '0' : 'calc(-80dvw + 400px)';
      } else {
        return '-81dvw';
      }
    };

    if (isMobile) {
      const newBottom = getMobileBottomPosition(isActiveRoute, isExpanded);
      setBottom(newBottom);
    } else {
      const newRight = getDesktopRightPosition(isActiveRoute, isExpanded);
      setRight(newRight);
    }
  }, [pathname, isMobile, isReady, isActiveRoute, baseRoute, isExpanded]);

  // 클라이언트 사이드에서만 실행
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 지도 클릭 시 패널 축소 이벤트 리스너
  useEffect(() => {
    if (!isClient) return;

    const handleCollapsePanel = () => {
      // 현재 활성화된 패널만 축소
      if (isActiveRoute) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('collapsePanel', handleCollapsePanel);
    return () => {
      window.removeEventListener('collapsePanel', handleCollapsePanel);
    };
  }, [isClient, isActiveRoute]);

  // 패널 클릭 핸들러 - 패널 영역 클릭 시 확장
  const handlePanelClick = useCallback((e) => {
    // 현재 활성화된 패널만 확장
    if (!isActiveRoute || !isClient) return;

    // 클릭된 요소가 인터랙티브 요소인지 확인
    const target = e.target;
    const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], [onClick]');

    // 인터랙티브 요소가 아닌 경우에만 확장
    if (!isInteractive) {
      e.stopPropagation();
      setIsExpanded(true);
    }
  }, [isActiveRoute, isClient]);

  // 홈 패널 자동 확장 (처음 렌더링 시 좁게 있다가 넓게 나옴)
  useEffect(() => {
    if (!isClient || baseRoute !== 'home' || !isActiveRoute) return;

    // 홈으로 돌아왔을 때 자동 확장 상태 리셋
    if (!hasAutoExpanded) {
      // 짧은 지연 후 자동으로 넓게
      const timer = setTimeout(() => {
        setIsExpanded(true);
        setHasAutoExpanded(true);
      }, 500); // 0.5초 후 자동 확장

      return () => clearTimeout(timer);
    }
  }, [isClient, baseRoute, isActiveRoute, hasAutoExpanded]);

  // 홈에서 벗어났을 때 자동 확장 상태 리셋
  useEffect(() => {
    if (baseRoute === 'home' && !isActiveRoute) {
      setHasAutoExpanded(false);
      setIsExpanded(false);
    }
  }, [baseRoute, isActiveRoute]);

  // 다른 패널들은 활성화되면 자동으로 넓게
  useEffect(() => {
    if (!isClient || baseRoute === 'home') return;

    if (isActiveRoute) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isClient, baseRoute, isActiveRoute]);

  // store 라우터 전용 useEffect
  useEffect(() => {
    if (!isClient || baseRoute !== 'store') return;

    if (isStoreActive) {
      setIsVisible(true);
      setIsLoaded(true);
    } else {
      // 다른 라우터로 이동하면 애니메이션 완료 후 언마운트
      // 애니메이션 duration과 동일한 시간 후 언마운트
      const timer = setTimeout(() => {
        setIsVisible(false);
        // 추가 지연 후 완전히 언마운트
        setTimeout(() => {
          setIsLoaded(false);
        }, 200);
      }, 1000); // 애니메이션 duration과 동일
      return () => clearTimeout(timer);
    }
  }, [isClient, baseRoute, isStoreActive]);

  // home 라우터 전용 useEffect
  useEffect(() => {
    if (!isClient || baseRoute !== 'home') return;

    if (isActiveRoute) {
      setIsVisible(true);
      setIsLoaded(true);
    } else {
      // 다른 라우터로 이동하면 애니메이션 완료 후 언마운트
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setIsLoaded(false);
        }, 200);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isClient, baseRoute, isActiveRoute]);

  // 일반 라우터용 useEffect (store, home 제외)
  useEffect(() => {
    if (!isClient || baseRoute === 'store' || baseRoute === 'home') return;

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
        case 'fnq':
          return FnqContainer;
        case 'home':
          return HomeContainer;
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

  // 패널이 완전히 숨겨져 있고 로드되지 않았으면 렌더링하지 않음
  if (!isVisible && !isLoaded) {
    return null;
  }

  // 클라이언트 사이드에서만 애니메이션 적용
  const currentRight = isClient && !isMobile ? right : null;
  const currentBottom = isClient && isMobile ? bottom : null;

  // store와 home 라우터의 경우 특별한 initial/exit 값 설정
  const getInitialPosition = () => {
    if (baseRoute === 'store') {
      return isMobile ? { bottom: 'calc(-80dvh + 20px)' } : { right: 'calc(-80dvw + 400px)' };
    }
    if (baseRoute === 'home') {
      // home은 처음에 좁게 시작
      return isMobile ? { bottom: 'calc(-80dvh + 20px)' } : { right: 'calc(-80dvw + 400px)' };
    }
    return isMobile ? { bottom: '-100dvh' } : { right: '-81dvw' };
  };

  const getExitPosition = () => {
    if (baseRoute === 'store') {
      return isMobile ? { bottom: 'calc(-80dvh + 20px)' } : { right: 'calc(-80dvw + 400px)' };
    }
    if (baseRoute === 'home') {
      return isMobile ? { bottom: 'calc(-80dvh + 20px)' } : { right: 'calc(-80dvw + 400px)' };
    }
    return isMobile ? { bottom: '-100dvh' } : { right: '-81dvw' };
  };

  return (
    <AnimatePresence mode="wait">
      <SidePanelWrapper
        key={`panel-${baseRoute}`}
        onClick={(e) => {
          // 패널 클릭 시 토글
          handlePanelClick(e);
          // 기존 onWrapperClick도 호출 (있는 경우)
          if (onWrapperClick) {
            onWrapperClick(e);
          }
        }}
        initial={getInitialPosition()}
        animate={isMobile ? { bottom: currentBottom } : { right: currentRight }}
        exit={getExitPosition()}
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