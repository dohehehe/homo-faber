'use client';
import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const WordWrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-left: 70px;
  position: relative;
  background:rgb(74, 144, 226);
  background: ${(props) => props.gradientCss};
  background-size: 200% 200%;
  background-position: -100% -100%;
  cursor: ${(props) => (props.pathname && (props.pathname === '/' || props.pathname.startsWith('/word/'))) ? 'pointer' : 'default'};
  transition: 3s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: solid 1px rgba(149, 178, 241, 0.51);
  box-shadow: -8px 4px 10px 0 rgba(0, 0, 0, 0.12);
  font-family: var(--font-gothic);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(270deg,rgba(74, 144, 226, 0.3) 19%, rgba(229, 229, 229, 0.3) 42%, rgba(229, 229, 229, 0.7) 95%);
  }

  ${theme.media.mobile} {
    padding: 30px 0px;
    border-left: 0;
    border-top: solid 1px rgba(149, 178, 241, 0.51);
    box-shadow: 0px -4px 10px 0 rgba(9, 11, 54, 0.69);
  }
`;

export const WordPageName = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  left: 30px;
  z-index: 3;

  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 12px;
    left:10px;
    font-size: 1rem;
  }
`;

export const WordSearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  z-index: 3;

  ${theme.media.mobile} {
      position: fixed;
  }
`;

export const WordItemWrapper = styled.section`
  display:flex;
  gap: 5%;
  // overflow-y: visible;

  ${theme.media.mobile} {
    gap: 0px;
    padding-left: 10px;
  }
`;

export const WordList = styled.ul`
  color: #2E5BBA;
  margin-top: -65px;
  padding-top: 110px;
  z-index: 2;
  overflow-y: auto;
  height: 100dvh;
  min-width: 300px;


  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${theme.media.mobile} {
    margin-top: -30px;
    padding-top: 50px;
    min-width: 175px;
  }
`;

export const WordItem = styled.li`
  margin-bottom: 25px;
  text-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8), -2px -1px 4px rgba(46, 91, 186, 0.9);
  mix-blend-mode: hard-light;
  background: linear-gradient(100deg, rgba(46, 91, 186, 0.6), black);
  -webkit-background-clip: text;
  background-clip: text;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  position: relative;
  word-break: keep-all;
  line-height: 1.1;
  
  &:hover {
    color: white;
  }
  
  &.active {
    color: white;
  }

  ${theme.media.mobile} {
    margin-bottom: 15px;
  }
`;

export const WordTitle = styled.h2`
  font-weight: 800;
  font-size: 4rem;

  ${theme.media.mobile} {
    font-size: 2.3rem;
  }
`;

export const WordMeaningsContainer = styled.section`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
  margin-right: 13px;
  overflow-x: hidden;
  height: 100dvh;
  margin-top: -65px;
  padding-top: 96px;
  overflow-y: auto;
  padding-bottom: 20px;
  max-width: 500px;
  margin-left: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  ${theme.media.mobile} {
      margin-right: 0px;
      margin-top: -30px;
      padding-top: 35px;
      padding-bottom: 100px;
  }
`;

export const WordMeaning = styled.div`
  font-family: var(--font-gothic);
  background: rgba(255, 255, 255, 0.95);
  padding: 20px 30px 18px 23px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.6;
  word-break: keep-all;
  color: #2E5BBA;
  z-index: 2;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  animation: slideIn 0.4s ease-out;
  margin: 10px;
  box-shadow: 4px 2px 10px 3px rgba(79, 90, 247, 0.23);
  
  @keyframes slideIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  ${theme.media.mobile} {
    font-size: 1rem;
    flex-direction: column;
    padding: 15px 15px 10px 10px;
    gap: 10px;
  }
`;

export const WordMeaningTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 800;
  color: #2E5BBA;
  position: relative;

  ${theme.media.mobile} {
    font-size: 1.2rem;
    width: 100%;
  }
`;

export const WordMeaningContent = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #2E5BBA;

  ${theme.media.mobile} {
    font-size: 1rem;
  }
`;

export const WordMeaningImage = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 4px;
  display: block;
  margin-top: 10px;
  margin-left: 3px;
  // margin-right: 15px;

  ${theme.media.mobile} {
    width: 100%;
    height: auto;
    max-width: unset;
  }
`;

export const WordMeaningCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #666;
  cursor: pointer;
  position: absolute;
  top: 9px;
  font-weight: 700;
  right: 15px;
  color: #2E5BBA;

  ${theme.media.mobile} {
    right: 10px;
    top: 3px;
  }
`;
