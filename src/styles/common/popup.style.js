import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100dvw;
  height: 100dvh;
  background: rgba(70, 70, 70, 0.84);
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

const getTypeStyles = (type) => {
  const typeStyles = {
    error: {
      bgColor: 'rgba(222, 69, 85, 0.9)',
    },
    success: {
      bgColor: 'rgba(40, 167, 69, 0.9)',
    },
    warning: {
      bgColor: 'rgba(255, 234, 48, 0.9)',
    },
    info: {
      bgColor: 'rgba(109, 184, 246, 0.9)',
    }
  };
  return typeStyles[type] || typeStyles.error;
};

export const PopupContainer = styled.div`
  background: ${props => {
    if (props.bgColor) return props.bgColor;
    const typeStyles = getTypeStyles(props.type);
    return typeStyles.bgColor;
  }};
  border: 3px solid ${props => {
    if (props.bgColor) return props.bgColor;
    const typeStyles = getTypeStyles(props.type);
    return typeStyles.bgColor;
  }};
  border-radius: 12px;
  padding: 32px 38px;
  margin: 20px;
  color: ${props => {
    if (props.bgColor) return 'white';
    if (props.type === 'warning') return 'black';
    const typeStyles = getTypeStyles(props.type);
  }};
  font-size: 16px;
  font-family: var(--font-gothic);
  font-weight: 500;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5;
  gap: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 10px 0 rgba(69, 69, 69, 0.5);
  animation: slideIn 0.3s ease-out;
  min-width: 300px;
  max-width: 500px;

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

  ${theme.media.mobile} {
    padding: 35px 25px;
  }
`;

export const PopupTitle = styled.div`
  font-size: 1.45rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-align: center;
`;

export const PopupSubtitle = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: center;
  word-break: keep-all;

  ${theme.media.mobile} {
    line-height: 1.7;
  }
`;

export const PopupMessage = styled.div`
  font-size: 1.2rem;
  line-height: 1.5;
  word-break: keep-all;
  margin-bottom: 20px;
`

export const PopupButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

export const PopupButton = styled.button`
  background: ${props => {
    switch (props.variant) {
      case 'primary':
        return 'rgb(243, 236, 236)';
      case 'danger':
        return '#dc3545';
      case 'success':
        return '#28a745';
      case 'warning':
        return '#ffc107';
      case 'info':
        return '#2196F3';
      default:
        return 'rgb(243, 236, 236)';
    }
  }};
  color: ${props => {
    switch (props.variant) {
      case 'primary':
        return 'black';
      case 'danger':
      case 'success':
      case 'info':
        return 'white';
      case 'warning':
        return 'black';
      default:
        return 'black';
    }
  }};
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-family: var(--font-gothic);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  ${theme.media.mobile} {
    font-size: 1.1rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 8px;
  color: white;
  text-align: left;
`;

export const Input = styled.input`
  padding: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-family: var(--font-gothic);
  font-size: 14px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.6);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
`;