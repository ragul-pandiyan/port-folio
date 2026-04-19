import { useState, useEffect, useRef, useCallback } from 'react';

import Cursor from './Cursor';
import ParticleCanvas from './ParticleCanvas';
import SkillBar from './SkillBar';
import TiltCard from './TiltCard';
import Navbar from './Navbar';
import Drawer from './Drawer';
import Hero from './Hero';
import Projects from './Projects';
import Skills from './Skills';
import Experience from './Experience';
import Contact from './Contact';
import Footer from './Footer';
import ThemeSwitcher from './ThemeSwitcher';
import Modal from './Modal';
import Snackbar from './Snackbar';

/* ── COLOR PALETTES ─────────────────────────────────────────── */
const palettes = {
    cyber:  { p: '#00e5ff', s: '#7b61ff', a: '#ff6b6b', bg: '#04070f', sur: '#080e1c', card: '#0b1221', mut: '#5a6a82' },
    aurora: { p: '#a78bfa', s: '#34d399', a: '#f472b6', bg: '#080415', sur: '#100825', card: '#160b35', mut: '#6b5a8a' },
    ember:  { p: '#fb923c', s: '#f43f5e', a: '#fbbf24', bg: '#0f0800', sur: '#1c0e00', card: '#271500', mut: '#7a5a3a' },
    matrix: { p: '#22c55e', s: '#06b6d4', a: '#a3e635', bg: '#010d05', sur: '#031a0a', card: '#052510', mut: '#2d5a3d' },
    rose:   { p: '#f43f5e', s: '#e879f9', a: '#fb923c', bg: '#120005', sur: '#1f0009', card: '#2d000d', mut: '#7a3a4a' },
    arctic: { p: '#38bdf8', s: '#818cf8', a: '#34d399', bg: '#020c18', sur: '#061424', card: '#0a1c30', mut: '#3a5a7a' },
};

const paletteLabels = {
    cyber: '#00e5ff', aurora: '#a78bfa', ember: '#fb923c',
    matrix: '#22c55e', rose: '#f43f5e', arctic: '#38bdf8',
};

/* ── DATA ───────────────────────────────────────────────────── */
const ROLES = ['React.js Specialist', 'Frontend Developer', 'UI/UX Enthusiast', 'HRMS Builder'];

