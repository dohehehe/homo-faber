'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const DetailWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'isMobile'
})`
  width: ${(props) => props.isMobile ? '100dvw' : 'calc(80vw - 50px)'};
  height: ${(props) => props.isMobile ? 'calc(87dvh - 42px)' : '100dvh'};
  padding: 50px 10dvw 0px 60px;
  background-color: #ffffff;
  position: fixed;
  right: ${(props) => props.isMobile ? 'unset' : '0px'};
  bottom: ${(props) => props.isMobile ? '0px' : 'unset'};
  top: ${(props) => props.isMobile ? 'unset' : '0px'};
  z-index: 6;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${theme.media.mobile} {
    padding: 0px !important;
    box-shadow: 0px 0 8px 2px rgba(109, 109, 109, 0.66);
  }
`;
export const DetailPageName = styled.h1`
  display: none;
`;

export const InterviewHeader = styled.div`
  display: flex;
  gap: 2dvw;
  margin-top: -14px;
  position: relative;
  min-height: 90dvh;
  justify-content: flex-end;

  ${theme.media.tablet} {
    flex-direction: column;
    gap: 0px;
    margin-top: 0px;
    align-items: center;
    min-height: unset;
    justify-content: unset;
  }
`

export const InterviewTitle = styled.div`
  font-family: var(--font-gothic);
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: -12px;
  text-align: left;
  position: absolute;
  top:28px;
  left: 0px;

  ${theme.media.tablet} {
    gap: 10px;
    position: static;
    top: unset;
    left: unset;
    text-align: center;
    margin-top: -140px;
    order:2;
  }
`
export const InterviewStore = styled.h2`
  font-weight: 700;
  font-size: 2rem;
  color: #000;
  letter-spacing: -0.01em;
  line-height: 1.4;
  position: relative;
  padding-top: 7px;
  margin-right: -50px;

  ${theme.media.tablet} {
    font-size: 1.6rem;
    padding-top: 0px;
    margin-right: 0px;
  }
`;
export const InterviewPerson = styled.h3`
  font-weight: 400;
  font-size: 1rem;
  padding-top: 4px;
  color: #a0a0a0;
  letter-spacing: -0.01em;
  line-height: 1.6;
  margin-left: 0;

  ${theme.media.tablet} {
    font-size: 1rem;
    z-index: 10;
    margin-top: 0px;
    margin-left: 0px;
  }
`;
export const InterviewIntro = styled.span`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: -0.01em;
  word-break: keep-all;
  text-align: left;
  position: absolute;
  left: 0px;
  bottom: -60px;
  color: #000;
  width: 47%;
  min-width: 350px;
  margin-left: 20px;
  z-index: 2;
  display: inline;

  ${theme.media.tablet} {
    position: static;
    font-size: 1rem;
    width: 100%;
    padding: 0 20px;
    mix-blend-mode: normal;
    bottom: 0px;
    margin-top: 80px;
    margin-left: 0px;
    color: #000;
    order: 3;
    text-align: center;
    text-decoration: unset;
  }
`;

export const InterviewCoverImg = styled.img`
  // max-height: 100dvh;
  max-width: 80dvw;
  height: 100dvh;
  margin-right: -10dvw;
  margin-left: -40px;
  // text-align: right;
  object-fit: cover;
  object-position: center;
  border-radius: 0% 0 0% 43%;

  ${theme.media.tablet} {
    max-height: 70dvh;
    width: 130dvw;
    min-height: 40dvh;
    object-position: center;
    margin-right: 0px;
    margin-left: 0px;
    border-radius: 0 0 50% 50%;
    position: static;
    margin-top: -26px;
    max-width: unset;
    z-index: -1;
  }
`

export const InterviewInfo = styled.div`
  font-weight: 500;
  font-size: 1.1rem;
  margin-bottom: 8px;
  margin-left: auto;

  & :first-of-type{
    margin-top: 200px;
  }

  ${theme.media.tablet} {
    font-size: 1rem;
    margin-right: 20px;
  }
`

export const InterviewLink = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 500px;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
    line-height: 1.4;
    font-weight: 600;
    color: rgb(94, 94, 94);
    position: relative;
    width: calc(80vw - 50px);
    margin-left: -60px;
    margin-top: -800px;
    height: 600px;
    flex-shrink: 0;
    z-index: 1;
    background: linear-gradient(to top, 
      rgba(247, 247, 247, 1) 0%, 
      rgba(247, 247, 247, 0.9) 20%, 
      rgba(247, 247, 247, 0.8) 50%, 
      rgba(247, 247, 247, 0.3) 80%, 
      rgba(247, 247, 247, 0.1) 90%, 
      rgba(247, 247, 247, 0) 100%
    );

    a {
      color: rgb(47, 0, 255);
      text-decoration: underline wavy 1px;
      text-underline-offset: 8px;
      cursor: pointer;
      margin-top: 40px;
      font-weight: 900;
      letter-spacing: 0.1rem;
    }

    ${theme.media.tablet} {
      margin-top: -700px;

      
    }

    ${theme.media.mobile} {
      width: 100dvw;
      margin-left: 0px;
      margin-top: -700px;
      padding-top: 500px;
      font-size: 1.3rem;
    }
`