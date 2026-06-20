import { useState } from 'react';
import type { Language } from '../constants/translations';
import { translations } from '../constants/translations';
import { projectsData } from '../constants/projects';
import GlowCard from '../components/GlowCard';
import Simulator from '../components/Simulator';

interface ProjectsProps {
  language: Language;
}

export default function Projects({ language }: ProjectsProps) {
  const dict = translations[language];
  const [activeTab, setActiveTab] = useState<'all' | 'web-app' | 'rich-media'>('all');
  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  // Filter projects by tab category
  const filteredProjects = projectsData.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <section id="projects" className="section">
      <h2 className="section-title">{dict.projectsTitle}</h2>

      <p style={{ color: 'var(--text-muted)', marginBottom: '30px', maxWidth: '700px' }}>
        {dict.projectsSub}
      </p>

      {/* Simulator Overlay Anchor View */}
      {simulatingId ? (
        <Simulator 
          key={simulatingId}
          projectId={simulatingId} 
          language={language} 
          onClose={() => setSimulatingId(null)} 
        />
      ) : (
        <>
          {/* Categorization Tabs */}
          <div className="tabs-container">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            >
              {dict.projectsFilterAll}
            </button>
            <button
              onClick={() => setActiveTab('web-app')}
              className={`tab-btn ${activeTab === 'web-app' ? 'active' : ''}`}
            >
              {dict.projectsFilterWeb}
            </button>
            <button
              onClick={() => setActiveTab('rich-media')}
              className={`tab-btn ${activeTab === 'rich-media' ? 'active' : ''}`}
            >
              {dict.projectsFilterRich}
            </button>
          </div>

          {/* Projects Extensible Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}
            className="projects-grid"
          >
            {filteredProjects.map((project) => (
              <GlowCard key={project.id}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '16px' }}>

                  {/* Card Top */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="badge badge-emerald">
                        {project.subCategory || project.category}
                      </span>
                      <span style={{ fontSize: '1.2rem' }}>
                        {project.category === 'web-app' ? '💻' : '📢'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px' }}>
                      {project.title}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {project.description[language]}
                    </p>
                  </div>

                  {/* Features Bullet List */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {language === 'en' ? 'Core Functions' : language === 'es' ? 'Funciones Clave' : 'Fonctions Clés'}
                    </div>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {project.features[language].map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom CTA */}
                  <div>
                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {project.tags.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.7rem',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-color)',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            color: 'var(--text-muted)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Simulation Launch Triggers */}
                    {(project.demoType === 'sandbox' || project.demoType === 'iframe') && (
                      <button
                        onClick={() => setSimulatingId(project.id)}
                        className="btn-emerald"
                        style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
                      >
                        ⚡ {dict.projectsPlayText}
                      </button>
                    )}
                  </div>

                </div>
              </GlowCard>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
