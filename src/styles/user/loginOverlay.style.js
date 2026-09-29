import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
`;

export const Modal = styled.div`
  width: 420px;
  max-width: calc(100vw - 40px);
  padding: 40px 36px 32px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.12);
`;

export const Title = styled.h1`
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em;
  margin-bottom: 32px;
  color: #111;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LabelRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #222;
  letter-spacing: -0.02em;
`;

export const TextLink = styled.button`
  border: none;
  background: none;
  padding: 0;
  font-weight: 400;
  color: #888;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: #111;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: none;
  border-radius: 6px;
  background: #f3f3f3;
  color: #222;

  &::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    outline: 1px solid #ddd;
    background: #f7f7f7;
  }
`;

export const ErrorText = styled.p`
  color: #d00;
  margin-top: -4px;
`;

export const SignupHint = styled.p`
  margin-top: 8px;
  text-align: center;
  color: #888;
`;

export const SignupLink = styled.button`
  border: none;
  background: none;
  padding: 0;
  margin-left: 4px;
  font-weight: 600;
  color: #222;
  cursor: pointer;
  font-family: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export const SubmitRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px 8px 18px;
  border: none;
  border-radius: 999px;
  background: #f2f2f2;
  color: #111;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  letter-spacing: -0.02em;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const SubmitArrow = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #111;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
