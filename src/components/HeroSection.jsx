import { Sunburst } from './Sunburst'
import { translations } from '../utils/i18n'

export default function HeroSection({ onTryClick, lang = 'en' }) {
  const t = translations[lang]?.hero || translations.en.hero

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />

      <Sunburst size={112} className="sunburst-hero" />

      <div className="hero-badge">
        <span className="hero-badge-dot" />
        <span>{t.badge}</span>
      </div>

      <h1>
        {t.title1}{' '}
        <span className="gradient-text">{t.titleGradient}</span>
      </h1>

      <p className="hero-sub">
        {t.subtitle}
      </p>

      <div className="hero-actions">
        <button className="btn-primary" onClick={onTryClick}>
          <span>✦</span> {t.tryBtn}
        </button>
        <a href="#agent-network" className="btn-secondary">
          {t.networkBtn}
        </a>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <div className="stat-num">12,000+</div>
          <div className="stat-label">{t.statArtisans}</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">₹4.2 Cr</div>
          <div className="stat-label">{t.statRevenue}</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">94%</div>
          <div className="stat-label">{t.statAccuracy}</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">5.2 sec</div>
          <div className="stat-label">{t.statTime}</div>
        </div>
      </div>
    </section>
  )
}
