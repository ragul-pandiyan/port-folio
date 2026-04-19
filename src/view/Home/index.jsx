import { Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import Projects from '../../components/Projects';
import Skills from '../../components/Skills';
import Experience from '../../components/Experience';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import { useFadeUpOnScroll } from '../../hooks/usePortfolioEffects';

export default function Home() {
  useFadeUpOnScroll();

  return (
    <Box sx={{ position: 'relative', zIndex: 2 }}>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Contact />
      <Footer />
    </Box>
  );
}
