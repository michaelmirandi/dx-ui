'use client';

import React, { useMemo } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from './EmotionCache';
import { ThemeModeProvider, useThemeMode } from './ThemeContext';
import { createAppTheme } from './theme';

function ThemeRegistryContent({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeModeProvider>
        <ThemeRegistryContent>{children}</ThemeRegistryContent>
      </ThemeModeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}