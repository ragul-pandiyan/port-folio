import { useRef, useEffect, useState } from 'react';
import { Box, Container, Typography, Stack, Chip, keyframes } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const slideIn = keyframes`from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}`;

const experiences = [
  {
    period: '2024 – 2025',
    role: 'Frontend Developer',
    company: 'CAFS Infotech',
    location: 'Chennai, India',
    type: 'Full-time',
    points: [
      'Delivered 4+ production-ready projects improving user engagement by 30%',
      'Developed financial calculators (SIP, goal-based returns) for CAFS Money',
      'Built fully responsive insurance website with SEO & mobile-first approach',
      'Reduced UI load time by 20% through code optimisation and performance techniques',
      'Integrated React with Redux for scalable HRMS state management',
    ],
    tags: ['React', 'Redux', 'Material UI', 'Chart.js', 'Ant Design'],
    dotColor: null,
  },
  {
    period: '2023 – 2024',
    role: 'Frontend Developer Intern',
    company: 'CAFS Infotech',
    location: 'Chennai, India',
    type: 'Internship · 5 months',
    points: [
      'Hands-on development of React components and responsive layouts',
      'Self-taught Redux and Ant Design to contribute to scalable architecture',
      'Cross-functional collaboration to deliver user-centric UI enhancements',
    ],
    dotColor: 'secondary',
  },
  {
    period: '2019 – 2023',
    role: 'B.E. Information Technology',
    company: 'Annamalai University',
    location: 'Chidambaram · 75.2%',
    type: 'Degree',
    points: [
      'Certified in Frontend Development — Besant Technologies, Velachery (2023)',
    ],
    dotColor: 'muted',
  },
];

function TimelineItem({ exp, colors, mode, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 150); observer.disconnect(); }
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  const dotColor = exp.dotColor === 'secondary' ? colors.secondary
    : exp.dotColor === 'muted' ? colors.muted : colors.primary;

  return (
    <Box ref={ref} 
      sx={{
        mb: '2.5rem', position: 'relative',
        opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-20px)',
        transition: 'all 0.6s ease',
      }}
    >
      {/* Dot */}
      <Box sx={{
        position: 'absolute', left: { xs: '6px', md: '-43px' }, top: '0.5rem',
        width: '10px', height: '10px', borderRadius: '50%',
        background: dotColor, boxShadow: `0 0 14px ${dotColor}`,
        border: `2px solid ${mode === 'dark' ? colors.surface : '#fff'}`,
      }} />

      {/* Card */}
      <Box 
        sx={{
          background: mode === 'dark' ? colors.card : '#fff',
          border: `1px solid ${dotColor}22`,
          borderLeft: `3px solid ${dotColor}`,
          borderRadius: { xs: '14px', md: '0 14px 14px 0' },
          padding: { xs: '1.3rem 1.2rem', md: '1.5rem 1.8rem' },
          transition: 'all 0.3s',
          '&:hover': {
            borderColor: `${dotColor}55`, borderLeftColor: dotColor,
            boxShadow: `0 8px 30px ${dotColor}15`,
            transform: 'translateX(4px)',
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1} sx={{ mb: '0.5rem' }}>
          <Box>
            <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: dotColor,
              letterSpacing: '0.12em', textTransform: 'uppercase', mb: '0.3rem' }}>
              {exp.period}
            </Box>
            <Typography variant="h4" sx={{ color: mode === 'dark' ? '#eef2ff' : '#0d1117', mb: '0.15rem' }}>
              {exp.role}
            </Typography>
            <Box sx={{ fontSize: '0.83rem', color: colors.muted }}>
              {exp.company} · {exp.location}
            </Box>
          </Box>
          <Box sx={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.3rem 0.7rem', borderRadius: '20px',
            background: `${dotColor}12`, border: `1px solid ${dotColor}30`,
            color: dotColor, whiteSpace: 'nowrap', height: 'fit-content',
          }}>
            {exp.type}
          </Box>
        </Stack>

        <Box component="ul" sx={{ pl: '1.2rem', mt: '1rem', mb: '1rem', listStyle: 'none', padding: 0 }}>
          {exp.points.map((pt, i) => (
            <Box component="li" key={i} sx={{
              fontSize: '0.85rem', color: colors.muted, lineHeight: 1.7, mb: '0.4rem',
              display: 'flex', gap: '0.6rem', alignItems: 'flex-start',
              '&::before': { content: '"—"', color: dotColor, flexShrink: 0, mt: '0.1rem' },
            }}>
              {pt}
            </Box>
          ))}
        </Box>

        {exp.tags && (
          <Stack direction="row" flexWrap="wrap" gap={0.7}>
            {exp.tags.map((t, i) => (
              <Chip key={i} label={t} size="small" variant="outlined" sx={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', borderRadius: '6px', height: '22px',
                borderColor: `${dotColor}40`, color: dotColor, background: `${dotColor}09`,
              }} />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

export default function Experience() {
  const { colors, mode } = useThemeContext();

  return (
    <Box component="section" id="experience" 
        sx={{
          background: mode === 'dark'
              ? `linear-gradient(180deg, ${colors.surface} 0%, ${colors.bg} 100%)`
              : `linear-gradient(180deg, #f0f4ff 0%, #fff 100%)`,
          padding: { xs: '4rem 1.5rem', md: '7rem 2.5rem' },
        }}
    >
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box sx={{ width: '24px', height: '1px', background: colors.primary }} />
          <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: colors.primary,
            letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Career
          </Box>
        </Stack>

        <Typography variant="h2" sx={{ mb: '3rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117' }}>
          Experience
        </Typography>

        <Box sx={{ position: 'relative', pl: { xs: '1rem', md: '2.5rem' }, maxWidth: '800px' }}>
          {/* Timeline line */}
          <Box sx={{
            position: 'absolute', left: { xs: '10px', md: 0 }, top: '14px', bottom: '14px', width: '1px',
            background: `linear-gradient(to bottom, ${colors.primary}, ${colors.secondary}60, transparent)`,
            display: { xs: 'none', md: 'block' },
          }} />

          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} colors={colors} mode={mode} index={i} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
