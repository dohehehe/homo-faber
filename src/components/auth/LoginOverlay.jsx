'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Popup from '@/components/common/Popup';
import * as S from '@/styles/user/loginOverlay.style';

export default function LoginOverlay({ open, onClose }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (!open) {
      setError('');
      reset();
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose, reset]);

  if (!open) {
    return null;
  }

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error: signError } = await signIn(formData.email, formData.password);
      if (signError) {
        setError('이메일 또는 비밀번호를 다시 한 번 확인해주세요.');
        return;
      }
      if (data?.user) {
        onClose();
        router.push('/mypage');
      }
    } catch (submitError) {
      console.error('Login error:', submitError);
      setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(event) => event.stopPropagation()} onMouseEnter={(event) => event.stopPropagation()}>
        <S.Title>로그인</S.Title>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Field>
            <S.Label htmlFor="overlay-email">이메일</S.Label>
            <S.Input
              type="email"
              id="overlay-email"
              placeholder="이메일을 입력해주세요"
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '올바른 이메일 형식이 아닙니다',
                },
              })}
            />
            {errors.email && <S.ErrorText>{errors.email.message}</S.ErrorText>}
          </S.Field>

          <S.Field>
            <S.LabelRow>
              <S.Label htmlFor="overlay-password">비밀번호</S.Label>
              <S.TextLink
                type="button"
                onClick={() => {
                  onClose();
                  router.push('/login/find-password');
                }}
              >
                비밀번호 찾기
              </S.TextLink>
            </S.LabelRow>
            <S.Input
              type="password"
              id="overlay-password"
              placeholder="비밀번호를 입력해주세요"
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 합니다',
                },
              })}
            />
            {errors.password && <S.ErrorText>{errors.password.message}</S.ErrorText>}
          </S.Field>

          <S.SignupHint>
            처음이신가요?
            <S.SignupLink
              type="button"
              onClick={() => {
                onClose();
                router.push('/signup');
              }}
            >
              회원가입 하기
            </S.SignupLink>
          </S.SignupHint>

          <Popup
            isVisible={!!error}
            message={error}
            onClose={() => setError('')}
            type="error"
          />

          <S.SubmitRow>
            <S.SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
              <S.SubmitArrow>→</S.SubmitArrow>
            </S.SubmitButton>
          </S.SubmitRow>
        </S.Form>
      </S.Modal>
    </S.Overlay>
  );
}
