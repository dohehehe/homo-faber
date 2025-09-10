'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const DetailWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'right' && prop !== 'bottom'
})`
  width: ${(props) => props.isMobile ? '100dvw' : 'calc(80vw - 50px)'};
  height: ${(props) => props.isMobile ? 'calc(87dvh - 47px)' : '100dvh'};
  padding: ${(props) => props.isMobile ? '0px' : '0px 10dvw 0px 60px'};
  background-color: #F7F7F7;
  position: fixed;
  right: ${(props) => props.isMobile ? 'unset' : props.right};
  bottom: ${(props) => props.isMobile ? props.bottom : 'unset'};
  top: ${(props) => props.isMobile ? 'unset' : '0px'};
  z-index: 4;
  box-shadow: -2px 0 4px 0 rgba(84,84,84,0.57);
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  }
`
export const DetailPageName = styled.h1`
  font-family: var(--font-gothic);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: sticky;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  margin-left: -29px;
  
  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 15px;
    margin-left: 13px;
    font-size: 1rem;
  }
`

export const InterviewHeader = styled.div`
  display: flex;
  gap: 2dvw;
  margin-top: -14px;
  position: relative;
  min-height: 70dvh;

  ${theme.media.mobile} {
    flex-direction: column;
    gap: 0px;
    margin-top: 0px;
    align-items: center;
    min-height: unset;
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

  ${theme.media.mobile} {
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
  font-weight: 800;
  font-size: 6.5dvw;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-color:rgb(101, 101, 101);
  text-shadow: 0px 0px 3px rgba(166, 166, 166, 0.43), -0.1px 1px 4px rgba(95, 87, 87, 0.5), 1px -1px 1px rgba(255, 255, 255, 0.78);
  position: relative;
  padding-top: 7px;
  transition: text-shadow .4s ;
  margin-right: -50px;

  &:hover{
    text-shadow: 0px 2px 3px rgba(221, 221, 221, 0.8), -0.5px -0.1px 5px rgba(100,92,92,0.6), 2px 2px 10px rgba(255,255,255,0.5);
  }

  ${theme.media.mobile} {
    font-size: 4.4rem;
    background-color:rgb(100, 100, 100);
    text-shadow: 1px 0px 2px rgba(245, 245, 245, 0.43), -0.1px -0.1px 4px rgba(178, 176, 176, 0.71), 0px 0px 1px rgba(255, 255, 255, 0.78);
    padding-top: 0px;
    text-outline: 0.5px black;
    -webkit-text-stroke: 0.1px rgba(161, 161, 161, 0.6);
    margin-right: 0px;

    &:hover{
      text-shadow: 1px 0px 2px rgba(245, 245, 245, 0.43), -0.1px -0.1px 4px rgba(178, 176, 176, 0.71), 0px 0px 1px rgba(255, 255, 255, 0.78);
      background-color:rgb(190, 190, 190);

    }
  }
`
export const InterviewPerson = styled.h3`
  font-weight: 800;
  font-size: 3dvw;
  padding-top: 4px;
  background-color:rgb(121, 121, 121);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 3px 4px 5px rgba(245, 245, 245, 0.3), -0.1px -0.1px 6px rgba(100,92,92,0.2), 2px 2px 2px rgba(255,255,255,0.5);
  margin-left: 12px;

  ${theme.media.mobile} {
    font-size: 2.4rem;
    z-index: 10;
    margin-top: 0px;
    background-color:rgb(72, 72, 72);
    text-shadow: 1px 0px 0px rgba(245, 245, 245, 0.43), -0.1px -0.1px 4px rgba(56, 50, 50, 0.64), 0px 0px 1px rgba(255, 255, 255, 0.78);
    -webkit-text-stroke: 0.1px rgba(198, 198, 198, 0.82);
    margin-left: 0px;
  }
`
export const InterviewIntro = styled.h4`
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.75;
  word-break: keep-all;
  text-align: left;
  position: absolute;
  bottom: -7px;
  color:rgb(84, 84, 84);
  width: 47%;
  min-width: 350px;
  margin-left: 20px;
  mix-blend-mode: multiply;

  ${theme.media.mobile} {
    position: static;
    font-size: 1.1rem;
    width: 100%;
    padding: 0 20px;
    mix-blend-mode: normal;
    bottom: 0px;
    margin-top: 80px;
    margin-left: 0px;
    color:rgb(34, 34, 34);
    order: 3;
    text-align: center;
  }
`

export const InterviewCoverImg = styled.img`
  max-height: 95dvh;
  max-width: 70%;
  margin-right: -10dvw;
  margin-left: auto;
  object-fit: cover;
  border-radius: 0% 0 0% 43%;

  ${theme.media.mobile} {
    width: 110dvw;
    height: auto;
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

  ${theme.media.mobile} {
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

    ${theme.media.mobile} {
      width: 100dvw;
      margin-left: 0px;
      margin-top: -700px;
      padding-top: 500px;
      font-size: 1.3rem;
    }
`