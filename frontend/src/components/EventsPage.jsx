// src/components/EventsPage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Events from './Events';
import Footer from './Footer';

const BACKEND_API = 'http://127.0.0.1:8000';

const EventsPage = () => {
  const [carouselEvents, setCarouselEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImgIndex, setModalImgIndex] = useState(0); // Tracks current picture view in pop-up modal

  useEffect(() => {
    fetch(`${BACKEND_API}/api/events/`, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setCarouselEvents(data.slice(0, 4)); // Grab the latest 4 events for the high-end showcase banner
      })
      .catch(err => console.error(err));
  }, []);

  // Professional Auto-Carousel rotation logic (Every 4 seconds)
  useEffect(() => {
    if (carouselEvents.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === carouselEvents.length - 1 ? 0 : prev + 1));
    }, 4000); 
    return () => clearInterval(interval);
  }, [carouselEvents]);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalImgIndex(0); // Reset index to first photo when opening details modal
  };

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* TCS-STYLE IMPERSIVE AUTO-CAROUSEL HERO HEADER AREA */}
      {carouselEvents.length > 0 && (
        <div style={{ position: 'relative', width: '100%', height: '550px', background: '#111', marginTop: '70px', overflow: 'hidden' }}>
          {carouselEvents.map((ev, idx) => (
            <div key={ev.id} style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              opacity: activeIndex === idx ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out', zIndex: activeIndex === idx ? 1 : 0
            }}>
              {/* Dark Overlay Tint for premium styling readability */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)', zIndex: 2 }}></div>
              <img src={ev.cover_image} alt={ev.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Floating Typography Details */}
              {/* UPDATED SLIDER TYPOGRAPHY VIEW BLOCK */}
<div style={{ position: 'absolute', bottom: '18%', left: '8%', zIndex: 3, maxWidth: '700px', color: '#fff' }}>
  
  <span style={{ 
    color: '#ff8c00', 
    fontSize: '0.78rem', 
    fontWeight: '750', 
    letterSpacing: '2.5px', 
    textTransform: 'uppercase',
    fontFamily: 'var(--font-heading), "Syne", sans-serif' // Ensured clean rendering fallbacks
  }}>
    Who We Are / Engagements
  </span>

  <h1 style={{ 
    fontFamily: 'var(--font-heading), "Syne", sans-serif', 
    fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', // Balanced down size range slightly
    fontWeight: '800', 
    margin: '0.6rem 0 1.5rem', 
    lineHeight: '1.25', // Widened to stop crowded vertical overlapping
    letterSpacing: '-0.01em',
    textTransform: 'none' // Prevents default browser over-stretching
  }}>
    {ev.title}
  </h1>

  <button onClick={() => openModal(ev)} style={{ 
    background: '#fff', 
    color: '#111', 
    border: 'none', 
    padding: '0.85rem 2rem', 
    borderRadius: '50px', 
    fontFamily: 'var(--font-main), "DM Sans", sans-serif',
    fontWeight: '700', 
    fontSize: '0.82rem', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s ease'
  }}>
    Read More 
    <span style={{ 
      background: '#ff8c00', 
      color: '#fff', 
      width: '20px', 
      height: '20px', 
      borderRadius: '50%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      fontSize: '0.65rem' 
    }}>→</span>
  </button>

</div>
            </div>
          ))}

          {/* Slider Pagination Bar Indicators — FIXED MATCHING VARIABLE LOOKUPS */}
          <div style={{ position: 'absolute', bottom: '2rem', right: '4rem', zIndex: 10, display: 'flex', gap: '1rem' }}>
            {carouselEvents.map((_, idx) => (
              <button key={idx} onClick={() => setActiveIndex(idx)} style={{
                background: 'none', border: 'none', padding: '0.5rem 0',
                fontFamily: 'Syne', fontSize: '0.85rem', fontWeight: '700',
                color: activeIndex === idx ? '#ff8c00' : 'rgba(255,255,255,0.4)',
                borderBottom: activeIndex === idx ? '2px solid #ff8c00' : '2px solid transparent', // Fixed reference variable name here!
                cursor: 'pointer', transition: '0.3s'
              }}>
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN DYNAMIC CONTENT GRID LAYER */}
      <div style={{ flexGrow: 1 }}>
        <Events />
      </div>

      {/* DYNAMIC POPUP WINDOW MODAL CAROUSEL */}
      {selectedEvent && (() => {
        const list = [selectedEvent.cover_image, ...((selectedEvent.gallery_images) || [])].filter(Boolean);
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,17,17,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ background: '#fff', borderRadius: '24px', maxWidth: '850px', width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
              <button onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#fff', border: 'none', fontSize: '1rem', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', zIndex: 3020 }}>✕</button>
              
              <div style={{ position: 'relative', height: '420px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={list[modalImgIndex]} alt="Carousel view" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                {list.length > 1 && (
                  <>
                    <button onClick={() => setModalImgIndex(p => p === 0 ? list.length - 1 : p - 1)} style={{ position: 'absolute', left: '1rem', background: 'rgba(255,255,255,0.2)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                    <button onClick={() => setModalImgIndex(p => p === list.length - 1 ? 0 : p + 1)} style={{ position: 'absolute', right: '1rem', background: 'rgba(255,255,255,0.2)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                  </>
                )}
              </div>
              <div style={{ padding: '2.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#ff8c00', fontWeight: '700' }}>{selectedEvent.event_type}</span>
                <h2 style={{ fontFamily: 'Syne', margin: '0.3rem 0 1rem', fontSize: '1.8rem' }}>{selectedEvent.title}</h2>
                <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: '1.8', fontSize: '0.98rem', whiteSpace: 'pre-line' }}>{selectedEvent.description}</p>
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