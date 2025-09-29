'use client'

import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const FnqWrapper = styled(motion.main)`
  width: 100%;
  height: 100dvh;
  padding-left: 70px;
  // padding-top: 27px;
  z-index: 3;
  background:rgb(255, 255, 255);
  cursor: ${(props) => (props.pathname && (props.pathname === '/' || props.pathname.startsWith('/interview/'))) ? 'pointer' : 'default'};
  display: flex;
  flex-direction: column;
  border-left: solid 3px #DADADA;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
  font-family: var(--font-gothic);
  pointer-events: auto;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${theme.media.mobile} { 
    padding: 0px 12px 0px 10px;
    height: calc(87dvh);
    overflow-y: hidden;
    border-left: none;
    box-shadow: 0px -8px 10px 0 rgba(62, 62, 62, 0.76);
    border-top: solid 1px #DADADA;
  }
`;

export const FnqPageName = styled.h1`
  font-family: var(--font-gothic);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  left: 28px;
  
  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    position: sticky;
    top: 12px;
    left: 10px;
    font-size: 1rem;
    z-index: 3;
  }
`

export const FnqContext = styled.div`
  font-size: 1.3rem;
  font-family: var(--font-gothic);
  font-weight: 700;
  color: #333;
  line-height: 1.8;
  word-break: keep-all;
  max-width: 600px;
  padding-top: 120px;

  ${theme.media.mobile} { 
    font-size: 1.1rem;
    padding-left: 0px;
    margin-top: -20px;
    padding-right: 10px;
    padding-top: 70px;
  }
`

export const FnqContextItem = styled.p`
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  padding-left: 24px;
  text-indent: -22px;

  ${theme.media.mobile} { 
    padding-left: 20px;
    text-indent: -18px;
    margin-top: 10px;
  }
`

export const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
  gap: 90px;
  padding-left: 5px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  margin-top: -13px;
  padding-bottom: 40px;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }


  ${theme.media.mobile} { 
    gap: 50px;
    padding-top: 0px;
    padding-left: 0px;
    padding-right: 4px;
    // width: 100%;
    height: calc(87dvh - 37px);
    padding-bottom: 50px;
  }
`;

export const FnqUserForm = styled(UserForm)`
  margin-top: 0px;

  ${theme.media.mobile} { 
    margin-top: -13px;
    padding-bottom: 200px;
    overflow-x: hidden;
    // width: 100dvw;
  }
`;


export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 10px;
  margin-right: 10px;
  right: 10px;
  margin-top: -10px;
  z-index: 5;
  gap: 20px;

  ${theme.media.mobile} { 
    margin-top: 0px;
    position: sticky;
    top: 4px;
    margin-right: -30px;
    right: -8px;
    gap: 22px;
    flex-direction: row;
    margin-left: auto;
  }
`;

export const FnqEditButtonWrapper = styled(ButtonWrapper)`
  top: 10px;
  margin-top: -20px;

  ${theme.media.mobile} { 
    right: -10px;
  }
`;

export const SubmitButton = styled.button`
  padding: 7px 10px;
  background-color: transparent;
  border: none;
  font-size: 3.7rem;
  font-weight: 900;
  font-family: var(--font-gothic);
  cursor: pointer;
  transition: all 0.2s ease;
  color: #444;
  margin-left: auto;
  margin-top: 70px;
  border-radius: 20px;
  padding-top: 14px;
  position: sticky;
  bottom: -30px;
  right: 15px;

  &:hover {
    background-color: #DADADA;
  }

  ${theme.media.mobile} { 
    position: relative;
    right: unset;
    margin: 0 auto;
    padding: 5px 10px;
    font-weight: 800;
    margin-top: 50px;
    bottom: unset;
  }
`;


export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 530px;
  position: relative;

  ${theme.media.mobile} { 
    gap: 8px;
    max-width: unset;
  }
`;

export const Label = styled.label`
  font-family: var(--font-gothic);
  font-weight: 900;
  font-size: 1.7rem;
  transform: scaleX(0.8);
  transform-origin: left;
  margin-left: 4px;

  ${theme.media.mobile} { 
    font-size: 1.4rem;
    margin-left: 1px;
  }
`;

export const Input = styled.input`
  padding: 18px 16px 15px 16px;
  border: 1px solid #D9D9D9;
  border-radius: 13px;
  font-size: 1.2rem;
  font-family: var(--font-gothic);
  transition: border-color 0.2s ease;
  background: #F9F9F9;
  box-shadow: inset 1px 2px 8px 0 rgba(0, 0, 0, 0.25);
  font-weight: 800;
  color: #222;
  
  &:focus {
    outline: none;
    border: 2px solid #D6D6D6;
    background: #D6D6D6;
    box-shadow: inset 2px 2px 8px 0 rgb(103, 103, 103, 0.48);
    padding: 17px 16px 14px 16px;
  }
  
  &::placeholder {
    color: #999;
    font-weight: 500;
  }

  &:invalid {
    border: 2px solid rgba(214, 214, 214, 0);
    background: #FFFFFF;
    box-shadow: 0px 0px 4px 2px rgba(255, 0, 0, 0.83), inset 2px 2px 8px 0 rgb(103, 103, 103, 0.48);
    padding: 17px 16px 14px 16px;
  }

  ${theme.media.mobile} { 
    padding: 14px 12px 11px 12px;
    font-size: 1rem;

    &:focus {
      padding: 13px 12px 10px 12px;
    }

    &:invalid {
      padding: 13px 12px 10px 12px;
      box-shadow: 0px 0px 3px 1px rgba(255, 0, 0, 0.83), inset 2px 2px 8px 0 rgb(103, 103, 103, 0.48);
    }
  }
