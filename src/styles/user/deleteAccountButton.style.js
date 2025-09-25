import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const ButtonWrapper = styled.div`
  position: fixed;
  top: 10px;
  right: 15px;
  padding-left: 30px;
  z-index: 1000;
`
export const Button = styled.button`
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  font-family: var(--font-gothic);
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: #777;
`