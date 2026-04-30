import React, { useState, useEffect } from 'react';
import logo from '../../assets/amber.png';
import logoname from '../../assets/logoname.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'services', 'products', 'team', 'clients', 'contact'];
      const links = document.querySelectorAll('.nav-links a, .mobile-links a');
      let current = 'home';
      
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      });
      
      links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + current) l.classList.add('active');
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  };

  return (
    <>
      <style>
        {`
          /* ADVANCED MOBILE OVERLAY */
          .mobile-menu-container {
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            justify-content: space-between; /* Spaced out for header/links/footer */
            align-items: center;
            padding: 6rem 2rem 4rem;
            clip-path: circle(0% at 90% 5%);
            transition: clip-path 0.7s cubic-bezier(0.77, 0, 0.175, 1);
            pointer-events: none;
          }

          .mobile-menu-container.open {
            clip-path: circle(150% at 90% 5%);
            pointer-events: auto;
          }

          /* INTERESTING ADDITION: Mobile Header */
          .mobile-brand-header {
            text-align: center;
            opacity: 0;
            transform: translateY(-20px);
            transition: 0.5s ease 0.2s;
          }
          .mobile-menu-container.open .mobile-brand-header {
            opacity: 1;
            transform: translateY(0);
          }
          .mobile-brand-header h4 {
            font-family: 'Syne', sans-serif;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #ff8c00;
            margin-bottom: 0.5rem;
          }

          .mobile-close-btn {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: none;
            border: none;
            color: #ff8c00;
            font-size: 2rem;
            cursor: pointer;
            z-index: 2002;
          }

          .mobile-links {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .mobile-links a {
            font-family: 'Syne', sans-serif;
            font-size: clamp(1.8rem, 6vw, 2.8rem);
            font-weight: 800;
            color: #111;
            text-decoration: none;
            text-transform: uppercase;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
          }

          .mobile-menu-container.open .mobile-links a {
            opacity: 1; transform: translateY(0);
          }

          /* Staggered Links */
          .mobile-menu-container.open .mobile-links a:nth-child(1) { transition-delay: 0.3s; }
          .mobile-menu-container.open .mobile-links a:nth-child(2) { transition-delay: 0.4s; }
          .mobile-menu-container.open .mobile-links a:nth-child(3) { transition-delay: 0.5s; }
          .mobile-menu-container.open .mobile-links a:nth-child(4) { transition-delay: 0.6s; }
          .mobile-menu-container.open .mobile-links a:nth-child(5) { transition-delay: 0.7s; }
          .mobile-menu-container.open .mobile-links a:nth-child(6) { transition-delay: 0.8s; }

          /* INTERESTING ADDITION: Mobile Footer Details */
          .mobile-menu-footer {
            text-align: center;
            opacity: 0;
            transition: 0.5s ease 0.9s;
          }
          .mobile-menu-container.open .mobile-menu-footer {
            opacity: 1;
          }
          .social-icons-mini {
            display: flex;
            gap: 1.5rem;
            justify-content: center;
            margin-top: 1rem;
          }
          .social-icons-mini a {
            font-size: 0.8rem;
            color: #111;
            text-decoration: none;
            font-weight: bold;
            border-bottom: 1px solid #ff8c00;
          }

          .menu-trigger {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 28px;
            height: 16px;
            cursor: pointer;
            z-index: 2001;
          }
          .menu-trigger.hidden { opacity: 0; pointer-events: none; }
          .menu-trigger span { width: 100%; height: 2px; background: #111; border-radius: 2px; }

          @media (max-width: 960px) {
            .nav-links { display: none; }
            .menu-trigger { display: flex; }
            #mainNav { padding: 1.2rem 1.5rem !important; }
          }
          
          .nav-links a {
            position: relative; color: rgba(0,0,0,0.6); text-decoration: none; font-weight: 600; transition: 0.3s;
          }
          .nav-links a:hover, .nav-links a.active { color: #ff8c00; }
        `}
      </style>

      <nav id="mainNav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '0.8rem 4rem' : '1.2rem 4rem',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)', transition: '0.4s'
      }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', zIndex: 1001 }}>
          <img src={logo} alt="Logo" style={{ height: scrolled ? '36px' : '42px', transition: '0.3s', mixBlendMode: 'multiply' }} />
          <img src={logoname} alt="Amber" style={{ height: scrolled ? '24px' : '28px', transition: '0.3s' }} />
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#products">Products</a>
          <a href="#team">Team</a>
          <a href="#clients">Clients</a>
          <a href="#contact" style={{ background: '#111', color: '#fff', padding: '0.5rem 1.4rem', borderRadius: '50px', marginLeft: '1rem', fontWeight: 600 }}>Contact Us</a>
        </div>

        <div className={`menu-trigger ${isOpen ? 'hidden' : ''}`} onClick={toggleMenu}>
          <span></span><span></span><span></span>
        </div>
      </nav>

      <div className={`mobile-menu-container ${isOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={toggleMenu}>✕</button>

        {/* MOBILE ONLY HEADER */}
        <div className="mobile-brand-header">
          <h4>AmberCore Systems</h4>
          <p style={{ fontSize: '0.75rem', color: '#888' }}>Innovating Hardware since 2026</p>
        </div>

        <div className="mobile-links">
          <a href="#home" onClick={toggleMenu}>Home</a>
          <a href="#services" onClick={toggleMenu}>Services</a>
          <a href="#products" onClick={toggleMenu}>Products</a>
          <a href="#team" onClick={toggleMenu}>Team</a>
          <a href="#clients" onClick={toggleMenu}>Clients</a>
          <a href="#contact" onClick={toggleMenu} style={{ color: '#ff8c00' }}>Contact</a>
        </div>

        {/* MOBILE ONLY FOOTER */}
        <div className="mobile-menu-footer">
          <p style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px' }}>Find us on</p>
          <div className="social-icons-mini">
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;