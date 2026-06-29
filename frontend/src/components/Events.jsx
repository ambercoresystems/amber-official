// src/components/Events.jsx
import React, { useState, useEffect } from 'react';

const BACKEND_API = 'http://127.0.0.1:8000'; 

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0); 
  const [loading, setLoading] = useState(true);
  
  // 1. ADD A FILTER CATEGORY TRACKER STATE FOR DYNAMIC HEADERS
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

  // 2. HELPER TO COMPUTE THE DYNAMIC LOGICAL HEADING
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
      // Inside the getDynamicHeading() function in src/components/Events.jsx
      default:
        return <>Company <span className="dim">Engagements</span></>;
          }
  };

  const getEventImagesList = (event) => {
    const list = [];
    if (event.cover_image) list.push(event.cover_image);
    if (event.gallery_images && event.gallery_images.length > 0) {
      list.push(...event.gallery_images);
    }
    return list.length > 0 ? list : ['https://via.placeholder.com/800x400'];
  };

  // Filter items in memory based on selected pipeline view
  const displayedEvents = activeFilter === 'All' 
    ? events 
    : events.filter(e => e.event_type === activeFilter);

  return (
    <section id="events" style={{ padding: '5rem 5%', background: '#fff' }}>
      {/* <div className="section-label" style={{ textAlign: 'center' }}>Engagements</div> */}
      
      {/* 3. DYNAMIC REPLACEMENT OF YOUR TITLE HEADLINE */}
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {getDynamicHeading()}
      </h2>

      {/* 4. PREMIUM FILTER SUBBAR FOR SPEEDY CLIENT EXPLORATION */}
      {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
        {['All', 'Workshop', 'Conference', 'Fest', 'Inauguration', 'Special Day', 'Attended Event'].map((cat) => (
          <button 
            key={cat} 
            onClick={() => setActiveFilter(cat)}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '50px',
              border: '1px solid #ddd',
              background: activeFilter === cat ? '#111' : '#fff',
              color: activeFilter === cat ? '#fff' : '#555',
              fontWeight: '600',
              fontSize: '0.82rem',
              cursor: 'pointer',
              transition: '0.2s ease'
            }}
          >
            {cat === 'All' ? 'View All' : cat}
          </button>
        ))}
      </div> */}

      {loading ? (
        <div style={{ textAlign: 'center', color: '#ff8c00' }}>Syncing dashboard data...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {displayedEvents.map((event) => (
            <div key={event.id} onClick={() => { setSelectedEvent(event); setCurrentImgIndex(0); }} style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              <img src={event.cover_image || 'https://via.placeholder.com/800x400'} alt={event.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#ff8c00', fontWeight: 'bold', textTransform: 'uppercase' }}>{event.event_type}</span>
                <h3 style={{ fontFamily: 'Syne', margin: '0.5rem 0', fontSize: '1.2rem', color: '#111' }}>{event.title}</h3>
                <p style={{ fontSize: '0.85rem', color: '#666' }}>{event.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Keep your existing selectedEvent modal carousel code exactly the same beneath this point */}
    </section>
  );
};

export default Events;