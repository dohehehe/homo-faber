'use client';
import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const WordWrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 50px 20px 20px;
  position: relative;
  background: #ffffff;
  cursor: ${(props) => (props.pathname && (props.pathname === '/' || props.pathname.startsWith('/word/'))) ? 'pointer' : 'default'};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: 0.5px solid #efefef;
  color: #000;

  ${theme.media.mobile} {
    padding: 50px 16px 20px;
    border-left: 0;
    border-top: 0.5px solid #efefef;
  }
`;

export const WordPageName = styled.h1`
  display: none;
`;

export const WordSearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 0;
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
  }
`;

export const WordList = styled.ul`
  color: #000;
  margin-top: 0;
  padding-top: 20px;
  z-index: 2;
  overflow-y: auto;
  height: 100%;
  min-width: 220px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${theme.media.mobile} {
    margin-top: 0;
    padding-top: 20px;
    min-width: 140px;
  }
`;

export const WordItem = styled.li`
  margin-bottom: 12px;
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;
  word-break: keep-all;
  line-height: 1.6;
  color: #000;
  
  &:hover {
    color: #a0a0a0;
  }
  
  &.active {
    color: #000;
  }

  ${theme.media.mobile} {
    margin-bottom: 10px;
  }
`;

export const WordTitle = styled.h2`
  font-weight: 400;
  font-size: 1.2rem;
  letter-spacing: -0.01em;
  line-height: 1.6;

  ${theme.media.mobile} {
    font-size: 1rem;
  }
`;

export const WordMeaningsContainer = styled.section`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-grow: 1;
  margin-right: 0;
  overflow-x: hidden;
  height: 100%;
  margin-top: 0;
  padding-top: 10px;
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
      margin-top: 0;
      padding-top: 10px;
      padding-bottom: 100px;
  }
`;

export const WordMeaning = styled.div`
  background: #fbfbfb;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 5px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  letter-spacing: -0.01em;
  word-break: keep-all;
  color: #000;
  z-index: 2;
  position: relative;
  animation: slideIn 0.4s ease-out;
  margin: 0 0 10px;
  
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
    padding: 15px;
    gap: 10px;
  }
`;

export const WordMeaningTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #000;
  position: relative;
  letter-spacing: -0.01em;

  ${theme.media.mobile} {
    font-size: 1rem;
    width: 100%;
  }
`;

export const WordMeaningContent = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  letter-spacing: -0.01em;
  line-height: 1.6;

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
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 9px;
  font-weight: 400;
  right: 15px;
  color: #a0a0a0;

  ${theme.media.mobile} {
    right: 10px;
    top: 8px;
  }
`;
