import { Sunburst } from './Sunburst'
import { translations } from '../utils/i18n'

export default function Nav({ onTryClick, lang, onLangChange, savedCount, onOpenSaved }) {
  const t = translations[lang]?.nav || translations.en.nav

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a
          href="#"
          className="nav-logo"
          onClick={e => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          aria-label="DukaanAgent Home"
        >
          <Sunburst size={30} className="sunburst-sm" />
          <div className="nav-logo-text">
            <span>DukaanAgent</span>
            <span className="nav-logo-badge">Artisan AI</span>
          </div>
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
                className="nav-saved-btn"
                onClick={onOpenSaved}
              >
                <span>📦</span>
                <span>{t.savedListings}</span>
                <span className="nav-saved-count">{savedCount}</span>
              </button>
            </li>
          )}

          {/* Language Switcher */}
          <li>
            <div className="nav-lang-picker">
              {[
                { code: 'en', label: 'EN' },
                { code: 'hi', label: 'हिं' },
                { code: 'gu', label: 'ગુજ' },
              ].map(item => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onLangChange(item.code)}
                  className={`nav-lang-btn ${lang === item.code ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
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
              <span>✦</span> {t.tryBtn}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
