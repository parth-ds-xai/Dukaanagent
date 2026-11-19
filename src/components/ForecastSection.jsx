import { useState } from 'react'

const DATA_POINTS = [
  { day: 'Day 01', label: 'Today', value: 24, date: 'Aug 15' },
  { day: 'Day 10', label: 'Prep', value: 32, date: 'Aug 25' },
  { day: 'Day 20', label: 'Early Look', value: 45, date: 'Sep 05' },
  { day: 'Day 30', label: 'Gifting Surges', value: 68, date: 'Sep 15' },
  { day: 'Day 40', label: 'Oct 12', value: 89, date: 'Oct 12' },
  { day: 'Day 50', label: 'Peak Orders', value: 98, date: 'Oct 22' },
  { day: 'Day 60', label: 'Diwali', value: 100, date: 'Nov 01' },
]

export default function ForecastSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // SVG Area path generator
  const width = 800
  const height = 180
  const paddingX = 40
  const paddingY = 30

  const points = DATA_POINTS.map((d, i) => {
    const x = paddingX + (i / (DATA_POINTS.length - 1)) * (width - 2 * paddingX)
    const y = height - paddingY - (d.value / 100) * (height - 2 * paddingY)
    return { x, y, ...d }
  })

  // Build curved path
  let pathD = `M ${points[0].x} ${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const cp1x = p0.x + (p1.x - p0.x) / 2
    const cp1y = p0.y
    const cp2x = p0.x + (p1.x - p0.x) / 2
    const cp2y = p1.y
    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`
  }

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`

  return (
    <section className="static-section section" id="forecast" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="section-label">Seasonal Intelligence</span>
          <h2 className="section-title">Demand is building before Diwali</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Historical purchase intent and search demand curve for handmade table decor across Indian tier-1 cities.
          </p>
        </div>

        <div className="forecast-container">
          <div className="forecast-header">
            <div>
              <div className="forecast-title">60-Day Pre-Festive Demand Velocity</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>
                Category: Hand-block printed dining & table linen
              </div>
            </div>

            <div className="forecast-badge">
              <span>🔥</span>
              <span>+32% potential order value</span>
            </div>
          </div>

          <div className="forecast-chart">
            <div style={{ position: 'relative', width: '100%', overflowX: 'auto' }}>
              <svg
                viewBox={`0 0 ${width} ${height}`}
                style={{ width: '100%', height: 'auto', display: 'block', minWidth: 600 }}
              >
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#046A38" stopOpacity="0.25" />
                    <stop offset="60%" stopColor="#E34222" stopOpacity="0.10" />
                    <stop offset="100%" stopColor="#FAF6EE" stopOpacity="0.0" />
                  </linearGradient>

                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#046A38" />
                    <stop offset="65%" stopColor="#046A38" />
                    <stop offset="100%" stopColor="#E34222" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                {[0.25, 0.5, 0.75].map((lvl, idx) => {
                  const y = height - paddingY - lvl * (height - 2 * paddingY)
                  return (
                    <line
                      key={idx}
                      x1={paddingX}
                      y1={y}
                      x2={width - paddingX}
                      y2={y}
                      stroke="rgba(40, 30, 20, 0.06)"
                      strokeDasharray="4 4"
                    />
                  )
                })}

                {/* Area fill */}
                <path d={areaD} fill="url(#areaGradient)" />

                {/* Main line curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Points */}
                {points.map((p, i) => (
                  <g key={i}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={i === 6 || hoveredIndex === i ? 6 : 4}
                      fill="#FFFFFF"
                      stroke={i === 6 ? '#E34222' : '#046A38'}
                      strokeWidth={i === 6 ? 3 : 2}
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    />
                    {i === 6 && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="12"
                        fill="none"
                        stroke="#E34222"
                        strokeWidth="1.5"
                        strokeOpacity="0.4"
                        style={{ animation: 'pulse-ring 2s infinite' }}
                      />
                    )}
                  </g>
                ))}
              </svg>

              {/* Data labels strip */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 20px 0',
                  borderTop: '1px solid var(--border)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                }}
              >
                {points.map((p, i) => (
                  <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ fontWeight: i === 6 ? 700 : 500, color: i === 6 ? 'var(--vermilion)' : 'var(--text-primary)' }}>
                      {p.label}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
                      {p.date} · {p.value}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                marginTop: 20,
                padding: '14px 18px',
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, color: 'var(--vermilion)' }}>✦</span>
                <span style={{ fontSize: 12.5, color: 'var(--text-primary)', fontWeight: 500 }}>
                  Optimal cataloging window: <strong>August 25 – September 15</strong> ensures algorithmic indexing on Amazon Karigar before gifting peak.
                </span>
              </div>
              <div
                style={{
                  background: 'var(--vermilion-light)',
                  border: '1px solid var(--vermilion-border)',
                  color: 'var(--vermilion)',
                  fontSize: 11.5,
                  padding: '4px 12px',
                  borderRadius: 100,
                  fontWeight: 600,
                }}
              >
                High Velocity Window
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
