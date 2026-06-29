import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const c = document.getElementById('dots-canvas');
    if (!c) return;

    c.innerHTML = '';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const count = 28;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('div');
      const size = Math.random() < 0.3 ? 5 : Math.random() < 0.5 ? 4 : 3;
      const opacity = 0.15 + Math.random() * 0.3;
      const top = 10 + Math.random() * 80;
      const left = 10 + Math.random() * 80;

      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(0,0,0,${opacity});
        top: ${top}%;
        left: ${left}%;
        ${reduce ? '' : `animation: floatDot ${2 + Math.random() * 2.4}s ease-in-out ${Math.random() * 1.5}s infinite alternate;`}
      `;
      c.appendChild(dot);
    }
  }, []);

  return (
    <section id="home">
      <style>
        {`
          @keyframes floatDot { from { transform: translateY(0); } to { transform: translateY(-16px); } }

          /* ===========================================================
             RESET — beats the global "section { padding:5rem 4rem }" rule
             (an #id selector outranks an element selector, so no !important)
             This is what removes the margin / gap around the hero.
          ============================================================ */
          section#home {
            margin: 0;
            padding: 0;
            display: block;
            position: relative;
            width: 100%;
            overflow: hidden;
            background: #fff;
          }

          /* ===========================================================
             LAYOUT — fluid grid instead of a hardcoded 45/55 flex split
          ============================================================ */
          .hero-layout {
            position: relative;
            display: grid;
            grid-template-columns: minmax(0, 40fr) minmax(0, 60fr);
            min-height: 100vh;
            min-height: 100svh;   /* avoids the mobile address-bar jump */
            margin: 0;
            background: #fff;
            overflow: hidden;
          }

          .hero-wave {
            position: relative;
            overflow: hidden;
            z-index: 1;
            min-height: 100%;
          }
          .hero-wave svg {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
          }

          .hero-dots {
            position: absolute;
            left: 40%;
            top: 0;
            bottom: 0;
            width: 100px;
            z-index: 2;
            pointer-events: none;
            transform: translateX(-50%);
          }

          .hero-text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0;
            /* fluid padding: roomy on desktop, tight on small screens.
               Top padding clears the fixed navbar. Slightly reduced
               for a smoother flow into the next section. */
            padding: clamp(5rem, 7vw, 7rem) clamp(1.5rem, 4.5vw, 3.5rem)
                     clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem);
            z-index: 3;
          }

          .hero-title {
            font-size: clamp(2.4rem, 5vw, 4.5rem);
            line-height: 1.05;
            font-weight: 900;
            color: #111;
            margin: 0 0 1.4rem 0;
          }
          .hero-desc {
            font-size: clamp(0.95rem, 1.1vw, 1.05rem);
            line-height: 1.8;
            color: rgba(0,0,0,0.6);
            max-width: 560px;
            margin: 0 0 2.5rem 0;
          }

          .hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }
          .hero-cta a {
            padding: 0.85rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 700;
            transition: transform .2s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
          }
          .hero-cta .btn-solid { background: #111; color: #fff; border: 2px solid #111; }
          .hero-cta .btn-solid:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(0,0,0,0.18); }
          .hero-cta .btn-ghost { border: 2px solid #111; color: #111; }
          .hero-cta .btn-ghost:hover { background: #111; color: #fff; transform: translateY(-2px); }
          .hero-cta a:focus-visible { outline: 3px solid #ff8c00; outline-offset: 3px; }

          /* ===========================================================
             LAPTOP — slightly narrower art column, tighter gutters
          ============================================================ */
          @media (max-width: 1100px) {
            .hero-layout { grid-template-columns: minmax(0, 38fr) minmax(0, 62fr); }
          }

          /* ===========================================================
             TABLET / MOBILE — single column, text only.
             The wave / dots / spheres are hidden on mobile (per design),
             and padding is tuned so the text sits cleanly under the
             navbar with no empty white block.
          ============================================================ */
          @media (max-width: 860px) {
            .hero-layout {
              grid-template-columns: 1fr;
              min-height: auto;
            }
            .hero-wave,
            .hero-dots,
            .global-sphere { display: none !important; }
            .hero-text {
              width: 100%;
              padding: clamp(5.5rem, 16vw, 7rem) clamp(1.25rem, 6vw, 2rem)
                       clamp(2.5rem, 9vw, 3.5rem);
            }
            .hero-desc { max-width: 100%; }
          }

          @media (max-width: 480px) {
            .hero-cta { flex-direction: column; align-items: stretch; }
            .hero-cta a { text-align: center; }
          }

          @media (prefers-reduced-motion: reduce) {
            .sphere, .global-sphere { animation: none !important; }
          }
        `}
      </style>

      <div className="hero-layout">

        {/* Left wave graphic — full-bleed on desktop, top banner on mobile */}
        <div className="hero-wave">
          <svg viewBox="0 0 800 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="amber-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffe082" />
                <stop offset="55%" stopColor="#ff8c00" />
                <stop offset="100%" stopColor="#cc5500" />
              </linearGradient>
              <pattern id="ash-lines" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
              </pattern>
            </defs>
            <path d="M0,0 C250,120 420,200 650,280 L800,0 Z" fill="#f4f4f2" />
            <path d="M0,40 C200,120 320,240 480,340 C650,470 720,720 800,1000 L0,1000 Z" fill="#111" />
            <path d="M0,120 C180,220 300,340 420,500 C560,700 700,900 800,1000 L0,1000 Z" fill="url(#amber-glow)" />
            <path d="M0,200 C160,280 280,380 380,550 C520,720 650,900 800,1000 L0,1000 Z" fill="url(#ash-lines)" opacity="0.5" />
            <path d="M0,320 C140,400 240,520 320,700 C450,850 600,950 800,1000 L0,1000 Z" fill="#1c1c1c" />
            <path d="M0,520 C120,600 200,740 260,860 C350,940 500,990 800,1000 L0,1000 Z" fill="#0a0a0a" />
          </svg>

          <div className="sphere s1"></div>
          <div className="sphere s3"></div>
          <div className="sphere s4"></div>
        </div>

        {/* Floating dots — sit on the seam, hidden when stacked */}
        <div className="hero-dots" id="dots-canvas"></div>

        {/* Global floating spheres — desktop only */}
        <div className="sphere s2 global-sphere" style={{ zIndex: 5, left: '46%' }}></div>
        <div className="sphere s5 global-sphere" style={{ zIndex: 5, left: '44%' }}></div>

        {/* Right text content */}
        <div className="hero-text">
          <div className="social-row">
            <span className="social-label">Innovation</span>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--muted)' }}>
              Hardware &amp; Smart Systems
            </div>
          </div>

          <h1 className="hero-title">
            Innovating the Future of <span className="line-accent" style={{ color: '#ff8c00' }}>Hardware</span>
          </h1>

          <p className="hero-desc">
            From designing next-generation electronic devices to integrating intelligent automation.
            <strong style={{ color: '#ff8c00' }}> Ambercore Systems</strong> is your trusted partner for commercial, industrial, and consumer technological solutions.
          </p>

          <div className="hero-cta">
            <a href="#services" className="btn-solid">Explore Solutions</a>
            <a href="#contact" className="btn-ghost">Contact Us</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;