const navLinks = [
    { href: '#home',       label: 'Home' },
    { href: '#projects',   label: 'Projects' },
    { href: '#skills',     label: 'Skills' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact',    label: 'Contact' },
];

const projects = [
    {
        id: 1, num: '01', featured: true,
        title: 'HRMS Lite', sub: 'HR Management System',
        badge: 'Currently Building',
        desc: 'A comprehensive Human Resource Management System with modules for employee onboarding, attendance tracking, and payroll processing. Integrated React with Redux for scalable state management.',
        modules: ['Employee Onboarding', 'Attendance Tracking', 'Payroll Processing'],
        tags: ['React.js', 'Redux', 'REST APIs', 'Responsive'],
        emoji: '🏢', color: 'p',
    },
    {
        id: 2, num: '02',
        title: 'CAFS Money', sub: 'Mutual Fund Platform',
        link: 'cafsmoney.com', url: 'https://cafsmoney.com',
        desc: 'Financial investment platform with SIP and goal-based return calculators. Reduced UI load time by 20% through performance optimisation and code splitting.',
        tags: ['React', 'Chart.js', 'Material UI'],
        emoji: '💰', color: 's',
    },
    {
        id: 3, num: '03',
        title: 'CAFS India', sub: 'Insurance Company Website',
        link: 'cafsindia.com', url: 'https://cafsindia.com',
        desc: 'Fully responsive static website built from scratch with SEO optimisation and mobile-first design. Covers services, benefits, and contact flows.',
        tags: ['React', 'Ant Design', 'CSS3', 'SEO'],
        emoji: '🛡️', color: 'a',
    },
    {
        id: 4, num: '04',
        title: 'IDEAL Fastener', sub: 'E-commerce / Corporate',
        link: 'idealfastener.com', url: 'https://idealfastener.com',
        desc: 'Contributed to revamping the corporate e-commerce website — UI components, responsive layouts, and cross-browser compatibility improvements.',
        tags: ['React', 'Responsive', 'UI Components'],
        emoji: '⚙️', color: 'p',
    },
];

const skillsData = {
    Frontend: [
        { name: 'React.js',          level: 90, icon: '⚛️' },
        { name: 'JavaScript ES6+',   level: 85, icon: '🟨' },
        { name: 'Redux / Context',   level: 80, icon: '🔄' },
        { name: 'HTML5 / CSS3',      level: 88, icon: '🎨' },
    ],
    'Libraries & Tools': [
        { name: 'Material UI',       level: 85, icon: '🎭' },
        { name: 'Ant Design',        level: 80, icon: '🐜' },
        { name: 'REST APIs',         level: 78, icon: '🔌' },
        { name: 'Git / Figma',       level: 75, icon: '🛠️' },
    ],
};

const techCloud = [
    'React.js','Redux','JavaScript','Chart.js','Material UI',
    'Ant Design','CSS3','HTML5','REST APIs','Git','Figma',
    'Responsive','SEO','Context API',
];

const experiences = [
    {
        period: '2024 – 2025',
        role: 'Frontend Developer',
        company: 'CAFS Infotech',
        location: 'Chennai, India',
        type: 'Full-time',
        points: [
            'Delivered 4+ production-ready projects improving user engagement by 30%',
            'Developed financial calculators (SIP, goal-based returns) for CAFS Money',
            'Built fully responsive insurance website with SEO & mobile-first approach',
            'Reduced UI load time by 20% through code optimisation and performance techniques',
            'Integrated React with Redux for scalable HRMS state management',
        ],
        tags: ['React', 'Redux', 'Material UI', 'Chart.js', 'Ant Design'],
        dot: 'p',
    },
    {
        period: '2023 – 2024',
        role: 'Frontend Developer Intern',
        company: 'CAFS Infotech',
        location: 'Chennai, India',
        type: 'Internship · 5 months',
        points: [
            'Hands-on development of React components and responsive layouts',
            'Self-taught Redux and Ant Design to contribute to scalable architecture',
            'Cross-functional collaboration to deliver user-centric UI enhancements',
        ],
        tags: [],
        dot: 's',
    },
    {
        period: '2019 – 2023',
        role: 'B.E. Information Technology',
        company: 'Annamalai University',
        location: 'Chidambaram · 75.2%',
        type: 'Degree',
        points: [
            'Certified in Frontend Development — Besant Technologies, Velachery (2023)',
        ],
        tags: [],
        dot: 'mut',
    },
];

const contacts = [
    { label: 'Email',    value: '16.ragul.p@gmail.com',   href: 'mailto:16.ragul.p@gmail.com', icon: '✉️' },
    { label: 'Phone',    value: '+91 93604 34869',        href: 'tel:+919360434869',           icon: '📞' },
    { label: 'Location', value: 'Velachery, Chennai',     href: null,                          icon: '📍' },
];

const stats = [
    { num: '1+',  label: 'Years Exp.' },
    { num: '4+',  label: 'Live Projects' },
    { num: '20%', label: 'Load Time ↓' },
    { num: '30%', label: 'Engagement ↑' },
];

/* ── GLOBAL STYLES ──────────────────────────────────────────── */
const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{font-family:'Instrument Sans',sans-serif;overflow-x:hidden;transition:background .4s,color .4s}
*{cursor:none!important}

/* SCROLLBAR */
::-webkit-scrollbar{width:3px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{border-radius:2px}

/* CUSTOM CURSOR */
#rp-cursor-dot{
    position:fixed;width:8px;height:8px;border-radius:50%;
    pointer-events:none;z-index:10000;
    transform:translate(-50%,-50%);
    transition:transform .2s cubic-bezier(.34,1.56,.64,1);
    mix-blend-mode:screen;
}
#rp-cursor-ring{
    position:fixed;width:40px;height:40px;border-radius:50%;border:1px solid;
    pointer-events:none;z-index:9999;
    transform:translate(-50%,-50%);opacity:.5;
    transition:width .3s,height .3s,opacity .3s,border-width .3s;
    display:flex;align-items:center;justify-content:center;
}
#rp-cursor-ring .rl{
    font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.1em;
    white-space:nowrap;transform:translateY(30px);
}

