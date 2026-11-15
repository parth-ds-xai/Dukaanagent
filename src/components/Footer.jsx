import { Sunburst } from './Sunburst'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Sunburst size={28} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 18,
                  color: 'var(--cream)',
                }}
              >
                DukaanAgent
              </span>
            </div>
            <p className="footer-brand-desc">
              Built for every artisan, everywhere — Thoughtful AI for India’s handmade economy.
              Your craft stays at the centre. Our agents quietly handle the market intelligence around it.
            </p>
            <div style={{ marginTop: 20, fontSize: 13, color: 'var(--cream-dim)' }}>
              Contact:{' '}
              <a
                href="mailto:hello@dukaanagent.in"
                style={{ color: 'var(--orange)', textDecoration: 'none' }}
              >
                hello@dukaanagent.in
              </a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li><a href="#steps">How it works</a></li>
              <li><a href="#input-section">Artisan Studio</a></li>
              <li><a href="#agent-network">Agent Network</a></li>
              <li><a href="#observatory">Market Observatory</a></li>
              <li><a href="#roadmap">90-Day Roadmap</a></li>
              <li><a href="#forecast">Demand Forecast</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Heritage Clusters</div>
            <ul className="footer-links">
              <li><a href="#input-section">Kutch Ajrakh & Rogan</a></li>
              <li><a href="#input-section">Varanasi Katan Silk</a></li>
              <li><a href="#input-section">Jaipur Blue Pottery</a></li>
              <li><a href="#input-section">Channapatna Wooden Toys</a></li>
              <li><a href="#input-section">Murshidabad Baluchari</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Commitment</div>
            <p style={{ fontSize: 12, color: 'var(--cream-dim)', lineHeight: 1.7, fontWeight: 300 }}>
              DukaanAgent is dedicated to safeguarding fair artisan compensation, preserving endangered Indian craft techniques, and democratizing direct-to-consumer digital commerce.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 DukaanAgent · Thoughtful AI for India’s handmade economy</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Fair Pricing Charter</a>
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              ↑ Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
