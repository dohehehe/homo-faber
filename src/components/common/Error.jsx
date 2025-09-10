import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

const ErrorContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding: 10px;
  width: 100%;
  height: 100%;
  min-height: 100px;
`;

const ErrorText = styled.div`
  // text-align: center;
  font-family: var(--font-gothic);
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.6;
  max-width: 500px;

  a {
    font-size: 1.1rem;
    display: block;
    font-weight: 700;
    cursor: pointer;
    margin-top: 15px;
  }
`;

const ErrorComponent = ({
  message = "문제가 발생했습니다.",
  style = {}
}) => {
  return (
    <ErrorContainer style={style}>
      <div>
        <ErrorText>
          {message}
          <div>페이지를 새로고침 해주세요.</div>
          <Link href="mailto:listentothecity.org@gmail.com">* 문제가 지속된되면 <span style={{ fontWeight: '700', textDecoration: 'underline', textUnderlineOffset: '5px' }}>관리자에게 문의</span>해주세요</Link>
        </ErrorText>
      </div>
    </ErrorContainer>
  );
};

export default ErrorComponent;