/* NOISE OVERLAY */
body::before{
    content:'';position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.5;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.04'/%3E%3C/svg%3E");
}

/* GRID BG */
body::after{
    content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
    background-image:linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px);
    background-size:60px 60px;
}

/* SECTION BASE */
section{position:relative;z-index:2;scroll-margin-top:80px}

/* FADE-UP ANIMATION */
.fade-up{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}
.fade-up.visible{opacity:1;transform:none}

/* PULSE */
@keyframes rpPulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes rpFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes rpBlink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes rpScan{0%{top:-2px}100%{top:100%}}
@keyframes rpShimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}

/* NAV */
#rp-nav{
    position:fixed;top:0;left:0;right:0;z-index:100;
    padding:1rem 2.5rem;display:flex;justify-content:space-between;align-items:center;
    transition:background .4s,border-color .4s,backdrop-filter .4s;
    border-bottom:1px solid transparent;
}
#rp-nav.scrolled{backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
.rp-logo{
    font-family:'Syne',sans-serif;font-weight:800;font-size:1.2rem;
    letter-spacing:.04em;text-decoration:none;background-clip:text;
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.rp-nav-links{display:flex;gap:2rem}
.rp-nav-link{
    font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.1em;
    text-transform:uppercase;text-decoration:none;position:relative;
    transition:color .2s;
}
.rp-nav-link::after{
    content:'';position:absolute;bottom:-3px;left:0;height:1px;width:0%;
    transition:width .3s ease;
}
.rp-nav-link:hover::after,.rp-nav-link.active::after{width:100%}
.rp-status-pill{
    display:flex;align-items:center;gap:.45rem;
    font-family:'DM Mono',monospace;font-size:.65rem;
    padding:.4rem .9rem;border-radius:20px;border:1px solid;
}
.rp-status-dot{width:6px;height:6px;border-radius:50%;animation:rpPulse 2s infinite}

/* HAMBURGER */
#rp-hamburger{
    display:none;flex-direction:column;gap:5px;
    background:none;border:none;padding:6px;
}
#rp-hamburger span{
    display:block;width:22px;height:1.5px;border-radius:2px;
    transition:transform .3s,opacity .3s;
}
#rp-hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
#rp-hamburger.open span:nth-child(2){opacity:0}
#rp-hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}

/* MOBILE DRAWER */
#rp-drawer{
    position:fixed;top:0;right:0;bottom:0;width:260px;z-index:200;
    padding:1.5rem;display:flex;flex-direction:column;gap:1rem;
    transform:translateX(110%);transition:transform .35s cubic-bezier(.4,0,.2,1);
    border-left:1px solid;
}
#rp-drawer.open{transform:translateX(0)}
#rp-overlay{
    position:fixed;inset:0;z-index:199;opacity:0;pointer-events:none;
    background:rgba(0,0,0,.5);transition:opacity .3s;
}
#rp-overlay.open{opacity:1;pointer-events:all}
.rp-drawer-link{
    font-family:'DM Mono',monospace;font-size:.85rem;letter-spacing:.1em;
    text-transform:uppercase;text-decoration:none;display:block;
    padding:.75rem 1rem;border-radius:10px;border:1px solid;
    transition:background .2s;
}

/* SCROLL PROGRESS */
#rp-progress{
    position:fixed;top:0;left:0;height:2px;z-index:101;
    transition:width .1s linear;
}

/* HERO */
#rp-hero{
    min-height:100vh;display:flex;align-items:center;
    padding:6rem 2.5rem 4rem;position:relative;overflow:hidden;
}
#rp-canvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:.6}
.rp-orb{position:absolute;border-radius:50%;pointer-events:none}
.rp-scan{
    position:absolute;left:0;right:0;height:2px;z-index:1;
    animation:rpScan 5s linear infinite;pointer-events:none;
}
.rp-hero-content{position:relative;z-index:2;max-width:720px;animation:rpFadeUp .9s ease-out both}
@keyframes rpFadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}

