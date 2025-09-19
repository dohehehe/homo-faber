'use client';

import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useStores } from '@/hooks/useStores';
import Image from 'next/image';
import theme from '@/styles/Theme';

const LandingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
`;

const ContentContainer = styled.div`
  position: absolute;
  left: 113px;
  top: 18px;
  z-index: 20;
  color: white;
  opacity: 1;


  ${theme.media.mobile} {
    left: unset;
    right: 6px;
    top: 11px;
  }
`;

const Title = styled.h1`
  font-size: 1.98rem;
  font-weight: 800;
  text-align: left;
  margin-bottom: 1rem;
  font-family: Arial, sans-serif;
  line-height: 1.34;

  ${theme.media.mobile} {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
    text-align: right;
    font-weight: 700;
    line-height: 1.35;
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 1;
  animation: fadeOut 25s forwards;
  animation-delay: ${props => props.num ? `${props.num * 5}s` : '0s'};
  z-index: ${props => props.num ? `-${props.num}` : '1'};
  
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    5% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(340deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 80%);
    backdrop-filter: blur(3px);
  }
`;

const SpinnerContainer = styled.div`
  position: fixed;
  right: 50px;
  bottom: 30px;

  ${theme.media.mobile} {
    right: 20px;
    bottom: 20px;
  }
`;

const Spinner = styled.div`
  width: 3rem;
  height: 3rem;
  border: 2px solid transparent;
  border-bottom: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LandingPage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const { stores, isLoading, error } = useStores();


  useEffect(() => {
    // 4초 최소 표시 시간 보장
    const minTimer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 3000);

    return () => clearTimeout(minTimer);
  }, []);

  useEffect(() => {
    // 최소 시간이 지나고 Map3D 데이터가 로드되었을 때만 사라짐
    if (minTimeElapsed && !isLoading && !error) {
      // 페이드아웃 시작
      setIsFadingOut(true);

      // 페이드아웃 완료 후 컴포넌트 언마운트
      const fadeOutTimer = setTimeout(() => {
        setIsVisible(false);
      }, 800);

      return () => clearTimeout(fadeOutTimer);
    }
  }, [minTimeElapsed, isLoading, error]);

  if (!isVisible) {
    return children;
  }

  return (
    <>
      <LandingOverlay isVisible={!isFadingOut}>
        <ContentContainer>
          <Title>산림동의 만드는 사람들: <br />호모파베르 Homo Faber &nbsp;</Title>

          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
        </ContentContainer>
        <ImgContainer>
          <ImageWrapper num={1}>
            <Image src={`/img/(web)-01.jpg`} alt='호모파베르' fill style={{ objectFit: 'cover' }} />
          </ImageWrapper>
          <ImageWrapper num={2}>
            <Image src={`/img/(web)-02.jpg`} alt='호모파베르' fill style={{ objectFit: 'cover' }} />
          </ImageWrapper>
          <ImageWrapper num={3}>
            <Image src={`/img/(web)-03.jpg`} alt='호모파베르' fill style={{ objectFit: 'cover' }} />
          </ImageWrapper>
          <ImageWrapper num={4}>
            <Image src={`/img/(web)-04.jpg`} alt='호모파베르' fill style={{ objectFit: 'cover' }} />
          </ImageWrapper>
          <ImageWrapper num={5}>
            <Image src={`/img/(web)-05.jpg`} alt='호모파베르' fill style={{ objectFit: 'cover' }} />
          </ImageWrapper>
        </ImgContainer>
      </LandingOverlay>
      {children}
    </>
  );
};

export default LandingPage;