'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/common/Loader';
import * as S from '@/styles/user/mypageContainer.style';
import UserBookmarkList from '@/components/mypage/UserBookmarkList';
import UserFnqList from '@/components/mypage/UserFnqList';

function MypageContainer({ onLoadComplete }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState('bookmarks');

  // 마이페이지 패널 클릭 시 홈으로 이동
  const handleMypageWrapperClick = () => {
    if (pathname === '/') {
      router.push('/mypage');
    } else if (pathname.startsWith('/mypage/')) {
      router.push('/mypage');
    }
  };

  useEffect(() => {
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    }
  };


  if (loading) {
    return (
      <S.MyPageWrapper>
        <Loader text="로딩 중..." />
      </S.MyPageWrapper>
    );
  }

  if (!user) {
    return (
      <S.MyPageWrapper>
        <Loader text="인증 중..." />
      </S.MyPageWrapper>
    );
  }

  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase();
  };

  return (
    <S.MyPageWrapper onClick={handleMypageWrapperClick}>
      <S.MyPageName>내정보</S.MyPageName>

      <S.ProfileCard onClick={(e) => e.stopPropagation()}>
        <S.UserName>
          {user.user_metadata?.name || '사용자'}
        </S.UserName>
        <S.UserEmail>{user.email}</S.UserEmail>

        {/* 프로필 수정 버튼 */}
        <S.ButtonWrapper>
          <S.Button onClick={() => router.push('/mypage/edit')}>
            회원 정보 수정
          </S.Button>

          <S.Button onClick={handleLogout}>
            로그아웃
          </S.Button>
        </S.ButtonWrapper>
      </S.ProfileCard>

      {/* 탭 버튼 */}
      <S.TabContainer>
        <S.TabButton
          active={activeTab === 'bookmarks'}
          onClick={() => setActiveTab('bookmarks')}
        >
          북마크 목록
        </S.TabButton>

        <S.TabButton style={{ marginLeft: '-23px', pointerEvents: 'none' }}>|</S.TabButton>

        <S.TabButton
          style={{ marginLeft: '-5px' }}
          active={activeTab === 'fnqs'}
          onClick={() => setActiveTab('fnqs')}
        >
          문의 목록
        </S.TabButton>
      </S.TabContainer>

      {activeTab === 'bookmarks' && <UserBookmarkList />}
      {activeTab === 'fnqs' && <UserFnqList />}

    </S.MyPageWrapper>
  );
}

export default MypageContainer;