.rp-tag{
    display:flex;align-items:center;gap:.75rem;
    font-family:'DM Mono',monospace;font-size:.72rem;letter-spacing:.2em;text-transform:uppercase;
    margin-bottom:1.2rem;
}
.rp-tag-line{width:36px;height:1px}
.rp-name{
    font-family:'Syne',sans-serif;font-weight:800;
    font-size:clamp(3.5rem,10vw,7.5rem);
    line-height:.92;letter-spacing:-.03em;margin-bottom:.4rem;
}
.rp-name-grad{
    background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.rp-typing{
    font-family:'DM Mono',monospace;font-size:clamp(.9rem,2.2vw,1.35rem);
    margin-bottom:1.6rem;height:2rem;display:flex;align-items:center;gap:4px;
}
.rp-caret{
    display:inline-block;width:2px;height:1.2em;
    animation:rpBlink 1s step-end infinite;
}
.rp-desc{font-size:1rem;max-width:520px;line-height:1.8;margin-bottom:2.5rem}
.rp-actions{display:flex;gap:.8rem;flex-wrap:wrap;margin-bottom:3rem}
.rp-btn-primary{
    font-family:'DM Mono',monospace;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;
    padding:.85rem 2rem;border-radius:4px;font-weight:500;
    border:none;text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;
    position:relative;overflow:hidden;
}
.rp-btn-primary:hover{transform:translateY(-3px)}
.rp-btn-outline{
    font-family:'DM Mono',monospace;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;
    padding:.85rem 2rem;border-radius:4px;font-weight:500;
    border:1.5px solid;background:transparent;text-decoration:none;
    display:inline-flex;align-items:center;gap:.4rem;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1),background .2s;
}
.rp-btn-outline:hover{transform:translateY(-3px)}
.rp-stats{display:flex;gap:3rem;padding-top:2rem;border-top:1px solid;flex-wrap:wrap;gap:2rem}
.rp-stat-num{
    font-family:'Syne',sans-serif;font-weight:800;
    font-size:clamp(1.8rem,3vw,2.4rem);line-height:1;
    background-clip:text;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.rp-stat-label{
    font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.12em;
    text-transform:uppercase;margin-top:.2rem;
}

/* PROJECTS */
#rp-projects{padding:6rem 2.5rem}
.rp-projects-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.rp-project-card{
    border-radius:16px;padding:2rem;position:relative;overflow:hidden;
    border:1px solid;transition:border-color .3s,box-shadow .3s,transform .15s ease;
    will-change:transform;
}
.rp-project-card:hover{border-color:var(--hc)!important}
.rp-project-card.featured{grid-column:1/-1}
.rp-project-badge{
    display:inline-flex;align-items:center;gap:.5rem;margin-bottom:1rem;
    font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;
    padding:.3rem .8rem;border-radius:20px;border:1px solid;
}
.rp-badge-dot{width:6px;height:6px;border-radius:50%;animation:rpPulse 1.5s infinite}
.rp-project-meta{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1rem;flex-wrap:wrap;gap:.5rem}
.rp-project-num{font-family:'DM Mono',monospace;font-size:.65rem}
.rp-project-link{
    font-family:'DM Mono',monospace;font-size:.65rem;text-decoration:none;
    display:flex;align-items:center;gap:.2rem;opacity:.7;transition:opacity .2s;
}
.rp-project-link:hover{opacity:1}
.rp-project-emoji{font-size:1.4rem;margin-bottom:.5rem;display:block}
.rp-project-title{font-family:'Syne',sans-serif;font-weight:700;font-size:1.3rem;line-height:1.2;margin-bottom:.25rem}
.rp-project-sub{font-family:'DM Mono',monospace;font-size:.7rem;margin-bottom:.8rem}
.rp-project-desc{font-size:.875rem;line-height:1.7;margin-bottom:1.2rem}
.rp-modules{display:grid;grid-template-columns:repeat(3,1fr);gap:.6rem;margin-bottom:1.2rem}
.rp-module{padding:.7rem;border-radius:10px;border:1px solid}
.rp-module-label{font-family:'DM Mono',monospace;font-size:.55rem;text-transform:uppercase;letter-spacing:.1em;margin-bottom:.3rem}
.rp-module-name{font-size:.78rem;font-weight:500}
.rp-tags{display:flex;flex-wrap:wrap;gap:.5rem}
.rp-chip{
    font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;
    padding:.3rem .7rem;border-radius:6px;border:1px solid;
    transition:all .2s;
}

/* SKILLS */
#rp-skills{padding:6rem 2.5rem}
.rp-skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;max-width:900px;margin-bottom:3rem}
.rp-skill-group-title{
    font-family:'DM Mono',monospace;font-size:.68rem;letter-spacing:.18em;text-transform:uppercase;
    margin-bottom:1.2rem;padding-bottom:.6rem;border-bottom:1px solid;
}
.rp-skill-row{display:flex;align-items:center;margin-bottom:1rem}
.rp-skill-icon{font-size:14px;width:20px;flex-shrink:0}
.rp-skill-name{font-size:.83rem;min-width:130px;margin-left:.5rem}
.rp-skill-bar{flex:1;height:3px;border-radius:4px;overflow:hidden;margin:0 .8rem;background:rgba(255,255,255,.07)}
.rp-skill-fill{height:100%;border-radius:4px;width:0%;transition:width 1.2s cubic-bezier(.34,1.56,.64,1)}
.rp-skill-pct{font-family:'DM Mono',monospace;font-size:.65rem;min-width:32px;text-align:right}
.rp-tech-cloud{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:.5rem}
.rp-tech-pill{
    font-family:'DM Mono',monospace;font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;
    padding:.45rem .85rem;border-radius:8px;border:1px solid;
    transition:all .2s;
}
.rp-tech-pill:hover{transform:translateY(-2px)}

