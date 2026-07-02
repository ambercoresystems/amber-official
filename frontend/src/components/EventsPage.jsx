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
            <div style={{ background: '#fff', borderRadius: '20px', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
              
              {/* CLOSE BUTTON */}
              <button onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#fff', border: 'none', fontSize: '0.9rem', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', zIndex: 3020 }}>✕</button>
              
              {/* IMAGE FRAME CONTAINER ONLY */}
              <div style={{ position: 'relative', width: '100%', height: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: '#000' }}>
                <img src={activeImageSrc} alt="Carousel view" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                
                {list.length > 1 && (
                  <>
                    <button onClick={() => setModalImgIndex(p => p === 0 ? list.length - 1 : p - 1)} style={{ position: 'absolute', left: '0.75rem', background: 'rgba(255,255,255,0.2)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>‹</button>
                    <button onClick={() => setModalImgIndex(p => p === list.length - 1 ? 0 : p + 1)} style={{ position: 'absolute', right: '0.75rem', background: 'rgba(255,255,255,0.2)', border: 'none', width: '36px', height: '36px', borderRadius: '50%', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>›</button>
                  </>
                )}

                {/* TEXT DETAILS DISPLAYED ON IMAGE RIGHT SIDE BOTTOM */}
                <div style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                  background: 'rgba(22, 23, 27, 0.8)',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  maxWidth: '320px',
                  textAlign: 'right',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  zIndex: 15
                }}>
                  <div style={{ textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '1.5px', color: '#ff8c00', fontWeight: 'bold' }}>
                    EVENT DETAILS
                  </div>
                  <h4 style={{ fontFamily: 'Syne', fontSize: '1.1rem', margin: '0.3rem 0 0.1rem 0', fontWeight: '700', color: '#fff' }}>
                    {selectedEvent.event_type} Record
                  </h4>
                  {selectedEvent.subtitle && (
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#ff8c00', fontStyle: 'italic' }}>
                      {selectedEvent.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* BOTTOM CONTENT AREA */}
              <div style={{ padding: '2rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#ff8c00', fontWeight: '700', textTransform: 'uppercase' }}>{selectedEvent.event_type}</span>
                <h2 style={{ fontFamily: 'Syne', margin: '0.2rem 0 0.75rem', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: '#111', fontWeight: 'bold' }}>{selectedEvent.title}</h2>
                <p style={{ color: 'rgba(0,0,0,0.6)', lineHeight: '1.7', fontSize: '0.9rem', whiteSpace: 'pre-line' }}>{selectedEvent.description}</p>
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