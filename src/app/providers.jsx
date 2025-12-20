'use client';

import globalStyle from '@/styles/GlobalStyle';
import theme from '@/styles/Theme';
import { Global, ThemeProvider } from '@emotion/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

function Providers({ children }) {
  return (
    <>
      <Global styles={globalStyle} />
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <AuthProvider>
            <div>{children}</div>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}

export default Providers;
