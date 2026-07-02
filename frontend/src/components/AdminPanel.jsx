import React, { useState, useEffect } from 'react';

// Automatically switches endpoints depending on where the app is running
const BACKEND_API = import.meta.env.MODE === 'development'
  ? 'http://127.0.0.1:8000'                      // Local Django Server
  : 'https://amber-backend-qyi2.onrender.com';   // Live Render Server

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  
  // Workspace management states
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchFilter] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Dynamic form entry records states — 🌟 UPDATED WITH SUBTITLE STATE
  const [eventForm, setEventForm] = useState({ title: '', subtitle: '', type: 'Workshop', date: '', description: '' });
  const [coverFile, setCoverFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const fetchAllEvents = async () => {
    try {
      const res = await fetch(`${BACKEND_API}/api/events/`, { credentials: 'include' });
      if (res.ok) setEvents(await res.json());
    } catch (err) { console.error("Database connection failure:", err); }
  };

  useEffect(() => { if (isAuthenticated) fetchAllEvents(); }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${BACKEND_API}/api/admin-login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials)
    });
    if (res.ok) setIsAuthenticated(true);
    else alert("Invalid administrative authentication parameter logs.");
  };

  const resetFormState = () => {
    // 🌟 RESET SUBTITLE PROPERTY CLEAR INSTRUCTION ADDED
    setEventForm({ title: '', subtitle: '', type: 'Workshop', date: '', description: '' });
    setCoverFile(null);
    setGalleryFiles([]);
    setEditingId(null);
    if (document.getElementById('coverInput')) document.getElementById('coverInput').value = '';
    if (document.getElementById('galleryInput')) document.getElementById('galleryInput').value = '';
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('title', eventForm.title);
    formData.append('subtitle', eventForm.subtitle); // 🌟 STRAPPED DIRECTLY TO NETWORK PAYLOAD
    formData.append('type', eventForm.type);
    formData.append('date', eventForm.date);
    formData.append('description', eventForm.description);
    
    if (coverFile) formData.append('cover_image', coverFile);
    if (galleryFiles.length > 0) {
      for (let i = 0; i < galleryFiles.length; i++) formData.append('gallery_images', galleryFiles[i]);
    }

    const url = editingId ? `${BACKEND_API}/api/events/${editingId}/` : `${BACKEND_API}/api/events/`;
    const method = editingId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, credentials: 'include', body: formData });
      if (res.ok) {
        alert(editingId ? 'Database entity modified.' : 'New engagement matrix published!');
        resetFormState();
        fetchAllEvents();
      } else { alert('Server rejection logs verified.'); }
    } catch { alert('Network transaction handling failure.'); }
    finally { setIsSubmitting(false); }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    // 🌟 PARSES EXISTING MODEL SUBTITLE INSTANCES INTO STATE FORM BINDING
    setEventForm({ 
      title: item.title, 
      subtitle: item.subtitle || '', 
      type: item.event_type, 
      date: item.date, 
      description: item.description 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanently drop this operational event row out of database?")) return;
    const res = await fetch(`${BACKEND_API}/api/events/${id}/`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) { fetchAllEvents(); if (editingId === id) resetFormState(); }
    else { alert('Failed to clear row item.'); }
  };

  const filteredEvents = events.filter(ev => 
    ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (ev.subtitle && ev.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
    ev.event_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalWorkshops = events.filter(e => e.event_type === 'Workshop').length;
  const totalAttended = events.filter(e => e.event_type === 'Attended Event').length;

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', background: '#0b0c10', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-main)' }}>
        <form onSubmit={handleLogin} style={{ background: '#112233', padding: '3rem', borderRadius: '24px', width: '100%', maxWidth: '420px', border: '1px solid rgba(255,140,0,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '1.8rem', margin: 0 }}>AmberCore <span style={{ color: '#ff8c00' }}>HQ</span></h2>
            <p style={{ color: '#8899a6', fontSize: '0.85rem', marginTop: '0.4rem' }}>Secure Administrative Terminal Entry</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input type="text" placeholder="Access Identifier" onChange={e => setCredentials({...credentials, username: e.target.value})} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: '1px solid #223344', background: '#0b0c10', color: '#fff', outline: 'none' }} required />
            <input type="password" placeholder="Security Token" onChange={e => setCredentials({...credentials, password: e.target.value})} style={{ padding: '0.9rem 1.2rem', borderRadius: '12px', border: '1px solid #223344', background: '#0b0c10', color: '#fff', outline: 'none' }} required />
            <button type="submit" style={{ padding: '1rem', background: '#ff8c00', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem', transition: '0.3s' }}>Establish System Link</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh', fontFamily: 'var(--font-main)', padding: '2rem' }}>
      
      {/* 1. TOP GLOBAL EXECUTIVE HEADER */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', background: '#fff', padding: '1.5rem 3rem', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid #eaedf3' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: '#111', margin: 0 }}>Management Console</h1>
          <p style={{ color: '#778899', fontSize: '0.88rem', margin: '0.2rem 0 0' }}>Operational workspace data controller pipeline</p>
        </div>
        <button onClick={() => window.location.href = '/'} style={{ background: '#111', color: '#fff', border: 'none', padding: '0.75rem 1.6rem', borderRadius: '50px', fontWeight: '700', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', cursor: 'pointer', transition: '0.3s' }}>Exit To Live Site</button>
      </header>

      {/* 2. OPERATIONAL INSIGHTS LIVE COUNT TICKERS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '20px', border: '1px solid #eaedf3', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#778899', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Published Matrix</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '900', color: '#111', marginTop: '0.4rem' }}>{events.length}</div>
        </div>
        <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '20px', border: '1px solid #eaedf3', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#ff8c00', textTransform: 'uppercase', letterSpacing: '1px' }}>Workshops Executed</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '900', color: '#ff8c00', marginTop: '0.4rem' }}>{totalWorkshops}</div>
        </div>
        <div style={{ background: '#fff', padding: '1.8rem', borderRadius: '20px', border: '1px solid #eaedf3', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#111', textTransform: 'uppercase', letterSpacing: '1px' }}>Attended Engagements</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: '900', color: '#111', marginTop: '0.4rem' }}>{totalAttended}</div>
        </div>
      </div>

      {/* 3. MAIN COGNITIVE MATRIX TWO-COLUMN SPLIT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        
        {/* LEFT COMPONENT COLUMN: INTERACTIVE DATA SPREADSHEET TABLE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* SEARCH BAR PANEL CONTROL HEADER */}
          <div style={{ background: '#fff', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #eaedf3', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>🔍</span>
            <input type="text" placeholder="Search database elements dynamically by name, type reference, or subtitle..." value={searchTerm} onChange={e => setSearchFilter(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '0.9rem', color: '#111' }} />
          </div>

          <div style={{ background: '#fff', borderRadius: '24px', padding: '2rem', border: '1px solid #eaedf3', boxShadow: '0 4px 25px rgba(0,0,0,0.01)' }}>
            {filteredEvents.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: '#778899' }}>No corresponding records identified.</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.8rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#778899', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <th style={{ padding: '0 1rem' }}>Engagement Instance Title</th>
                    <th style={{ padding: '0 1rem' }}>Class</th>
                    <th style={{ padding: '0 1rem' }}>Execution Date</th>
                    <th style={{ padding: '0 1rem' }}>Controls</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(item => (
                    <tr key={item.id} style={{ background: '#f8fafc', borderRadius: '12px' }}>
                      <td style={{ padding: '1.2rem 1rem', borderRadius: '12px 0 0 12px' }}>
                        <div style={{ fontWeight: '700', color: '#111', fontSize: '0.92rem' }}>{item.title}</div>
                        {item.subtitle && <div style={{ fontSize: '0.78rem', color: '#ff8c00', marginTop: '0.15rem', fontStyle: 'italic' }}>{item.subtitle}</div>}
                      </td>
                      <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem' }}>
                        <span style={{ background: item.event_type === 'Workshop' ? 'rgba(255,140,0,0.1)' : '#eee', color: item.event_type === 'Workshop' ? '#ff8c00' : '#111', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold' }}>
                          {item.event_type}
                        </span>
                      </td>
                      <td style={{ padding: '1.2rem 1rem', fontSize: '0.88rem', color: '#555' }}>{item.date}</td>
                      <td style={{ padding: '1.2rem 1rem', borderRadius: '0 12px 12px 0' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => startEdit(item)} style={{ background: '#fff', color: '#111', border: '1px solid #ddd', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>Modify</button>
                          <button onClick={() => handleDelete(item.id)} style={{ background: '#fff', color: '#ff3333', border: '1px solid rgba(255,51,51,0.2)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem' }}>Drop</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* RIGHT COMPONENT COLUMN: THE DATA PACKET UPLOAD INPUT MATRICE CARD */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <form onSubmit={handleEventSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', background: '#fff', padding: '2.5rem', borderRadius: '24px', border: '1px solid #eaedf3', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', margin: '0 0 0.5rem 0', fontSize: '1.3rem', color: '#111' }}>
              {editingId ? "📝 Modify Entry Mode" : "✨ Construct New Matrix"}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.8rem', color: '#555', textTransform: 'uppercase' }}>Engagement Title Name</label>
              <input type="text" placeholder="e.g. Machine Learning Deep Dive" value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #dcdfe6', fontSize: '0.9rem', outline: 'none' }} required />
            </div>

            {/* 🌟 NEW SUBTITLE INPUT BLOCK ADDED DIRECTLY BELOW TITLE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.8rem', color: '#555', textTransform: 'uppercase' }}>Engagement Subtitle headline (Optional)</label>
              <input type="text" placeholder="e.g. Conducted at IIIT Kottayam" value={eventForm.subtitle} onChange={e => setEventForm({...eventForm, subtitle: e.target.value})} style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #dcdfe6', fontSize: '0.9rem', outline: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontWeight: '700', fontSize: '0.8rem', color: '#555', textTransform: 'uppercase' }}>Classification</label>
                <select 
                  value={eventForm.type} 
                  onChange={e => setEventForm({...eventForm, type: e.target.value})} 
                  style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #dcdfe6', background: '#fff', fontSize: '0.9rem' }}
                >
                  <option value="Workshop">Workshop Conducted</option>
                  <option value="Attended Event">Attended Event</option>
                  <option value="Inauguration">Inauguration Ceremony</option>
                  <option value="Fest">College/Technical Fest</option>
                  <option value="Special Day">Special Day Celebration</option>
                  <option value="Conference">Conference Presentation</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label style={{ fontWeight: '700', fontSize: '0.8rem', color: '#555', textTransform: 'uppercase' }}>Timeline Date</label>
                <input type="date" value={eventForm.date} onChange={e => setEventForm({...eventForm, date: e.target.value})} style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #dcdfe6', fontSize: '0.9rem' }} required />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.8rem', color: '#555', textTransform: 'uppercase' }}>Scope Logs Narrative</label>
              <textarea placeholder="Describe execution bounds context text rules..." value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} style={{ padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #dcdfe6', minHeight: '110px', maxHeight: '200px', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} required />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.8rem', color: '#555', textTransform: 'uppercase' }}>Main Card Banner Cover {editingId && "(Optional)"}</label>
              <input id="coverInput" type="file" accept="image/*" onChange={e => setCoverFile(e.target.files[0])} style={{ fontSize: '0.82rem', padding: '0.6rem', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px' }} required={!editingId} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <label style={{ fontWeight: '700', fontSize: '0.8rem', color: '#555', textTransform: 'uppercase' }}>Sub-Gallery Overviews {editingId && "(Optional)"}</label>
              <input id="galleryInput" type="file" accept="image/*" multiple onChange={e => setGalleryFiles(e.target.files)} style={{ fontSize: '0.82rem', padding: '0.6rem', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '8px' }} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button type="submit" disabled={isSubmitting} style={{ flexGrow: 2, padding: '1rem', background: '#111', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.9rem', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: '0.3s' }}>
                {isSubmitting ? "Uploading Stream..." : editingId ? "Save Modifications" : "Commit Execution Asset"}
              </button>
              {editingId && (
                <button type="button" onClick={resetFormState} style={{ flexGrow: 1, padding: '1rem', background: '#eaedf3', color: '#444', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer' }}>Cancel</button>
              )}
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;