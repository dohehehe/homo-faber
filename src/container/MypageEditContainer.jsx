'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { updateUserProfile } from '@/utils/api/user-api';
import useWindowSize from '@/hooks/useWindowSize';
import { AnimatePresence } from 'motion/react';
import * as S from '@/styles/user/userContainer.style';


function MypageEditContainer({ }) {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();
  const [right, setRight] = useState('-100dvw');
  const [bottom, setBottom] = useState('-100dvh');

  const [formData, setFormData] = useState({
    name: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 모바일에서 사용할 bottom 위치를 계산하는 함수
  const getMobileBottomPosition = (pathname) => {
    if (pathname.startsWith('/mypage/edit')) {
      return '0px';
    } else {
      return '-100dvh';
    }
  };

  // 데스크톱에서 사용할 right 위치를 계산하는 함수
  const getDesktopRightPosition = (pathname) => {
    if (pathname.startsWith('/mypage/edit')) {
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

  // 마이페이지 편집 패널 클릭 시 홈으로 이동
  const handleEditWrapperClick = () => {
    if (pathname === '/') {
      router.push('/mypage/edit');
    } else if (pathname.startsWith('/mypage/edit')) {
      router.push('/mypage/edit');
    }
  };


  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // 사용자 데이터로 폼 초기화
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.user_metadata?.name || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 에러 메시지 초기화
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await updateUserProfile(formData);
      await refreshUser(); // 사용자 정보 새로고침
      setSuccess('프로필이 성공적으로 업데이트되었습니다!');

      // 2초 후 마이페이지로 이동
      setTimeout(() => {
        router.push('/mypage');
      }, 2000);
    } catch (err) {
      setError(err.message || '프로필 업데이트에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/mypage');
  };

  return (
    <AnimatePresence mode="wait">
      {pathname.startsWith('/mypage/edit') && (
        <S.EditWrapper
          key="mypage-edit"
          right={right}
          bottom={bottom}
          isMobile={isMobile}
          initial={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          animate={isMobile ? { bottom: bottom } : { right: right }}
          exit={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleEditWrapperClick}
        >
          <S.PageName>프로필 수정</S.PageName>

          <S.UserForm onSubmit={handleSave} onClick={(e) => e.stopPropagation()}>
            <S.FormGroup>
              <S.Label htmlFor="name">이름</S.Label>
              <S.Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="이름을 입력해주세요"
                disabled={isLoading}
              />
            </S.FormGroup>

            {error && (
              <S.ErrorPopupOverlay onClick={() => setError('')}>
                <S.ErrorPopupContainer onClick={(e) => e.stopPropagation()}>
                  {error}
                  <S.ErrorPopupCloseButton onClick={() => setError('')}>
                    확인
                  </S.ErrorPopupCloseButton>
                </S.ErrorPopupContainer>
              </S.ErrorPopupOverlay>
            )}

            {success && (
              <S.ErrorPopupOverlay onClick={() => setSuccess('')}>
                <S.ErrorPopupContainer onClick={(e) => e.stopPropagation()}>
                  {success}
                  <S.ErrorPopupCloseButton onClick={() => setSuccess('')}>
                    확인
                  </S.ErrorPopupCloseButton>
                </S.ErrorPopupContainer>
              </S.ErrorPopupOverlay>
            )}

            <S.ButtonWrapper>
              <S.SubmitButton
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
              >
                취소
              </S.SubmitButton>

              <S.SubmitButton
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? '저장 중...' : '저장'}
              </S.SubmitButton>
            </S.ButtonWrapper>
          </S.UserForm>
        </S.EditWrapper>
      )}
    </AnimatePresence>
  );
}

export default MypageEditContainer;