/* EXPERIENCE */
#rp-experience{padding:6rem 2.5rem}
.rp-timeline{position:relative;padding-left:2.5rem;max-width:800px}
.rp-timeline::before{
    content:'';position:absolute;left:0;top:14px;bottom:14px;width:1px;
}
.rp-tl-item{margin-bottom:2.5rem;position:relative;
    opacity:0;transform:translateX(-20px);transition:opacity .6s ease,transform .6s ease}
.rp-tl-item.visible{opacity:1;transform:none}
.rp-tl-dot{
    position:absolute;left:-2.9rem;top:.5rem;width:10px;height:10px;
    border-radius:50%;border:2px solid;
}
.rp-tl-card{
    border-radius:0 14px 14px 0;padding:1.5rem 1.8rem;
    border:1px solid;border-left:3px solid;
    transition:all .3s;
}
.rp-tl-card:hover{transform:translateX(4px)}
.rp-tl-period{font-family:'DM Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.3rem}
.rp-tl-role{font-family:'Syne',sans-serif;font-weight:700;font-size:1.1rem;margin-bottom:.15rem}
.rp-tl-company{font-size:.83rem;margin-bottom:1rem}
.rp-tl-type{
    font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;
    padding:.3rem .7rem;border-radius:20px;border:1px solid;white-space:nowrap;
}
.rp-tl-point{font-size:.85rem;line-height:1.7;display:flex;gap:.6rem;align-items:flex-start;margin-bottom:.4rem}
.rp-tl-dash{flex-shrink:0;margin-top:.1rem}

/* CONTACT */
#rp-contact{padding:6rem 2.5rem}
.rp-contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem}
.rp-contact-card{
    display:flex;align-items:center;gap:1rem;
    padding:1rem 1.2rem;border-radius:14px;border:1px solid;
    text-decoration:none;margin-bottom:.8rem;
    transition:transform .3s,box-shadow .3s,border-color .3s;
}
.rp-contact-card:hover{transform:translateX(6px)}
.rp-contact-icon{
    width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;
    font-size:1.2rem;animation:rpFloat 3s ease-in-out infinite;flex-shrink:0;
}
.rp-contact-label{font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.15rem}
.rp-contact-value{font-size:.9rem;font-weight:500}
.rp-avail-card{padding:1.2rem 1.5rem;border-radius:14px;border:1px solid;margin-top:1rem}
.rp-avail-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 10px #22c55e;animation:rpPulse 2s infinite}
.rp-form{display:flex;flex-direction:column;gap:1rem}
.rp-input{
    width:100%;padding:.85rem 1rem;border-radius:10px;border:1px solid;
    font-family:'Instrument Sans',sans-serif;font-size:.9rem;
    background:transparent;transition:border-color .2s;outline:none;
}
.rp-input:focus{border-width:1.5px}
.rp-textarea{resize:vertical;min-height:110px}

