import { useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, keyframes } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const fadeUp = keyframes`from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}`;
const scanLine = keyframes`0%{top:-2px}100%{top:100%}`;

const ROLES = ['React.js Specialist', 'Frontend Developer', 'UI/UX Enthusiast', 'HRMS Builder'];

export default function Hero() {
  const { colors, mode } = useThemeContext();
  const canvasRef = useRef(null);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  // Typing effect
  useEffect(() => {
    const target = ROLES[roleIdx];
    let i = displayed.length;
    if (typing) {
      if (i < target.length) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (i > 0) {
        const t = setTimeout(() => setDisplayed(target.slice(0, i - 1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIdx(p => (p + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIdx]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const color = colors.primary;

    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = color + '80';
        ctx.fill();
      });
      // connect nearby
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = color + Math.round((1 - dist / 100) * 40).toString(16).padStart(2, '0');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [colors.primary]);

  const stats = [
    { num: '1+', label: 'Years Exp.' },
    { num: '4+', label: 'Live Projects' },
    { num: '20%', label: 'Load Time ↓' },
    { num: '30%', label: 'Engagement ↑' },
  ];

  return (
    <Box component="section" id="home" sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', pt: '80px',
      px: { xs: '1.5rem', md: '5rem' },
    }}>
      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0, opacity: 0.6,
      }} />

      {/* Big blurred orbs */}
      <Box sx={{
        position: 'absolute', width: { xs: '400px', md: '700px' }, height: { xs: '400px', md: '700px' },
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.primary}0f 0%, transparent 65%)`,
        right: { xs: '-170px', md: '-200px' }, top: { xs: '40%', md: '50%' },
        transform: { xs: 'translateY(-40%)', md: 'translateY(-50%)' },
        pointerEvents: 'none', animation: `${float} 9s ease-in-out infinite`,
      }} />
      <Box sx={{
        position: 'absolute', width: { xs: '280px', md: '500px' }, height: { xs: '280px', md: '500px' },
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colors.secondary}0d 0%, transparent 65%)`,
        left: { xs: '-110px', md: '-150px' }, bottom: { xs: '-70px', md: '-100px' },
        pointerEvents: 'none', animation: `${float} 12s ease-in-out infinite reverse`,
      }} />

      {/* Scan line */}
      <Box sx={{
        position: 'absolute', left: 0, right: 0, height: '2px', zIndex: 1,
        background: `linear-gradient(90deg, transparent, ${colors.primary}40, transparent)`,
        animation: `${scanLine} 5s linear infinite`, pointerEvents: 'none',
      }} />

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 2, maxWidth: '100%', animation: `${fadeUp} 0.9s ease-out` }}>

        {/* Tag line */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
          <Box sx={{ width: '36px', height: '1px', background: colors.primary }} />
          <Box sx={{
            fontFamily: "'DM Mono', monospace", fontSize: '0.72rem', color: colors.primary,
            letterSpacing: '0.2em', textTransform: 'uppercase',
          }}>
            Frontend Developer · Chennai, India
          </Box>
        </Stack>

        {/* Name */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems='flex-start' sx={{
          fontFamily: "'Syne', sans-serif", fontWeight: 800,
          fontSize: { xs: 'clamp(2.8rem, 12vw, 4.5rem)', sm: 'clamp(3.8rem, 10vw, 7.5rem)' },
          lineHeight: 0.92, letterSpacing: '-0.03em',
          color: mode === 'dark' ? '#eef2ff' : '#0d1117',
          mb: '0.4rem', width: '100%'
        }}>
          Ragul
          <Box component="span" sx={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>.P</Box>
        </Stack>

        {/* Typing role */}
        <Box sx={{
          fontFamily: "'DM Mono', monospace", fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
          color: colors.muted, mb: '1.6rem', height: '2rem', display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          {displayed}
          <Box sx={{
            display: 'inline-block', width: '2px', height: '1.2em',
            background: colors.primary, animation: 'blink 1s step-end infinite',
            '@keyframes blink': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
          }} />
        </Box>

        {/* Description */}
        <Box sx={{
          fontSize: { xs: '0.95rem', sm: '1rem' }, 
          color: mode === 'dark' ? colors.muted : '#4a5568',
          maxWidth: { xs: '100%', sm: '520px' }, 
          lineHeight: 1.7, 
          mb: '2.5rem',
          textAlign: { xs: 'center', md: 'left' },
          px: { xs: 1, sm: 0 }
        }}>
          Building high-performance React applications — financial platforms, insurance sites, and HR systems. Clean code, pixel-perfect UI, real impact.
        </Box>

        {/* CTA Buttons */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 2 }} 
          sx={{ 
            mb: '3rem', 
            alignItems: { xs: 'stretch', sm: 'flex-start' },
            width: { xs: '100%', sm: 'auto' },
            maxWidth: { xs: '320px', sm: 'none' },
            mx: { xs: 'auto', sm: 0 }
          }}>
          <Button variant="contained" href="#projects" data-cursor="VIEW"
            sx={{ 
              fontSize: { xs: '0.85rem', sm: '0.875rem' },
              py: { xs: 1, sm: 1.5 },
              px: { xs: 3, sm: 4 }
            }}>
            View Projects
          </Button>
          <Button variant="outlined" href="#contact" data-cursor="HIRE"
            sx={{ 
              fontSize: { xs: '0.85rem', sm: '0.875rem' },
              py: { xs: 1.25, sm: 1.5 },
              px: { xs: 3, sm: 4 }
            }}>
            Get In Touch
          </Button>
          <Button variant="outlined" href="mailto:16.ragul.p@gmail.com"
            data-cursor="MAIL"
            sx={{ 
              borderColor: `${colors.secondary}80 !important`, 
              color: `${colors.secondary} !important`,
              fontSize: { xs: '0.85rem', sm: '0.875rem' },
              py: { xs: 1.25, sm: 1.5 },
              px: { xs: 3, sm: 4 },
              '&:hover': { background: `${colors.secondary}12 !important` } 
            }}>
            Email Me
          </Button>
        </Stack>

        {/* Stats */}
        <Box sx={{
          display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: '1.5rem', sm: '2rem', md: '3rem' },
          pt: '2rem', borderTop: `1px solid ${colors.primary}1a`,
          alignItems: { xs: 'center', sm: 'flex-start' },
        }}>
          {stats.map((s, i) => (
            <Box key={i} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Box sx={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: { xs: 'clamp(1.6rem, 4vw, 2rem)', sm: 'clamp(1.8rem, 3vw, 2.4rem)' }, lineHeight: 1,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>{s.num}</Box>
              <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: colors.muted,
                letterSpacing: '0.12em', textTransform: 'uppercase', mt: '0.2rem' }}>{s.label}</Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Scroll indicator */}
      <Box sx={{
        position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        opacity: 0.5, animation: `${float} 2.5s ease-in-out infinite`,
      }}>
        <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: colors.primary, letterSpacing: '0.2em' }}>SCROLL</Box>
        <Box sx={{ width: '1px', height: '40px', background: `linear-gradient(to bottom, ${colors.primary}, transparent)` }} />
      </Box>
    </Box>
  );
}
