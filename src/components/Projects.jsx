import { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Chip, Link, Stack, Modal, IconButton, keyframes } from '@mui/material';
import { Close as CloseIcon, Launch as LaunchIcon } from '@mui/icons-material';
import { useThemeContext } from '../context/ThemeContext';

const fadeUp = keyframes`from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}`;
const shimmer = keyframes`0%{background-position:-200% 0}100%{background-position:200% 0}`;

const projects = [
  {
    id: 1, num: '01', featured: true,
    title: 'HRMS Lite',
    sub: 'HR Management System',
    badge: 'Currently Building',
    desc: 'A comprehensive Human Resource Management System with modules for employee onboarding, attendance tracking, and payroll processing. Integrated React with Redux for scalable state management across complex workflows.',
    modules: ['Employee Onboarding', 'Attendance Tracking', 'Payroll Processing'],
    tags: ['React.js', 'Redux', 'REST APIs', 'Responsive Design'],
    emoji: '🏢',
    color: 'primary',
  },
  {
    id: 2, num: '02',
    title: 'CAFS Money',
    sub: 'Mutual Fund Platform',
    link: 'cafsmoney.com', url: 'https://cafsmoney.com',
    desc: 'Financial investment platform with SIP and goal-based return calculators. Reduced UI load time by 20% through performance optimisation and code splitting.',
    tags: ['React', 'Chart.js', 'Material UI'],
    emoji: '💰',
    color: 'secondary',
  },
  {
    id: 3, num: '03',
    title: 'CAFS India',
    sub: 'Insurance Company Website',
    link: 'cafsindia.com', url: 'https://cafsindia.com',
    desc: 'Fully responsive static website built from scratch with SEO optimisation and mobile-first design. Covers services, benefits, and contact flows.',
    tags: ['React', 'Ant Design', 'CSS3', 'SEO'],
    emoji: '🛡️',
    color: 'accent',
  },
  {
    id: 4, num: '04',
    title: 'IDEAL Fastener',
    sub: 'E-commerce / Corporate',
    link: 'idealfastener.com', url: 'https://idealfastener.com',
    desc: 'Contributed to revamping the corporate e-commerce website — UI components, responsive layouts, and cross-browser compatibility improvements.',
    tags: ['React', 'Responsive', 'UI Components'],
    emoji: '⚙️',
    color: 'primary',
  },
];

function TiltCard({ children, sx }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
    const y = -((e.clientY - r.top) / r.height - 0.5) * 14;
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)'; };

  return (
    <Box ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      sx={{ transition: 'transform 0.15s ease', willChange: 'transform', ...sx }}>
      {children}
    </Box>
  );
}

