import { useState } from 'react';
import { Box, Container, Typography, Stack, Link, TextField, Button, keyframes, Snackbar, Alert } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}`;

const socials = [
  { label: 'Email', value: '16.ragul.p@gmail.com', href: 'mailto:16.ragul.p@gmail.com', icon: '✉️' },
  { label: 'Phone', value: '+91 93604 34869', href: 'tel:+919360434869', icon: '📞' },
  { label: 'Location', value: 'Velachery, Chennai', href: '#', icon: '📍' },
];

export default function Contact() {
  const { colors, mode } = useThemeContext();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [snack, setSnack] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compose mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:16.ragul.p@gmail.com?subject=${subject}&body=${body}`;
    setSnack(true);
    setForm({ name: '', email: '', message: '' });
  };

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      fontFamily: "'Instrument Sans', sans-serif",
      borderRadius: '10px',
      background: mode === 'dark' ? `${colors.card}` : '#f8faff',
      '& fieldset': { borderColor: `${colors.primary}25` },
      '&:hover fieldset': { borderColor: `${colors.primary}50` },
      '&.Mui-focused fieldset': { borderColor: colors.primary, borderWidth: '1.5px' },
    },
    '& .MuiInputLabel-root': { fontFamily: "'DM Mono', monospace", fontSize: '0.78rem', letterSpacing: '0.05em' },
    '& .MuiInputLabel-root.Mui-focused': { color: colors.primary },
  };

  return (
    <Box component="section" id="contact" sx={{
      background: mode === 'dark'
        ? `linear-gradient(180deg, ${colors.bg} 0%, ${colors.surface} 100%)`
        : 'linear-gradient(180deg, #f0f4ff 0%, #f8faff 100%)',
      padding: { xs: '4rem 1.5rem', md: '7rem 2.5rem' },
    }}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <Box sx={{ width: '24px', height: '1px', background: colors.primary }} />
          <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.7rem', color: colors.primary,
            letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Let's connect
          </Box>
        </Stack>

        <Typography variant="h2" sx={{ mb: '1rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117' }}>
          Got a project?<br />
          <Box component="span" sx={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Let's build it.
          </Box>
        </Typography>

        <Box sx={{ fontSize: '0.95rem', color: colors.muted, mb: '3.5rem', maxWidth: '500px', lineHeight: 1.8 }}>
          Open to full-time roles, freelance projects, and exciting collaborations. Drop a message — I'll get back within 24 hours.
        </Box>

        <Stack direction={{ xs: 'column', md: 'row' }} gap={{ xs: 4, md: 6 }}>
          {/* Contact info */}
          <Box sx={{ flex: 1 }}>
            <Stack spacing={2} sx={{ mb: '3rem' }}>
              {socials.map(({ label, value, href, icon }, index) => (
                <Box key={label} component={href !== '#' ? Link : 'div'} href={href !== '#' ? href : undefined}
                  data-cursor="CLICK"
                  sx={{
                    display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: '1rem',
                    padding: { xs: '1rem', sm: '1rem 1.2rem' }, borderRadius: '14px',
                    background: mode === 'dark' ? colors.card : '#fff',
                    border: `1px solid ${colors.primary}18`,
                    textDecoration: 'none', cursor: href !== '#' ? 'none' : 'default',
                    transition: 'all 0.3s',
                    '&:hover': href !== '#' ? {
                      borderColor: `${colors.primary}40`,
                      transform: 'translateX(6px)',
                      boxShadow: `0 8px 30px ${colors.primary}12`,
                    } : {},
                  }}>
                  <Box sx={{ fontSize: '1.3rem', width: '40px', height: '40px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    background: `${colors.primary}12`, borderRadius: '10px',
                    animation: `${float} 3s ease-in-out infinite`, animationDelay: `${index * 0.15}s`,
                  }}>
                    {icon}
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: colors.muted,
                      letterSpacing: '0.12em', textTransform: 'uppercase', mb: '0.15rem' }}>
                      {label}
                    </Box>
                    <Box sx={{ fontSize: '0.9rem', color: mode === 'dark' ? '#eef2ff' : '#0d1117', fontWeight: 500,
                      wordBreak: 'break-word' }}>
                      {value}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Availability card */}
            <Box sx={{
              padding: '1.2rem 1.5rem', borderRadius: '14px',
              background: `linear-gradient(135deg, ${colors.primary}0d, ${colors.secondary}0d)`,
              border: `1px solid ${colors.primary}25`,
            }}>
              <Stack direction="row" alignItems="center" gap="0.6rem" sx={{ mb: '0.5rem' }}>
                <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e',
                  boxShadow: '0 0 10px #22c55e', animation: 'pulse 2s infinite',
                  '@keyframes pulse': { '50%': { opacity: 0.5 } } }} />
                <Box sx={{ fontFamily: "'DM Mono', monospace", fontSize: '0.65rem', color: '#22c55e',
                  letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Available for work
                </Box>
              </Stack>
              <Box sx={{ fontSize: '0.83rem', color: colors.muted, lineHeight: 1.6 }}>
                Currently open to frontend developer roles and freelance projects. Based in Chennai — open to remote.
              </Box>
            </Box>
          </Box>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <TextField label="Your Name" value={form.name} required
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))} sx={inputSx} />
            <TextField label="Email Address" type="email" value={form.email} required
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))} sx={inputSx} />
            <TextField label="Message" multiline rows={4} value={form.message} required
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))} sx={inputSx} />
            <Button type="submit" variant="contained" size="large" data-cursor="SEND"
              sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, mt: '0.5rem' }}>
              Send Message →
            </Button>
          </Box>
        </Stack>
      </Container>
 
      <Snackbar open={snack} autoHideDuration={4000} onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ fontFamily: "'DM Mono', monospace" }}>
          Opening your email client...
        </Alert>
      </Snackbar>
    </Box>
  );
}
