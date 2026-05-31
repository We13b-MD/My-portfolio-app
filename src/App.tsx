import { useState, useEffect } from 'react';
import type { Language } from './constants/translations';
import { translations } from './constants/translations';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelect from './components/LanguageSelect';
import WhatsAppButton from './components/WhatsAppButton';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Contact from './sections/Contact';

export default function App() {
  // Theme and language standard hooks
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to dark high-contrast mode for wow aesthetic
    return 'dark';
  });
  
  const [language, setLanguage] = useState<Language>('en');
  const [activeSection, setActiveSection] = useState('hero');

  // Sync theme to root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll spy to highlight active menu link
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const dict = translations[language];

  const menuItems = [
    { id: 'about', label: dict.navAbout },
    { id: 'projects', label: dict.navProjects },
    { id: 'skills', label: dict.navSkills },
    { id: 'contact', label: dict.navContact }
  ];

  return (
    <div className="app-container">
      {/* 1. Dynamic Glowing Grid Background */}
      <div className="grid-bg-container">
        <div className="grid-bg-lines"></div>
        <div className="grid-bg-glow"></div>
        <div className="grid-bg-glow-2"></div>
      </div>

      {/* 2. Main Layout Split Grid */}
      <main className="layout-grid">
        
        {/* Left Sticky Profile Sidebar */}
        <aside className="sidebar-pane">
          
          {/* Header Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="text-slide-up">
            <a 
              href="#hero" 
              style={{ 
                fontSize: '1.8rem', 
                fontWeight: 800, 
                fontFamily: 'var(--font-heading)',
                color: 'var(--accent)',
                textShadow: '0 0 15px hsla(var(--accent-hsl), 0.25)',
                letterSpacing: '-0.02em'
              }}
            >
              Michael.dev
            </a>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              {dict.heroSub}
            </p>
          </div>

          {/* Core Vertical Navigation Menu */}
          <nav 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '16px', 
              margin: '40px 0' 
            }}
            className="sidebar-nav text-slide-up delay-100"
          >
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                    transition: 'all 0.25s ease',
                    transform: isActive ? 'translateX(8px)' : 'translateX(0)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-color)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-muted)';
                  }}
                >
                  {/* Neon Dot indicator */}
                  <span
                    style={{
                      width: isActive ? '20px' : '0px',
                      height: '2px',
                      background: 'var(--accent)',
                      transition: 'all 0.25s ease',
                      borderRadius: '1px'
                    }}
                  ></span>
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Theme & Language Controls Panel */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '24px'
            }}
            className="sidebar-footer text-slide-up delay-200"
          >
            <LanguageSelect language={language} setLanguage={setLanguage} />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </div>

        </aside>

        {/* Right Scrollable Content Pane */}
        <div className="content-pane">
          <Hero language={language} />
          <About language={language} />
          <Projects language={language} />
          <Skills language={language} />
          <Contact language={language} />
        </div>

      </main>

      {/* 3. Floating WhatsApp Reach Button */}
      <WhatsAppButton language={language} />
    </div>
  );
}
