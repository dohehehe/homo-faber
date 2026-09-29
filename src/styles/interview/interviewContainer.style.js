'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const InterviewWrapper = styled('main', {
  shouldForwardProp: (prop) => prop !== 'hasDetail' && prop !== 'gradientCss' && prop !== 'pathname',
})`
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--header-height, 50px) + 30px) 20px 40px;
  z-index: 3;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  position: relative;
  color: #000;
  overflow: visible;
  padding-right: ${(props) =>
    props.hasDetail ? 'max(500px, calc(100% * 4 / 12 + 20px))' : '20px'};
  transition: padding-right 0.35s ease;

  ${theme.media.mobile} { 
    padding: calc(var(--header-height, 50px) + 20px) 16px 60px;
    padding-right: 16px;
  }
`;

export const InterviwPageName = styled.h1`
  display: none;
`;

export const InterviewList = styled.ul`
  width: 100%;
  color: #000;
  padding-top: 10px;

  ${theme.media.mobile} { 
    padding-top: 10px;
  }
`;

export const InterviewItem = styled.li`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: baseline;
  cursor: pointer;
  transition: color 0.2s ease;
  color: #000;

  &:hover{
    color: #a0a0a0;
  }

  ${theme.media.mobile} { 
    gap: 8px;
    margin-bottom: 12px;
  }
`;

export const InterviewStore = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  word-break: keep-all;
  letter-spacing: -0.01em;
  line-height: 1.6;

  ${theme.media.mobile} { 
    font-size: 1rem;
    margin-bottom: 0;
  }
`;
export const InterviewPerson = styled.div`   
  font-weight: 400;
  font-size: 0.8rem;
  flex-grow: 1;
  word-break: keep-all;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: #a0a0a0;
  margin-top: 0;

  ${theme.media.mobile} { 
    font-size: 0.8rem;
    margin-top: 0;
    font-weight: 400;
  }
`;