/* FOOTER */
#rp-footer{padding:1.5rem 2.5rem;border-top:1px solid;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.8rem;position:relative;z-index:2}
.rp-footer-text{font-family:'DM Mono',monospace;font-size:.68rem}
.rp-footer-badge{
    font-family:'DM Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;
    padding:.2rem .6rem;border-radius:6px;border:1px solid;
}

/* THEME SWITCHER */
#rp-theme{position:fixed;bottom:2rem;right:2rem;z-index:300;display:flex;flex-direction:column;align-items:flex-end;gap:.6rem}
#rp-theme-panel{
    border-radius:16px;padding:1rem;display:flex;flex-direction:column;gap:.4rem;
    border:1px solid;min-width:150px;
    transform-origin:bottom right;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1),opacity .3s;
}
#rp-theme-panel.hidden{transform:scale(.85);opacity:0;pointer-events:none}
.rp-palette-row{
    display:flex;align-items:center;gap:.7rem;padding:.5rem .6rem;border-radius:10px;
    border:1px solid transparent;transition:background .2s;
}
.rp-palette-dot{width:18px;height:18px;border-radius:50%;flex-shrink:0}
.rp-palette-name{font-family:'DM Mono',monospace;font-size:.72rem}
.rp-palette-check{margin-left:auto;font-size:10px}
#rp-theme-btn{
    width:48px;height:48px;border-radius:14px;border:none;
    display:flex;align-items:center;justify-content:center;font-size:18px;
    transition:transform .3s cubic-bezier(.34,1.56,.64,1),box-shadow .3s;
    box-shadow:0 8px 30px rgba(0,0,0,.4);
}
#rp-theme-btn:hover{transform:rotate(15deg) scale(1.1)}
#rp-theme-btn.open{transform:rotate(45deg) scale(1.1)}

/* MODAL */
#rp-modal{
    position:fixed;inset:0;z-index:500;display:flex;align-items:center;justify-content:center;
    padding:1rem;opacity:0;pointer-events:none;transition:opacity .3s;
    background:rgba(0,0,0,.6);backdrop-filter:blur(8px);
}
#rp-modal.open{opacity:1;pointer-events:all}
#rp-modal-box{
    border-radius:20px;padding:2.5rem;max-width:580px;width:100%;
    max-height:88vh;overflow-y:auto;border:1px solid;position:relative;
    transform:scale(.92);transition:transform .3s cubic-bezier(.34,1.56,.64,1);
}
#rp-modal.open #rp-modal-box{transform:scale(1)}
#rp-modal-close{
    position:absolute;top:1rem;right:1rem;background:none;border:none;
    font-size:1.2rem;opacity:.6;transition:opacity .2s;
}
#rp-modal-close:hover{opacity:1}
#rp-snack{
    position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(80px);
    z-index:600;border-radius:10px;padding:.8rem 1.5rem;
    font-family:'DM Mono',monospace;font-size:.75rem;
    border:1px solid #22c55e;color:#22c55e;background:rgba(34,197,94,.12);
    transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .4s;opacity:0;
}
#rp-snack.show{transform:translateX(-50%) translateY(0);opacity:1}

