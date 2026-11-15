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
              <div style={{ fontSize: 11, color: 'var(--cream-dim)', marginTop: 2 }}>
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
                    <stop offset="0%" stopColor="#E88338" stopOpacity="0.35" />
                    <stop offset="80%" stopColor="#D96B43" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#7A3E48" stopOpacity="0.0" />
                  </linearGradient>

                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#D96B43" />
                    <stop offset="60%" stopColor="#E88338" />
                    <stop offset="100%" stopColor="#F5EBE1" />
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
                      stroke="rgba(230, 218, 201, 0.05)"
                      strokeDasharray="4 4"
                    />
                  )
                })}

                {/* Baseline */}
                <line
                  x1={paddingX}
                  y1={height - paddingY}
                  x2={width - paddingX}
                  y2={height - paddingY}
                  stroke="var(--border)"
                />

                {/* Filled area */}
                <path d={areaD} fill="url(#areaGradient)" />

                {/* Stroke curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Interactive Points */}
                {points.map((p, i) => {
                  const isKey = i === 0 || i === 4 || i === 6
                  const isHovered = hoveredIndex === i
                  return (
                    <g
                      key={i}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r={isHovered ? 7 : isKey ? 5 : 3.5}
                        fill={isKey ? '#E88338' : 'var(--cream)'}
                        stroke="var(--paper)"
                        strokeWidth="2"
                        filter={isKey ? 'drop-shadow(0 0 6px rgba(232, 131, 56, 0.8))' : 'none'}
                      />

                      {/* Timeline date label below */}
                      <text
                        x={p.x}
                        y={height - 8}
                        textAnchor="middle"
                        fill={isKey ? 'var(--orange)' : 'var(--cream-dim)'}
                        fontSize="11"
                        fontWeight={isKey ? '600' : '400'}
                      >
                        {p.label}
                      </text>

                      {/* Tooltip on hover */}
                      {isHovered && (
                        <g>
                          <rect
                            x={p.x - 45}
                            y={p.y - 36}
                            width="90"
                            height="24"
                            rx="6"
                            fill="#1E1813"
                            stroke="rgba(232, 131, 56, 0.4)"
                          />
                          <text
                            x={p.x}
                            y={p.y - 20}
                            textAnchor="middle"
                            fill="var(--cream)"
                            fontSize="11"
                            fontWeight="500"
                          >
                            Index: {p.value}/100
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </svg>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: 16,
                borderTop: '1px solid var(--border)',
                fontSize: 11,
                color: 'var(--cream-dim)',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              <div style={{ display: 'flex', gap: 20 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E88338' }} />
                  <span>Key Milestones: Today · Oct 12 (Gift Rush) · Diwali Peak</span>
                </span>
              </div>
              <span style={{ color: '#3A7C5A', fontWeight: 500 }}>
                ● 4.2x search spike during weeks 40–50
              </span>
            </div>
          </div>

          <div className="forecast-insight">
            <div className="forecast-insight-icon">🎯</div>
            <div className="forecast-insight-text">
              <strong>Publish by early October:</strong> Searches for luxury handmade table linen peak 3–4 weeks prior to Diwali.
              Listing a table runner paired with a 4-napkin set unlocks corporate gifting budgets, generating an estimated <strong>+32% higher order value</strong> compared to standalone sales.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
