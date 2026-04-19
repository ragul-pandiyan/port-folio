import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
  keyframes,
} from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0 0 rgba(0,229,255,0.3);
  }
  50% {
    opacity: 0.7;
    box-shadow: 0 0 0 6px transparent;
  }
`;

export default function Navbar() {
  const theme = useTheme();
  const { colors } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.2rem 2.5rem',
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, rgba(4, 7, 15, 0.8) 0%, rgba(8, 14, 28, 0.8) 100%)`
            : `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 249, 250, 0.9) 100%)`,
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          '@media (max-width: 768px)': {
            padding: '1rem 1.5rem',
          },
        }}
      >
        {/* Logo */}
        <Typography
          variant="h6"
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          RP_
        </Typography>

        {/* Nav Links */}
        {!isMobile && (
          <Stack
            direction="row"
            spacing={4}
            sx={{
              display: 'flex',
            }}
          >
            {['#projects', '#skills', '#experience', '#contact'].map((link) => (
              <Link
                key={link}
                href={link}
                sx={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: '0.78rem',
                  color: theme.palette.text.secondary,
                  textDecoration: 'none',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    width: 0,
                    height: '2px',
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    transition: 'width 0.3s ease',
                  },
                  '&:hover': {
                    color: colors.primary,
                    '&::after': {
                      width: '100%',
                    },
                  },
                }}
              >
                {link.split('#')[1]}
              </Link>
            ))}
          </Stack>
        )}

        {/* Status */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.72rem',
            background: `${colors.primary}15`,
            border: `1px solid ${colors.primary}30`,
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: `${colors.primary}25`,
              boxShadow: `0 0 20px ${colors.primary}40`,
            },
          }}
        >
          <Box
            sx={{
              width: '7px',
              height: '7px',
              background: colors.primary,
              borderRadius: '50%',
              animation: `${pulse} 2s infinite`,
            }}
          />
          <span style={{ color: colors.primary }}>Available</span>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
