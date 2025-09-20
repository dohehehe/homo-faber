'use client';

import { useRouter } from 'next/navigation';
import { useState, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import useWindowSize from '@/hooks/useWindowSize';
import { AnimatePresence } from 'motion/react';
import * as S from '@/styles/user/userContainer.style';
import { createClient } from '@/utils/supabase/client';

function FindPasswordContainer({}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isMobile, isReady } = useWindowSize();
  const [right, setRight] = useState('-100dvw');
  const [bottom, setBottom] = useState('-100dvh');

  const [formData, setFormData] = useState({
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const supabase = createClient();

  // 모바일에서 사용할 bottom 위치를 계산하는 함수
  const getMobileBottomPosition = (pathname) => {
    if (pathname.startsWith('/login/find-password')) {
      return '0px';
    } else {
      return '-100dvh';
    }
  };

  // 데스크톱에서 사용할 right 위치를 계산하는 함수
  const getDesktopRightPosition = (pathname) => {
    if (pathname.startsWith('/login/find-password')) {
      return '0px';
    } else {
      return '-100dvw';
    }
  };

  // pathname 변경 시 위치 업데이트
  useLayoutEffect(() => {
    if (!isReady) return;

    if (isMobile) {
      const newBottom = getMobileBottomPosition(pathname);
      setBottom(newBottom);
    } else {
      const newRight = getDesktopRightPosition(pathname);
      setRight(newRight);
    }
  }, [pathname, isMobile, isReady]);

  // 비밀번호 찾기 패널 클릭 시 홈으로 이동
  const handleFindPasswordWrapperClick = () => {
    if (pathname === '/') {
      router.push('/login/find-password');
    } else if (pathname.startsWith('/login/find-password')) {
      router.push('/login/find-password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFindPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      );

      if (error) {
        console.error('비밀번호 재설정 이메일 전송 실패:', error.message);
        setShowErrorPopup(true);
        setErrorMessage(error.message);
      } else {
        setShowSuccessPopup(true);
      }
    } catch (error) {
      console.error('예상치 못한 오류:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessConfirm = () => {
    setShowSuccessPopup(false);
    router.push('/login');
  };

  const handleCancel = () => {
    router.push('/login');
  };

  return (
    <AnimatePresence mode="wait">
      {pathname.startsWith('/login/find-password') && (
        <S.EditWrapper
          key="find-password"
          right={right}
          bottom={bottom}
          isMobile={isMobile}
          initial={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          animate={isMobile ? { bottom: bottom } : { right: right }}
          exit={isMobile ? { bottom: '-100dvh' } : { right: '-100dvw' }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          onClick={handleFindPasswordWrapperClick}
        >
          <S.PageName>비밀번호 찾기</S.PageName>

          <S.UserForm
            onSubmit={handleFindPassword}
            onClick={(e) => e.stopPropagation()}
          >
            <S.FormGroup>
              <S.Label htmlFor="email">이메일</S.Label>
              <S.Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="가입하신 이메일을 입력해주세요"
                disabled={isLoading}
              />
            </S.FormGroup>

            {showSuccessPopup && (
              <S.ErrorPopupOverlay onClick={handleSuccessConfirm}>
                <S.ErrorPopupContainer
                  onClick={(e) => e.stopPropagation()}
                  bgColor={'var(--yellow)'}
                  borderColor={'rgb(255, 234, 44)'}
                >
                  <div style={{ color: 'black' }}>
                    입력하신 이메일 주소로 비밀번호 재설정 링크를
                    보내드렸습니다.
                    <br />
                    이메일을 확인하여 비밀번호를 재설정해주세요.
                  </div>
                  <S.ErrorPopupCloseButton onClick={handleSuccessConfirm}>
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

              <S.SubmitButton type="submit" disabled={isLoading}>
                비밀번호 찾기
              </S.SubmitButton>
            </S.ButtonWrapper>
          </S.UserForm>
        </S.EditWrapper>
      )}
    </AnimatePresence>
  );
}

export default FindPasswordContainer;
