import type { Language } from '../constants/translations';
import { translations } from '../constants/translations';
import GlowCard from '../components/GlowCard';

interface SkillsProps {
  language: Language;
}

export default function Skills({ language }: SkillsProps) {
  const dict = translations[language];

  const skillGroups = [
    {
      title: dict.skillsWebDev,
      icon: "💻",
      skills: ["React", "TypeScript", "JavaScript (ES6+)", "Node.js", "Express", "Vite", "RESTful APIs", "HTML5 Semantics"]
    },
    {
      title: dict.skillsWebDesign,
      icon: "🎨",
      skills: ["Vanilla CSS3", "Responsive Layouts", "Google Fonts integrations", "Micro-interactions", "Framer Motion ideas"]
    },
    {
      title: dict.skillsRichMedia,
      icon: "📢",
      skills: ["Dynamic Creative (DCO)", "Gamified Ad Systems", "Expandable Ad Units", "DoubleClick Studio specs", "IAB Display Standards", "HTML5 Ad Builders", "Ad conversion telemetry"]
    }
  ];

  return (
    <section id="skills" className="section">
      <h2 className="section-title">{dict.skillsTitle}</h2>
      
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '700px' }}>
        {dict.skillsSub}
      </p>

      {/* Skills Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}
        className="skills-grid"
      >
        {skillGroups.map((group, idx) => (
          <GlowCard key={idx}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Header */}
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>{group.icon}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>{group.title}</h3>
              </div>

              {/* Chips grid */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {group.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-color)',
                      padding: '6px 12px',
                      borderRadius: '30px',
                      transition: 'all 0.2s ease',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-color)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}
