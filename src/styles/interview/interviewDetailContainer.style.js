'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const DetailWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'isMobile'
})`
  width: calc(100% * 4 / 12);
  min-width: 500px;
  height: calc(100dvh - var(--header-height, 50px));
  padding: 15px;
  background-color: #fbfbfb;
  position: fixed;
  right: 0;
  top: var(--header-height, 50px);
  z-index: 40;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  border-left: 0.5px solid #efefef;

  ${theme.media.mobile} {
    width: 100%;
    min-width: 0;
    top: var(--header-height, 50px);
    height: calc(100dvh - var(--header-height, 50px));
    left: 0;
    right: 0;
    border-left: none;
    padding: 15px;
    gap: 15px;
  }
`;

export const DetailPageName = styled.h1`
  display: none;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

export const CloseButton = styled.button`
  width: 21px;
  height: 21px;
  padding: 5px;
  border: none;
  border-radius: 20px;
  background: #d5d5d5;
  color: #000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;

  img,
  svg {
    width: 11px;
    height: 11px;
    display: block;
  }
`;

export const InterviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
`;

export const InterviewTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-align: left;
  min-width: 0;
`;

export const InterviewStore = styled.h2`
  font-weight: 700;
  font-size: 1.2rem;
  color: #000;
  letter-spacing: -0.01em;
  line-height: 1.4;
`;

export const InterviewPerson = styled.h3`
  font-weight: 400;
  font-size: 0.8rem;
  color: #a0a0a0;
  letter-spacing: -0.01em;
  line-height: 1.6;
`;

export const InterviewIntro = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: -0.01em;
  word-break: keep-all;
  color: #000;
  margin: 0 0 16px;
`;

export const InterviewCoverImg = styled.img`
  width: 100%;
  max-height: 280px;
  object-fit: cover;
  object-position: center;
  border-radius: 4px;
  margin-bottom: 16px;
`;

export const InterviewInfo = styled.div`
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 8px;
`;

export const InterviewLink = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0 8px;
  text-align: left;
  font-size: 0.8rem;
  line-height: 1.6;
  font-weight: 400;
  color: #a0a0a0;
  word-break: keep-all;

  span {
    font-weight: 700;
    color: #000;
  }

  a {
    color: #000;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
    margin-top: 8px;
    font-weight: 400;
  }
`;
