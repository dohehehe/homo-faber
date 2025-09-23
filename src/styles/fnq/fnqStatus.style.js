import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const StatusContainer = styled.div`
  width: 100%;
`;

//진행 상태바
export const ProgressLine = styled.div`
  width: 100%;
  height: 2.2px;
  display: flex;
  z-index: 1;
  border-radius: 10px;
  padding-right: 30%;

  ${theme.media.mobile} { 
    padding-right: 0;
    margin-right: -47%;
    height: 1.2px;
  }
`;

export const LineSegment = styled.div`
  flex: 1;
  height: 100%;
  background-color: ${props => props.isCompleted ? '#999' : '#E0E0E0'};
  transition: all 0.3s ease;
  
  &:not(:last-child) {
    margin-right: 0;
  }
`;

// 진행 상태 알림
export const ProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-top: -12px;

  ${theme.media.mobile} { 
    margin-right: -47%;
  }
`;

export const StatusStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  position: relative;
  z-index: 2;

  ${theme.media.mobile} { 
    align-items: space-between;

    &:last-child {
      .label {
        padding-right: 40px;
      }
    }
  }
`;

export const StatusCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${props => props.isCompleted ? props.color : '#E0E0E0'};
  border: 3px solid ${props => props.isCurrent ? props.color : (props.isCompleted ? props.color : '#E0E0E0')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  position: relative;
  
  ${props => props.isCurrent && `
    box-shadow: 0 0 0 4px ${props.color}20;
    animation: pulse 2s infinite;
  `}
  
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 ${props => props.color}80;
    }
    70% {
      box-shadow: 0 0 0 10px ${props => props.color}00;
    }
    100% {
      box-shadow: 0 0 0 0 ${props => props.color}00;
    }
  }
`;

export const StatusLabel = styled.div`
  font-size: 1rem;
  letter-spacing: 0.15rem;
  font-weight: ${props => props.isCurrent ? '700' : '500'};
  color: ${props => props.isCurrent ? '#2c3e50' : '#7f8c8d'};
  margin-bottom: 4px;
  text-align: center;
  transition: all 0.3s ease;
  // margin-left: -50%;
  transform: translateX(-20%);

  ${theme.media.mobile} { 
    font-size: 0.9rem;
    transform: translateX(-12%);

    &:last-type {
      transform: translateX(0%);
    }
  }
`;

export const StatusDescription = styled.div`
  font-size: 12px;
  color: ${props => props.isCurrent ? '#34495e' : '#95a5a6'};
  text-align: left;
  line-height: 1.4;
  max-width: 120px;
  transition: all 0.3s ease;
`;


