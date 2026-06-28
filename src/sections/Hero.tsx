import type { Language } from '../constants/translations';
import { translations } from '../constants/translations';

interface HeroProps {
  language: Language;
}

export default function Hero({ language }: HeroProps) {
  const dict = translations[language];

  return (
    <section 
      id="hero" 
      className="section"
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative'
      }}
    >
      <div className="text-slide-up">
        {/* Availability Badge */}
        <div 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'hsla(var(--accent-hsl), 0.1)',
            border: '1px solid hsla(var(--accent-hsl), 0.25)',
            color: 'var(--accent)',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '24px',
            fontFamily: 'var(--font-heading)'
          }}
        >
          <span 
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
              display: 'inline-block'
            }}
          ></span>
          {dict.heroBadge}
        </div>

        {/* Big Typographic Heading */}
        <h1 
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}
        >
          {language === 'en' ? (
            <>
              Hi, I'm <span style={{ color: 'var(--accent)', textShadow: '0 0 20px hsla(var(--accent-hsl), 0.2)' }}>Idundun Michael</span>
            </>
          ) : (
            dict.heroGreeting
          )}
        </h1>

        {/* Subtitle */}
        <h2 
          style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 600,
            color: 'var(--text-color)',
            opacity: 0.9,
            marginBottom: '24px',
            fontFamily: 'var(--font-heading)'
          }}
        >
          {dict.heroSub}
        </h2>

        {/* Description paragraph */}
        <p 
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--text-muted)',
            maxWidth: '600px',
            marginBottom: '40px',
            lineHeight: 1.6
          }}
        >
          {dict.heroDesc}
        </p>

        {/* CTAs */}
        <div className="hero-ctas">
          <a href="#contact" className="btn-emerald">
            {dict.heroCTA} &nbsp; →
          </a>
          <a href="#projects" className="btn-secondary">
            {translations[language].navProjects}
          </a>
        </div>
      </div>
    </section>
  );
}