`;

export const InputTextarea = styled.textarea`
  padding: 18px 16px 15px 16px;
  border: 1px solid #D9D9D9;
  border-radius: 13px;
  font-size: 1.2rem;
  font-family: var(--font-gothic);
  transition: border-color 0.2s ease;
  background: #F9F9F9;
  box-shadow: inset 1px 2px 8px 0 rgba(0, 0, 0, 0.25);
  font-weight: 600;
  color: #222;
  min-height: 500px;
  line-height: 1.6;
  
  &:focus {
    outline: none;
    border: 2px solid #D6D6D6;
    background: #D6D6D6;
    box-shadow: inset 2px 2px 8px 0 rgb(103, 103, 103, 0.48);
    padding: 17px 16px 14px 16px;
  }
  
  &::placeholder {
    color: #999;
    font-weight: 500;
  }

  &:invalid {
    border: 2px solid rgba(214, 214, 214, 0);
    background: #FFFFFF;
    box-shadow: 0px 0px 4px 2px rgba(255, 0, 0, 0.83), inset 2px 2px 8px 0 rgb(103, 103, 103, 0.48);
    padding: 17px 16px 14px 16px;
  }

  ${theme.media.mobile} { 
    padding: 14px 12px 11px 12px;
    font-size: 1.1rem;

    &:focus {
      padding: 13px 12px 10px 12px;
    }

    &:invalid {
      padding: 13px 12px 10px 12px;
      box-shadow: 0px 0px 3px 1px rgba(255, 0, 0, 0.83), inset 2px 2px 8px 0 rgb(103, 103, 103, 0.48);
    }
  }
`;

export const ErrorMessage = styled.p`
  position: absolute;
  bottom: -26px;
  left: 0;
  color: #dc3545;
  padding: 2px 6px;
  font-size: 1rem;
  margin-left: 6px;
  font-family: var(--font-gothic);
  font-weight: 600;

  ${theme.media.mobile} { 
    bottom: -26px;
    margin-left: 0px;
  }
`;

export const InputInfo = styled.p`
  font-size: 1.1rem;
  font-family: var(--font-gothic);
  font-weight: 700;
  color: red;
  margin-left: 6px;
  line-height: 1.5;

  ${theme.media.mobile} { 
    font-size: 1rem;
    margin-left: 1px;
    word-break: keep-all;
  }
`

export const InputGalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  padding-left: 6px;

  ${theme.media.mobile} { 
    padding-left:3px;
    padding-top: 4px;
  }
`

export const InputGalleryItem = styled.div`
  // border: 2px dashed #ddd;    
  // border-radius: 8px;
  // padding: 15px;
  // margin-bottom: 10px;
`

export const InputGalleryItemTitle = styled.div`
  font-weight: 500;
  font-size: 1.2rem;
  margin-bottom: 10px;
`

export const InputGalleryItemButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0 5px;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-family: var(--font-gothic);
`
export const InputGalleryItemAddButton = styled.button`
  background:rgb(22, 171, 22);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 800;
  margin-left: 8px;

  ${theme.media.mobile} { 
    margin-left: 4px;
  }
`


// 에러 컴포넌트 스타일 (SignupContainer에서 사용)
export const Error = styled.div`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid #dc3545;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  color: #dc3545;
  font-size: 14px;
  font-family: var(--font-gothic);
  font-weight: 500;
  text-align: center;
`;

// 체크박스 컨테이너
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  margin-left: 8px;
  margin-top: -20px;

  ${theme.media.mobile} { 
    gap: 10px;
    margin-top: 6px;
  }
`;

// 체크박스 스타일
export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: 1px solid #D9D9D9;
  border-radius: 13px;
  font-size: 1.2rem;
  font-family: var(--font-gothic);
  transition: border-color 0.2s ease;
  background: #F9F9F9;
  box-shadow: inset 1px 2px 8px 0 rgba(0, 0, 0, 0.25);
  accent-color: #dc3545;
  
  &:focus {
    outline: 2px solid #dc3545;
    outline-offset: 2px;
  }

  ${theme.media.mobile} { 
    width: 16px;
    height: 16px;
  }
`;

// 체크박스 라벨
export const CheckboxLabel = styled.label`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: flex-start;
`;

// 체크박스 텍스트
export const CheckboxText = styled.span`
  font-family: var(--font-gothic);
  font-size: 1.1rem;
  line-height: 1.4;
  color: #333;
  font-weight: 500;

  ${theme.media.mobile} { 
    font-size: 13px;
    line-height: 1.3;
  }
`;

// 체크박스 링크
export const CheckboxLink = styled.span`
  color:rgb(36, 36, 36);
  text-decoration: underline;
  text-underline-offset: 4px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: #c82333;
    font-weight: 900;
  }

  ${theme.media.mobile} { 
    font-size: 13px;
  }
`;

export const CheckboxError = styled(ErrorMessage)`
  bottom: -24px;
  left: 24px;
  font-weight: 600;
  ${theme.media.mobile} { 
    left: 30px;
  }
`;