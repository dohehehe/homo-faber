import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const NavigationIcon = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
  object-position: center;
  position: fixed;
  top: 18px;
  left: 20px;
  z-index: 1000;
  transition: all 1s ease-in-out; 
  animation: ${props => props.isOpen ? 'breathe2 2s ease-in-out' : 'breathe 10s ease-in-out infinite'};

  &:hover {
    transform: rotate(360deg);
    cursor: pointer;
    transition: all 1s ease-in-out; 
  }

  @keyframes breathe {
    90% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes breathe2 {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  ${theme.media.mobile} {
    width: 50px;
    height: 50px;
    top: 10px;
    left: 8px;
  }
`;

export const NavigationBg = styled.div`
    display: none;
    backdrop-filter: saturate(180%) blur(5px);
    background: rgba(202, 202, 202, 0.57);

  ${theme.media.mobile} {
    display: ${props => props.isOpen ? 'block' : 'none'};
    width: 100dvw;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
  }
`

export const NavigationWrapper = styled.nav`
  position: fixed;
  top: 103px;
  left: 18px;
  z-index: 1000;
  background: rgba(227, 227, 227, 0.7);
  border: 1px solid rgba(109, 109, 109, 0.1);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  padding: 8px 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  backdrop-filter: saturate(180%) blur(8px);
  font-family: var(--font-gothic);
  
  /* 애니메이션 속성 */
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* 열린 상태에서만 포인터 이벤트 허용 */
  pointer-events: ${props => props.isOpen ? 'auto' : 'none'};

  ${theme.media.mobile} {
    top: 50px;
    left: 60px;
    // flex-direction: row;
    flex-wrap: wrap;
    margin-right: 20px;
    justify-content: flex-start
    align-items: center;
    // gap: 3px 4px;
    padding: 6px 6px;
    border-radius: 8px;
  }
`;

export const NavigationItem = styled.div`
  display: inline-block;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${props => props.active ? 600 : 400};
  line-height: 1;
  color: 111;
  background: ${props => props => props.active ? 'rgb(240, 240, 240)' : 'transparent'};
  border: ${props => props.active ? '1px solid #ccc' : '1px solid transparent'};
  transition: background 0.2s ease, color 0.2s ease;

  ${theme.media.mobile} {
   padding: 10px 14px;
    border-radius: 10px;
    font-size: 1.2rem;
  }
`;