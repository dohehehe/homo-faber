'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import * as S from '@/styles/common/navigation.style';

function isActive(pathname, href) {
  // Treat '/' as home for '/home' as well
  if (href === '/home') {
    return pathname === '/' || pathname.startsWith('/home');
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navigation() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMap3D, setIsMap3D] = useState(true); // 지도 상태 추적 (기본값: 3D)

  // 클라이언트에서만 실행되도록 설정
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 클라이언트에서만 useWindowSize 사용
  const windowSize = useWindowSize();
  const isMobile = isClient ? windowSize.isMobile : false;

  useEffect(() => {
    if (isClient) {
      setIsOpen(!isMobile);
    }
  }, [isMobile, isClient]);

  const links = [
    { href: '/', label: '홈' },
    { href: '/store', label: '업체' },
    { href: '/interview', label: '인터뷰' },
    { href: '/word', label: '용어' },
    { href: '/fnq', label: '제작' },
    { href: '/info', label: '소개' },
    { href: user ? '/mypage' : '/login', label: user ? '내정보' : '로그인' },
  ];

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // 지도 전환 함수
  const handleMapToggle = () => {
    setIsMap3D(!isMap3D); // 상태 업데이트
    window.dispatchEvent(new CustomEvent('toggleMapView'));
  };

  return (
    <>
      <S.NavigationIcon
        src="/navIcon.png"
        alt="home"
        onClick={toggleNavigation}
        isOpen={isOpen}
      />
      <S.NavigationBg isOpen={isOpen} />
      <S.NavigationWrapper isOpen={isOpen} onClick={isMobile ? handleLinkClick : undefined}>
        {links.map(({ href, label }) => {
          const active = isActive(pathname, href);
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <S.NavigationItem active={active}>
                {label}
              </S.NavigationItem>
            </Link>
          );
        })}

        {isClient && isMobile && (
          <S.CloseButton onClick={handleLinkClick}>
            ✕
          </S.CloseButton>
        )}
      </S.NavigationWrapper>

      <S.MapToggleButton onClick={handleMapToggle} isActive={isMap3D}>
        <S.SwitchText isActive={!isMap3D}>
          2D
        </S.SwitchText>
        <S.SwitchTrack isActive={isMap3D}>
          <S.SwitchThumb isActive={isMap3D} />
        </S.SwitchTrack>
        <S.SwitchText isActive={isMap3D}>
          3D
        </S.SwitchText>
      </S.MapToggleButton>
    </>
  );
}


