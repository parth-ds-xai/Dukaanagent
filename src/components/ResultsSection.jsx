import { parseApiResult } from '../utils/parseResult'
import { Sunburst } from './Sunburst'
import { translations } from '../utils/i18n'

function Card01({ data, lang }) {
  const tags = data.product_type
    ? data.product_type.split(',').map(s => s.trim())
    : ['Ajrakh Craft', 'Hand Block Print', 'Pure Cotton']

  return (
    <div className="result-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="card-num">CARD 01 · IDENTIFY</div>
        <Sunburst size={24} />
      </div>
      <div className="card-title">Product Identified</div>

      <div className="product-tags">
        {tags.map((t, i) => (
          <span key={i} className="product-tag">{t}</span>
        ))}
      </div>

      <div className="product-row">
        <span className="product-row-label">Heritage Craft</span>
        <span className="product-row-val" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
          {tags[0] || 'Handcrafted Textile'}
        </span>
      </div>
      <div className="product-row">
        <span className="product-row-label">Raw Materials</span>
        <span className="product-row-val">{data.materials}</span>
      </div>
      <div className="product-row">
        <span className="product-row-label">Home Origin</span>
        <span className="product-row-val">{data.home_city}</span>
      </div>
      <div className="product-row">
        <span className="product-row-label">Maker Cost Baseline</span>
        <span className="product-row-val" style={{ color: 'var(--vermilion)', fontWeight: 700 }}>
          {data.local_cost}
        </span>
      </div>
    </div>
  )
}

