import { useState, useEffect, useRef } from 'react';

function Cursor({ color }) {
    const dotRef  = useRef(null);
    const ringRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const ring  = useRef({ x: 0, y: 0 });
    const [label, setLabel] = useState('');

    useEffect(() => {
        const dot  = dotRef.current;
        const ringEl = ringRef.current;
        if (!dot || !ringEl) return;

        let raf;
        const onMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            dot.style.left = e.clientX + 'px';
            dot.style.top  = e.clientY + 'px';
        };

        const animate = () => {
            ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
            ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
            ringEl.style.left = ring.current.x + 'px';
            ringEl.style.top  = ring.current.y + 'px';
            raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);

        const enter = (e) => {
            dot.style.transform = 'translate(-50%,-50%) scale(2.5)';
            ringEl.style.width = '56px'; ringEl.style.height = '56px';
            ringEl.style.opacity = '.9';
            setLabel(e.currentTarget.dataset.cursor || '');
        };
        const leave = () => {
            dot.style.transform = 'translate(-50%,-50%) scale(1)';
            ringEl.style.width = '40px'; ringEl.style.height = '40px';
            ringEl.style.opacity = '.5';
            setLabel('');
        };

        window.addEventListener('mousemove', onMove);
        const els = document.querySelectorAll('a,button,[data-cursor],.rp-project-card');
        els.forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf);
            els.forEach(el => { el.removeEventListener('mouseenter', enter); el.removeEventListener('mouseleave', leave); });
        };
    }, []);

    return (
        <>
            <div id="rp-cursor-ring" ref={ringRef}
                style={{ borderColor: color, color }}>
                {label && <span className="rl">{label}</span>}
            </div>
            <div id="rp-cursor-dot" ref={dotRef}
                style={{ background: color, boxShadow: `0 0 12px ${color}, 0 0 24px ${color}80` }} />
        </>
    );
}

export default Cursor;