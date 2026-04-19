import { Box, Stack } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

export default function Footer() {
  const { colors, mode } = useThemeContext();
  const year = new Date().getFullYear();

  return (
    <Box component="footer" sx={{
      padding: { xs: '1.5rem 1.5rem', md: '1.5rem 2.5rem' },
      borderTop: `1px solid ${colors.primary}15`,
      background: mode === 'dark' ? colors.surface : '#f0f4ff',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: '0.8rem',
    }}>
      <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: colors.muted }}>
        © {year} <Box component="span" sx={{ color: colors.primary }}>Ragul P</Box> — Frontend Developer
      </Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: colors.muted }}>
          Built with React.js & ❤️
        </Box>
        <Box sx={{
          fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em',
          textTransform: 'uppercase', padding: '0.2rem 0.6rem', borderRadius: '6px',
          border: `1px solid ${colors.primary}25`, color: colors.primary,
          background: `${colors.primary}08`,
        }}>
          Chennai 🇮🇳
        </Box>
      </Stack>
    </Box>
  );
}
