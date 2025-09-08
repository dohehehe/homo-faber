'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const InterviewWrapper = styled(motion.main)`
  width: 100%;
  height: 100%;
  padding-left: 70px;
  padding-top: 27px;
  z-index: 3;
  background: #7C7C7C;
  background: ${(props) => props.gradientCss};
  background-size: 200% 200%;
  background-position: -100% -100%;
  cursor: ${(props) => (props.pathname && (props.pathname === '/' || props.pathname.startsWith('/interview/'))) ? 'pointer' : 'default'};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: solid 3px #DADADA;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
  font-family: var(--font-gothic);
  pointer-events: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg,rgba(124, 124, 124, 0.5) 19%, rgba(229, 229, 229, 0.3) 42%, rgba(229, 229, 229, 0.7) 95%);
  }

  ${theme.media.mobile} { 
    padding: 0px 10px 20px 10px;
  }
`;

export const InterviwPageName = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  left: 26px;

  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 22px;
    left:10px;
    font-size: 1rem;
  }
`

export const InterviewList = styled.ul`
  width: 100%;
  height: calc(100dvh + 27px);
  color: #6E6E6E;
  padding-top: 27px;
  margin-top: -27px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${theme.media.mobile} { 
    padding-top: 90px;
    overflow-y: auto;
    height: 100%;
  }
`

export const InterviewItem = styled.li`
  display: flex;
  gap: 17px;
  margin-bottom: 25px;
  text-shadow:  1px 1px 1px rgba(255, 255, 255, 0.8), -2px -1px 4px rgba(94, 86, 86, 0.9);
  mix-blend-mode: hard-light;
  background: linear-gradient(100deg, rgba(70,70,70,0.6), black);
  -webkit-background-clip: text;
  background-clip: text;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover{
    color: white;
  }

  ${theme.media.mobile} { 
    gap: 10px;
    margin-bottom: 17px;
  }
`

export const InterviewStore = styled.div`
  font-weight: 800;
  font-size: 5.5rem;

  ${theme.media.mobile} { 
    font-size: 3.3rem;
    margin-bottom: 0px;
  }
`
export const InterviewPerson = styled.div`   
  font-weight: 700;
  font-size: 2rem;

  ${theme.media.mobile} { 
    font-size: 1.5rem;
  }
`