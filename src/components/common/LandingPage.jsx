'use client';

import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import theme from '@/styles/Theme';

const LandingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-in-out;
  opacity: ${props => props.isVisible ? 1 : 0};
  pointer-events: ${props => props.isVisible ? 'auto' : 'none'};
`;

const ContentContainer = styled.div`
  position:absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  justify-content: center;
  align-items:center;
  z-index: 20;
  color: white;
  opacity: 1;
  word-break: keep-all;
`;

const Title = styled.h1`
  font-size: 5rem;
  color: white;
  text-shadow: 0 0 10px black;
  // text-stroke: 1px var(--yellow);
  // -webkit-text-stroke: 1px var(--yellow);
  font-weight: 900;
  text-align: center;
  // margin-bottom: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.34;
  padding-bottom: 50px;

  ${theme.media.mobile} {
    font-size: 3rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  // margin-bottom: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.34;
  // padding-top: 160px; 
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.9);
  margin-top: auto;

  ${theme.media.mobile} {
    font-size: 1.3rem;
  }
`;

const Intro = styled.h3`
  font-size: 2rem;
  margin-top: auto;
  font-weight: 600;
  text-align: center;
  margin-bottom: 15px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.34;
  color: white;
  text-shadow: 0 0 5px black;

  ${theme.media.mobile} {
    font-size: 1.4rem;
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
`;
;



const LandingPage = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LandingOverlay isVisible={isVisible}>
        <ContentContainer>
          <Intro>을지로의 제조업을 살리다</Intro>
          <Title>청계천·을지로 기술유통중개소: 호모파베르</Title>
          <SubTitle>기술유통중개소에서 기술자들을 쉽게 만나보세요</SubTitle>
        </ContentContainer>
        <ImgContainer>
          <img src={`/img/DSC03100.jpg`} alt='호모파베르' style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </ImgContainer>
      </LandingOverlay>
      {children}
    </>
  );
};

export default LandingPage;