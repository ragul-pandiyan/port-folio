import { useRef, useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Stack, keyframes } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const fadeUp = keyframes`from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}`;

const skillsData = {
  Frontend: [
    { name: 'React.js', level: 90, icon: '⚛️' },
    { name: 'JavaScript ES6+', level: 85, icon: '🟨' },
    { name: 'Redux / Context API', level: 80, icon: '🔄' },
    { name: 'HTML5 / CSS3', level: 88, icon: '🎨' },
  ],
  'Libraries & Tools': [
    { name: 'Material UI', level: 85, icon: '🎭' },
    { name: 'Ant Design', level: 80, icon: '🐜' },
    { name: 'REST APIs', level: 78, icon: '🔌' },
    { name: 'Git / Figma', level: 75, icon: '🛠️' },
  ],
};

const techCloud = ['React.js','Redux','JavaScript','Chart.js','Material UI','Ant Design','CSS3','HTML5','REST APIs','Git','Figma','Responsive Design','SEO','Context API'];

function AnimatedBar({ level, color }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setWidth(level), 100); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <Box ref={ref} sx={{
      flex: 1, height: '3px', background: 'rgba(255,255,255,0.06)',
      borderRadius: '4px', overflow: 'hidden', mx: '1rem',
    }}>
      <Box sx={{
        height: '100%', borderRadius: '4px', width: `${width}%`,
        background: `linear-gradient(90deg, ${color}80, ${color})`,
        boxShadow: `0 0 8px ${color}60`,
        transition: 'width 1.2s cubic-bezier(0.34,1.56,0.64,1)',
      }} />
    </Box>
  );
}

export default function Skills() {
  const { colors, mode } = useThemeContext();

  return (
    <Box component="section" id="skills" sx={{
      padding: { xs: '4rem 1.5rem', md: '7rem 2.5rem' },
      background: mode === 'dark' ? colors.bg : '#fff',
    }}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box sx={{ width: '24px', height: '1px', background: colors.primary }} />
          <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: colors.primary,
            letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Technical expertise
          </Box>
        </Stack>

        <Typography variant="h2" sx={{
          mb: '3.5rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117',
          animation: `${fadeUp} 0.7s ease-out`,
        }}>
          Skills
        </Typography>

        <Grid container spacing={6} sx={{ maxWidth: '900px', mb: '4rem' }}>
          {Object.entries(skillsData).map(([group, skills]) => (
            <Grid item xs={12} sm={6} key={group}>
              <Box sx={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: colors.muted,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                mb: '1.3rem', pb: '0.7rem',
                borderBottom: `1px solid ${colors.primary}18`,
              }}>
                {group}
              </Box>

              {skills.map((skill) => (
                <Stack key={skill.name} direction="row" alignItems="center" sx={{ mb: '1.1rem' }}>
                  <Box sx={{ fontSize: '14px', width: '20px', flexShrink: 0 }}>{skill.icon}</Box>
                  <Box sx={{ fontSize: '0.83rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117',
                    minWidth: '140px', ml: '0.5rem' }}>
                    {skill.name}
                  </Box>
                  <AnimatedBar level={skill.level} color={colors.primary} />
                  <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: colors.primary,
                    minWidth: '34px', textAlign: 'right' }}>
                    {skill.level}%
                  </Box>
                </Stack>
              ))}
            </Grid>
          ))}
        </Grid>

        {/* Tech cloud */}
        <Box>
          <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.68rem', color: colors.muted,
            letterSpacing: '0.18em', textTransform: 'uppercase', mb: '1.2rem' }}>
            Technology cloud
          </Box>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {techCloud.map((t, i) => (
              <Box key={t} sx={{
                fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '0.45rem 0.85rem',
                border: `1px solid ${colors.primary}${['25','30','20','28'][i % 4]}`,
                color: i % 3 === 0 ? colors.primary : colors.muted,
                background: i % 3 === 0 ? `${colors.primary}08` : 'transparent',
                borderRadius: '8px', transition: 'all 0.2s',
                '&:hover': { color: colors.primary, borderColor: `${colors.primary}50`, background: `${colors.primary}10` },
                cursor: 'default',
                animation: `${fadeUp} 0.5s ease-out ${i * 0.04}s both`,
              }}>
                {t}
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
