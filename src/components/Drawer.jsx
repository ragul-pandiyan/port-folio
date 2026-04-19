function Drawer({ drawerOpen, setDrawerOpen, c, isDark, navLinks, scrollTo }) {
    return (
        <div id="rp-drawer" className={drawerOpen?'open':''}
            style={{ background: isDark ? c.sur : '#fff', borderColor: `${c.p}25` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.5rem' }}>
                <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:'1.1rem',
                    backgroundImage:`linear-gradient(135deg,${c.p},${c.s})`,
                    backgroundClip:'text', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
                    RP_
                </span>
                <button onClick={()=>setDrawerOpen(false)}
                    style={{ background:'none', border:'none', color:c.mut, fontSize:'1.2rem' }}>✕</button>
            </div>
            {navLinks.map(({ href, label }) => (
                <a key={href} className="rp-drawer-link" href={href}
                    onClick={e=>{e.preventDefault();scrollTo(href)}}
                    style={{ color: c.p, borderColor:`${c.p}25`, background:`${c.p}08` }}>
                    {label}
                </a>
            ))}
        </div>
    );
}

export default Drawer;