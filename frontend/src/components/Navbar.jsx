import React, { useState, useEffect } from 'react';
import logo from '../assets/amber.png';
import logoname from '../assets/logoname.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPath = window.location.pathname;
      const links = document.querySelectorAll('.nav-links a, .mobile-links a');

      // 1. Dedicated events sub-page: highlight ONLY the Events tab
      if (currentPath === '/events') {
        links.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === '/events') l.classList.add('active');
        });
        return;
      }

      // 2. Homepage layout: classic scroll-spy tracking
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'services', 'products', 'team', 'clients', 'contact'];
      let current = 'home';

      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) current = id;
      });

      links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '/#' + current || l.getAttribute('href') === '#' + current) {
          l.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the menu on Escape, and auto-close + unlock scroll if the
  // viewport grows back to desktop while the menu is open.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    const onResize = () => { if (window.innerWidth > 960) closeMenu(); };
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <style>
        {`
          /* ── DESKTOP NAV LINKS ── */
          .nav-links a {
            position: relative;
            color: rgba(0,0,0,0.6);
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s;
          }
          .nav-links a:hover,
          .nav-links a.active {
            color: #ff8c00 !important;
          }

          /* ── HAMBURGER TRIGGER ── */
          .menu-trigger {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 28px;
            height: 18px;
            cursor: pointer;
            z-index: 2001;
            background: none;
            border: none;
            padding: 0;
          }
          .menu-trigger.hidden { opacity: 0; pointer-events: none; }
          .menu-trigger span {
            width: 100%;
            height: 2px;
            background: #111;
            border-radius: 2px;
            transition: 0.3s;
          }

          /* ── MOBILE OVERLAY ── */
          .mobile-menu-container {
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            z-index: 2000;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 5rem 2rem 3rem;
            overflow-y: auto;
            clip-path: circle(0% at 90% 5%);
            transition: clip-path 0.6s cubic-bezier(0.77, 0, 0.175, 1);
            pointer-events: none;
          }
          .mobile-menu-container.open {
            clip-path: circle(150% at 90% 5%);
            pointer-events: auto;
          }

          .mobile-close-btn {
            position: absolute;
            top: 1.2rem;
            right: 1.5rem;
            background: none;
            border: none;
            color: #ff8c00;
            font-size: 2.2rem;
            line-height: 1;
            cursor: pointer;
            z-index: 2002;
          }

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
          .mobile-brand-header img { height: 40px; display: block; margin: 0 auto 0.6rem; }
          .mobile-brand-header h4 {
            font-family: 'Syne', sans-serif;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 3px;
            color: #ff8c00;
          }

          .mobile-links {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
          }
          .mobile-links a {
            font-family: 'Syne', sans-serif;
            font-size: clamp(1.6rem, 6vw, 2.6rem);
            font-weight: 800;
            color: #111;
            text-decoration: none;
            text-transform: uppercase;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.5s ease;
          }
          .mobile-links a.active { color: #ff8c00; }
          .mobile-menu-container.open .mobile-links a {
            opacity: 1;
            transform: translateY(0);
          }
          .mobile-menu-container.open .mobile-links a:nth-child(1) { transition-delay: 0.25s; }
          .mobile-menu-container.open .mobile-links a:nth-child(2) { transition-delay: 0.30s; }
          .mobile-menu-container.open .mobile-links a:nth-child(3) { transition-delay: 0.35s; }
          .mobile-menu-container.open .mobile-links a:nth-child(4) { transition-delay: 0.40s; }
          .mobile-menu-container.open .mobile-links a:nth-child(5) { transition-delay: 0.45s; }
          .mobile-menu-container.open .mobile-links a:nth-child(6) { transition-delay: 0.50s; }
          .mobile-menu-container.open .mobile-links a:nth-child(7) { transition-delay: 0.55s; }

          .mobile-menu-footer {
            text-align: center;
            opacity: 0;
            transition: 0.5s ease 0.7s;
          }
          .mobile-menu-container.open .mobile-menu-footer { opacity: 1; }
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
            padding-bottom: 2px;
          }

          /* ── RESPONSIVE SWITCH ── */
          @media (max-width: 960px) {
            .nav-links { display: none !important; }
            .menu-trigger { display: flex; }
            #mainNav { padding: 1rem 1.25rem !important; }
          }
        `}
      </style>

      <nav id="mainNav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '0.8rem 4rem' : '1.2rem 4rem',
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)', transition: '0.4s'
      }}>

        {/* Logo */}
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', zIndex: 1001 }}>
          <img src={logo} alt="Logo" style={{ height: scrolled ? '36px' : '42px', transition: '0.3s', mixBlendMode: 'multiply' }} />
          <img src={logoname} alt="AmberCore" style={{ height: scrolled ? '24px' : '28px', transition: '0.3s' }} />
        </a>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="/" className={window.location.pathname === '/' && window.scrollY < 50 ? 'active' : ''}>Home</a>
          <a href="/#services">Services</a>
          <a href="/#products">Products</a>
          <a href="/events" className={window.location.pathname === '/events' ? 'active' : ''}>Events</a>
          <a href="/#team">Team</a>
          <a href="/#clients">Clients</a>
          <a href="/#contact" style={{ background: '#111', color: '#fff', padding: '0.5rem 1.4rem', borderRadius: '50px', marginLeft: '1rem', fontWeight: 600 }}>Contact Us</a>
        </div>

        {/* Hamburger */}
        <button
          className={`menu-trigger ${isOpen ? 'hidden' : ''}`}
          onClick={openMenu}
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu-container ${isOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={closeMenu} aria-label="Close menu">&times;</button>

        <div className="mobile-brand-header">
          <img src={logoname} alt="AmberCore Systems" />
          <h4>Hardware &amp; Smart Systems</h4>
        </div>

        <nav className="mobile-links">
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <a href="/#products" onClick={closeMenu}>Products</a>
          <a href="/events" onClick={closeMenu}>Events</a>
          <a href="/#team" onClick={closeMenu}>Team</a>
          <a href="/#clients" onClick={closeMenu}>Clients</a>
          <a href="/#contact" onClick={closeMenu}>Contact</a>
        </nav>

        <div className="mobile-menu-footer">
          <div className="social-icons-mini">
            <a href="#" onClick={closeMenu}>LinkedIn</a>
            <a href="#" onClick={closeMenu}>Instagram</a>
            <a href="#" onClick={closeMenu}>Email</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;