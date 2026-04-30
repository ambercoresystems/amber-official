import React, { useState } from 'react';

const API = '';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [msg, setMsg] = useState({ text: '', type: '' });

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.message) {
      setMsg({ text: 'Name and message are required.', type: 'error' });
      return;
    }
    try {
      const res = await fetch(API + '/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMsg({ text: 'Message sent! We will get back to you soon.', type: 'success' });
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setMsg({ text: 'Failed to send. Please try again.', type: 'error' });
      }
    } catch {
      setMsg({ text: 'Network error. Please try again.', type: 'error' });
    }
  };

  return (
    <section id="contact">
      <div className="contact-wrap">
        {/* Contact Info */}

      </div>
    </section>
  );
};

export default Contact;