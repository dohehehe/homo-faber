'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  const links = [
    { href: '/', label: '홈' },
    { href: '/store', label: '업체' },
    { href: '/interview', label: '인터뷰' },
    { href: '/word', label: '용어' },
    { href: '/info', label: '소개' },
    { href: user ? '/mypage' : '/login', label: user ? '내정보' : '로그인' },
  ];

  const toggleNavigation = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
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
      <S.NavigationWrapper isOpen={isOpen}>
        {links.map(({ href, label }) => {
          const active = isActive(pathname, href);
          return (
            <Link key={href} href={href} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
              <S.NavigationItem active={active}>
                {label}
              </S.NavigationItem>
            </Link>
          );
        })}
      </S.NavigationWrapper>
    </>
  );
}