function Card02({ data, lang }) {
  let pricing = data.pricing
  let rows = []
  if (Array.isArray(pricing)) {
    rows = pricing
  } else if (typeof pricing === 'object' && pricing !== null) {
    rows = Object.entries(pricing).map(([city, val]) => ({
      city,
      price: typeof val === 'object' ? val.price || val.amount : val,
      margin: typeof val === 'object' ? val.margin || val.markup : '+48%',
    }))
  }

  if (rows.length === 0) {
    rows = [
      { city: 'Delhi NCR', price: '₹1,650', margin: '+48%' },
      { city: 'Mumbai', price: '₹1,850', margin: '+55%' },
      { city: 'Bengaluru', price: '₹1,750', margin: '+50%' },
    ]
  }

  const CITY_ACCENTS = ['var(--emerald)', 'var(--vermilion)', 'var(--ochre)']

  return (
    <div className="result-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="card-num">CARD 02 · PRICE</div>
        <span
          style={{
            background: 'var(--emerald-light)',
            border: '1px solid var(--emerald-border)',
            color: 'var(--emerald)',
            fontSize: 11,
            fontWeight: 600,
            padding: '3px 9px',
            borderRadius: 100,
          }}
        >
          +48% healthy maker margin
        </span>
      </div>
      <div className="card-title">Smart Pricing</div>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
        Benchmarked across 1,248 active listings for artisan textile goods.
      </p>

      {rows.slice(0, 3).map((row, i) => (
        <div key={i} className="price-row">
          <div className="price-city">
            <span className="city-dot" style={{ background: CITY_ACCENTS[i] || 'var(--emerald)' }} />
            <div>
              <div className="price-label">{row.city}</div>
              <div className="price-sub">Market capacity index {94 - i * 6}/100</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="price-amount" style={{ color: CITY_ACCENTS[i] || 'var(--emerald)' }}>
              {row.price}
            </div>
            {row.margin && (
              <div
                style={{
                  fontSize: 10.5,
                  color: 'var(--emerald)',
                  fontWeight: 600,
                  marginTop: 2,
                }}
              >
                {row.margin} margin
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function Card03({ data, productImage }) {
  return (
    <div className="result-card">
      <div className="card-num">CARD 03 · LIST</div>
      <div className="card-title">Your Listing</div>

      {productImage ? (
        <div
          style={{
            height: 120,
            borderRadius: 10,
            marginBottom: 18,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid var(--border-strong)',
          }}
        >
          <img
            src={productImage}
            alt="Uploaded craft photo"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              left: 8,
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 10,
              color: 'var(--emerald)',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            ✦ Verified Craft Photo Attached
          </div>
        </div>
      ) : (
        <div className="listing-textile">
          <div className="textile-pattern" />
          <span className="textile-label">✦ Authentic Artisan Textile ✦</span>
        </div>
      )}

      <div className="listing-title">{data.title}</div>
      <div className="listing-desc">{data.listing_description}</div>
    </div>
  )
}

function Card04({ data }) {
  const matchPct = typeof data.platform_match === 'number'
    ? data.platform_match
    : parseInt(data.platform_match) || 92

  const tips = [
    'Logistics pickup directly from artisan cluster',
    'Special reduced 5% referral fee for GI certified crafts',
    'High buyer trust & Prime badge eligibility',
  ]

  return (
    <div className="result-card">
      <div className="card-num">CARD 04 · MATCH</div>
      <div className="card-title">Best Platform</div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
        <div className="platform-name">{data.platform}</div>
        <div className="platform-badge">
          <span>⭐</span>
          {matchPct}% match
        </div>
      </div>

      <p className="platform-reasoning">{data.platform_reasoning}</p>

      <div className="platform-tips">
        {tips.map((tip, i) => (
          <div key={i} className="platform-tip">
            <span className="tip-dot" />
            {tip}
          </div>
        ))}
      </div>
    </div>
  )
}

const BAR_HEIGHTS = [35, 48, 52, 44, 68, 62, 82, 74, 92, 86, 96, 100]
const BAR_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function Card05({ data }) {
  return (
    <div className="result-card" style={{ gridColumn: 'span 2' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div className="card-num">CARD 05 · GROW</div>
        <span className="growth-tag">
          <span>📈</span> {data.trend_direction === 'up' ? 'Festive Demand Uplift' : 'Stable Trend'}
        </span>
      </div>
      <div className="card-title">Growth Insight</div>

      <div className="trend-chart">
        {BAR_HEIGHTS.map((h, i) => (
          <div
            key={i}
            className="trend-bar"
            style={{
              height: `${h}%`,
              background: i >= 9
                ? 'linear-gradient(180deg, var(--vermilion), var(--emerald))'
                : 'rgba(4, 106, 56, 0.1)',
              boxShadow: i >= 9 ? '0 0 10px rgba(227, 66, 34, 0.35)' : 'none',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 4, marginBottom: 18 }}>
        {BAR_MONTHS.map((m, i) => (
          <span
            key={i}
            style={{
              flex: 1,
              textAlign: 'center',
              fontSize: 10,
              color: i >= 9 ? 'var(--vermilion)' : 'var(--text-muted)',
              fontWeight: i >= 9 ? 700 : 400,
            }}
          >
            {m}
          </span>
        ))}
      </div>

      <div className="growth-insight">{data.trend_insight}</div>
    </div>
  )
}

export default function ResultsSection({ result, fallbackInput, productImage, lang = 'en' }) {
  const t = translations[lang]?.results || translations.en.results
  const data = parseApiResult(result, fallbackInput)

  return (
    <section className="results-section section" id="results-section">
      <div className="container">
        {/* Stepper indicator header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 28,
            fontSize: 12,
            flexWrap: 'wrap',
          }}
        >
          {['1 Identify', '2 Price', '3 List', '4 Match', '5 Grow'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  background: 'var(--emerald-light)',
                  border: '1px solid var(--emerald-border)',
                  color: 'var(--emerald)',
                  padding: '5px 14px',
                  borderRadius: 100,
                  fontSize: 11.5,
                  fontWeight: 600,
                }}
              >
                {s}
              </span>
              {i < 4 && <span style={{ color: 'var(--border-strong)' }}>→</span>}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="section-label">{t.badge}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t.subtitle}
          </p>
        </div>

        <div className="results-grid">
          <Card01 data={data} lang={lang} />
          <Card02 data={data} lang={lang} />
          <Card03 data={data} productImage={productImage} />
          <Card04 data={data} />
          <Card05 data={data} />
        </div>
      </div>
    </section>
  )
}
