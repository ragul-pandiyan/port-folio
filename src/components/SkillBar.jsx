import { useRef, useEffect, useState } from 'react';

function SkillBar({ level, color }) {
    const ref = useRef(null);
    const [w, setW] = useState(0);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setTimeout(() => setW(level), 100); obs.disconnect(); }
        }, { threshold: .5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [level]);
    return (
        <div className="rp-skill-bar" ref={ref}>
            <div className="rp-skill-fill" style={{ width: `${w}%`, background: `linear-gradient(90deg,${color}80,${color})` }} />
        </div>
    );
}

export default SkillBar;