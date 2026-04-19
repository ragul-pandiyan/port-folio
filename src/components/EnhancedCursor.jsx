import { useEffect, useRef, useState } from 'react';
import { useThemeContext } from '../context/ThemeContext';

export default function EnhancedCursor() {
  const { colors } = useThemeContext();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailsRef = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState('');
  const rafRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';

      // trail
      trailsRef.current.forEach((t, i) => {
        if (!t) return;
        setTimeout(() => {
          if (t) { t.style.left = e.clientX + 'px'; t.style.top = e.clientY + 'px'; t.style.opacity = (1 - i / 8) * 0.4 + ''; }
        }, i * 18);
      });
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      ringEl.style.left = ring.current.x + 'px';
      ringEl.style.top = ring.current.y + 'px';
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const enterInteractive = (e) => {
      dot.style.transform = 'translate(-50%,-50%) scale(2.5)';
      ringEl.style.transform = 'translate(-50%,-50%) scale(1.6)';
      ringEl.style.opacity = '0.9';
      ringEl.style.borderWidth = '2px';
      const txt = e.currentTarget.dataset.cursor || '';
      setLabel(txt);
    };
    const leaveInteractive = () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
      ringEl.style.transform = 'translate(-50%,-50%) scale(1)';
      ringEl.style.opacity = '0.5';
      ringEl.style.borderWidth = '1px';
      setLabel('');
    };

    window.addEventListener('mousemove', onMove);
    const els = document.querySelectorAll('a,button,[data-cursor],.project-card');
    els.forEach(el => { el.addEventListener('mouseenter', enterInteractive); el.addEventListener('mouseleave', leaveInteractive); });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      els.forEach(el => { el.removeEventListener('mouseenter', enterInteractive); el.removeEventListener('mouseleave', leaveInteractive); });
    };
  }, []);

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      {/* Comet trails */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} ref={el => trailsRef.current[i] = el} style={{
          position: 'fixed', width: `${10 - i}px`, height: `${10 - i}px`,
          background: colors.primary, borderRadius: '50%', pointerEvents: 'none',
          zIndex: 9995, transform: 'translate(-50%,-50%)', opacity: 0,
          filter: `blur(${i * 0.8}px)`, transition: 'opacity 0.3s',
          mixBlendMode: 'screen',
        }} />
      ))}

      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed', width: '44px', height: '44px',
        border: `1px solid ${colors.primary}`,
        borderRadius: '50%', pointerEvents: 'none', zIndex: 9997,
        transform: 'translate(-50%,-50%)', opacity: 0.5,
        transition: 'width 0.3s, height 0.3s, opacity 0.3s, border-width 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {label && (
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: '9px',
            color: colors.primary, letterSpacing: '0.1em', whiteSpace: 'nowrap',
            transform: 'translateY(32px)',
          }}>{label}</span>
        )}
      </div>

      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed', width: '8px', height: '8px',
        background: colors.primary, borderRadius: '50%', pointerEvents: 'none',
        zIndex: 9999, transform: 'translate(-50%,-50%)',
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        boxShadow: `0 0 12px ${colors.primary}, 0 0 24px ${colors.primary}80`,
        mixBlendMode: 'screen',
      }} />
    </>
  );
}
