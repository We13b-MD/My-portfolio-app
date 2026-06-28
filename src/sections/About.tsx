import type { Language } from '../constants/translations';
import { translations } from '../constants/translations';
import GlowCard from '../components/GlowCard';

interface AboutProps {
  language: Language;
}

export default function About({ language }: AboutProps) {
  const dict = translations[language];

  return (
    <section id="about" className="section">
      <h2 className="section-title">{dict.aboutTitle}</h2>
      
      <div className="about-grid">
        {/* Paragraph Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1rem', color: 'var(--text-muted)' }}>
          <p>{dict.aboutP1}</p>
          <p>{dict.aboutP2}</p>
          <p>{dict.aboutP3}</p>
        </div>

        {/* Feature Cards Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <GlowCard>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
              <span style={{ fontSize: '2rem' }}>🎨</span>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', fontWeight: 700 }}>
                  {language === 'en' ? 'Core Design Strategy' : language === 'es' ? 'Estrategia de Diseño' : 'Stratégie de Design'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {language === 'en' ? 'Pixel-perfect, high-fidelity responsive user interfaces and beautiful light/dark asset assets.' : language === 'es' ? 'Interfaces responsivas de alta fidelidad y hermosas configuraciones estéticas de luz/oscuridad.' : 'Interfaces adaptables haute fidélité et superbes configurations esthétiques claires/sombres.'}
                </p>
              </div>
            </div>
          </GlowCard>

          <GlowCard>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'start' }}>
              <span style={{ fontSize: '2rem' }}>🚀</span>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '6px', fontWeight: 700 }}>
                  {language === 'en' ? 'Clean Engineering' : language === 'es' ? 'Ingeniería Limpia' : 'Ingénierie Propre'}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {language === 'en' ? 'Zero-waste vanilla stylesheet scripting, rigorous SEO semantic schemas, and performant React structures.' : language === 'es' ? 'Estilos CSS eficientes, esquemas semánticos rigurosos de SEO y estructuras de React de alto rendimiento.' : 'Styles CSS efficaces, schémas sémantiques SEO rigoureux et structures React hautement performantes.'}
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}
