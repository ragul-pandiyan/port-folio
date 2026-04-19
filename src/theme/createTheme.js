import { createTheme } from '@mui/material/styles';

export const createCustomTheme = (mode, colors) => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: { main: colors.primary },
      secondary: { main: colors.secondary },
      background: {
        default: isDark ? colors.bg : '#f0f4ff',
        paper: isDark ? colors.surface : '#ffffff',
      },
      text: {
        primary: isDark ? '#eef2ff' : '#0d1117',
        secondary: isDark ? colors.muted : '#4a5568',
      },
      divider: isDark ? `${colors.primary}1a` : `${colors.primary}30`,
    },
    typography: {
      fontFamily: "'Cabinet Grotesk', 'Instrument Sans', sans-serif",
      h1: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(3.5rem, 9vw, 7rem)',
        letterSpacing: '-0.03em',
        lineHeight: 0.95,
      },
      h2: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(2rem, 4vw, 3.2rem)',
        letterSpacing: '-0.02em',
      },
      h3: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: '1.35rem',
      },
      h4: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: '1.1rem',
      },
      body1: { fontSize: '1rem', lineHeight: 1.8 },
      body2: { fontSize: '0.875rem', lineHeight: 1.7 },
      caption: {
        fontFamily: "'DM Mono', monospace",
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '0.9rem 2.2rem',
            borderRadius: '4px',
            fontWeight: 500,
            transition: 'all 0.35s cubic-bezier(0.34,1.56,0.64,1)',
            '&:hover': { transform: 'translateY(-3px)' },
          },
          contained: {
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            color: isDark ? '#04070f' : '#fff',
            boxShadow: `0 4px 30px ${colors.primary}40`,
            '&:hover': { boxShadow: `0 12px 40px ${colors.primary}60` },
          },
          outlined: {
            borderColor: colors.primary,
            color: colors.primary,
            borderWidth: '1.5px',
            '&:hover': {
              background: `${colors.primary}12`,
              borderColor: colors.primary,
              borderWidth: '1.5px',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? colors.card : '#fff',
            border: `1px solid ${colors.primary}20`,
            backdropFilter: 'blur(20px)',
            transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            '&:hover': {
              transform: 'translateY(-6px)',
              boxShadow: `0 24px 60px ${colors.primary}25`,
              borderColor: `${colors.primary}50`,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(24px)',
            boxShadow: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '4px',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: '4px',
            height: '3px',
            backgroundColor: `${colors.primary}15`,
          },
          bar: {
            borderRadius: '4px',
            background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`,
          },
        },
      },
    },
  });
};
