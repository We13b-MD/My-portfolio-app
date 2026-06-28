import { useState, useEffect, useRef } from 'react';
import type { Language } from '../constants/translations';
import { projectsData } from '../constants/projects';

interface SimulatorProps {
  projectId: string;
  language: Language;
  onClose: () => void;
}

export default function Simulator({ projectId, language, onClose }: SimulatorProps) {
  const project = projectsData.find((p) => p.id === projectId);
  const demoUrl = project?.demoUrl;

  const [viewMode, setViewMode] = useState<'live' | 'guided'>(demoUrl ? 'live' : 'guided');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [isExpandedMode, setIsExpandedMode] = useState(false);



  return (
    <div
      className="simulator-overlay text-slide-up"
      style={{
        position: 'relative',
        background: 'var(--bg-surface)',
        border: '1px solid var(--accent)',
        borderRadius: 'var(--radius-lg)',
        padding: '30px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3), 0 0 30px hsla(var(--accent-hsl), 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflow: 'hidden'
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Simulator Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        <div>
          <span
            className="badge badge-emerald"
            style={{ marginBottom: '6px' }}
          >
            {projectId.startsWith('rich-media') ? 'Ad Campaign Unit' : 'Web Application App'}
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            {projectId === 'clock-in' && (language === 'en' ? 'Clock-In Console' : language === 'es' ? 'Consola de Marcaje' : 'Console de Pointage')}
            {projectId === 'bank-alert' && (language === 'en' ? 'Phishing Alert Analyzer' : language === 'es' ? 'Analizador de Alertas de Fraude' : 'Analyseur d\'Alertes de Fraude')}
            {projectId === 'rich-media-nike-slider' && (language === 'en' ? 'Nike Boot Swipe Campaign' : language === 'es' ? 'Campaña Deslizante de Botas Nike' : 'Campagne Glissière Nike')}
            {projectId === 'rich-media-dco' && (language === 'en' ? 'DCO Real-Time Simulator' : language === 'es' ? 'Simulador DCO en Tiempo Real' : 'Simulateur DCO en Temps Réel')}
            {projectId === 'rich-media-game' && (language === 'en' ? 'Monster Drag to Catch Game' : language === 'es' ? 'Juego Monster Drag to Catch' : 'Jeu Monster Drag to Catch')}
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emerald"
              style={{
                padding: '8px 16px',
                fontSize: '0.85rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>🌐</span> {language === 'en' ? 'Open Full Site ↗' : language === 'es' ? 'Ver Sitio Completo ↗' : 'Site Complet ↗'}
            </a>
          )}
          <button
            onClick={() => setIsExpandedMode(!isExpandedMode)}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <span>{isExpandedMode ? '📱' : '🖥️'}</span>
            {isExpandedMode
              ? (language === 'en' ? 'Split View' : language === 'es' ? 'Vista Dividida' : 'Vue Split')
              : (language === 'en' ? 'Full Width' : language === 'es' ? 'Ancho Completo' : 'Plein Écran')}
          </button>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            {language === 'en' ? '← Back' : language === 'es' ? '← Volver' : '← Retour'}
          </button>
        </div>
      </div>

      {/* Simulator Device Render */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isExpandedMode ? '1fr' : '1fr minmax(280px, 340px)',
          gap: '30px',
          alignItems: 'start'
        }}
        className="simulator-layout-grid"
      >
        {/* Left Side: Toggle & Device Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>

          {/* Glassmorphic View Mode Tabs */}
          {demoUrl && (
            <div
              style={{
                display: 'flex',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '4px',
                gap: '4px',
                alignSelf: 'flex-start',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <button
                onClick={() => setViewMode('live')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: viewMode === 'live' ? 'var(--accent)' : 'transparent',
                  color: viewMode === 'live' ? '#ffffff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🌐</span>
                {language === 'en' ? 'Live Deployed App' : language === 'es' ? 'Aplicación en Vivo' : 'Application en Direct'}
              </button>
              <button
                onClick={() => setViewMode('guided')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: viewMode === 'guided' ? 'var(--accent)' : 'transparent',
                  color: viewMode === 'guided' ? '#ffffff' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>💡</span>
                {language === 'en' ? 'Guided Sandbox' : language === 'es' ? 'Simulador Guiado' : 'Simulateur Guidé'}
              </button>
            </div>
          )}

          {/* Device Wrapper */}
          <div
            style={{
              background: '#0a0a0a',
              borderRadius: '24px',
              border: '8px solid #262626',
              aspectRatio: projectId.startsWith('rich-media') ? 'auto' : '16/10',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              position: 'relative',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
              overflow: 'hidden'
            }}
          >
            {/* Mini Device Camera Notch */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '12px',
                background: '#262626',
                borderRadius: '6px',
                zIndex: 5
              }}
            ></div>

            {/* Device Screen */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: '#121212',
                borderRadius: '12px',
                overflow: viewMode === 'live' ? 'hidden' : 'auto',
                color: '#ffffff',
                padding: viewMode === 'live' ? '0' : '16px',
                fontSize: '0.9rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {viewMode === 'live' && demoUrl ? (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#1c1c1e' }}>
                  {/* Browser Address Bar / Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#2c2c2e',
                      borderBottom: '1px solid #3a3a3c',
                      padding: '8px 12px',
                      gap: '12px',
                      fontSize: '0.8rem',
                      color: '#aeaeb2',
                      userSelect: 'none'
                    }}
                  >
                    {/* macOS Window Controls */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
                    </div>

                    {/* Browser Address input */}
                    <div
                      style={{
                        flex: 1,
                        background: '#1c1c1e',
                        borderRadius: '6px',
                        padding: '4px 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        border: '1px solid #3a3a3c'
                      }}
                    >
                      <span style={{ fontSize: '0.75rem', filter: 'brightness(0.7)' }}>🔒</span>
                      <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#e5e5ea', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {demoUrl}
                      </span>
                    </div>

                    {/* Action controls */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <button
                        onClick={() => {
                          setIframeLoading(true);
                          const iframe = document.getElementById('project-demo-iframe') as HTMLIFrameElement;
                          if (iframe) iframe.src = demoUrl;
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#aeaeb2',
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Reload Page"
                      >
                        🔄
                      </button>
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#aeaeb2',
                          textDecoration: 'none',
                          fontSize: '0.8rem',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Open in New Tab"
                      >
                        ↗
                      </a>
                    </div>
                  </div>

                  {/* Iframe View */}
                  <div style={{ flex: 1, position: 'relative', background: '#ffffff', height: 'calc(100% - 38px)' }}>
                    {iframeLoading && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: '#121212',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '12px',
                          zIndex: 2
                        }}
                      >
                        <div
                          className="spinner"
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: '2px solid rgba(16, 185, 129, 0.1)',
                            borderTopColor: '#10b981',
                            animation: 'spin 0.8s linear infinite'
                          }}
                        ></div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {language === 'en' ? 'Loading live deployment...' : language === 'es' ? 'Cargando aplicación en vivo...' : 'Chargement de l\'application...'}
                        </span>
                      </div>
                    )}
                    <iframe
                      id="project-demo-iframe"
                      src={demoUrl}
                      title={project?.title}
                      onLoad={() => setIframeLoading(false)}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#ffffff'
                      }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  {projectId === 'clock-in' && <ClockInSandbox language={language} />}
                  {projectId === 'bank-alert' && <BankAlertSandbox />}
                  {projectId === 'rich-media-dco' && <DcoSandbox />}
                  {projectId === 'rich-media-game' && <GamifiedSandbox />}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Instructions panel */}
        {!isExpandedMode && (
          <div
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent)', fontWeight: 700 }}>
              {language === 'en' ? 'Interactive Guide' : language === 'es' ? 'Guía Interactiva' : 'Guide Interactif'}
            </h4>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projectId === 'clock-in' && (
                <>
                  <p><strong>Attendance SaaS Simulation:</strong></p>
                  <p>1. Click <strong>"Clock In"</strong> to launch your virtual shift.</p>
                  <p>2. Toggle <strong>"Take Break"</strong> to pause tracking and log break intervals.</p>
                  <p>3. Click <strong>"Clock Out"</strong> to log the shift to your local table records.</p>
                </>
              )}
              {projectId === 'bank-alert' && (
                <>
                  <p><strong>Phishing Scanner Simulation:</strong></p>
                  <p>1. Select a mock message template on the right panel.</p>
                  <p>2. Click <strong>"Scan Notification"</strong> to run a heuristics check.</p>
                  <p>3. Review the green/red fraud indicator and warning tags.</p>
                </>
              )}
              {projectId === 'rich-media-dco' && (
                <>
                  <p><strong>DCO Campaign Showcase:</strong></p>
                  <p>1. Change parameters on the right (City, Weather, Time).</p>
                  <p>2. Observe how the banner's background, headline, copy, and product match the conditions immediately.</p>
                  <p>3. That is Dynamic Creative Optimization!</p>
                </>
              )}
              {projectId === 'rich-media-game' && (
                <>
                  <p><strong>Monster Drag to Catch:</strong></p>
                  <p>1. Switch to <strong>"Live Deployed App"</strong> to simulate the production build live via iframe.</p>
                  <p>2. Drag the basket at the bottom left and right using mouse or touch drag.</p>
                  <p>3. Catch the falling Monster energy bottles within the 15-second limit.</p>
                </>
              )}
              {projectId === 'rich-media-nike-slider' && (
                <>
                  <p><strong>Interactive Slider Campaign:</strong></p>
                  <p>1. Interact with the slide bar inside the banner to swipe between the **classic** and **futuristic** Nike boots.</p>
                  <p>2. Watch the background campaign transition into a dynamic athletic sports field environment with a Nike campaign GIF.</p>
                  <p>3. Experience how interactive micro-interactions increase brand recall and engagement over static ads!</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   1. CLOCK-IN SYSTEM SANDBOX
   ========================================================================= */
function ClockInSandbox({ language }: { language: Language }) {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [shifts, setShifts] = useState<{ id: number; date: string; duration: string; breakDur: string }[]>([]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;
    if (isClockedIn && !isOnBreak) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    } else if (isClockedIn && isOnBreak) {
      interval = setInterval(() => {
        setBreakTime((b) => b + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, isOnBreak]);

  const formatSec = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClockIn = () => {
    setIsClockedIn(true);
    setIsOnBreak(false);
  };

  const handleBreak = () => {
    setIsOnBreak(!isOnBreak);
  };

  const handleClockOut = () => {
    if (time > 0) {
      const newShift = {
        id: Date.now(),
        date: new Date().toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'fr-FR'),
        duration: formatSec(time),
        breakDur: formatSec(breakTime)
      };
      setShifts([newShift, ...shifts]);
    }
    setIsClockedIn(false);
    setIsOnBreak(false);
    setTime(0);
    setBreakTime(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Dashboard Top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '12px', borderRadius: '8px' }}>
        <span style={{ fontWeight: 600, color: '#10b981' }}>⏱️ HR Portal</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isClockedIn ? '#10b981' : '#ef4444' }}></span>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>
            {isClockedIn ? (isOnBreak ? 'On Break' : 'Active Shift') : 'Clocked Out'}
          </span>
        </div>
      </div>

      {/* Main Clock Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Time Counter */}
        <div style={{ background: '#1a1a1a', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>Shift Time</div>
          <div style={{ fontSize: '1.6rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#10b981' }}>{formatSec(time)}</div>
        </div>

        {/* Break Counter */}
        <div style={{ background: '#1a1a1a', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', marginBottom: '4px' }}>Break Time</div>
          <div style={{ fontSize: '1.6rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#f59e0b' }}>{formatSec(breakTime)}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {!isClockedIn ? (
          <button
            onClick={handleClockIn}
            style={{ flex: 1, padding: '12px', background: '#10b981', color: 'white', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}
          >
            Clock In
          </button>
        ) : (
          <>
            <button
              onClick={handleBreak}
              style={{ flex: 1, padding: '12px', background: isOnBreak ? '#10b981' : '#f59e0b', color: 'white', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}
            >
              {isOnBreak ? 'Resume Work' : 'Take Break'}
            </button>
            <button
              onClick={handleClockOut}
              style={{ flex: 1, padding: '12px', background: '#ef4444', color: 'white', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}
            >
              Clock Out
            </button>
          </>
        )}
      </div>

      {/* Log list */}
      <div style={{ flex: 1, minHeight: '100px', overflowY: 'auto' }}>
        <div style={{ fontSize: '0.8rem', color: '#888', marginBottom: '8px', fontWeight: 600 }}>Shift History</div>
        {shifts.length === 0 ? (
          <div style={{ fontSize: '0.75rem', color: '#555', textAlign: 'center', padding: '10px' }}>No shifts logged yet. Clock out to save records.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {shifts.map((shift) => (
              <div key={shift.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#1a1a1a', padding: '8px 12px', borderRadius: '4px', fontSize: '0.75rem' }}>
                <span>📅 {shift.date}</span>
                <span style={{ color: '#10b981' }}>⏱️ {shift.duration}</span>
                <span style={{ color: '#f59e0b' }}>☕ {shift.breakDur}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   2. FAKE BANK ALERT DETECTOR SANDBOX
   ========================================================================= */
interface ScamCheck {
  title: string;
  isTriggered: boolean;
  scoreWeight: number;
  reason: string;
}

function BankAlertSandbox() {
  const [inputText, setInputText] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [checks, setChecks] = useState<ScamCheck[]>([]);

  const templates = [
    {
      title: "🚨 Urgency Scam Link",
      text: "ACCESS BANK ALERT: We detected unauthorized login attempts from Beijing. Your account is SUSPENDED. Click immediately to reactivate and verify identity: http://access-banking-verify-secure.net/login.php"
    },
    {
      title: "💰 Fake Credit Alert",
      text: "TRANSACTION CREDIT: Acct *3492 has been credited with NGN 150,000.00 by Central Alert Dept. Click http://bank-central-bonus.com to claim tax refund now."
    },
    {
      title: "✅ Legit Bank Notification",
      text: "GTBank Transaction Alert: Your account *1234 has been debited NGN 5,000.00 at POS terminal MERCHANT_ABC on 2026-05-27. If you did not perform this, contact customer care."
    }
  ];

  const handleScan = () => {
    if (!inputText.trim()) return;

    const rawLower = inputText.toLowerCase();

    // Heuristics checks rules
    const testRules: ScamCheck[] = [
      {
        title: "Urgent Deadline / Phishing Language",
        isTriggered: /suspended|immediate|urgent|reactivate|verify|unauthorized|blocked|claim|bonus/gi.test(rawLower),
        scoreWeight: 35,
        reason: "Contains threatening or urgency-inducing vocabulary designed to force rash actions."
      },
      {
        title: "Insecure Link (HTTP instead of HTTPS)",
        isTriggered: /http:\/\//gi.test(rawLower),
        scoreWeight: 25,
        reason: "Legitimate bank sites will NEVER request credentials or links on insecure http protocol."
      },
      {
        title: "Suspicious/Fake Domain Suffixes",
        isTriggered: /\.(net|org|xyz|info|tk|cf|ga|click|php|web\.app)/gi.test(rawLower) && rawLower.includes('http'),
        scoreWeight: 20,
        reason: "Domain host does not match authentic banking server standards."
      },
      {
        title: "No Account Safeguards",
        isTriggered: !/acct \*\d+|account \*\d+/gi.test(rawLower),
        scoreWeight: 20,
        reason: "Does not contain standard redacted banking account card numbers (e.g. Account ending in *4321)."
      }
    ];

    let finalScore = 0;
    testRules.forEach((rule) => {
      if (rule.isTriggered) {
        finalScore += rule.scoreWeight;
      }
    });

    setChecks(testRules);
    setScore(finalScore);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '6px' }}>
        🛡️ Phishing Scam Scanner Console
      </div>

      {/* Input Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste transaction alert sms or bank email details here..."
          style={{
            width: '100%',
            height: '80px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: 'white',
            padding: '10px',
            fontSize: '0.8rem',
            resize: 'none'
          }}
        />

        {/* Templates triggers */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {templates.map((tpl, i) => (
            <button
              key={i}
              onClick={() => setInputText(tpl.text)}
              style={{
                fontSize: '0.7rem',
                background: '#222',
                border: '1px solid #333',
                borderRadius: '4px',
                padding: '4px 8px',
                cursor: 'pointer',
                color: '#aaa'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#10b981'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333'}
            >
              {tpl.title}
            </button>
          ))}
        </div>

        <button
          onClick={handleScan}
          disabled={!inputText.trim()}
          style={{
            width: '100%',
            padding: '10px',
            background: '#10b981',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '6px',
            cursor: 'pointer',
            opacity: inputText.trim() ? 1 : 0.5
          }}
        >
          Scan Notification
        </button>
      </div>

      {/* Results View */}
      {score !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#1a1a1a', padding: '12px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Risk Evaluation:</span>
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: score > 50 ? '#ef4444' : score > 20 ? '#f59e0b' : '#10b981'
              }}
            >
              {score}% SCAM RISK ({score > 50 ? 'DANGEROUS' : score > 20 ? 'SUSPICIOUS' : 'SECURE'})
            </span>
          </div>

          {/* Bar gauge */}
          <div style={{ width: '100%', height: '8px', background: '#333', borderRadius: '4px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${score}%`,
                height: '100%',
                background: score > 50 ? '#ef4444' : score > 20 ? '#f59e0b' : '#10b981',
                transition: 'width 0.5s ease'
              }}
            ></div>
          </div>

          {/* Warning items list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '100px', overflowY: 'auto' }}>
            {checks.filter(c => c.isTriggered).map((rule, idx) => (
              <div key={idx} style={{ fontSize: '0.7rem', color: '#fca5a5', display: 'flex', gap: '4px' }}>
                <span>⚠️</span>
                <span><strong>{rule.title}:</strong> {rule.reason}</span>
              </div>
            ))}
            {checks.filter(c => c.isTriggered).length === 0 && (
              <div style={{ fontSize: '0.7rem', color: '#a7f3d0' }}>
                🟢 No signature phishing markers detected. Safe notification structure.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   3. RICH MEDIA AD (DCO) SIMULATOR
   ========================================================================= */
function DcoSandbox() {
  const [city, setCity] = useState("Lagos");
  const [weather, setWeather] = useState("Sunny");
  const [timeOfDay, setTimeOfDay] = useState("Day");

  // Dynamic DCO content map
  const getDcoBanner = () => {
    if (city === "Lagos") {
      if (weather === "Rainy" || weather === "Snowy" || timeOfDay === "Night") {
        return {
          title: "Mirinda Pineapple Nights 🍍",
          desc: "Mainland traffic under the rain? Brighten your trip with a sweet Mirinda Pineapple from your local Spar.",
          img: "🍍",
          bg: "linear-gradient(135deg, #15803d, #166534)",
          cta: "Find Stores"
        };
      } else {
        // Sunny + Day
        return {
          title: "Enjoy Mirinda Orange in Lagos! 🍊",
          desc: "Beat the Lagos sunshine! Find the closest kiosk or grocery store stocking ice-cold Mirinda Orange.",
          img: "🥤",
          bg: "linear-gradient(135deg, #f97316, #ea580c)",
          cta: "Find Stores"
        };
      }
    } else if (city === "London") {
      if (weather === "Sunny" && timeOfDay === "Day") {
        return {
          title: "Enjoy Mirinda Strawberry! 🍓",
          desc: "Sunny day at Hyde Park? Grab a refreshing, sweet Mirinda Strawberry at Tesco Express in Soho.",
          img: "🍓",
          bg: "linear-gradient(135deg, #e11d48, #be123c)",
          cta: "Find Stores"
        };
      } else {
        // Rainy / Snowy / Night
        return {
          title: "Typical London Drizzle? 🌧️",
          desc: "Grey skies over London Bridge? Light up your evening with a sweet Mirinda Orange from Sainsbury's Local.",
          img: "🍊",
          bg: "linear-gradient(135deg, #ea580c, #27272a)",
          cta: "Find Stores"
        };
      }
    } else {
      // Tokyo
      if (weather === "Sunny" && timeOfDay === "Day") {
        return {
          title: "Mirinda Green Apple in Tokyo! 🍏",
          desc: "Hanami cherry blossom walk in Shibuya? Pick up a chilled Mirinda Green Apple from FamilyMart.",
          img: "🍏",
          bg: "linear-gradient(135deg, #22c55e, #15803d)",
          cta: "Find Vending"
        };
      } else {
        // Rainy / Snowy / Night
        return {
          title: "Neon Tokyo Rains 🌧️",
          desc: "Shibuya crossing reflections under the rain. Grab a sweet Mirinda Grape from a nearby vending machine.",
          img: "🍇",
          bg: "linear-gradient(135deg, #7c3aed, #5b21b6)",
          cta: "Find Vending"
        };
      }
    }
  };

  const ad = getDcoBanner();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '6px' }}>
        📢 Dynamic Creative Optimization (DCO) Banner
      </div>

      {/* Selector Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: '#18181b', padding: '10px', borderRadius: '6px' }}>
        <div>
          <label style={{ fontSize: '0.65rem', color: '#888', display: 'block', marginBottom: '2px' }}>City Location</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} style={{ width: '100%', fontSize: '0.75rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '2px' }}>
            <option value="Lagos">Lagos 🇳🇬</option>
            <option value="London">London 🇬🇧</option>
            <option value="Tokyo">Tokyo 🇯🇵</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.65rem', color: '#888', display: 'block', marginBottom: '2px' }}>Weather Conditions</label>
          <select value={weather} onChange={(e) => setWeather(e.target.value)} style={{ width: '100%', fontSize: '0.75rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '2px' }}>
            <option value="Sunny">Sunny ☀️</option>
            <option value="Rainy">Rainy 🌧️</option>
            <option value="Snowy">Snowy ❄️</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.65rem', color: '#888', display: 'block', marginBottom: '2px' }}>Time Context</label>
          <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} style={{ width: '100%', fontSize: '0.75rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '2px' }}>
            <option value="Day">Daytime ☀️</option>
            <option value="Night">Nighttime 🌙</option>
          </select>
        </div>
      </div>

      {/* The Ad Rendering Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          background: timeOfDay === 'Night' ? '#09090b' : '#3f3f46',
          borderRadius: '8px',
          padding: '10px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
        }}
      >
        {/* Ad Banner Card */}
        <div
          style={{
            width: '300px',
            height: '250px',
            borderRadius: '6px',
            background: ad.bg,
            color: 'white',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            transition: 'background 0.5s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Neon overlay */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(255,255,255,0.05), transparent)', pointerEvents: 'none' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <span style={{ fontSize: '0.6rem', background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '10px', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>Sponsored</span>
            <span style={{ fontSize: '1.2rem' }}>{ad.img}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 1 }}>
            <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', lineHeight: 1.2 }}>{ad.title}</h5>
            <p style={{ fontSize: '0.75rem', opacity: 0.9, lineHeight: 1.3 }}>{ad.desc}</p>
          </div>

          <button
            onClick={() => alert(`Redirecting to Mirinda Store Locator with conversion tracker triggered under: Location=${city}, Weather=${weather}, Time=${timeOfDay}!`)}
            style={{
              width: '100%',
              padding: '8px',
              background: '#ffffff',
              color: '#111',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              zIndex: 1
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {ad.cta} &nbsp; →
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   4. GAMIFIED PLAYABLE BANNER SIMULATOR
   ========================================================================= */
function GamifiedSandbox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [basketX, setBasketX] = useState(120); // 0 to 240
  const [items, setItems] = useState<{ id: number; x: number; y: number; isGood: boolean }[]>([]);
  const [gameResult, setGameResult] = useState<'idle' | 'win' | 'lose'>('idle');

  const gameWidth = 300;
  const gameHeight = 250;

  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Move basket
  const moveLeft = () => setBasketX((x) => Math.max(0, x - 30));
  const moveRight = () => setBasketX((x) => Math.min(240, x + 30));

  // Spawn items
  useEffect(() => {
    if (!isPlaying) return;

    const spawnTimer = setInterval(() => {
      const newItem = {
        id: Date.now() + Math.random(),
        x: Math.random() * 260 + 10,
        y: 0,
        isGood: Math.random() > 0.3 // 70% Monster bottles, 30% obstacles
      };
      setItems((prev) => [...prev, newItem]);
    }, 800);

    return () => clearInterval(spawnTimer);
  }, [isPlaying]);

  // Game timer countdown
  useEffect(() => {
    if (!isPlaying) return;
    setTimeLeft(15);
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsPlaying(false);
          setGameResult(scoreRef.current >= 5 ? 'win' : 'lose');
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Physics loop
  useEffect(() => {
    if (!isPlaying) return;

    const gameLoop = setInterval(() => {
      setItems((prevItems) => {
        const nextItems = prevItems.map((item) => ({ ...item, y: item.y + 5 }));

        // Check collisions with basket (basket is at y = 200, width = 60, height = 20)
        const activeItems: typeof items = [];
        nextItems.forEach((item) => {
          if (item.y >= 195 && item.y <= 215) {
            // Collision check
            if (item.x >= basketX - 10 && item.x <= basketX + 55) {
              if (item.isGood) {
                setScore((s) => s + 1);
              } else {
                setScore((s) => Math.max(0, s - 1));
              }
              return; // remove item
            }
          }

          if (item.y < gameHeight) {
            activeItems.push(item);
          }
        });

        return activeItems;
      });
    }, 50);

    return () => clearInterval(gameLoop);
  }, [isPlaying, basketX]);

  const startGame = () => {
    setScore(0);
    setItems([]);
    setGameResult('idle');
    setIsPlaying(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', alignItems: 'center' }}>
      <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '6px', width: '100%' }}>
        🎮 Playable gamified ad unit (Monster Catch Simulator)
      </div>

      <div
        style={{
          width: `${gameWidth}px`,
          height: `${gameHeight}px`,
          background: '#09090b',
          border: '1px solid #222',
          borderRadius: '8px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!isPlaying && gameResult === 'idle' ? (
          /* Start Screen */
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h5 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#10b981', marginBottom: '8px' }}>Monster Catch Challenge! 🧺</h5>
            <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '14px' }}>Catch falling Monster energy cans 🥤! Avoid obstacles ❌. Get 5 points within 15 seconds to win!</p>
            <button
              onClick={startGame}
              style={{ padding: '8px 16px', background: '#10b981', color: 'white', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', border: 'none' }}
            >
              Start Challenge
            </button>
          </div>
        ) : !isPlaying && gameResult === 'win' ? (
          /* Win screen */
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>⚡ CHALLENGE COMPLETE!</h5>
            <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '8px' }}>Showcasing high engagement playable ad unit success!</p>

            <div style={{ background: '#1a1a1a', border: '1px dashed #10b981', padding: '10px', borderRadius: '4px', margin: '10px 0' }}>
              <div style={{ fontSize: '0.65rem', color: '#666', textTransform: 'uppercase' }}>Promo Unlock Code</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#10b981', fontFamily: 'monospace' }}>MONSTER_POWER_UP</div>
            </div>

            <button
              onClick={startGame}
              style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #10b981', color: '#10b981', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', marginRight: '8px', fontSize: '0.75rem' }}
            >
              Play Again
            </button>
            <button
              onClick={() => alert("Simulating a click-through conversion to the brand landing page!")}
              style={{ padding: '6px 12px', background: '#10b981', color: 'white', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', border: 'none', fontSize: '0.75rem' }}
            >
              Claim Reward
            </button>
          </div>
        ) : !isPlaying && gameResult === 'lose' ? (
          /* Lose Screen */
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <h5 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '4px' }}>❌ TIME'S UP!</h5>
            <p style={{ fontSize: '0.7rem', color: '#888', marginBottom: '8px' }}>You only caught {score} Monster energy drinks. You need at least 5 to win.</p>
            <button
              onClick={startGame}
              style={{ padding: '8px 16px', background: '#ef4444', color: 'white', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer', border: 'none', marginTop: '8px' }}
            >
              Try Again
            </button>
          </div>
        ) : (
          /* Game Sandbox Playing */
          <>
            {/* Score & Time header */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 2 }}>
              <span style={{ color: '#10b981' }}>Score: {score} / 5</span>
              <span style={{ color: '#f59e0b' }}>Time: {timeLeft}s</span>
            </div>

            {/* Falling Items */}
            {items.map((item) => (
              <span
                key={item.id}
                style={{
                  position: 'absolute',
                  left: `${item.x}px`,
                  top: `${item.y}px`,
                  fontSize: '1.2rem',
                  pointerEvents: 'none',
                  transition: 'top 0.05s linear'
                }}
              >
                {item.isGood ? '🥤' : '❌'}
              </span>
            ))}

            {/* Cart basket */}
            <div
              style={{
                position: 'absolute',
                left: `${basketX}px`,
                bottom: '30px',
                width: '60px',
                height: '18px',
                background: '#10b981',
                border: '2px solid #34d399',
                borderRadius: '0 0 10px 10px',
                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.4)',
                textAlign: 'center',
                fontSize: '0.65rem',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              🧺 Basket
            </div>

            {/* Controls panel inside banner */}
            <div style={{ position: 'absolute', bottom: '2px', left: 0, right: 0, display: 'flex', gap: '2px' }}>
              <button
                onClick={moveLeft}
                style={{ flex: 1, padding: '4px', background: '#27272a', border: '1px solid #3f3f46', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ◀ Left
              </button>
              <button
                onClick={moveRight}
                style={{ flex: 1, padding: '4px', background: '#27272a', border: '1px solid #3f3f46', color: 'white', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Right ▶
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

