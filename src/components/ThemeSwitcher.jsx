import { useState } from 'react';
import { Box, Tooltip, Collapse } from '@mui/material';
import { useThemeContext, colorPalettes } from '../context/ThemeContext';

const paletteInfo = {
  cyber:  { label: 'Cyber',  hex: '#00e5ff' },
  aurora: { label: 'Aurora', hex: '#a78bfa' },
  ember:  { label: 'Ember',  hex: '#fb923c' },
  matrix: { label: 'Matrix', hex: '#22c55e' },
  rose:   { label: 'Rose',   hex: '#f43f5e' },
  arctic: { label: 'Arctic', hex: '#38bdf8' },
};

export default function ThemeSwitcher() {
  const { mode, palette, colors, toggleMode, changePalette } = useThemeContext();
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{
      position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.6rem',
    }}>
      {/* Palette panel */}
      <Collapse in={open} unmountOnExit>
        <Box sx={{
          background: mode === 'dark' ? `${colors.surface}ee` : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(24px)',
          border: `1px solid ${colors.primary}30`,
          borderRadius: '16px',
          padding: '1rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          boxShadow: `0 20px 60px ${colors.primary}25`,
          minWidth: '150px',
        }}>
          <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.2em',
            color: colors.muted, textTransform: 'uppercase', marginBottom: '0.3rem', paddingLeft: '0.2rem' }}>
            Theme Color
          </Box>
          {Object.entries(paletteInfo).map(([key, info]) => (
            <Box key={key} onClick={() => changePalette(key)} sx={{
              display: 'flex', alignItems: 'center', gap: '0.7rem',
              padding: '0.5rem 0.6rem', borderRadius: '10px', cursor: 'none',
              background: palette === key ? `${info.hex}18` : 'transparent',
              border: `1px solid ${palette === key ? info.hex + '50' : 'transparent'}`,
              transition: 'all 0.2s', '&:hover': { background: `${info.hex}12` },
            }}>
              <Box sx={{
                width: '18px', height: '18px', borderRadius: '50%', background: info.hex, flexShrink: 0,
                boxShadow: `0 0 10px ${info.hex}80`,
                outline: palette === key ? `2px solid ${info.hex}` : 'none',
                outlineOffset: '2px',
              }} />
              <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117',
                fontWeight: palette === key ? 500 : 400 }}>
                {info.label}
              </Box>
              {palette === key && (
                <Box sx={{ marginLeft: 'auto', color: info.hex, fontSize: '10px' }}>✓</Box>
              )}
            </Box>
          ))}

          <Box sx={{ height: '1px', background: `${colors.primary}20`, margin: '0.3rem 0' }} />

          {/* Mode toggle inside panel */}
          <Box onClick={toggleMode} sx={{
            display: 'flex', alignItems: 'center', gap: '0.7rem',
            padding: '0.5rem 0.6rem', borderRadius: '10px', cursor: 'none',
            '&:hover': { background: `${colors.primary}12` }, transition: 'all 0.2s',
          }}>
            <Box sx={{ fontSize: '14px', width: '18px', textAlign: 'center' }}>
              {mode === 'dark' ? '☀️' : '🌙'}
            </Box>
            <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117' }}>
              {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Box>
          </Box>
        </Box>
      </Collapse>

      {/* Toggle button */}
      <Tooltip title={open ? 'Close' : 'Customize'} placement="left">
        <Box onClick={() => setOpen(p => !p)} sx={{
          width: '48px', height: '48px', borderRadius: '14px',
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'none', boxShadow: `0 8px 30px ${colors.primary}50`,
          transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          transform: open ? 'rotate(45deg) scale(1.1)' : 'rotate(0) scale(1)',
          '&:hover': { transform: open ? 'rotate(45deg) scale(1.15)' : 'rotate(15deg) scale(1.1)', boxShadow: `0 12px 40px ${colors.primary}70` },
          fontSize: '18px',
        }}>
          🎨
        </Box>
      </Tooltip>
    </Box>
  );
}
