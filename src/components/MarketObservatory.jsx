import { useState } from 'react'

const COMPARABLES = [
  {
    product: 'Handwoven Kutch Ajrakh Runner (2m)',
    marketplace: 'Amazon Karigar',
    city: 'Mumbai',
    price: '₹1,850',
    demand: 'High (340/mo)',
    margin: '+55%',
    fit: '94%',
  },
  {
    product: 'Natural Indigo Block-Print Runner',
    marketplace: 'Etsy India',
    city: 'Delhi NCR',
    price: '₹2,200',
    demand: 'Medium (180/mo)',
    margin: '+62%',
    fit: '88%',
  },
  {
    product: 'Ajrakh Table Runner & 4 Mats Set',
    marketplace: 'Meesho',
    city: 'Bengaluru',
    price: '₹1,650',
    demand: 'Very High (620/mo)',
    margin: '+46%',
    fit: '91%',
  },
  {
    product: 'Pure Cotton Vegetable Dye Runner',
    marketplace: 'ONDC Crafts',
    city: 'Hyderabad',
    price: '₹1,490',
    demand: 'Medium (140/mo)',
    margin: '+42%',
    fit: '85%',
  },
  {
    product: 'Heritage Madder Red Dining Runner',
    marketplace: 'Amazon Karigar',
    city: 'Mumbai',
    price: '₹1,990',
    demand: 'High (290/mo)',
    margin: '+58%',
    fit: '95%',
  },
]

const CITIES = [
  { name: 'Mumbai', score: 94, growth: '+22%', active: true },
  { name: 'Bengaluru', score: 82, growth: '+17%', active: false },
  { name: 'Delhi NCR', score: 76, growth: '+11%', active: false },
  { name: 'Hyderabad', score: 61, growth: '+8%', active: false },
]

export default function MarketObservatory() {
  const [page, setPage] = useState(1)

  return (
    <section className="static-section section" id="observatory" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="section-label">03 · Market Observatory</span>
          <h2 className="section-title">Your market, mapped in real time</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Live intelligence from 1,248 comparable listings across Amazon Karigar, Etsy, Meesho, and ONDC.
          </p>
        </div>

        <div className="market-obs">
          {/* KPI Card 1: Revenue Potential */}
          <div className="obs-metric-card">
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--emerald), transparent)', borderRadius: 2, marginBottom: 20 }} />
            <div className="obs-metric-label">Revenue Potential</div>
            <div className="obs-metric-val" style={{ color: 'var(--emerald)' }}>₹2.8L</div>
            <div className="obs-metric-trend">
              <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>↗ 18.4%</span>
              <span style={{ color: 'var(--text-muted)' }}>estimated quarterly volume</span>
            </div>
          </div>

          {/* KPI Card 2: Marketplace Fit (Circular indicator) */}
          <div className="obs-metric-card">
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--ochre), transparent)', borderRadius: 2, marginBottom: 20 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div className="obs-metric-label">Primary Marketplace Fit</div>
                <div className="obs-metric-val" style={{ color: 'var(--text-primary)' }}>Karigar</div>
                <div className="obs-metric-trend">
                  <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>✓ Certified GI Category</span>
                </div>
              </div>

              {/* Circular Gauge 92% */}
              <div style={{ position: 'relative', width: 68, height: 68 }}>
                <svg width="68" height="68" viewBox="0 0 68 68">
                  <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(4, 106, 56, 0.1)" strokeWidth="6" />
                  <circle
                    cx="34"
                    cy="34"
                    r="28"
                    fill="none"
                    stroke="var(--emerald)"
                    strokeWidth="6"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - 0.92)}
                    strokeLinecap="round"
                    transform="rotate(-90 34 34)"
                  />
                </svg>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  92%
                </div>
              </div>
            </div>
          </div>

          {/* KPI Card 3: City Demand Index */}
          <div className="obs-metric-card" style={{ gridColumn: 'span 2' }}>
            <div style={{ height: 3, background: 'linear-gradient(90deg, var(--vermilion), transparent)', borderRadius: 2, marginBottom: 20 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div className="obs-metric-label" style={{ margin: 0 }}>City Demand Index (Textile & Home Decor)</div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>Indexed across 4 metros</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
              {CITIES.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    padding: '14px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--emerald)', fontWeight: 600 }}>{c.growth}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: 'var(--vermilion)' }}>
                      {c.score}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>/100</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(4, 106, 56, 0.1)', borderRadius: 2, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${c.score}%`,
                        background: 'linear-gradient(90deg, var(--vermilion), var(--emerald))',
                        borderRadius: 2,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparable Dataset Table */}
          <div className="obs-table">
            <div
              className="obs-table-header"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div>
                <div className="obs-table-title">Comparable Market Dataset</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
                  Filtered for Ajrakh · Table linen · Handmade pure cotton
                </div>
              </div>

              <div
                style={{
                  background: 'var(--emerald-light)',
                  border: '1px solid var(--emerald-border)',
                  padding: '5px 14px',
                  borderRadius: 100,
                  fontSize: 11.5,
                  color: 'var(--emerald)',
                  fontWeight: 600,
                }}
              >
                ● Live sync (every 6h)
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Product & Spec</th>
                    <th>Marketplace</th>
                    <th>City Target</th>
                    <th>Retail Price</th>
                    <th>Monthly Demand</th>
                    <th>Maker Margin</th>
                    <th>Agent Fit</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARABLES.map((row, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{row.product}</td>
                      <td>
                        <span
                          style={{
                            background: 'var(--bg-card-subtle)',
                            border: '1px solid var(--border)',
                            padding: '3px 8px',
                            borderRadius: 6,
                            fontSize: 11,
                            color: 'var(--text-secondary)',
                            fontWeight: 500,
                          }}
                        >
                          {row.marketplace}
                        </span>
                      </td>
                      <td>{row.city}</td>
                      <td style={{ color: 'var(--emerald)', fontWeight: 700 }}>{row.price}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{row.demand}</td>
                      <td>
                        <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>{row.margin}</span>
                      </td>
                      <td>
                        <span
                          style={{
                            background: 'var(--emerald-light)',
                            color: 'var(--emerald)',
                            padding: '3px 9px',
                            borderRadius: 100,
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {row.fit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div
              style={{
                padding: '14px 24px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 11.5,
                color: 'var(--text-muted)',
              }}
            >
              <span>Showing 5 of 1,248 signals</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    padding: '3px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  ←
                </button>
                <span>{page < 10 ? `0${page}` : page} / 250</span>
                <button
                  type="button"
                  onClick={() => setPage(p => p + 1)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    padding: '3px 10px',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
