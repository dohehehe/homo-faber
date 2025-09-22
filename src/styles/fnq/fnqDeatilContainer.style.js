'use client';
import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const DetailWrapper = styled(motion.main, {
  shouldForwardProp: (prop) => prop !== 'isMobile' && prop !== 'right' && prop !== 'bottom'
})`
  width: ${(props) => props.isMobile ? '100dvw' : 'calc(80vw - 50px)'};
  height: ${(props) => props.isMobile ? 'calc(87dvh - 47px)' : '100dvh'};
  padding: ${(props) => props.isMobile ? '0px' : '0px 20px 0px 60px'};
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
  margin-left: -30px;
  
  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 15px;
    margin-left: 13px;
    font-size: 1rem;
  }
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: flex-start;
`

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-grow: 1;
  margin-left: 5px;
  margin-top: 4px;
`

export const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  margin-left: -3px;
`

export const CreatedAt = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  font-family: var(--font-abeezee);
  color: #444;
`

export const StatusWrapper = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-left: 7px;
  margin-top: 30px;
  max-width: 500px;
`

export const InfoWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 7px;
  margin-top: 40px;
  max-width: 500px;
  margin-bottom: 20px;
`

export const InfoTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: var(--font-gothic);
  color: #333;
`

export const InfoValue = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  font-family: var(--font-gothic);
  color: #444;
  margin-right: 30px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-top: -7px;
`

export const Button = styled.button`
  padding: 7px 10px;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  font-weight: 900;
  font-family: var(--font-gothic);
  cursor: pointer;
  transition: all 0.2s ease;
  color: #444;

  &:hover {
    background-color: #DADADA;
  }
`

export const FileWrapper = styled.div`
  margin-left: 2px;
  align-items: flex-start;
  max-width: 700px;
  border: solid 1px #DADADA;
  padding: 18px 20px 15px 16px;
  border-radius: 10px;
`

export const FileList = styled.div`
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const File = styled.a`
  font-size: 1.14rem;
  font-weight: 500;
  font-family: var(--font-gothic);
  color: #444;
  text-decoration: none;
  display: block;
  transition: color 0.2s ease;
  
  &:hover {
    color:black;
    text-decoration: underline 1px;
    text-underline-offset: 4px;
  }
`

export const Detail = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  font-family: var(--font-gothic);
  color: #444;
  line-height: 1.7;
  margin-left: 6px;
  max-width: 600px;
  word-break: keep-all;
`