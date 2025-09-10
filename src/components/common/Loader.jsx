import React from 'react';
import styled from '@emotion/styled';

const LoaderContainer = styled.div`
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding: 10px 15px;
  width: 100%;
  height: 100%;
  min-height: 100px;
`;

const Loader = styled.span`
  width: 60px;
  height: 40px;
  position: relative;
  display: inline-block;
  --base-color: #263238; 

  &::before {
    content: '';  
    left: 0;
    top: 0;
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: rgba(72, 73, 66, 0.81);
    background-image: radial-gradient(circle 8px at 18px 18px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 18px 0px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 0px 18px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 36px 18px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 18px 36px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 30px 5px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 30px 5px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 30px 30px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 5px 30px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 4px at 5px 5px, var(--base-color) 100%, transparent 0);
    background-repeat: no-repeat;
    box-sizing: border-box;
    animation: rotationBack 3s linear infinite;
  }
  
  &::after {
    content: '';  
    left: 35px;
    top: 15px;
    position: absolute;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(100, 101, 95, 0.7);
    background-image: radial-gradient(circle 5px at 12px 12px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 12px 0px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 0px 12px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 24px 12px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 12px 24px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 20px 3px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 20px 3px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 20px 20px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 3px 20px, var(--base-color) 100%, transparent 0), 
                      radial-gradient(circle 2.5px at 3px 3px, var(--base-color) 100%, transparent 0);
    background-repeat: no-repeat;
    box-sizing: border-box;
    animation: rotationBack 4s linear infinite reverse;
  }
  
  @keyframes rotationBack {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
`;

const LoaderText = styled.div`
  color: rgba(67, 67, 67, 0.75);
  font-family: var(--font-gothic);
  font-weight: 600;
  margin-top: 25px;
  font-size: 1rem;
`;

const LoaderComponent = ({
  showText = true,
  text = "",
  size = "small",
  baseColor = "#263238",
  style = {}
}) => {
  const sizeStyles = {
    small: { width: '40px', height: '26px' },
    normal: { width: '60px', height: '40px' },
    large: { width: '80px', height: '53px' }
  };

  return (
    <LoaderContainer style={style}>
      <div>
        <Loader
          style={{
            ...sizeStyles[size],
            '--base-color': baseColor
          }}
        />
        {showText && <LoaderText>{text}</LoaderText>}
      </div>
    </LoaderContainer>
  );
};

export default LoaderComponent;
