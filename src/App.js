import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ThemeProvider, useThemeContext } from './context/ThemeContext';
import { createCustomTheme } from './theme/createTheme';
import Home from './view/Home';
import ThemeSwitcher from './components/ThemeSwitcher';
import EnhancedCursor from './components/EnhancedCursor';

// Global styles injected once
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@400;500;600&display=swap');

  html { scroll-behavior: smooth; }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { border-radius: 2px; }

  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  ::selection {
    background: rgba(0, 229, 255, 0.25);
  }
`;

function AppContent() {
  const { mode, colors } = useThemeContext();
  const muiTheme = createCustomTheme(mode, colors);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <style>{globalCSS}</style>
      <style>{`::-webkit-scrollbar-thumb { background: ${colors.primary}; }`}</style>

      <EnhancedCursor />
      <ThemeSwitcher />

      <Box sx={{
        background: mode === 'dark'
          ? `linear-gradient(160deg, ${colors.bg} 0%, ${colors.surface} 100%)`
          : 'linear-gradient(160deg, #f0f4ff 0%, #ffffff 100%)',
        minHeight: '100vh',
        position: 'relative',
        '&::before': {
          content: '""', position: 'fixed', inset: 0,
          backgroundImage: `linear-gradient(${colors.primary}06 1px, transparent 1px), linear-gradient(90deg, ${colors.primary}06 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          pointerEvents: 'none', zIndex: 0, opacity: mode === 'dark' ? 1 : 0.5,
        },
        '&::after': {
          content: '""', position: 'fixed', inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
          pointerEvents: 'none', zIndex: 0, opacity: 0.5,
        },
      }}>
        <Home />
      </Box>
    </MuiThemeProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
