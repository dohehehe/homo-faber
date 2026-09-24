'use client';
import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const WordWrapper = styled.main`
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--header-height, 50px) + 30px) 20px 40px;
  position: relative;
  background: #ffffff;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000;

  ${theme.media.mobile} {
    padding: calc(var(--header-height, 50px) + 20px) 16px 60px;
    align-items: stretch;
  }
`;

export const WordPageName = styled.h1`
  display: none;
`;

export const WordSearchWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  z-index: 3;
  margin-bottom: 8px;
  align-self: center;
`;

export const SearchField = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 300px;
  height: 30px;
  padding: 0 8px;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  color: #000;

  ${theme.media.mobile} {
    width: 100%;
  }
`;

export const SearchLabel = styled.span`
  flex-shrink: 0;
  color: #000;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: transparent;
  outline: none;
  color: #000;

  &::placeholder {
    color: #c7c7c7;
  }
`;

export const WordItemWrapper = styled.section`
  display: flex;
  width: 100%;
`;

export const WordList = styled.ul`
  color: #000;
  margin-top: 0;
  padding-top: 20px;
  z-index: 2;
  width: 100%;
  text-align: left;

  ${theme.media.mobile} {
    padding-top: 20px;
    text-align: left;
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
  position: fixed;
  top: calc(var(--header-height, 50px) + 20px);
  right: 20px;
  width: min(420px, calc(100vw - 40px));
  max-height: calc(100dvh - var(--header-height, 50px) - 40px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 50;
  pointer-events: none;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  ${theme.media.mobile} {
    top: calc(var(--header-height, 50px) + 10px);
    right: 16px;
    left: 16px;
    width: auto;
    max-height: calc(100dvh - var(--header-height, 50px) - 30px);
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
  pointer-events: auto;
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
