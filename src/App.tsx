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
import myPic from './assets/myPic.jpeg';

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
  const [isCertDropdownOpen, setIsCertDropdownOpen] = useState(false);

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="text-slide-up">
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <img 
                src={myPic} 
                alt="Idundun Michael" 
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%', // circular shape
                  objectFit: 'cover',
                  border: '2px solid hsla(var(--accent-hsl), 0.3)',
                  boxShadow: 'var(--card-shadow)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.boxShadow = '0 12px 30px hsla(var(--accent-hsl), 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.borderColor = 'hsla(var(--accent-hsl), 0.3)';
                  e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
          </div>

          {/* CV & Certifications Actions */}
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '12px', 
              marginTop: '20px', 
              position: 'relative',
              zIndex: 30,
              width: '100%',
              alignItems: 'center'
            }} 
            className="text-slide-up delay-100 sidebar-actions"
          >
            {/* Download CV Button */}
            <a
              href="/Idundun_Michael_Resume.pdf"
              download="Idundun_Michael_Resume.pdf"
              className="btn-emerald sidebar-cv-btn"
              style={{
                padding: '10px 16px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px hsla(var(--accent-hsl), 0.15)',
                textDecoration: 'none'
              }}
            >
              <span>📥</span> {dict.heroResume}
            </a>

            {/* Certifications Collapsible Dropdown */}
            <div style={{ position: 'relative' }} className="sidebar-cert-wrapper">
              <button
                onClick={() => setIsCertDropdownOpen(!isCertDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-color)',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.background = 'hsla(var(--accent-hsl), 0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isCertDropdownOpen) {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.background = 'var(--glass-bg)';
                  }
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🎓</span> 
                  {language === 'en' ? 'Certifications' : language === 'es' ? 'Certificaciones' : 'Certifications'}
                </span>
                <span style={{ 
                  fontSize: '0.7rem', 
                  transition: 'transform 0.3s ease',
                  transform: isCertDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  display: 'inline-block'
                }}>
                  ▼
                </span>
              </button>

              {/* Dropdown Items List */}
              {isCertDropdownOpen && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    left: 0,
                    width: '100%',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '12px',
                    padding: '8px',
                    boxShadow: 'var(--card-shadow)',
                    zIndex: 40,
                  }}
                >
                  <a
                    href="https://drive.google.com/file/d/18dK2GZ95PsdpUX1uJ04EAl4gK4e-sypP/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '8px',
                      color: 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.background = 'hsla(var(--accent-hsl), 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span>📜</span> Full Stack Certificate ↗
                  </a>
                  <a
                    href="https://drive.google.com/file/d/1D5xVESZCx5MtIkqdwLJuyRimhe4aqsgK/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '8px',
                      color: 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.background = 'hsla(var(--accent-hsl), 0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span>📜</span> HTML & CSS Certificate ↗
                  </a>
                </div>
              )}
            </div>
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
