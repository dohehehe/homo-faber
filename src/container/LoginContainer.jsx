'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import * as S from '@/styles/user/userContainer.style';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function LoginContainer({ onLoadComplete }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // 컴포넌트 로드 완료 시 부모 컴포넌트에 알림
  useEffect(() => {
    if (onLoadComplete) {
      onLoadComplete();
    }
  }, [onLoadComplete]);

  // ESC 키로 에러 팝업 닫기
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && error) {
        setError('');
      }
    };

    if (error) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [error]);

  // 로그인 패널 클릭 시 홈으로 이동
  const handleLoginWrapperClick = () => {
    if (pathname === '/') {
      router.push('/login');
    } else if (pathname.startsWith('/login/')) {
      router.push('/login');
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await signIn(formData.email, formData.password);
      if (error) {
        setError('이메일 또는 비밀번호를 다시 한 번 확인해주세요.');
        return;
      }
      if (data?.user) {
        router.push('/mypage');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.UserWrapper
      onClick={handleLoginWrapperClick}
    >
      <S.PageName>로그인</S.PageName>

      <S.UserForm onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
        <S.FormGroup>
          <S.Label htmlFor="email">이메일</S.Label>
          <S.Input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            {...register('email', {
              required: '이메일을 입력해주세요',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '올바른 이메일 형식이 아닙니다',
              },
            })}
          />
          {errors.email && <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>}
        </S.FormGroup>

        <S.FormGroup>
          <S.Label htmlFor="password">비밀번호</S.Label>
          <S.Input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다',
              },
            })}
          />
          {errors.password && <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>}
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

        <S.ButtonWrapper>
          <S.SubmitButton
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              '로그인 중...'
            ) : '로그인'}
          </S.SubmitButton>

          <S.SubmitButton type="button" onClick={() => router.push('/signup')}>
            회원가입
          </S.SubmitButton>
        </S.ButtonWrapper>

      </S.UserForm>
    </S.UserWrapper>
  );
}

export default LoginContainer;
