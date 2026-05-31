import type { Language } from '../constants/translations';

interface LanguageSelectProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export default function LanguageSelect({ language, setLanguage }: LanguageSelectProps) {
  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="language-selector" style={{ position: 'relative', display: 'inline-block' }}>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        aria-label="Select Language"
        style={{
          padding: '8px 36px 8px 12px',
          fontSize: '0.85rem',
          fontWeight: 600,
          background: 'var(--glass-bg)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text-color)',
          cursor: 'pointer',
          appearance: 'none',
          WebkitAppearance: 'none',
          boxShadow: 'var(--card-shadow)',
          fontFamily: 'var(--font-heading)',
          transition: 'all 0.2s ease',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            style={{
              background: 'var(--bg-surface)',
              color: 'var(--text-color)',
              fontWeight: 500
            }}
          >
            {lang.flag} &nbsp; {lang.name}
          </option>
        ))}
      </select>
      
      {/* Down arrow decorator */}
      <span
        style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          fontSize: '0.65rem',
          color: 'var(--text-muted)'
        }}
      >
        ▼
      </span>
    </div>
  );
}
