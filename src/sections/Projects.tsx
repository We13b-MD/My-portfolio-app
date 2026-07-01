import { useState } from 'react';
import type { Language } from '../constants/translations';
import { translations } from '../constants/translations';
import { projectsData } from '../constants/projects';
import GlowCard from '../components/GlowCard';
import Simulator from '../components/Simulator';
import ScrollReveal from '../components/ScrollReveal';

interface ProjectsProps {
  language: Language;
}

export default function Projects({ language }: ProjectsProps) {
  const dict = translations[language];
  const [activeTab, setActiveTab] = useState<'all' | 'web-app' | 'rich-media'>('all');

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

      {/* Categorization Tabs */}
      <div className="tabs-container" style={{ marginBottom: '30px' }}>
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

      {/* Projects Extensible Column Stack */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          width: '100%'
        }}
        className="projects-grid"
      >
        {filteredProjects.map((project, idx) => (
          <ScrollReveal key={project.id} delay={idx * 150}>
            <GlowCard style={{ height: 'auto' }}>
              <div
                className="project-large-card"
                style={{
                  padding: 0,
                  border: 'none',
                  background: 'transparent',
                  backdropFilter: 'none',
                  boxShadow: 'none'
                }}
              >
                {/* Left Pane: Simulated Sandbox Device */}
                <div className="project-card-left" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <Simulator projectId={project.id} language={language} />
                </div>

                {/* Right Pane: Content Info */}
                <div className="project-card-right" style={{ padding: '10px 0' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge badge-emerald">
                        {project.subCategory || project.category}
                      </span>
                      <span style={{ fontSize: '1.2rem' }}>
                        {project.category === 'web-app' ? '💻' : '📢'}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-h)', marginBottom: '8px' }}>
                      {project.title}
                    </h3>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                      {project.description[language]}
                    </p>

                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {language === 'en' ? 'Core Features' : language === 'es' ? 'Funciones Clave' : 'Fonctions Clés'}
                    </div>
                    <ul style={{ paddingLeft: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
                      {project.features[language].map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    {/* Tags */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {project.tags.map((t, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '0.75rem',
                            background: 'rgba(255,255,255,0.04)',
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
                  </div>
                </div>

              </div>
            </GlowCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
