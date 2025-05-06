// ThemeContext.js
import React, { createContext, useMemo, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

export const ColorModeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light'); // Default is now 'light'

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode(prev => (prev === 'light' ? 'dark' : 'light')),
  }), []);

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode,
        background: {
          default: mode === 'dark' ? '#121212' : '#f5f5f5',
          paper: mode === 'dark' ? '#1e1e1e' : '#fff',
        },
      },
    }), [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
