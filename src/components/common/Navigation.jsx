'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

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

  const links = [
    { href: '/', label: '홈' },
    { href: '/store', label: '업체' },
    { href: '/interview', label: '인터뷰' },
    { href: '/word', label: '용어' },
    { href: '/info', label: '소개' },
    { href: user ? '/mypage' : '/login', label: user ? '내정보' : '로그인' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 16,
        left: 30,
        zIndex: 1000,
        background: 'rgba(255,255,255,0.9)',
        border: '1px solid #ddd',
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        padding: '8px 2px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        backdropFilter: 'saturate(180%) blur(8px)',
      }}
    >
      {links.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: 8,
                fontSize: 14,
                lineHeight: 1,
                color: active ? '#111' : '#444',
                background: active ? '#f0f0f0' : 'transparent',
                border: active ? '1px solid #ccc' : '1px solid transparent',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}


