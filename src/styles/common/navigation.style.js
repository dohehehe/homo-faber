import styled from '@emotion/styled';
import theme from '@/styles/Theme';

export const HeaderBar = styled('header', {
  shouldForwardProp: (prop) => prop !== 'opaque',
})`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
  padding: 10px 20px;
  background-color: ${(props) => (props.opaque ? '#ffffff' : 'transparent')};
  pointer-events: auto;
  isolation: isolate;

  ${theme.media.mobile} {
    height: auto;
    min-height: 53px;
    align-items: flex-start;
    flex-wrap: nowrap;
    padding: 10px 10px;
    gap: 4px;
  }
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;
  position: relative;
  z-index: 1;
  flex: 1;

  ${theme.media.mobile} {
    flex-wrap: nowrap;
    align-items: flex-start;
  }
`;

export const ArchiveCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  min-width: 0;

  ${theme.media.mobile} {
    flex: 0 1 auto;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: nowrap;
    row-gap: 4px;
  }
`;

export const Brand = styled('span', {
  shouldForwardProp: (prop) => prop !== '$light',
})`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 33px;
  min-height: 33px;
  padding: 0 8px;
  border-radius: 5px;
  color: ${(props) => (props.$light ? '#a0a0a0' : '#000')};
  letter-spacing: -0.01em;
  line-height: 1.2;
  white-space: nowrap;

  ${theme.media.mobile} {
    padding: 0 4px;
    white-space: normal;
    max-width: 46vw;
  }
`;

export const BrandLine = styled.span`
  display: block;
  font-size: 0.9rem;
  }
`;

export const NavGroup = styled('nav', {
  shouldForwardProp: (prop) => prop !== '$sub',
})`
  display: flex;
  align-items: center;
  gap: 3px;
  height: 33px;
  padding: 3px;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);

  ${theme.media.mobile} {
    height: 33px;
    flex-wrap: nowrap;
    flex: none;
    width: max-content;
  }
`;

export const NavList = styled.nav`
  display: flex;
  align-items: center;
  gap: 3px;

  ${theme.media.mobile} {
    display: none;
  }
`;

export const NavLink = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 27px;
  padding: 0 8px;
  border-radius: 3px;
  background: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  font-weight: 400;
  color: ${(props) => (props.active ? '#000000' : '#a0a0a0')};
  letter-spacing: -0.01em;
  line-height: 1.6;
  cursor: pointer;
  border: none;
  font-family: inherit;
  white-space: nowrap;
  text-decoration: none;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease, background-color 0.2s ease;

  ${theme.media.mobile} {
    height: 27px;
    min-height: 27px;
    padding: 0 6px;
  }

  &:hover {
    color: #000000;
    background: rgba(227, 227, 227, 0.55);
  }
`;

export const ArchiveWrap = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const ArchiveMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  height: 33px;
  padding: 3px;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
`;

export const ArchiveItem = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active',
})`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 24px;
  padding: 0 8px;
  border-radius: 3px;
  background: ${(props) => (props.active ? '#ffffff' : 'transparent')};
  font-weight: 400;
  color: ${(props) => (props.active ? '#000000' : '#a0a0a0')};
  letter-spacing: -0.01em;
  line-height: 1.6;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease, background-color 0.2s ease;

  &:hover {
    color: #000000;
    background: rgba(227, 227, 227, 0.55);
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
`;

export const LangButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  min-width: 36px;
  padding: 0 8px;
  border: none;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  font-weight: 400;
  letter-spacing: -0.01em;
  color: #000;
  cursor: pointer;
  font-family: inherit;
  line-height: 1.6;
  transition: background-color 0.2s ease;

  &:hover {
    background: rgba(227, 227, 227, 0.55);
  }
`;

export const IconButton = styled.button`
  width: 33px;
  height: 33px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  color: #222;
  transition: background-color 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 12px;
    height: auto;
    display: block;
  }

  &:hover {
    background: rgba(227, 227, 227, 0.7);
  }
`;

export const MenuToggle = styled.button`
  display: none;
`;

export const MobilePanel = styled.div`
  display: none;
`;

export const MobileLink = styled.span`
  padding: 12px 4px;
  font-weight: ${(props) => (props.active ? 700 : 500)};
  color: ${(props) => (props.active ? '#111' : '#555')};
`;

export const MobileSubLink = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 8px;
  border-radius: 3px;
  font-weight: 400;
  color: ${(props) => (props.active ? '#000' : '#a0a0a0')};
  background: ${(props) => (props.active ? '#ffffff' : 'transparent')};
`;

export const MobileArchiveRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px;
  padding: 3px;
  border-radius: 5px;
  background: rgba(227, 227, 227, 0.3);
`;

export const MapToggleButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px 12px;
  border-radius: 10px;
  font-weight: 500;
  opacity: 0.8;
  background: #999;
  color: white;
  border: 1px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  font-family: var(--font-gothic);
  position: fixed;
  bottom: 20px;
  left: 28px;
  z-index: 5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    opacity: 1;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  ${theme.media.mobile} {
    padding: 10px 14px;
    border-radius: 25px;
    left: unset;
    right: 20px;
    bottom: 20px;
  }
`;

export const SwitchTrack = styled.div`
  position: relative;
  width: 20px;
  height: 40px;
  background: ${(props) =>
    props.isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.2)'};
  border-radius: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

export const SwitchThumb = styled.div`
  position: absolute;
  top: ${(props) => (props.isActive ? '22px' : '2px')};
  left: 1px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.isActive ? 'scale(1.1)' : 'scale(1)')};
`;

export const SwitchText = styled.span`
  font-weight: 600;
  color: ${(props) => (props.isActive ? 'white' : '#444')};
  white-space: nowrap;
  transition: all 0.3s ease;
`;
