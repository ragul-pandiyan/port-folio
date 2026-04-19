import { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box, Link, Stack, Drawer, IconButton, useMediaQuery, useTheme, keyframes } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';

const pulse = keyframes`
  0%,100%{box-shadow:0 0 0 0 currentColor}
  50%{box-shadow:0 0 0 5px transparent}
`;

const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const theme = useTheme();
  const { colors, mode } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 50);
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const sections = ['projects', 'skills', 'experience', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && scrollTop >= el.offsetTop - 200) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navBg = mode === 'dark'
    ? scrolled ? `${colors.bg}e0` : 'transparent'
    : scrolled ? 'rgba(255,255,255,0.9)' : 'transparent';

  return (
    <>
      <AppBar position="fixed" sx={{
        background: navBg, backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid ${colors.primary}18` : '1px solid transparent',
        transition: 'all 0.4s ease', boxShadow: 'none',
      }}>
        {/* Scroll progress bar */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, height: '2px',
          width: `${progress}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
          transition: 'width 0.1s linear', boxShadow: `0 0 8px ${colors.primary}80`,
        }} />

        <Toolbar sx={{ px: { xs: '1.2rem', md: '2.5rem' }, py: '0.8rem', minHeight: 'unset !important' }}>
          {/* Logo */}
          <Box component="a" href="#" sx={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.2rem',
            letterSpacing: '0.04em', textDecoration: 'none',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            mr: 'auto', cursor: 'none',
          }}>
            RP_
          </Box>

          {/* Desktop links */}
          {!isMobile && (
            <Stack direction="row" spacing={3.5} sx={{ mr: 3 }}>
              {navLinks.map(({ href, label }) => {
                const active = activeSection === href.slice(1);
                return (
                  <Link key={href} href={href} sx={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', letterSpacing: '0.1em',
                    textTransform: 'uppercase', textDecoration: 'none', position: 'relative',
                    color: active ? colors.primary : (mode === 'dark' ? colors.muted : '#4a5568'),
                    transition: 'color 0.2s',
                    '&::after': {
                      content: '""', position: 'absolute', bottom: '-3px', left: 0,
                      height: '1px', width: active ? '100%' : '0%',
                      background: colors.primary, transition: 'width 0.3s ease',
                    },
                    '&:hover': { color: colors.primary, '&::after': { width: '100%' } },
                  }}>
                    {label}
                  </Link>
                );
              })}
            </Stack>
          )}

          {/* Status pill */}
          <Box sx={{
            display: 'flex', alignItems: 'center', gap: '0.45rem',
            fontFamily: "'DM Mono', monospace", fontSize: '0.65rem',
            background: `${colors.primary}12`, border: `1px solid ${colors.primary}30`,
            padding: '0.45rem 0.9rem', borderRadius: '20px',
            mr: isMobile ? '0.8rem' : 0,
          }}>
            <Box sx={{
              width: '6px', height: '6px', background: colors.primary, borderRadius: '50%',
              color: colors.primary, animation: `${pulse} 2s infinite`,
            }} />
            <Box sx={{ color: colors.primary, display: { xs: 'none', sm: 'block' } }}>Available</Box>
          </Box>

          {/* Mobile menu */}
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: colors.primary, p: 0.5 }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: {
          background: mode === 'dark' ? colors.surface : '#fff', width: 260,
          borderLeft: `1px solid ${colors.primary}20`,
          backdropFilter: 'blur(24px)',
        }}}>
        <Box sx={{ p: '1.5rem' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              RP_
            </Box>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: colors.muted }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          <Stack spacing={1}>
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setDrawerOpen(false)} sx={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.85rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', textDecoration: 'none', display: 'block',
                padding: '0.75rem 1rem', borderRadius: '10px', color: colors.primary,
                background: `${colors.primary}08`, border: `1px solid ${colors.primary}15`,
                transition: 'all 0.2s',
                '&:hover': { background: `${colors.primary}18` },
              }}>
                {label}
              </Link>
            ))}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
