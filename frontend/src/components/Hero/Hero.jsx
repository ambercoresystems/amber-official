import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const c = document.getElementById('dots-canvas');
    if (!c) return;
    
    c.innerHTML = ''; 
    
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
        animation: floatDot ${2 + Math.random() * 2.4}s ease-in-out ${Math.random() * 1.5}s infinite alternate;
      `;
      c.appendChild(dot);
    }
  }, []);

  return (
    <section id="home">
      <style>
        {`
          @keyframes floatDot { from { transform: translateY(0); } to { transform: translateY(-16px); } }
          
          .hero-layout {
            min-height: 100vh; 
            display: flex;
            align-items: stretch;
            position: relative; 
            overflow: hidden; 
            background: #fff;
          }
          .hero-wave {
            width: 45%;
            position: relative; 
            overflow: hidden; 
            z-index: 1;
          }
          .hero-dots {
            position: absolute; 
            left: 45%;
            top: 0; 
            bottom: 0; 
            width: 100px; 
            z-index: 2; 
            pointer-events: none;
            transform: translateX(-50%);
          }
          .hero-text {
            width: 55%;
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            padding: 4rem 4rem 4rem 2rem; 
            z-index: 3;
          }

          /* MOBILE RESPONSIVE RULES - UPDATED TO HIDE GRAPHICS */
          @media (max-width: 960px) {
          .hero-layout {
            display: flex;
            flex-direction: column;
            min-height: 80vh; /* Changed from 100vh to avoid excessive empty space */
            padding-top: 100px; /* Reduced to bring text closer to the navbar */
            justify-content: center; /* Centers the content vertically in that 80vh */
          }
            .hero-wave {
              display: none !important; /* Hides the SVG waves and spheres */
            }
            .hero-dots {
              display: none !important; /* Hides the floating dots */
            }
            .hero-text {
            width: 100%; 
            padding: 1rem 1.5rem 3rem; /* Reduced top padding to move text UP */
            text-align: left;
          }
            /* Hide global spheres on mobile as well */
            .sphere {
              display: none !important;
            }
            .hero-title {
              font-size: 2.8rem !important; /* Tightens the headline size for mobile */
              margin-bottom: 1rem !important;
            }
            .hero-desc {
              margin-bottom: 2rem !important;
              line-height: 1.6 !important;
            }
          }
        `}
      </style>

      <div className="hero-layout">
        
        {/* Left Wave Graphic - Hidden on Mobile via CSS */}
        <div className="hero-wave">
          <svg viewBox="0 0 800 1000" preserveAspectRatio="xMinYMin slice" style={{ position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 }}>
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

        {/* Floating Dots Canvas - Hidden on Mobile via CSS */}
        <div className="hero-dots" id="dots-canvas"></div>

        {/* Global floating spheres - Hidden on Mobile via CSS */}
        <div className="sphere s2" style={{ zIndex: 5, left: '46%' }}></div>
        <div className="sphere s5" style={{ zIndex: 5, left: '44%' }}></div>

        {/* Right Text Content */}
        <div className="hero-text">
          <div className="social-row">
            <span className="social-label">Innovation</span>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--muted)' }}>
              Hardware & Smart Systems
            </div>
          </div>

          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1.05', fontWeight: 900, marginBottom: '1.5rem', color: '#111' }}>
            Innovating the Future of <span className="line-accent" style={{ color: '#ff8c00' }}>Hardware</span>
          </h1>

          <p className="hero-desc" style={{ fontSize: 'clamp(0.95rem, 1vw, 1.05rem)', maxWidth: '550px', marginBottom: '2.5rem', lineHeight: '1.8', color: 'rgba(0,0,0,0.6)' }}>
            From designing next-generation electronic devices to integrating intelligent automation. 
            <strong style={{ color: '#ff8c00' }}> Ambercore Systems</strong> is your trusted partner for commercial, industrial, and consumer technological solutions.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#services" style={{ padding: '0.8rem 2rem', background: '#111', color: '#fff', borderRadius: '50px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Explore Solutions</a>
            <a href="#contact" style={{ padding: '0.8rem 2rem', border: '2px solid #111', color: '#111', borderRadius: '50px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Contact Us</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;