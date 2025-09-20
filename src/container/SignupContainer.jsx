'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import * as S from '@/styles/user/userContainer.style';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import TermsPopup from '@/components/common/TermsPopup';
import termsData from '@/data/terms.json';
import Popup from '@/components/common/Popup';


function SignupContainer({ onLoadComplete }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [termsPopup, setTermsPopup] = useState({ isOpen: false, type: null });
  const { signUp } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const password = watch('password');

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


  // 약관 팝업 열기
  const openTermsPopup = (type) => {
    setTermsPopup({ isOpen: true, type });
  };

  // 약관 팝업 닫기
  const closeTermsPopup = () => {
    setTermsPopup({ isOpen: false, type: null });
  };

  // 회원가입 패널 클릭 시 홈으로 이동
  const handleSignupWrapperClick = () => {
    if (pathname === '/') {
      router.push('/signup');
    } else if (pathname.startsWith('/signup/')) {
      router.push('/signup');
    }
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError('');

    try {
      // 동의서 체크는 유효성 검사용이므로 실제 데이터에서는 제외
      const { agreement, ...signupData } = formData;

      const { data, error } = await signUp(signupData.email, signupData.password, {
        name: signupData.name,
      });

      if (error) {
        // Supabase 에러 메시지를 사용자 친화적으로 변환
        let errorMessage = error.message;
        if (error.message.includes('User already registered')) {
          errorMessage = '이미 등록된 이메일입니다.';
        }
        setError(errorMessage);
        return;
      }

      if (data?.user) {
        router.push('/mypage');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.UserWrapper
      onClick={handleSignupWrapperClick}
    >
      <S.PageName>회원가입</S.PageName>
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
          <S.Label htmlFor="name">이름</S.Label>
          <S.Input
            type="text"
            id="name"
            placeholder="이름을 입력해주세요"
            {...register('name', { required: '이름을 입력해주세요' })}
          />
          {errors.name && <S.ErrorMessage>{errors.name.message}</S.ErrorMessage>}
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

        <S.FormGroup>
          <S.Label htmlFor="confirmPassword">비밀번호 확인</S.Label>
          <S.Input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호를 다시 입력해주세요"
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || '비밀번호가 일치하지 않습니다',
            })}
          />
          {errors.confirmPassword && <S.ErrorMessage>{errors.confirmPassword.message}</S.ErrorMessage>}
        </S.FormGroup>

        <S.FormGroup>
          <S.CheckboxContainer>
            <S.Checkbox
              type="checkbox"
              id="agreement"
              {...register('agreement', {
                required: '*이용약관 및 개인정보처리방침에 동의해주세요.',
              })}
            />
            <S.CheckboxLabel htmlFor="agreement">
              <S.CheckboxText>
                (필수)&nbsp;
                <S.CheckboxLink onClick={(e) => { e.preventDefault(); openTermsPopup('terms'); }}>
                  이용약관
                </S.CheckboxLink> 및&nbsp;
                <S.CheckboxLink onClick={(e) => { e.preventDefault(); openTermsPopup('privacy'); }}>
                  개인정보처리방침
                </S.CheckboxLink>에
                동의합니다.
              </S.CheckboxText>
            </S.CheckboxLabel>
          </S.CheckboxContainer>
          {errors.agreement && <S.CheckboxError>{errors.agreement.message}</S.CheckboxError>}
        </S.FormGroup>

        <Popup
          isVisible={!!error}
          message={error}
          onClose={() => setError('')}
          type="error"
        />

        <S.ButtonWrapper>
          <S.SubmitButton
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              '가입 중...'
            ) : '회원가입'}
          </S.SubmitButton>
        </S.ButtonWrapper>
      </S.UserForm>

      {/* 약관 팝업 */}
      <TermsPopup
        isOpen={termsPopup.isOpen}
        onClose={closeTermsPopup}
        type={termsPopup.type}
        content={termsPopup.type ? termsData[termsPopup.type] : null}
      />
    </S.UserWrapper>
  );
}

export default SignupContainer; 
