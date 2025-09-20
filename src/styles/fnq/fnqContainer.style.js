'use client'

import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';

export const FnqWrapper = styled(motion.main)`
  width: 100%;
  height: 100%;
  padding-left: 70px;
  padding-top: 27px;
  z-index: 3;
  background:rgb(255, 255, 255);
  cursor: ${(props) => (props.pathname && (props.pathname === '/' || props.pathname.startsWith('/interview/'))) ? 'pointer' : 'default'};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-left: solid 3px #DADADA;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
  font-family: var(--font-gothic);
  pointer-events: auto;
  position: relative;

  ${theme.media.mobile} { 
    padding: 0px 10px 20px 10px;
  }
`;

export const FnqPageName = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  left: 26px;

  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 22px;
    left:10px;
    font-size: 1rem;
  }
`;

export const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
  gap: 90px;
  padding-top: 60px;
  // justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 100px;
  padding-left: 5px;

  ${theme.media.mobile} { 
    gap: 50px;
    padding-top: 50px;
    padding-left: 0px;
    padding-right: 18px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  position: relative;

  ${theme.media.mobile} { 
    gap: 8px;
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
    margin-left: -1px;
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
  bottom: -29px;
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
  font-size: 1rem;
  font-family: var(--font-gothic);
  font-weight: 700;
  color: red;
  margin-left: 6px;
  line-height: 1.5;

  ${theme.media.mobile} { 
    font-size: 1rem;
    margin-left: 0px;
  }
`

export const InputGalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 6px;
`

export const InputGalleryItem = styled.div`
  border: 2px dashed #ddd;    
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  position: relative;
  background-color: #fafafa;
`

export const InputGalleryItemTitle = styled.div`
  margin-bottom: 10px;
  font-weight: 800;
`


export const InputGalleryItemButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 800;
  font-family: var(--font-gothic);
  display: flex;  
  align-items: center;
  justify-content: center;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // margin-top: auto;
  margin-bottom: 20px;
  margin-right: 40px;
  position: absolute;
  bottom: 0;
  right: 0px;
  
  ${theme.media.mobile} { 
    // position: static;
    // margin-top: auto;
    position: fixed;
    margin-right: 10px;
    margin-bottom: 0px;
  }
`;

export const SubmitButton = styled.button`
  padding: 8px 5px;
  border: none;
  background: none;
  font-size: 3.5rem;
  font-weight: 800;
  font-family: var(--font-gothic);
  cursor: pointer;
  transition: all 0.2s ease;
  color: #222;
  
  &:hover {
    text-shadow: 3px 2px 8px rgba(255, 255, 255, 0.48);
  }

  &:active {
    background: none;
  }

  ${theme.media.mobile} { 
    font-size: 2.5rem;
    padding: 6px 5px;
  }
`;

export const ErrorPopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(90, 90, 90, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ErrorPopupContainer = styled.div`
  background: ${props => props.bgColor || 'rgba(222, 69, 85, 0.9)'};
  border: 3px solid ${props => props.borderColor || '#dc3545'};
  border-radius: 12px;
  padding: 24px 32px;
  margin: 20px;
  color: white;
  font-size: 16px;
  font-family: var(--font-gothic);
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5;
  gap: 2px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 10px 0 rgba(69, 69, 69, 0.5);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const ErrorPopupCloseButton = styled.button`
  background:rgb(243, 236, 236);
  color: black;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-top: 16px;
  font-family: var(--font-gothic);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

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