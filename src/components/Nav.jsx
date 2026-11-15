import { Sunburst } from './Sunburst'
import { translations } from '../utils/i18n'

export default function Nav({ onTryClick, lang, onLangChange, savedCount, onOpenSaved }) {
  const t = translations[lang]?.nav || translations.en.nav

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Sunburst size={28} className="sunburst-sm" />
          <span>DukaanAgent</span>
        </a>

        <ul className="nav-links">
          <li><a href="#steps">{t.howItWorks}</a></li>
          <li><a href="#input-section">{t.studio}</a></li>
          <li><a href="#agent-network">{t.agentNetwork}</a></li>
          <li><a href="#observatory">{t.observatory}</a></li>
          <li><a href="#roadmap">{t.roadmap}</a></li>

          {/* Saved Listings pill */}
          {savedCount > 0 && (
            <li>
              <button
                type="button"
                onClick={onOpenSaved}
                style={{
                  background: 'rgba(232, 131, 56, 0.12)',
                  border: '1px solid rgba(232, 131, 56, 0.3)',
                  color: 'var(--orange)',
                  fontSize: 12,
                  padding: '5px 12px',
                  borderRadius: 100,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontWeight: 500,
                }}
              >
                <span>📦</span>
                <span>{t.savedListings} ({savedCount})</span>
              </button>
            </li>
          )}

          {/* Language Switcher */}
          <li style={{ display: 'flex', alignItems: 'center', background: 'rgba(230, 218, 201, 0.06)', borderRadius: 100, padding: 2, border: '1px solid var(--border)' }}>
            {[
              { code: 'en', label: 'EN' },
              { code: 'hi', label: 'हिं' },
              { code: 'gu', label: 'ગુજ' },
            ].map(item => (
              <button
                key={item.code}
                type="button"
                onClick={() => onLangChange(item.code)}
                style={{
                  background: lang === item.code ? 'var(--orange)' : 'transparent',
                  color: lang === item.code ? '#0C0A09' : 'var(--cream-dim)',
                  border: 'none',
                  padding: '3px 8px',
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: lang === item.code ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {item.label}
              </button>
            ))}
          </li>

          <li>
            <a
              href="#input-section"
              className="nav-cta"
              onClick={e => {
                e.preventDefault()
                onTryClick()
              }}
            >
              {t.tryBtn}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
