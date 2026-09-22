'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const InterviewWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'gradientCss' && prop !== 'pathname',
})`
  width: 100%;
  height: 100%;
  padding: 50px 20px 20px;
  z-index: 3;
  background: #ffffff;
  cursor: ${(props) => (props.pathname && (props.pathname === '/' || props.pathname.startsWith('/interview/'))) ? 'pointer' : 'default'};
  display: flex;
  flex-direction: column;
  border-left: 0.5px solid #efefef;
  position: relative;
  color: #000;

  ${theme.media.mobile} { 
    padding: 50px 16px 20px;
    border-left: unset;
    border-top: 0.5px solid #efefef;
  }
`;

export const InterviwPageName = styled.h1`
  display: none;
`;

export const InterviewList = styled.ul`
  width: 100%;
  height: 100%;
  color: #000;
  padding-top: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${theme.media.mobile} { 
    padding-top: 10px;
    overflow-y: auto;
    height: 100%;
    margin-top: 0;
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