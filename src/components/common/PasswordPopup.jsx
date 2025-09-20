'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from '@/styles/common/popup.style';
import { createClient } from '@/utils/supabase/client';

function PasswordPopup() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [sessionReady, setSessionReady] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch('password');
  const supabase = createClient();

  const handleClose = () => {
    setIsVisible(false);
    // 팝업이 닫힌 후 로그인 페이지로 이동
    setTimeout(() => {
      router.push('/login');
    }, 300);
  };

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) {
        console.error('비밀번호 변경 오류:', error);
        setMessage('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
      } else {
        setMessage('비밀번호가 성공적으로 변경되었습니다.');
        // 2초 후 팝업 닫기
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setMessage('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <S.PopupOverlay onClick={handleClose}>
      <S.PopupContainer
        onClick={(e) => e.stopPropagation()}
        bgColor={'rgb(156, 156, 156)'}
        borderColor={'rgb(156, 156, 156)'}
      >
        <h3>새 비밀번호 설정</h3>

        {message && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: '16px',
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: message.includes('성공') ? '#d4edda' : '#f8d7da',
              color: message.includes('성공') ? '#155724' : '#721c24',
              fontSize: '14px',
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <S.FormGroup>
            <S.Label htmlFor="password">새 비밀번호</S.Label>
            <S.Input
              type="password"
              id="password"
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*\d)/,
                  message: '비밀번호는 영문과 숫자를 포함해야 합니다',
                },
              })}
              placeholder="새 비밀번호를 입력해주세요"
              disabled={isLoading}
            />
            {errors.password && (
              <S.ErrorMessage>{errors.password.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <S.FormGroup>
            <S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
            <S.Input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: '비밀번호 확인을 입력해주세요',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다',
              })}
              placeholder="비밀번호를 다시 입력해주세요"
              disabled={isLoading}
            />
            {errors.confirmPassword && (
              <S.ErrorMessage>{errors.confirmPassword.message}</S.ErrorMessage>
            )}
          </S.FormGroup>

          <div>
            <S.PopupButton type="button" onClick={handleClose}>
              취소
            </S.PopupButton>

            <S.PopupButton type="submit" disabled={isLoading}>
              {isLoading ? '처리 중...' : '비밀번호 변경'}
            </S.PopupButton>
          </div>
        </form>
      </S.PopupContainer>
    </S.PopupOverlay>
  );
}

export default PasswordPopup;
