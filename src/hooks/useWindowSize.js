import { useState, useEffect } from 'react';

const DEFAULT_SIZE = {
  width: 1024,
  height: 768,
  isMobile: false,
};

const useWindowSize = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setSize({
        width: newWidth,
        height: newHeight,
        isMobile: newWidth <= 767,
      });
      setIsReady(true);
    };

    updateSize();

    let lastCall = 0;
    const throttleTime = 500;

    const handleResize = () => {
      const now = Date.now();
      if (now - lastCall < throttleTime) return;
      lastCall = now;
      updateSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { ...size, isReady };
};

export default useWindowSize;
