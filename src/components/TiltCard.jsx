import { useRef } from 'react';

function TiltCard({ children, style, className, onClick, dataCursor }) {
    const ref = useRef(null);
    const onMove = (e) => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX-r.left)/r.width-.5)*12;
        const y = -((e.clientY-r.top)/r.height-.5)*12;
        el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    };
    const onLeave = () => { if (ref.current) ref.current.style.transform = 'none'; };
    return (
        <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
            className={className} style={style} onClick={onClick} data-cursor={dataCursor}
        >{children}</div>
    );
}

export default TiltCard;