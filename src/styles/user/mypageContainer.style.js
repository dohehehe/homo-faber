import styled from '@emotion/styled';
import theme from '@/styles/Theme';
import { motion } from 'motion/react';

export const MyPageWrapper = styled(motion.main)`
  width: 100%;
  height: 100%;
  padding-left: 60px;
  padding-top: 27px;
  z-index: 3;
  background: rgb(244, 244, 244);
  overflow: hidden;
  border-left: solid 3px #DADADA;
  box-shadow: -8px 4px 10px 0 rgba(0,0,0,0.25);
  font-family: var(--font-gothic);
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.2;
    background: ${props => props.overlayColor || 'linear-gradient(-200deg, rgba(255, 255, 255, 0.21) 19%, rgba(125, 128, 173, 0.2) 42%, rgba(115, 115, 115, 0.92) 95%)'};
  }

  ${theme.media.mobile} { 
    padding: 0px 12px 0px 8px;
      border-left: none;
  }
`;

export const MyPageName = styled.h1`
  font-family: var(--font-gothic);
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.3rem;
  position: absolute;
  transform: rotate(90deg);
  transform-origin: top left;
  top: 17px;
  left: 27px;

  ${theme.media.mobile} { 
    transform: rotate(0deg);
    transform-origin: top left;
    top: 13px;
    left:9px;
    font-size: 1rem;
    z-index: 3;
  }
`;

export const ProfileCard = styled.div`
  width: 90%;
  position: relative;
  z-index: 1;
  display: flex;
  margin-top: 80px;
  font-family: var(--font-gothic);
  align-items: flex-end;
  padding-top: 20px;

  ${theme.media.mobile} {
    margin-top: 60px;
    padding-top: 10px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 10px;
    margin-left: 2px;
  }
`;

export const UserName = styled.h1`
  font-size: 3.3rem;
  font-weight: 700;
  transform: scaleX(0.8);
  transform-origin: left;
  color: #333;

  ${theme.media.mobile} {
    font-size: 2.2rem;
  }
`;

export const UserEmail = styled.p`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 1px;
  font-weight: 600;
  transform: scaleX(0.9);
  transform-origin: left;
  margin-left: -10px;

  ${theme.media.mobile} {
    font-size: 1.2rem;
    margin-left: 0;
  }
`;

// 마이페이지 버튼 
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-end;
  margin-left: auto;
  margin-bottom: 2px;

  ${theme.media.mobile} {
    margin-bottom: 0;
    gap: 5px;
    margin-top: -126px;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: var(--font-gothic);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: transparent;
    color: #333;
  }

  ${theme.media.mobile} {
    font-size: 1rem;
    color: #777;
  }
`;

// 탭 스타일
export const TabContainer = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: flex-start;
  gap: 0;

  ${theme.media.mobile} {
    margin-top: 100px;
  }
`;

export const TabButton = styled.button`
  background: transparent;
  border: none;
  padding: 5px 10px 5px 5px;
  font-size: 1.3rem;
  font-family: var(--font-gothic);
  font-weight: 900;
  cursor: pointer;
  transform: scaleX(0.8);
  transform-origin: left center;
  color: ${props => props.active ? '#222' : '#999'};
  transition: all 0.2s ease;

  &:hover {
    color: #333;
  }

  ${theme.media.mobile} {
    padding: 6px 10px 4px 4px;
    font-size: 1.2rem;
  }
`;


// 테이블 스타일
export const TableSection = styled.div`
  margin-right: -30px;

  ${theme.media.mobile} {
    margin-right: -12px;
    margin-left: -8px;
  }
`;

export const TableWrapper = styled.article`
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-left: 30px;
  margin-left: -30px;

  ${theme.media.mobile} {
    padding-left: 0px;
    margin-left: 0;
    margin-top: 3px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-gothic);
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
`;

export const TableHeader = styled.thead`
  background-color: #A9A9A9;
  position: sticky;
  top: 0;
  z-index: 10;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  border-top: 2px solid #333;
`;

export const ProfileEditSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const EditButton = styled.button`
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  font-family: var(--font-gothic);
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-right: 10px;
  
  &:hover {
    background: #0056b3;
  }
`;

export const CancelButton = styled(EditButton)`
  background: #6c757d;
  
  &:hover {
    background: #545b62;
  }
`;

export const SaveButton = styled(EditButton)`
  background: #28a745;
  
  &:hover {
    background: #218838;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: var(--font-gothic);
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
`;

export const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 12px;
  margin-top: 5px;
`;

