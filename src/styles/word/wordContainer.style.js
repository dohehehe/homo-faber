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
    padding: 30px 10px;
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

  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 22px;
    left:10px;
    font-size: 1rem;
  }
`;

export const WordItemWrapper = styled.section`
  display:flex;
  overflow-y: hidden;
`;

export const WordList = styled.ul`
  color: #2E5BBA;
  padding-top: 24px;
  overflow-y: auto;
  z-index: 2;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
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
  font-size: 4.5rem;

  ${theme.media.mobile} {
    font-size: 2.3rem;
  }
`;

export const WordMeaningsContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-top: 15px;
  margin-left: -400px;
  padding-left: 400px;
  padding-right: 100px;
  height: 100dvh;
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 400px;
  z-index: 1;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(46, 91, 186, 0.3);
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(46, 91, 186, 0.5);
  }
`;

export const WordMeaning = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  border-radius: 15px;
  font-weight: 600;
  font-size: 1.3rem;
  line-height: 1.6;
  word-break: keep-all;
  color: #2E5BBA;
  max-width: 400px;
  z-index: 1000;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  animation: slideIn 0.4s ease-out;
  margin: 10px;
  box-shadow: 2px 1px 10px 3px rgba(79, 90, 247, 0.2);
  
  @keyframes slideIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;


export const SearchContainer = styled.aside`
  position: absolute;
  top: 20px;
  right: 70px;
  z-index: 10;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SearchInput = styled.input`
  padding: 10px 15px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: #2E5BBA;
  font-size: 1rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  min-width: 200px;

  &::placeholder {
    color: rgba(46, 91, 186, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  background: rgba(46, 91, 186, 0.8);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(46, 91, 186, 1);
    border-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;


export const ClearButton = styled.button`
  padding: 8px 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #2E5BBA;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.8);
  }
`;