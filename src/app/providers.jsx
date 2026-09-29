'use client';

import globalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/Theme';
import { Global, ThemeProvider } from '@emotion/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import EmotionRegistry from '@/app/emotion-registry';

function Providers({ children }) {
  return (
    <EmotionRegistry>
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </EmotionRegistry>
  );
}

export default Providers;