export default function Projects() {
  const { colors, mode } = useThemeContext();
  const [selected, setSelected] = useState(null);

  const getColor = (c) => c === 'secondary' ? colors.secondary : c === 'accent' ? colors.accent : colors.primary;

  return (
    <Box component="section" id="projects" sx={{
      background: mode === 'dark'
        ? `linear-gradient(180deg, ${colors.bg} 0%, ${colors.surface} 100%)`
        : `linear-gradient(180deg, #f8faff 0%, #f0f4ff 100%)`,
      padding: { xs: '4rem 1.5rem', md: '7rem 2.5rem' },
    }}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box sx={{ width: '24px', height: '1px', background: colors.primary }} />
          <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: colors.primary, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Selected work
          </Box>
        </Stack>

        <Typography variant="h2" sx={{
          mb: '3rem',
          background: `linear-gradient(135deg, ${mode === 'dark' ? '#eef2ff' : '#0d1117'} 60%, ${colors.primary})`,
          backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: `${fadeUp} 0.7s ease-out`,
        }}>
          Projects
        </Typography>

        <Grid container spacing={2}>
          {projects.map((p) => {
            const accent = getColor(p.color);
            return (
              <Grid item xs={12} sm={p.featured ? 12 : 6} key={p.id}>
                <TiltCard>
                  <Box className="project-card" data-cursor="OPEN"
                    onClick={() => setSelected(p)}
                    sx={{
                      background: p.featured
                        ? `linear-gradient(135deg, ${accent}0a, ${colors.secondary}08)`
                        : (mode === 'dark' ? colors.card : '#fff'),
                      border: `1px solid ${p.featured ? accent + '35' : colors.primary + '18'}`,
                      borderRadius: '16px', padding: '2rem', cursor: 'none',
                      position: 'relative', overflow: 'hidden', height: '100%',
                      transition: 'border-color 0.3s',
                      '&:hover': { borderColor: `${accent}55` },
                      '&::before': p.featured ? {
                        content: '""', position: 'absolute', top: 0, left: '-200%', width: '200%', height: '100%',
                        background: `linear-gradient(90deg, transparent, ${accent}08, transparent)`,
                        animation: `${shimmer} 3s linear infinite`,
                      } : {},
                    }}>

                    {p.featured && (
                      <Box sx={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem', mb: '1rem',
                        fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.12em',
                        color: accent, background: `${accent}15`, border: `1px solid ${accent}35`,
                        padding: '0.3rem 0.8rem', borderRadius: '20px',
                      }}>
                        <Box sx={{ width: '6px', height: '6px', borderRadius: '50%', background: accent,
                          animation: 'pulse 1.5s infinite', '@keyframes pulse': { '50%': { opacity: 0.5 } } }} />
                        {p.badge}
                      </Box>
                    )}

                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: '1rem' }}>
                      <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: colors.muted }}>
                        {p.num}{p.featured ? ' — FEATURED' : ''}
                      </Box>
                      {p.url && (
                        <Link href={p.url} target="_blank" rel="noreferrer"
                          onClick={e => e.stopPropagation()}
                          sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: accent,
                            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.2rem',
                            opacity: 0.7, '&:hover': { opacity: 1 }, cursor: 'none' }}>
                          {p.link} <LaunchIcon sx={{ fontSize: '11px' }} />
                        </Link>
                      )}
                    </Stack>

                    <Stack direction="row" alignItems="baseline" gap="0.6rem" sx={{ mb: '0.5rem' }}>
                      <Box sx={{ fontSize: p.featured ? '1.5rem' : '1.1rem' }}>{p.emoji}</Box>
                      <Box>
                        <Box sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700,
                          fontSize: p.featured ? '1.5rem' : '1.15rem',
                          color: mode === 'dark' ? '#eef2ff' : '#0d1117', lineHeight: 1.2 }}>
                          {p.title}
                        </Box>
                        <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: accent, mt: '0.2rem' }}>
                          {p.sub}
                        </Box>
                      </Box>
                    </Stack>

                    <Box sx={{ fontSize: '0.875rem', color: colors.muted, lineHeight: 1.7,
                      mb: '1.5rem', maxWidth: p.featured ? '640px' : '100%' }}>
                      {p.desc}
                    </Box>

                    {p.modules && (
                      <Grid container spacing={1} sx={{ mb: '1.5rem' }}>
                        {p.modules.map((m, i) => (
                          <Grid item xs={12} sm={4} key={i}>
                            <Box sx={{
                              padding: '0.75rem', background: `${accent}09`,
                              border: `1px solid ${accent}20`, borderRadius: '10px',
                            }}>
                              <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem',
                                color: colors.muted, textTransform: 'uppercase', letterSpacing: '0.1em', mb: '0.3rem' }}>
                                Module
                              </Box>
                              <Box sx={{ fontSize: '0.8rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117', fontWeight: 500 }}>
                                {m}
                              </Box>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    )}

                    <Stack direction="row" flexWrap="wrap" gap={0.8}>
                      {p.tags.map((t, i) => (
                        <Chip key={i} label={t} size="small" variant="outlined" sx={{
                          fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em',
                          textTransform: 'uppercase', borderRadius: '6px', height: '24px',
                          borderColor: i < 2 ? `${accent}45` : `${colors.primary}20`,
                          color: i < 2 ? accent : colors.muted,
                          background: i < 2 ? `${accent}0a` : 'transparent',
                        }} />
                      ))}
                    </Stack>
                  </Box>
                </TiltCard>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Project Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Box sx={{
          background: mode === 'dark' ? colors.surface : '#fff',
          border: `1px solid ${colors.primary}30`, borderRadius: '20px',
          padding: '2.5rem', maxWidth: '600px', width: '100%', position: 'relative',
          maxHeight: '90vh', overflow: 'auto',
          boxShadow: `0 40px 100px ${colors.primary}25`,
        }}>
          <IconButton onClick={() => setSelected(null)} sx={{
            position: 'absolute', top: '1rem', right: '1rem', color: colors.muted,
          }}><CloseIcon /></IconButton>

          {selected && (
            <>
              <Box sx={{ fontSize: '2rem', mb: '0.5rem' }}>{selected.emoji}</Box>
              <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: getColor(selected.color),
                letterSpacing: '0.15em', textTransform: 'uppercase', mb: '0.4rem' }}>{selected.num}</Box>
              <Typography variant="h3" sx={{ mb: '0.3rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117' }}>
                {selected.title}
              </Typography>
              <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: getColor(selected.color), mb: '1.2rem' }}>
                {selected.sub}
              </Box>
              <Box sx={{ fontSize: '0.9rem', color: colors.muted, lineHeight: 1.8, mb: '1.5rem' }}>
                {selected.desc}
              </Box>
              <Stack direction="row" flexWrap="wrap" gap={0.8}>
                {selected.tags.map((t, i) => (
                  <Chip key={i} label={t} size="small" variant="outlined"
                    sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', borderRadius: '6px',
                      borderColor: `${getColor(selected.color)}45`, color: getColor(selected.color),
                      background: `${getColor(selected.color)}0a` }} />
                ))}
              </Stack>
              {selected.url && (
                <Box sx={{ mt: '1.5rem' }}>
                  <Link href={selected.url} target="_blank" rel="noreferrer" sx={{
                    fontFamily: "'DM Mono', monospace", fontSize: '0.75rem', color: getColor(selected.color),
                    display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}>
                    Visit {selected.link} <LaunchIcon sx={{ fontSize: '14px' }} />
                  </Link>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
