import React, { useState } from 'react';
import type { Language } from '../constants/translations';
import { translations } from '../constants/translations';
import GlowCard from '../components/GlowCard';

interface ContactProps {
  language: Language;
}

export default function Contact({ language }: ContactProps) {
  const dict = translations[language];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus('submitting');

    try {
      // Web3Forms Access Key
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "cc58ae13-73fb-4fb9-90d8-f4abd812ec00",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `💼 Portfolio: New message from ${formData.name}`,
          from_name: "My Portfolio Contact Form"
        })
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error("Web3Forms Submission Failed:", result);
        setStatus('error');
      }
    } catch (error) {
      console.error("Web3Forms Network Error:", error);
      setStatus('error');
    }

    // Auto reset status after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="section">
      <h2 className="section-title">{dict.contactTitle}</h2>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '700px' }}>
        {dict.contactSub}
      </p>

      <div className="contact-layout-grid">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="contact-form-row">
            {/* Name Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="name" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{dict.contactName}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              />
            </div>

            {/* Email Input */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{dict.contactEmail}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  padding: '12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-color)',
                  outline: 'none',
                  fontSize: '0.9rem',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
              />
            </div>
          </div>

          {/* Message Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="message" style={{ fontSize: '0.85rem', fontWeight: 600 }}>{dict.contactMsg}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{
                padding: '12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-color)',
                outline: 'none',
                fontSize: '0.9rem',
                transition: 'border-color 0.2s ease',
                resize: 'vertical'
              }}
              onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            />
          </div>

          {/* Send Trigger */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-emerald"
            style={{ alignSelf: 'start', opacity: status === 'submitting' ? 0.7 : 1 }}
          >
            {status === 'submitting' ? dict.contactSending : dict.contactSend}
          </button>

          {/* Status logs */}
          {status === 'success' && (
            <div style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>
              ✓ {dict.contactSuccess}
            </div>
          )}
          {status === 'error' && (
            <div style={{ color: '#ef4444', fontWeight: 600, fontSize: '0.9rem' }}>
              ⚠️ {dict.contactError}
            </div>
          )}
        </form>

        {/* Informative column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlowCard>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px' }}>
              {language === 'en' ? 'Direct Contact Channels' : language === 'es' ? 'Canales Directos' : 'Canaux de Contact Direct'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div>
                <strong>📍 Location:</strong> Lagos, Nigeria (Available for worldwide remote contracts)
              </div>
              <div>
                <strong>✉️ Direct Email:</strong> <a href="mailto:idundunmichael@gmail.com" style={{ color: 'var(--accent)' }}>idundunmichael@gmail.com</a>
              </div>
              <div>
                <strong>💬 WhatsApp:</strong> Available 24/7 via the green chat icon below!
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
