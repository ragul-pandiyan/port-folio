import { useRef, useEffect } from 'react';

function ParticleCanvas({ color }) {
    const ref = useRef(null);
    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let W = canvas.width = canvas.offsetWidth;
        let H = canvas.height = canvas.offsetHeight;
        const pts = Array.from({ length: 55 }, () => ({
            x: Math.random()*W, y: Math.random()*H,
            vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4,
            r: Math.random()*1.5+.5,
        }));
        let raf;
        const draw = () => {
            ctx.clearRect(0,0,W,H);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x<0||p.x>W) p.vx *= -1;
                if (p.y<0||p.y>H) p.vy *= -1;
                ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
                ctx.fillStyle = color + '80'; ctx.fill();
            });
            pts.forEach((a,i) => pts.slice(i+1).forEach(b => {
                const dx=a.x-b.x, dy=a.y-b.y, d=Math.sqrt(dx*dx+dy*dy);
                if (d<100) {
                    ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
                    ctx.strokeStyle = color + Math.round((1-d/100)*40).toString(16).padStart(2,'0');
                    ctx.lineWidth = .5; ctx.stroke();
                }
            }));
            raf = requestAnimationFrame(draw);
        };
        draw();
        const onResize = () => { W=canvas.width=canvas.offsetWidth; H=canvas.height=canvas.offsetHeight; };
        window.addEventListener('resize', onResize);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
    }, [color]);
    return <canvas ref={ref} id="rp-canvas" />;
}

export default ParticleCanvas;