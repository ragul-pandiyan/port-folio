import React, { createContext, useState, useContext, useMemo } from 'react';

export const colorPalettes = {
  cyber: {
    primary: '#00e5ff',
    secondary: '#7b61ff',
    accent: '#ff6b6b',
    bg: '#04070f',
    surface: '#080e1c',
    card: '#0b1221',
    muted: '#5a6a82',
    glow: 'rgba(0,229,255,0.2)',
  },
  aurora: {
    primary: '#a78bfa',
    secondary: '#34d399',
    accent: '#f472b6',
    bg: '#080415',
    surface: '#100825',
    card: '#160b35',
    muted: '#6b5a8a',
    glow: 'rgba(167,139,250,0.2)',
  },
  ember: {
    primary: '#fb923c',
    secondary: '#f43f5e',
    accent: '#fbbf24',
    bg: '#0f0800',
    surface: '#1c0e00',
    card: '#271500',
    muted: '#7a5a3a',
    glow: 'rgba(251,146,60,0.2)',
  },
  matrix: {
    primary: '#22c55e',
    secondary: '#06b6d4',
    accent: '#a3e635',
    bg: '#010d05',
    surface: '#031a0a',
    card: '#052510',
    muted: '#2d5a3d',
    glow: 'rgba(34,197,94,0.2)',
  },
  rose: {
    primary: '#f43f5e',
    secondary: '#e879f9',
    accent: '#fb923c',
    bg: '#120005',
    surface: '#1f0009',
    card: '#2d000d',
    muted: '#7a3a4a',
    glow: 'rgba(244,63,94,0.2)',
  },
  arctic: {
    primary: '#38bdf8',
    secondary: '#818cf8',
    accent: '#34d399',
    bg: '#020c18',
    surface: '#061424',
    card: '#0a1c30',
    muted: '#3a5a7a',
    glow: 'rgba(56,189,248,0.2)',
  },
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return localStorage.getItem('rp-theme-mode') || 'dark';
  });
  const [palette, setPalette] = useState(() => {
    if (typeof window === 'undefined') return 'cyber';
    const saved = localStorage.getItem('rp-theme-palette');
    return saved && colorPalettes[saved] ? saved : 'cyber';
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('rp-theme-mode', mode);
    localStorage.setItem('rp-theme-palette', palette);
  }, [mode, palette]);

  const toggleMode = () => setMode(p => p === 'dark' ? 'light' : 'dark');
  const changePalette = (p) => { if (colorPalettes[p]) setPalette(p); };

  const value = useMemo(() => ({
    mode, palette, colors: colorPalettes[palette], toggleMode, changePalette,
  }), [mode, palette]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be inside ThemeProvider');
  return ctx;
}
