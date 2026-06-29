// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminPanel from './components/AdminPanel';
import EventsPage from './components/EventsPage'; // Import the new full-page component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/events" element={<EventsPage />} /> {/* New dedicated URL Route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);