import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Team from './components/Team/Team';
import Clients from './components/Clients/Clients'; // Changed from Gallery
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';

// Amber Core Systems - Advanced Startup Platform v1.1
function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Services />
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Products />
     
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Team />
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>

      {/* New Clients Section replacing Gallery */}
      <Clients />


      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Contact />
      <Footer />

      {/* WhatsApp Float */}
      {/* <a href="https://wa.me/917306844692" target="_blank" rel="noreferrer" className="wa-float" style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 200,
        width: 52, height: 52, borderRadius: '50%',
        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 18px rgba(37,211,102,0.4)', textDecoration: 'none', fontSize: '1.4rem'
      }}>
        💬
      </a> */}
    </div>
  );
}

export default App;