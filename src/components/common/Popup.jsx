import * as S from '@/styles/common/popup.style';

function Popup({
  isVisible,
  message,
  title,
  subtitle,
  onClose,
  onOverlayClick,
  onContainerClick,
  type = 'error', // 'error', 'success', 'warning', 'info'
  buttons = [{ text: '확인', onClick: null, variant: 'primary' }],
  bgColor,
  showCloseButton = true,
  children
}) {
  if (!isVisible) return null;

  const handleOverlayClick = onOverlayClick || onClose;
  const handleContainerClick = onContainerClick || ((e) => e.stopPropagation());

  return (
    <S.PopupOverlay onClick={handleOverlayClick}>
      <S.PopupContainer
        onClick={handleContainerClick}
        bgColor={bgColor}
        type={type}
      >
        {children || (
          <>
            {title && (
              <S.PopupTitle>
                {title}
              </S.PopupTitle>
            )}
            {subtitle && (
              <S.PopupSubtitle>
                {subtitle}
              </S.PopupSubtitle>
            )}
            {message && (
              <S.PopupMessage>
                {message}
              </S.PopupMessage>
            )}
          </>
        )}

        {buttons.length > 0 && (
          <S.PopupButtonContainer>
            {buttons.map((button, index) => (
              <S.PopupButton
                key={index}
                onClick={button.onClick || onClose}
                variant={button.variant || 'primary'}
                style={button.style}
                disabled={button.disabled}
              >
                {button.text}
              </S.PopupButton>
            ))}
          </S.PopupButtonContainer>
        )}
      </S.PopupContainer>
    </S.PopupOverlay>
  );
}

export default Popup;