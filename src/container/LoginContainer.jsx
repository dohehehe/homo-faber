'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Loader from '@/components/common/Loader';
import Error from '@/components/common/Error';

const LoginWrapper = styled(motion.main)`
  width: 100%;
  height: 100%;
  padding-left: 70px;
  padding-top: 27px;
  z-index: 3;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: solid 3px #DADADA;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
  font-family: var(--font-gothic);
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg, rgba(102, 126, 234, 0.3) 19%, rgba(118, 75, 162, 0.2) 42%, rgba(102, 126, 234, 0.4) 95%);
  }
`;

const LoginPageName = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  left: 26px;
  color: white;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 400px;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: var(--font-gothic);
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  font-family: var(--font-gothic);
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 14px;
  margin: 0;
  font-family: var(--font-gothic);
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-gothic);
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 20px;
  font-family: var(--font-gothic);
  
  a {
    color: #007bff;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

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
        throw error;
      }

      if (data?.user) {
        router.push('/mypage');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginWrapper onClick={handleLoginWrapperClick}>
      <LoginPageName>로그인</LoginPageName>
      <LoginForm onSubmit={handleSubmit(onSubmit)} onClick={(e) => e.stopPropagation()}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontFamily: 'var(--font-gothic)',
          color: '#333'
        }}>
          로그인
        </h2>

        <FormGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
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
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
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
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        {error && <Error message={error} size="small" showIcon={false} />}

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Loader size="small" showText={false} />
              로그인 중...
            </div>
          ) : '로그인'}
        </SubmitButton>

        <SignupLink>
          계정이 없으신가요? <Link href="/signup">회원가입</Link>
        </SignupLink>
      </LoginForm>
    </LoginWrapper>
  );
}

export default LoginContainer;
