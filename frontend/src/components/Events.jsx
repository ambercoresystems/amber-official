// src/components/Events.jsx
import React, { useState, useEffect } from 'react';

const BACKEND_API = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000'
  : 'https://amber-backend-qyi2.onrender.com';   
  
const IMAGE_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000'
  : 'https://res.cloudinary.com/mmuummth/image/upload/';

// 🌟 NEW SUB-COMPONENT: Manages its own 2-second image rotation loop independently
// src/components/Events.jsx

const EventCard = ({ event, IMAGE_BASE_URL, handleCardClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Compile cover and gallery array items into one list
  const resolvedCover = event.cover_image 
    ? (event.cover_image.startsWith('http') ? event.cover_image : `${IMAGE_BASE_URL}${event.cover_image}`)
    : null;
  
  const resolvedGallery = (event.gallery_images || []).map(img => 
    img.startsWith('http') ? img : `${IMAGE_BASE_URL}${img}`
  );

  const finalImages = [resolvedCover, ...resolvedGallery].filter(Boolean);
  const imagesToShow = finalImages.length > 0 ? finalImages : ['https://via.placeholder.com/800x400'];

  // Keep it at 2.5 or 3 seconds so the user has time to see the image between crossfades
  useEffect(() => {
    if (imagesToShow.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === imagesToShow.length - 1 ? 0 : prev + 1));
    }, 3000); // ⏱️ Changed to 3000ms for a more readable pacing cadence
    return () => clearInterval(interval);
  }, [imagesToShow]);

  return (
    <div 
      onClick={() => handleCardClick(event)} 
      style={{ 
        background: '#fff', 
        borderRadius: '16px', 
        overflow: 'hidden', 
        cursor: 'pointer', 
        border: '1px solid rgba(0,0,0,0.06)', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.02)', 
        transition: 'transform 0.2s ease' 
      }}
    >
      {/* 🌟 SMOOTH CROSSFADE CONTAINER */}
      <div style={{ position: 'relative', width: '100%', height: '200px', background: '#f4f6f9' }}>
        {imagesToShow.map((imgSrc, idx) => (
          <img 
            key={idx}
            src={imgSrc} 
            alt={`${event.title} view ${idx}`} 
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              opacity: currentImageIndex === idx ? 1 : 0, // 🌟 Dynamic Opacity Switch
              transition: 'opacity 0.8s ease-in-out',     // 🌟 0.8s Hardware-Accelerated Fade
              zIndex: currentImageIndex === idx ? 2 : 1
            }} 
          />
        ))}
      </div>

      <div style={{ padding: '1.5rem', position: 'relative', zIndex: 5, background: '#fff' }}>
        <span style={{ fontSize: '0.75rem', color: '#ff8c00', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {event.event_type}
        </span>
        <h3 style={{ fontFamily: 'Syne', margin: '0.5rem 0', fontSize: '1.2rem', color: '#111' }}>
          {event.title}
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>
          {event.date}
        </p>
      </div>
    </div>
  );
};

const Events = ({ openModalDirectly }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalImgIndex, setModalImgIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    fetch(`${BACKEND_API}/api/events/`, {
      method: 'GET',
      credentials: 'include' 
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getDynamicHeading = () => {
    switch(activeFilter) {
      case 'Workshop':
        return <>Technical <span className="dim">Workshops</span></>;
      case 'Attended Event':
        return <>Attended <span className="dim">External Events</span></>;
      case 'Conference':
        return <>International <span className="dim">Conferences</span></>;
      case 'Fest':
        return <>College &amp; Technical <span className="dim">Fests</span></>;
      case 'Inauguration':
        return <>Ceremonies &amp; <span className="dim">Inaugurations</span></>;
      case 'Special Day':
        return <>Special Day <span className="dim">Celebrations</span></>;
      default:
        return <>Company <span className="dim">Engagements</span></>;
    }
  };

  const handleCardClick = (event) => {
    if (openModalDirectly) {
      openModalDirectly(event);
    } else {
      setSelectedEvent(event);
      setModalImgIndex(0);
    }
  };

  const displayedEvents = activeFilter === 'All' 
    ? events 
    : events.filter(e => e.event_type === activeFilter);

  return (
    <section id="events" style={{ padding: '5rem 5%', background: '#fff' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        {getDynamicHeading()}
      </h2>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#ff8c00' }}>Syncing dashboard data...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {displayedEvents.map((event) => (
            /* 🌟 Reference our smart, self-scrolling sub-component card here */
            <EventCard 
              key={event.id}
              event={event}
              IMAGE_BASE_URL={IMAGE_BASE_URL}
              handleCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

      {/* Standalone Modal view layer remains stable below */}
      {!openModalDirectly && selectedEvent && (() => {
        const resolvedCover = selectedEvent.cover_image 
          ? (selectedEvent.cover_image.startsWith('http') ? selectedEvent.cover_image : `${IMAGE_BASE_URL}${selectedEvent.cover_image}`)
          : null;
        
        const resolvedGallery = (selectedEvent.gallery_images || []).map(img => 
          img.startsWith('http') ? img : `${IMAGE_BASE_URL}${img}`
        );

        const list = [resolvedCover, ...resolvedGallery].filter(Boolean);
        const activeImgSrc = list[modalImgIndex] || 'https://via.placeholder.com/800x400';

        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,17,17,0.85)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ background: '#fff', borderRadius: '24px', maxWidth: '850px', width: '100%', maxHeight: '92vh', overflowY: 'auto', position: 'relative' }}>
              <button onClick={() => setSelectedEvent(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#fff', border: 'none', fontSize: '1rem', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', zIndex: 3020 }}>✕</button>
              <div style={{ position: 'relative', height: '420px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={activeImgSrc} alt="Preview asset" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                {list.length > 1 && (
                  <>
                    <button onClick={() => setModalImgIndex(p => p === 0 ? list.length - 1 : p - 1)} style={{ position: 'absolute', left: '1rem', background: 'rgba(255,255,255,0.2)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: '#fff', cursor: 'pointer' }}>‹</button>
                    <button onClick={() => setModalImgIndex(p => p === list.length - 1 ? 0 : p + 1)} style={{ position: 'absolute', right: '1rem', background: 'rgba(255,255,255,0.2)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: '#fff', cursor: 'pointer' }}>›</button>
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
    </section>
  );
};

export default Events;