/* ── RESPONSIVE ─────────────────────────────────────────────── */
@media(max-width:1024px){
    .rp-projects-grid{grid-template-columns:1fr}
    .rp-project-card.featured{grid-column:auto}
    .rp-skills-grid{grid-template-columns:1fr;gap:3rem}
}
@media(max-width:768px){
    #rp-nav{padding:.9rem 1.2rem}
    .rp-nav-links{display:none}
    #rp-hamburger{display:flex}
    #rp-hero{padding:5rem 1.2rem 3rem}
    #rp-projects,#rp-skills,#rp-experience,#rp-contact{padding:4rem 1.2rem}
    .rp-contact-grid,.rp-skills-grid{grid-template-columns:1fr;gap:2rem}
    .rp-modules{grid-template-columns:1fr}
    .rp-stats{gap:1.5rem}
    .rp-actions{gap:.6rem}
    .rp-btn-primary,.rp-btn-outline{padding:.75rem 1.4rem;font-size:.7rem}
    .rp-tl-card{border-radius:12px;padding:1.2rem 1.2rem}
    #rp-footer{flex-direction:column;text-align:center;padding:1.5rem 1.2rem}
    #rp-theme{bottom:1.2rem;right:1.2rem}
    .rp-timeline{padding-left:1.5rem}
    .rp-tl-dot{left:-1.85rem}
    .rp-name{font-size:clamp(2.8rem,12vw,4.5rem)!important}
    .rp-stat-num{font-size:clamp(1.6rem,4vw,2rem)!important}
}
@media(max-width:480px){
    #rp-hero{padding:4.5rem 1rem 2.5rem}
    #rp-projects,#rp-skills,#rp-experience,#rp-contact{padding:3rem 1rem}
    .rp-project-card{padding:1.3rem}
    .rp-name{font-size:clamp(2.5rem,14vw,4rem)!important}
    #rp-drawer{width:240px}
    .rp-stats{gap:1rem}
    .rp-stat-num{font-size:1.4rem!important}
    .rp-actions{flex-direction:column;align-items:stretch}
    .rp-btn-primary,.rp-btn-outline{width:100%;justify-content:center;margin-bottom:.5rem}
}
@media(max-width:360px){
    .rp-btn-primary,.rp-btn-outline{width:100%;justify-content:center}
    .rp-project-card{padding:1rem}
    .rp-name{font-size:clamp(2.2rem,16vw,3.5rem)!important}
    .rp-stat-num{font-size:1.2rem!important}
}
`;

/* ── HELPERS ────────────────────────────────────────────────── */
function injectStyles(css) {
    if (typeof document === 'undefined') return;
    let el = document.getElementById('rp-styles');
    if (!el) { el = document.createElement('style'); el.id = 'rp-styles'; document.head.appendChild(el); }
    el.textContent = css;
}

function applyTheme(c, mode) {
    const r = document.documentElement.style;
    r.setProperty('--rp-p',   c.p);
    r.setProperty('--rp-s',   c.s);
    r.setProperty('--rp-a',   c.a);
    r.setProperty('--rp-bg',  mode === 'dark' ? c.bg   : '#f0f4ff');
    r.setProperty('--rp-sur', mode === 'dark' ? c.sur  : '#e8edf8');
    r.setProperty('--rp-card',mode === 'dark' ? c.card : '#ffffff');
    r.setProperty('--rp-mut', mode === 'dark' ? c.mut  : '#6b7280');
    r.setProperty('--rp-text',mode === 'dark' ? '#eef2ff' : '#0d1117');
    r.setProperty('--grid-line', mode === 'dark' ? `${c.p}08` : `${c.p}12`);
    document.body.style.background = mode === 'dark' ? c.bg  : '#f0f4ff';
    document.body.style.color      = mode === 'dark' ? '#eef2ff' : '#0d1117';
    document.querySelector('::-webkit-scrollbar-thumb') && null;
}

/* ── MAIN APP ───────────────────────────────────────────────── */
export default function Portfolio() {
    const [pal,  setPal]  = useState(() => localStorage.getItem('rp-pal')  || 'cyber');
    const [mode, setMode] = useState(() => localStorage.getItem('rp-mode') || 'dark');
    const [panelOpen, setPanelOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeSection, setActiveSection] = useState('home');
    const [roleIdx, setRoleIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [typing, setTyping] = useState(true);
    const [selected, setSelected] = useState(null);
    const [form, setForm] = useState({ name:'', email:'', message:'' });
    const [snack, setSnack] = useState(false);

    const c = palettes[pal];
    const isDark = mode === 'dark';

    /* inject styles */
    useEffect(() => { injectStyles(globalCSS); }, []);

    /* theme apply */
    useEffect(() => {
        applyTheme(c, mode);
        localStorage.setItem('rp-pal', pal);
        localStorage.setItem('rp-mode', mode);
    }, [pal, mode, c]);

    /* scroll events */
    useEffect(() => {
        const onScroll = () => {
            const top = window.scrollY;
            const h = document.documentElement.scrollHeight - window.innerHeight;
            setScrolled(top > 50);
            setProgress(h > 0 ? (top/h)*100 : 0);
            const ids = ['contact','experience','skills','projects','home'];
            for (const id of ids) {
                const el = document.getElementById(`rp-${id}`);
                if (el && top >= el.offsetTop - 200) { setActiveSection(id); break; }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    /* fade-up observer */
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
            { threshold: .12 }
        );
        document.querySelectorAll('.fade-up,.rp-tl-item').forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    /* typing effect */
    useEffect(() => {
        const target = ROLES[roleIdx];
        let i = displayed.length;
        if (typing) {
            if (i < target.length) {
                const t = setTimeout(() => setDisplayed(target.slice(0, i+1)), 60);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setTyping(false), 1800);
                return () => clearTimeout(t);
            }
        } else {
            if (i > 0) {
                const t = setTimeout(() => setDisplayed(target.slice(0, i-1)), 35);
                return () => clearTimeout(t);
            } else { setRoleIdx(p => (p+1)%ROLES.length); setTyping(true); }
        }
    }, [displayed, typing, roleIdx]);

    /* snack hide */
    useEffect(() => {
        if (snack) { const t = setTimeout(() => setSnack(false), 4000); return () => clearTimeout(t); }
    }, [snack]);

    /* helpers */
    const getC = (key) => key === 's' ? c.s : key === 'a' ? c.a : key === 'mut' ? c.mut : c.p;

    const scrollTo = (href) => {
        const id = href.replace('#','rp-');
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setDrawerOpen(false);
    };

    const submitForm = (e) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
        const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
        window.location.href = `mailto:16.ragul.p@gmail.com?subject=${subject}&body=${body}`;
        setSnack(true); setForm({ name:'', email:'', message:'' });
    };

    /* nav bg */
    const navBg = scrolled
        ? isDark ? `${c.bg}e0` : 'rgba(240,244,255,.9)'
        : 'transparent';

    const inputStyle = {
        color: isDark ? '#eef2ff' : '#0d1117',
        borderColor: `${c.p}30`,
        background: isDark ? `${c.card}` : '#f8faff',
    };

    return (
        <>
            <style>{globalCSS}</style>

            {/* CURSOR */}
            <Cursor color={c.p} />

            {/* SCROLL PROGRESS */}
            <div id="rp-progress" style={{ width:`${progress}%`, background:`linear-gradient(90deg,${c.p},${c.s})` }} />

            {/* NAVBAR */}
            <Navbar
                pal={pal} mode={mode} c={c} isDark={isDark} scrolled={scrolled} navBg={navBg}
                activeSection={activeSection} drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}
                scrollTo={scrollTo} navLinks={navLinks}
            />

            {/* DRAWER OVERLAY */}
            <div id="rp-overlay" className={drawerOpen?'open':''} onClick={()=>setDrawerOpen(false)} />
            <Drawer
                drawerOpen={drawerOpen} c={c} isDark={isDark} navLinks={navLinks} scrollTo={scrollTo}
            />

            {/* HERO */}
            <Hero
                c={c} isDark={isDark} displayed={displayed} stats={stats}
                scrollTo={scrollTo}
            />

            {/* PROJECTS */}
            <Projects
                c={c} isDark={isDark} projects={projects} getC={getC}
                selected={selected} setSelected={setSelected}
            />

            {/* SKILLS */}
            <Skills
                c={c} isDark={isDark} skillsData={skillsData} techCloud={techCloud}
            />

            {/* EXPERIENCE */}
            <Experience
                c={c} isDark={isDark} experiences={experiences} getC={getC}
            />

            {/* CONTACT */}
            <Contact
                c={c} isDark={isDark} contacts={contacts} form={form} setForm={setForm}
                submitForm={submitForm} inputStyle={inputStyle}
            />

            {/* FOOTER */}
            <Footer c={c} isDark={isDark} />

            {/* THEME SWITCHER */}
            <ThemeSwitcher
                pal={pal} setPal={setPal} mode={mode} setMode={setMode}
                c={c} isDark={isDark} panelOpen={panelOpen} setPanelOpen={setPanelOpen}
                paletteLabels={paletteLabels}
            />

            {/* PROJECT MODAL */}
            <Modal
                selected={selected} setSelected={setSelected} c={c} isDark={isDark} getC={getC}
            />

            {/* SNACKBAR */}
            <Snackbar snack={snack} />
        </>
    );
}