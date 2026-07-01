import { useState, useEffect, useRef } from 'react';
import type { Language } from '../constants/translations';
import { projectsData } from '../constants/projects';

interface SimulatorProps {
  projectId: string;
  language: Language;
}

export default function Simulator({ projectId, language }: SimulatorProps) {
  const project = projectsData.find((p) => p.id === projectId);
  const demoUrl = project?.demoUrl;

  const [customWidth, setCustomWidth] = useState<number>(800); // 320px to 800px resizable
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor visibility on screen to trigger autoplay only when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflow: 'hidden',
        width: '100%'
      }}
    >
      {/* Simulator Control Panel (Resizing & Autoplay & External Link) */}
      <div className="preview-controls-bar">
        {/* Resize Controls */}
        <div className="preview-resize-btns">
          <button
            onClick={() => setCustomWidth(360)}
            className={`preview-resize-btn ${customWidth === 360 ? 'active' : ''}`}
            title="Simulate Mobile Viewport"
          >
            📱 Mobile
          </button>
          <button
            onClick={() => setCustomWidth(600)}
            className={`preview-resize-btn ${customWidth === 600 ? 'active' : ''}`}
            title="Simulate Tablet Viewport"
          >
            📟 Tablet
          </button>
          <button
            onClick={() => setCustomWidth(800)}
            className={`preview-resize-btn ${customWidth === 800 ? 'active' : ''}`}
            title="Simulate Desktop Viewport"
          >
            🖥️ Desktop
          </button>
        </div>

        {/* Custom Width Slider */}
        <div className="preview-slider-container">
          <span>Width:</span>
          <input
            type="range"
            min="320"
            max="800"
            value={customWidth}
            onChange={(e) => setCustomWidth(Number(e.target.value))}
            className="preview-slider"
          />
          <span style={{ fontFamily: 'monospace', width: '40px', textAlign: 'right' }}>{customWidth}px</span>
        </div>

        {/* Live Web Link & Autoplay Badge */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#10b981',
                borderColor: 'hsla(142, 70%, 45%, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                e.currentTarget.style.color = '#10b981';
                e.currentTarget.style.borderColor = 'hsla(142, 70%, 45%, 0.3)';
              }}
            >
              <span>🌐</span> Live Web ↗
            </a>
          )}

          <div className="autoplay-badge" onClick={() => setIsAutoplay(!isAutoplay)} style={{ cursor: 'pointer' }}>
            <span className={isAutoplay ? 'autoplay-pulse' : ''} style={{ background: isAutoplay ? '#10b981' : '#888' }}></span>
            <span>{isAutoplay ? 'Autoplay' : 'Manual'}</span>
          </div>
        </div>
      </div>

      {/* Device Simulation View Frame */}
      <div
        style={{
          width: '100%',
          maxWidth: `${customWidth}px`,
          margin: '0 auto',
          background: '#0a0a0a',
          borderRadius: '16px',
          border: '6px solid #262626',
          aspectRatio: projectId.startsWith('rich-media') ? 'auto' : (customWidth <= 480 ? 'auto' : '16/10'),
          height: projectId.startsWith('rich-media') ? 'auto' : (customWidth <= 480 ? '320px' : 'auto'),
          minHeight: projectId.startsWith('rich-media') ? '240px' : '280px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)',
          overflow: 'hidden',
          transition: 'width 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Device screen area (Guided Sandbox renders here) */}
        <div
          style={{
            flex: 1,
            background: '#121212',
            color: '#ffffff',
            padding: '12px',
            fontSize: '0.85rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
            {projectId === 'clock-in' && <ClockInSandbox language={language} isAutoplay={isAutoplay && isVisible} />}
            {projectId === 'bank-alert' && <BankAlertSandbox isAutoplay={isAutoplay && isVisible} />}
            {projectId === 'conference-ticket-generator' && <TicketSandbox isAutoplay={isAutoplay && isVisible} />}
            {projectId === 'rich-media-nike-slider' && <NikeSliderSandbox isAutoplay={isAutoplay && isVisible} />}
            {projectId === 'rich-media-dco' && <DcoSandbox isAutoplay={isAutoplay && isVisible} />}
            {projectId === 'rich-media-game' && <GamifiedSandbox isAutoplay={isAutoplay && isVisible} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   1. SNEAKER VECTOR DETAIL COMPONENT
   ========================================================================= */
const SneakerSvg = ({ color, glow }: { color: string; glow?: boolean }) => (
  <svg
    viewBox="0 0 100 60"
    style={{
      width: '180px',
      maxWidth: '85%',
      height: 'auto',
      filter: glow ? 'drop-shadow(0 0 12px #10b981) drop-shadow(0 0 4px #10b981)' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))',
      transition: 'filter 0.3s ease'
    }}
  >
    {/* Clean vector sneaker silhouette */}
    <path
      d="M10,45 C20,45 25,43 30,35 C35,27 45,25 55,25 C65,25 75,15 85,25 C90,30 92,40 90,48 C85,50 60,50 45,50 C30,50 15,48 10,45 Z"
      fill={color}
      style={{ transition: 'fill 0.3s ease' }}
    />
    {/* Shoe details and lines */}
    <path d="M55,27 L58,32 M58,27 L61,32 M61,27 L64,32" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M70,25 C75,27 80,32 82,38" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none" />
    {/* Sole */}
    <path d="M11,46 C20,46 35,49 50,49 C65,49 80,49 89,47 C88,51 80,53 50,53 C20,53 12,50 11,46 Z" fill="#fff" opacity="0.9" />
  </svg>
);

/* =========================================================================
   2. CLOCK-IN SYSTEM SANDBOX
   ========================================================================= */
function ClockInSandbox({ language, isAutoplay }: { language: Language; isAutoplay: boolean }) {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [time, setTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const [shifts, setShifts] = useState<{ id: number; date: string; duration: string; breakDur: string }[]>([]);
  const [userInteracted, setUserInteracted] = useState(false);

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

  // Autoplay loop
  useEffect(() => {
    if (!isAutoplay || userInteracted) return;

    let step = 0;
    const interval = setInterval(() => {
      if (step === 0) {
        setIsClockedIn(true);
        setIsOnBreak(false);
      } else if (step === 1) {
        setIsOnBreak(true);
      } else if (step === 2) {
        setIsOnBreak(false);
      } else {
        const newShift = {
          id: Date.now(),
          date: new Date().toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : 'fr-FR'),
          duration: "08:12",
          breakDur: "01:00"
        };
        setShifts((s) => [newShift, ...s.slice(0, 1)]);
        setIsClockedIn(false);
        setIsOnBreak(false);
        setTime(0);
        setBreakTime(0);
      }
      step = (step + 1) % 4;
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoplay, userInteracted, language]);

  const formatSec = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAction = (type: 'clock-in' | 'break' | 'clock-out') => {
    setUserInteracted(true);
    if (type === 'clock-in') {
      setIsClockedIn(true);
      setIsOnBreak(false);
    } else if (type === 'break') {
      setIsOnBreak(!isOnBreak);
    } else if (type === 'clock-out') {
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
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a1a1a', padding: '8px 12px', borderRadius: '8px' }}>
        <span style={{ fontWeight: 600, color: '#10b981', fontSize: '0.75rem' }}>⏱️ HR Console</span>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isClockedIn ? '#10b981' : '#ef4444' }}></span>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 600 }}>
            {isClockedIn ? (isOnBreak ? 'On Break' : 'Active Shift') : 'Clocked Out'}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div style={{ background: '#1a1a1a', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase' }}>Shift Time</div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#10b981' }}>{formatSec(time)}</div>
        </div>
        <div style={{ background: '#1a1a1a', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#888', textTransform: 'uppercase' }}>Break Time</div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 'bold', color: '#f59e0b' }}>{formatSec(breakTime)}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {!isClockedIn ? (
          <button
            onClick={() => handleAction('clock-in')}
            style={{ flex: 1, padding: '8px', background: '#10b981', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Clock In
          </button>
        ) : (
          <>
            <button
              onClick={() => handleAction('break')}
              style={{ flex: 1, padding: '8px', background: isOnBreak ? '#10b981' : '#f59e0b', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              {isOnBreak ? 'Resume Work' : 'Take Break'}
            </button>
            <button
              onClick={() => handleAction('clock-out')}
              style={{ flex: 1, padding: '8px', background: '#ef4444', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
            >
              Clock Out
            </button>
          </>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', minHeight: '60px' }}>
        <div style={{ fontSize: '0.7rem', color: '#888', marginBottom: '4px', fontWeight: 600 }}>Shift History Log</div>
        {shifts.length === 0 ? (
          <div style={{ fontSize: '0.7rem', color: '#555', textAlign: 'center', padding: '6px' }}>No logs yet. Shift records will populate here.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {shifts.map((shift) => (
              <div key={shift.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#1a1a1a', padding: '6px 10px', borderRadius: '4px', fontSize: '0.7rem' }}>
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
   3. FAKE BANK ALERT DETECTOR SANDBOX
   ========================================================================= */
interface ScamCheck {
  title: string;
  isTriggered: boolean;
  scoreWeight: number;
  reason: string;
}

function BankAlertSandbox({ isAutoplay }: { isAutoplay: boolean }) {
  const [inputText, setInputText] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [checks, setChecks] = useState<ScamCheck[]>([]);
  const [userInteracted, setUserInteracted] = useState(false);

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

  // Autoplay simulation
  useEffect(() => {
    if (!isAutoplay || userInteracted) return;

    let idx = 0;
    const interval = setInterval(() => {
      const tpl = templates[idx];
      setInputText(tpl.text);

      setTimeout(() => {
        const rawLower = tpl.text.toLowerCase();
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
      }, 600);

      idx = (idx + 1) % templates.length;
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoplay, userInteracted]);

  const handleScan = () => {
    setUserInteracted(true);
    if (!inputText.trim()) return;

    const rawLower = inputText.toLowerCase();
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '4px' }}>
        🛡️ Phishing Scam Scanner Console
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <textarea
          value={inputText}
          onChange={(e) => { setInputText(e.target.value); setUserInteracted(true); }}
          placeholder="Paste SMS notification text or bank email contents here to audit..."
          style={{
            width: '100%',
            height: '60px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '6px',
            color: 'white',
            padding: '8px',
            fontSize: '0.75rem',
            resize: 'none',
            outline: 'none'
          }}
        />

        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
          {templates.map((tpl, i) => (
            <button
              key={i}
              onClick={() => { setInputText(tpl.text); handleScan(); }}
              style={{
                fontSize: '0.65rem',
                background: '#222',
                border: '1px solid #333',
                borderRadius: '4px',
                padding: '3px 6px',
                cursor: 'pointer',
                color: '#aaa'
              }}
            >
              {tpl.title.split(' ')[0]} Template
            </button>
          ))}
        </div>
      </div>

      {score !== null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#1a1a1a', padding: '8px 10px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem' }}>Risk Evaluation:</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: score > 50 ? '#ef4444' : score > 20 ? '#f59e0b' : '#10b981' }}>
              {score}% ({score > 50 ? 'PHISHING SCAM' : score > 20 ? 'SUSPICIOUS' : 'SECURE'})
            </span>
          </div>

          <div style={{ width: '100%', height: '6px', background: '#333', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${score}%`, height: '100%', background: score > 50 ? '#ef4444' : score > 20 ? '#f59e0b' : '#10b981', transition: 'width 0.4s ease' }}></div>
          </div>

          <div style={{ maxHeight: '60px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {checks.filter(c => c.isTriggered).map((rule, idx) => (
              <div key={idx} style={{ fontSize: '0.65rem', color: '#fca5a5' }}>
                ⚠️ {rule.title}
              </div>
            ))}
            {checks.filter(c => c.isTriggered).length === 0 && (
              <div style={{ fontSize: '0.65rem', color: '#a7f3d0' }}>🟢 No phishing markers detected. Safe message template.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   4. DYNAMIC CONFERENCE TICKET GENERATOR SANDBOX
   ========================================================================= */
function TicketSandbox({ isAutoplay }: { isAutoplay: boolean }) {
  const [name, setName] = useState("Jane Doe");
  const [role, setRole] = useState("Frontend Engineer");
  const [github, setGithub] = useState("janedoe");
  const [ticketId, setTicketId] = useState("#04829");
  const [userInteracted, setUserInteracted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!isAutoplay || userInteracted) return;

    const sampleAttendees = [
      { name: "Sarah Connor", role: "Cybersecurity Lead", github: "sconnor", id: "#07719" },
      { name: "John Doe", role: "Fullstack Architect", github: "johndoe", id: "#11822" },
      { name: "Ada Lovelace", role: "AI Research Fellow", github: "ada_codes", id: "#00001" },
      { name: "Jane Doe", role: "Frontend Engineer", github: "janedoe", id: "#04829" }
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      setIsGenerating(true);
      setTimeout(() => {
        currentIdx = (currentIdx + 1) % sampleAttendees.length;
        const current = sampleAttendees[currentIdx];
        setName(current.name);
        setRole(current.role);
        setGithub(current.github);
        setTicketId(current.id);
        setIsGenerating(false);
      }, 600);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoplay, userInteracted]);

  const handleFieldChange = (field: string, val: string) => {
    setUserInteracted(true);
    if (field === 'name') setName(val);
    if (field === 'role') setRole(val);
    if (field === 'github') setGithub(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '4px' }}>
        🎫 Dynamic Conference Ticket Generation
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', minHeight: 0 }}>
        {/* Ticket inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#18181b', padding: '8px', borderRadius: '6px' }}>
          <div>
            <label style={{ fontSize: '0.6rem', color: '#888', display: 'block' }}>Attendee Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              style={{ width: '100%', fontSize: '0.7rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '2px 4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.6rem', color: '#888', display: 'block' }}>Job Title</label>
            <input
              type="text"
              value={role}
              onChange={(e) => handleFieldChange('role', e.target.value)}
              style={{ width: '100%', fontSize: '0.7rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '2px 4px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.6rem', color: '#888', display: 'block' }}>GitHub Username</label>
            <input
              type="text"
              value={github}
              onChange={(e) => handleFieldChange('github', e.target.value)}
              style={{ width: '100%', fontSize: '0.7rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '2px 4px' }}
            />
          </div>
        </div>

        {/* Live Ticket Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1f1235 0%, #0d0614 100%)',
            border: '1px solid var(--accent)',
            borderRadius: '8px',
            padding: '10px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
            opacity: isGenerating ? 0.6 : 1,
            transition: 'opacity 0.2s ease',
            overflow: 'hidden'
          }}
        >
          {isGenerating && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: '#10b981',
                boxShadow: '0 0 10px #10b981',
                animation: 'scanLaser 0.6s linear infinite'
              }}
            ></div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.05em', color: '#10b981', fontWeight: 'bold' }}>CONFERENCE 2026</span>
            <span style={{ fontSize: '0.55rem', fontFamily: 'monospace', color: '#aaa' }}>{ticketId}</span>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', margin: '4px 0' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', border: '1px solid #10b981' }}>
              👤
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name || 'Attendee'}</div>
              <div style={{ fontSize: '0.55rem', color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{role || 'Role'}</div>
            </div>
          </div>

          <div style={{ borderTop: '1px dashed #333', paddingTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.5rem', color: '#666' }}>@{github || 'github'}</span>
            <div style={{ display: 'flex', gap: '1px', height: '10px' }}>
              {[1, 3, 2, 1, 4, 1, 2].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: '100%', background: '#fff', opacity: 0.8 }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scanLaser {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}

/* =========================================================================
   5. NIKE BOOTS SWEEP SLIDER AD SANDBOX
   ========================================================================= */
function NikeSliderSandbox({ isAutoplay }: { isAutoplay: boolean }) {
  const [sliderVal, setSliderVal] = useState(50);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (!isAutoplay || userInteracted) return;

    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const value = 50 + 35 * Math.sin(elapsed * 1.8);
      setSliderVal(Math.round(value));
    }, 30);

    return () => clearInterval(interval);
  }, [isAutoplay, userInteracted]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInteracted(true);
    setSliderVal(Number(e.target.value));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '4px' }}>
        👟 Interactive Nike Boots Slider Ad Campaign
      </div>

      <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: '8px', overflow: 'hidden', background: 'radial-gradient(circle at center, #1e1b4b, #030712)' }}>
        <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'rgba(255,255,255,0.05)', fontSize: '2rem', fontWeight: 900, textTransform: 'uppercase', fontStyle: 'italic', pointerEvents: 'none' }}>
          JUST DO IT
        </div>

        {/* Boot 1: Classic Boot */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <SneakerSvg color="#A0522D" />
            <div style={{ fontSize: '0.6rem', color: '#888', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Vintage Boot Series</div>
          </div>
        </div>

        {/* Boot 2: Futuristic Boot (Swipe overlay) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${sliderVal}%`,
            height: '100%',
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, #064e3b, #030712)',
            borderRight: '2px solid #10b981',
            boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)'
          }}
        >
          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '280px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              <SneakerSvg color="#10b981" glow />
              <div style={{ fontSize: '0.6rem', color: '#10b981', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 'bold' }}>Futuristic Neon Tech</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.6)', padding: '1px 6px', borderRadius: '3px', fontSize: '0.6rem', color: '#fff' }}>
          {sliderVal}% Swipe
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderVal}
          onChange={handleSliderChange}
          style={{ width: '100%', cursor: 'ew-resize' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#666' }}>
          <span>⏪ Classic</span>
          <span>Sweep slider to preview boots transition</span>
          <span>Neon Tech ⏩</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. RICH MEDIA AD (DCO) SIMULATOR
   ========================================================================= */
function DcoSandbox({ isAutoplay }: { isAutoplay: boolean }) {
  const [city, setCity] = useState("Lagos");
  const [weather, setWeather] = useState("Sunny");
  const [timeOfDay, setTimeOfDay] = useState("Day");
  const [userInteracted, setUserInteracted] = useState(false);

  // Autoplay loops through cities/weathers/timesOfDay
  useEffect(() => {
    if (!isAutoplay || userInteracted) return;

    const cities = ["Lagos", "London", "Tokyo"];
    const weathers = ["Sunny", "Rainy", "Snowy"];
    const times = ["Day", "Night"];

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setCity(cities[index % cities.length]);
      setWeather(weathers[(index + 1) % weathers.length]);
      setTimeOfDay(times[index % times.length]);
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoplay, userInteracted]);

  const handleSelectChange = (field: string, val: string) => {
    setUserInteracted(true);
    if (field === 'city') setCity(val);
    if (field === 'weather') setWeather(val);
    if (field === 'time') setTimeOfDay(val);
  };

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
        return {
          title: "Typical London Drizzle? 🌧️",
          desc: "Grey skies over London Bridge? Light up your evening with a sweet Mirinda Orange from Sainsbury's Local.",
          img: "🍊",
          bg: "linear-gradient(135deg, #ea580c, #27272a)",
          cta: "Find Stores"
        };
      }
    } else {
      if (weather === "Sunny" && timeOfDay === "Day") {
        return {
          title: "Mirinda Green Apple in Tokyo! 🍏",
          desc: "Hanami cherry blossom walk in Shibuya? Pick up a chilled Mirinda Green Apple from FamilyMart.",
          img: "🍏",
          bg: "linear-gradient(135deg, #22c55e, #15803d)",
          cta: "Find Vending"
        };
      } else {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '4px' }}>
        📢 Dynamic Creative Optimization (DCO) Banner Engine
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))', gap: '6px', background: '#18181b', padding: '6px', borderRadius: '6px' }}>
        <div>
          <label style={{ fontSize: '0.55rem', color: '#888', display: 'block' }}>City</label>
          <select value={city} onChange={(e) => handleSelectChange('city', e.target.value)} style={{ width: '100%', fontSize: '0.7rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '1px' }}>
            <option value="Lagos">Lagos 🇳🇬</option>
            <option value="London">London 🇬🇧</option>
            <option value="Tokyo">Tokyo 🇯🇵</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.55rem', color: '#888', display: 'block' }}>Weather</label>
          <select value={weather} onChange={(e) => handleSelectChange('weather', e.target.value)} style={{ width: '100%', fontSize: '0.7rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '1px' }}>
            <option value="Sunny">Sunny ☀️</option>
            <option value="Rainy">Rainy 🌧️</option>
            <option value="Snowy">Snowy ❄️</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: '0.55rem', color: '#888', display: 'block' }}>Context</label>
          <select value={timeOfDay} onChange={(e) => handleSelectChange('time', e.target.value)} style={{ width: '100%', fontSize: '0.7rem', background: '#27272a', border: '1px solid #3f3f46', color: 'white', borderRadius: '4px', padding: '1px' }}>
            <option value="Day">Daytime ☀️</option>
            <option value="Night">Nighttime 🌙</option>
          </select>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: timeOfDay === 'Night' ? '#09090b' : '#3f3f46', borderRadius: '8px', padding: '6px' }}>
        <div
          style={{
            width: '260px',
            height: '130px',
            borderRadius: '6px',
            background: ad.bg,
            color: 'white',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
            transition: 'background 0.5s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <span style={{ fontSize: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '1px 4px', borderRadius: '8px', textTransform: 'uppercase' }}>Sponsored</span>
            <span style={{ fontSize: '1rem' }}>{ad.img}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <h5 style={{ fontSize: '0.8rem', fontWeight: 'bold', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ad.title}</h5>
            <p style={{ fontSize: '0.6rem', opacity: 0.9, margin: 0, lineHeight: 1.25, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{ad.desc}</p>
          </div>

          <button
            onClick={() => alert(`Simulating Mirinda DCO Conversion Target Logged: City=${city}, Weather=${weather}, Time=${timeOfDay}`)}
            style={{ width: '100%', padding: '4px', background: '#ffffff', border: 'none', color: '#111', fontSize: '0.65rem', fontWeight: 'bold', borderRadius: '3px', cursor: 'pointer' }}
          >
            {ad.cta} &nbsp; →
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   7. GAMIFIED PLAYABLE BANNER SIMULATOR (AUTOPILOT CAPABLE)
   ========================================================================= */
function GamifiedSandbox({ isAutoplay }: { isAutoplay: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [basketX, setBasketX] = useState(120); // 0 to 240
  const [items, setItems] = useState<{ id: number; x: number; y: number; isGood: boolean }[]>([]);
  const [gameResult, setGameResult] = useState<'idle' | 'win' | 'lose'>('idle');

  const gameHeight = 160; // adjusted height to fit inside cards nicely

  const scoreRef = useRef(score);
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Spawn items loop (when active or in autoplay)
  useEffect(() => {
    if (!isPlaying && !isAutoplay) return;

    const spawnTimer = setInterval(() => {
      const newItem = {
        id: Date.now() + Math.random(),
        x: Math.random() * 240 + 10,
        y: 0,
        isGood: Math.random() > 0.25 // 75% good cans, 25% obstacles
      };
      setItems((prev) => [...prev, newItem]);
    }, 700);

    return () => clearInterval(spawnTimer);
  }, [isPlaying, isAutoplay]);

  // Game timer countdown (Only in manual play mode)
  useEffect(() => {
    if (!isPlaying) return;
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

  // Physics & AI Auto-tracking Loop
  useEffect(() => {
    if (!isPlaying && !isAutoplay) return;

    const gameLoop = setInterval(() => {
      setItems((prevItems) => {
        const nextItems = prevItems.map((item) => ({ ...item, y: item.y + 4 }));

        // AI Autoplay movement tracking
        if (isAutoplay && !isPlaying && nextItems.length > 0) {
          const target = nextItems
            .filter((item) => item.isGood && item.y < 125)
            .sort((a, b) => b.y - a.y)[0];
          if (target) {
            const targetCenter = target.x;
            const basketCenter = basketX + 30;
            const diff = targetCenter - basketCenter;
            if (Math.abs(diff) > 4) {
              setBasketX((x) => {
                const moveAmount = diff > 0 ? 10 : -10;
                return Math.max(0, Math.min(240, x + moveAmount));
              });
            }
          }
        }

        const activeItems: typeof items = [];
        nextItems.forEach((item) => {
          // Basket boundary detection (y coordinate around 110-125px)
          if (item.y >= 110 && item.y <= 125) {
            if (item.x >= basketX - 10 && item.x <= basketX + 50) {
              if (item.isGood) {
                setScore((s) => s + 1);
              } else {
                setScore((s) => Math.max(0, s - 1));
              }
              return;
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
  }, [isPlaying, isAutoplay, basketX]);

  const startGame = () => {
    setScore(0);
    setItems([]);
    setGameResult('idle');
    setTimeLeft(15);
    setIsPlaying(true);
  };

  const handleTakeControl = () => {
    startGame();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, borderBottom: '1px solid #222', paddingBottom: '4px', width: '100%' }}>
        🎮 Playable Monster Catch Banner (Drag/AI Catch)
      </div>

      <div
        style={{
          width: '100%',
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
        {isAutoplay && !isPlaying && gameResult === 'idle' && (
          /* Autoplay indicator overlay overlay */
          <div
            onClick={handleTakeControl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 3,
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid #10b981',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: 'white',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
              }}
            >
              🤖 AI Autoplay Active • Click to Play
            </div>
          </div>
        )}

        {!isPlaying && gameResult === 'win' ? (
          <div style={{ textAlign: 'center', padding: '10px', zIndex: 4 }}>
            <h5 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10b981', margin: '0 0 2px 0' }}>⚡ CHALLENGE COMPLETE!</h5>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10b981', fontFamily: 'monospace', margin: '4px 0' }}>PROMO: MONSTER_POWER_UP</div>
            <button onClick={startGame} style={{ padding: '4px 8px', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.65rem' }}>Play Again</button>
          </div>
        ) : !isPlaying && gameResult === 'lose' ? (
          <div style={{ textAlign: 'center', padding: '10px', zIndex: 4 }}>
            <h5 style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#ef4444', margin: '0 0 2px 0' }}>❌ TIME'S UP!</h5>
            <p style={{ fontSize: '0.6rem', color: '#888', margin: '0 0 6px 0' }}>Caught {score} cans. Need 5.</p>
            <button onClick={startGame} style={{ padding: '4px 8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.65rem' }}>Try Again</button>
          </div>
        ) : (
          <>
            {/* Header info */}
            <div style={{ position: 'absolute', top: '6px', left: '10px', right: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', fontWeight: 'bold', zIndex: 2 }}>
              <span style={{ color: '#10b981' }}>Score: {score}</span>
              <span style={{ color: '#f59e0b' }}>{isPlaying ? `Time: ${timeLeft}s` : 'AI Simulation'}</span>
            </div>

            {/* Cans */}
            {items.map((item) => (
              <span key={item.id} style={{ position: 'absolute', left: `${item.x}px`, top: `${item.y}px`, fontSize: '1rem', pointerEvents: 'none' }}>
                {item.isGood ? '🥤' : '❌'}
              </span>
            ))}

            {/* Basket */}
            <div
              style={{
                position: 'absolute',
                left: `${basketX}px`,
                bottom: '22px',
                width: '50px',
                height: '14px',
                background: '#10b981',
                border: '1px solid #34d399',
                borderRadius: '0 0 6px 6px',
                fontSize: '0.55rem',
                color: 'white',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              🧺 Basket
            </div>

            {/* Manual drag buttons inside device */}
            <div style={{ position: 'absolute', bottom: '2px', left: 0, right: 0, display: 'flex', gap: '2px' }}>
              <button
                onClick={() => { setBasketX((x) => Math.max(0, x - 25)); }}
                style={{ flex: 1, padding: '2px', background: '#27272a', border: '1px solid #3f3f46', color: 'white', cursor: 'pointer', fontSize: '0.65rem' }}
              >
                ◀ Left
              </button>
              <button
                onClick={() => { setBasketX((x) => Math.min(240, x + 25)); }}
                style={{ flex: 1, padding: '2px', background: '#27272a', border: '1px solid #3f3f46', color: 'white', cursor: 'pointer', fontSize: '0.65rem' }}
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
