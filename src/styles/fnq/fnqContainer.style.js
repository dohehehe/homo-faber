'use client'

import styled from '@emotion/styled';
import { motion } from 'motion/react';
import theme from '@/styles/Theme';
import { captionText } from '@/styles/typography';

export const FnqWrapper = styled(motion.main)`
  width: 100%;
  min-height: 100vh;
  padding: calc(var(--header-height, 50px) + 30px) 20px 80px;
  z-index: 3;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
  position: relative;
  overflow: visible;

  ${theme.media.mobile} {
    padding: calc(var(--header-height, 50px) + 20px) 16px 60px;
  }
`;

export const FnqPageName = styled.h1`
  display: none;
`;

export const FnqCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  background: #fbfbfb;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FnqTitle = styled.h1`
  font-weight: 400;
  color: #000;
`;

export const FnqContext = styled.div`
  font-weight: 400;
  color: #000;
  word-break: keep-all;
  width: 100%;
  padding-top: 10px;
  border-top: 1px solid rgba(227, 227, 227, 0.3);
`;

export const GuideLabel = styled.p`
  color: #a0a0a0;
  margin-bottom: 5px;
`;

export const FnqContextItem = styled.p`
  font-weight: 400;
  margin-top: 8px;
  margin-bottom: 0;
  padding: 10px 0;
  border-bottom: 0.5px solid #efefef;
  text-indent: 0;
  padding-left: 0;
`;

export const UserForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 1;
  gap: 10px;
  overflow: visible;
  margin-top: 0;
  padding-bottom: 0;
  height: auto;
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
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  background: #efefef;
  backdrop-filter: blur(15px);
  border: none;
  font-weight: 400;
  cursor: pointer;
  color: #000;
  margin: 10px auto 0;
  border-radius: 15px;

  &:hover {
    background-color: #e4e4e4;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitLabel = styled.span`
  padding: 0 10px;
`;

export const SubmitArrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 21px;
  border-radius: 20px;
  background: #d5d5d5;
`;


export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: none;
  position: relative;
  padding: 10px 0;
`;

export const Label = styled.label`
  font-weight: 700;
  color: #000;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;

  ${theme.media.mobile} {
    flex-direction: column;
  }
`;

export const Caption = styled.p`
  ${captionText}
  color: #000;
`;

export const Input = styled.input`
  padding: 7px 8px;
  border: none;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  font-weight: 400;
  color: #222;
  
  &:focus {
    outline: none;
    background: rgba(227, 227, 227, 0.5);
  }
  
  &::placeholder {
    color: #c7c7c7;
  }
`;

export const InputTextarea = styled.textarea`
  padding: 18px 16px 15px 16px;
  border: 1px solid #D9D9D9;
  border-radius: 13px;
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
  margin-left: 6px;
  font-weight: 600;

  ${theme.media.mobile} { 
    bottom: -26px;
    margin-left: 0px;
  }
`;

export const InputInfo = styled.p`
  ${captionText}
  font-weight: 400;
  color: #000;
`;

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
  margin-bottom: 10px;
`

export const InputGalleryItemButton = styled.button`
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
  padding: 0 5px;
  margin-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
`
export const InputGalleryItemAddButton = styled.button`
  background: rgba(239, 239, 239, 0.9);
  color: #000;
  border: none;
  border-radius: 5px;
  padding: 8px;
  cursor: pointer;
  font-weight: 400;
  width: fit-content;
`;

export const ServiceTagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3px 3px;
`;

export const ServiceTag = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})`
  border: none;
  background: ${(props) => (props.active ? '#e4e4e4' : 'rgba(227, 227, 227, 0.3)')};
  color: #000;
  border-radius: 3px;
  padding: 1px 3px;
  cursor: pointer;
`;


// 에러 컴포넌트 스타일 (SignupContainer에서 사용)
export const Error = styled.div`
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid #dc3545;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 16px 0;
  color: #dc3545;
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
  line-height: 1.4;
  color: #333;
  font-weight: 500;

  ${theme.media.mobile} { 
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