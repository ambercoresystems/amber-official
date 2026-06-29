import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Products from './components/Products';
import Team from './components/Team';
import Clients from './components/Clients';
import Events from './components/Events'; // Import the new section!
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Services />
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Products />
       {/* Injected cleanly into your scrolling architecture! */}
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      
      <Team />
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Clients />
      <div className="section-divider" style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '0 4rem' }}></div>
      <Contact />
      <Footer />
    </div>
  );
}

export default App;