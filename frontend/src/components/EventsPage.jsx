// src/components/EventsPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Events from './Events';
import Footer from './Footer';

const BACKEND_API = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000'
  : 'https://amber-backend-qyi2.onrender.com';  

const IMAGE_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000'
  : 'https://res.cloudinary.com/mmuummth/image/upload/';

const EventsPage = () => {
  const [carouselEvents, setCarouselEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImgIndex, setModalImgIndex] = useState(0);

  useEffect(() => {
    fetch(`${BACKEND_API}/api/events/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setCarouselEvents(data.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (carouselEvents.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === carouselEvents.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(interval);
  }, [carouselEvents]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalImgIndex(0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? carouselEvents.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === carouselEvents.length - 1 ? 0 : prev + 1));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', width: '100%', overflowX: 'hidden' }}>
      <Navbar />

      {/* HERO HEADER AREA */}
      {carouselEvents.length > 0 && (
        <div style={{ position: 'relative', width: '100%', height: 'auto', minHeight: '450px', background: '#111', marginTop: '70px', overflow: 'hidden' }}>
          {carouselEvents.map((ev, idx) => (
            <div key={ev.id} style={{
              position: idx === activeIndex ? 'relative' : 'absolute',
              inset: 0,
              width: '100%',
              height: idx === activeIndex ? '550px' : '100%',
              opacity: activeIndex === idx ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: activeIndex === idx ? 1 : 0
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 100%)', zIndex: 2 }}></div>
              <img 
                src={
                  ev.cover_image 
                    ? (ev.cover_image.startsWith('http') ? ev.cover_image : `${IMAGE_BASE_URL}${ev.cover_image}`)
                    : 'https://via.placeholder.com/800x400'
                } 
                alt={ev.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />              
              
              <div style={{ position: 'absolute', bottom: '12%', left: '5%', right: '5%', zIndex: 3, maxWidth: '700px', color: '#fff' }}>
                <span style={{ 
                  color: '#ff8c00', 
                  fontSize: '0.72rem', 
                  fontWeight: '750', 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading), "Syne", sans-serif'
                }}>
                  Who We Are / Engagements
                </span>

                <h1 style={{ 
                  fontFamily: 'var(--font-heading), "Syne", sans-serif', 
                  fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', 
                  fontWeight: '800', 
                  margin: '0.5rem 0 1.2rem', 
                  lineHeight: '1.25', 
                  letterSpacing: '-0.01em',
                  textTransform: 'none'
                }}>
                  {ev.title}
                </h1>

                <button onClick={() => openModal(ev)} style={{ 
                  background: '#fff', 
                  color: '#111', 
                  border: 'none', 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '50px', 
                  fontFamily: 'var(--font-main), "DM Sans", sans-serif',
                  fontWeight: '700', 
                  fontSize: '0.8rem', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.2s ease'
                }}>
                  Read More 
                  <span style={{ 
                    background: '#ff8c00', 
                    color: '#fff', 
                    width: '18px', 
                    height: '18px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.6rem' 
                  }}>→</span>
                </button>
              </div>
            </div>
          ))}

          {/* ARROW CONTROLS */}
          {carouselEvents.length > 1 && (
            <div style={{ position: 'absolute', bottom: '1.5rem', right: '5%', zIndex: 10, display: 'flex', gap: '0.75rem' }}>
              <button onClick={handlePrev} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', width: '38px', height: '38px', borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', transition: '0.3s' }}>
                ‹
              </button>
              <button onClick={handleNext} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', width: '38px', height: '38px', borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', transition: '0.3s' }}>
                ›
              </button>
            </div>
          )}
        </div>
      )}

      {/* COMPACT CONTENT GRID LAYER */}
      <div style={{ flexGrow: 1, width: '100%' }}>
        <Events openModalDirectly={openModal} />
      </div>

      {/* POPUP WINDOW MODAL CAROUSEL */}
      // src/components/EventsPage.jsx
// [Replace the existing selectedEvent modal section with this updated, high-contrast clean version]

{selectedEvent && (() => {
  const resolvedCover = selectedEvent.cover_image 
    ? (selectedEvent.cover_image.startsWith('http') ? selectedEvent.cover_image : `${IMAGE_BASE_URL}${selectedEvent.cover_image}`)
    : null;
  
  const resolvedGallery = (selectedEvent.gallery_images || []).map(img => 
    img.startsWith('http') ? img : `${IMAGE_BASE_URL}${img}`
  );

  const list = [resolvedCover, ...resolvedGallery].filter(Boolean);
  const activeImageSrc = list[modalImgIndex] || 'https://via.placeholder.com/800x400';

  return (
    <div 
      id="modal-overlay"
      onClick={(e) => {
        if (e.target.id === 'modal-overlay') setSelectedEvent(null);
      }}
      style={{ 
        position: 'fixed', 
        inset: 0, 
        background: 'rgba(17,17,17,0.85)', 
        zIndex: 3000, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '1rem', 
        backdropFilter: 'blur(10px)' 
      }}
    >
      <div style={{ background: '#fff', borderRadius: '24px', maxWidth: '850px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
        
        {/* TOP WINDOW CLOSE BUTTON */}
        <button onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#fff', border: 'none', fontSize: '0.9rem', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 3020, fontWeight: 'bold' }}>✕</button>
        
        {/* 100% WIDE IMAGE STAGE CONTAINER */}
        <div style={{ position: 'relative', width: '100%', height: '420px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderRadius: '24px 24px 0 0' }}>
          <img src={activeImageSrc} alt="Carousel view" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
          
          {list.length > 1 && (
            <>
              {/* 🌟 HIGH VISIBILITY BRIGHT SLIDER ARROWS */}
              <button 
                onClick={() => setModalImgIndex(p => p === 0 ? list.length - 1 : p - 1)} 
                style={{ position: 'absolute', left: '1.2rem', background: '#ffffff', color: '#111111', border: 'none', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.25)', transition: '0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#ff8c00'}
                onMouseLeave={(e) => e.target.style.color = '#111111'}
              >
                ‹
              </button>
              <button 
                onClick={() => setModalImgIndex(p => p === list.length - 1 ? 0 : p + 1)} 
                style={{ position: 'absolute', right: '1.2rem', background: '#ffffff', color: '#111111', border: 'none', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.6rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 4px 15px rgba(0,0,0,0.25)', transition: '0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#ff8c00'}
                onMouseLeave={(e) => e.target.style.color = '#111111'}
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* BOTTOM CONTENT BOX */}
        <div style={{ padding: '2rem 2.5rem' }}>
          
          {/* TAGS ROW LAYOUT CONTAINER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#ff8c00', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {selectedEvent.event_type}
            </span>
            
            {/* 🌟 SUBTITLE INTEGRATED CLEANLY BESIDE THE MAIN CLASSIFICATION TAG */}
            {selectedEvent.subtitle && (
              <span style={{ fontSize: '0.82rem', color: '#666', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#ccc' }}>|</span> {selectedEvent.subtitle}
              </span>
            )}
          </div>

          <h2 style={{ fontFamily: 'Syne', margin: '0 0 1rem 0', fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#111', fontWeight: '800', lineHeight: '1.3' }}>
            {selectedEvent.title}
          </h2>
          
          <p style={{ color: 'rgba(0,0,0,0.65)', lineHeight: '1.8', fontSize: '0.95rem', whiteSpace: 'pre-line', margin: 0 }}>
            {selectedEvent.description}
          </p>
        </div>

      </div>
    </div>
  );
})()}
      

      <Footer />
    </div>
  );
};

export default EventsPage;