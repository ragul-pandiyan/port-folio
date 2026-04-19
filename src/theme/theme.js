import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#04070f',
      paper: '#080e1c',
    },
    primary: {
      main: '#00e5ff',
      light: '#4fff6f',
      dark: '#002f4d',
    },
    secondary: {
      main: '#7b61ff',
      light: '#a98eff',
      dark: '#4a2d99',
    },
    error: {
      main: '#ff6b6b',
    },
    text: {
      primary: '#e8edf5',
      secondary: '#5a6a82',
    },
    divider: 'rgba(0,229,255,0.12)',
  },
  typography: {
    fontFamily: "'Instrument Sans', sans-serif",
    h1: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      fontSize: 'clamp(3.5rem, 9vw, 7rem)',
      letterSpacing: '-0.02em',
      lineHeight: 1,
    },
    h2: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 800,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSize: '1.25rem',
    },
    h4: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 700,
      fontSize: '1.2rem',
    },
    h5: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Syne', sans-serif",
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: "'DM Mono', monospace",
      fontSize: '0.78rem',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    subtitle2: {
      fontFamily: "'DM Mono', monospace",
      fontSize: '0.72rem',
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '0.88rem',
      lineHeight: 1.65,
    },
    caption: {
      fontFamily: "'DM Mono', monospace",
      fontSize: '0.7rem',
      letterSpacing: '0.1em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.85rem 2rem',
          borderRadius: '2px',
          fontWeight: 500,
          transition: 'all 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: '#00e5ff',
          color: '#04070f',
          '&:hover': {
            background: '#fff',
            boxShadow: '0 10px 40px rgba(0,229,255,0.3)',
          },
        },
        outlined: {
          borderColor: '#00e5ff',
          color: '#00e5ff',
          '&:hover': {
            background: 'rgba(0,229,255,0.08)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderRadius: '2px',
        },
        filled: {
          background: 'transparent',
          border: '1px solid rgba(0,229,255,0.12)',
          color: '#5a6a82',
          '&.active': {
            borderColor: 'rgba(0,229,255,0.3)',
            color: '#00e5ff',
            background: 'rgba(0,229,255,0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0b1221',
          borderRadius: '4px',
          border: '1px solid rgba(0,229,255,0.12)',
          transition: 'all 0.3s',
          '&:hover': {
            transform: 'translateY(-3px)',
            backgroundColor: '#0e1728',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(4, 7, 15, 0.7)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,229,255,0.12)',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: "'DM Mono', monospace",
          fontSize: '0.78rem',
          textDecoration: 'none',
          transition: 'color 0.2s',
          '&:hover': {
            color: '#00e5ff',
          },
        },
      },
    },
  },
});

export default theme;
