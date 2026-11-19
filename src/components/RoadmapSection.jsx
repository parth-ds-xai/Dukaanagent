const PHASES = [
  {
    num: '01',
    weeks: 'Weeks 01–02',
    title: 'Foundation',
    agent: 'Listing Concierge',
    tag: '06 listings',
    color: '#046A38',
    tasks: [
      { text: 'Publish 06 core Ajrakh collection listings', done: true },
      { text: 'Embed regional craft taxonomy keywords', done: true },
      { text: 'Configure WhatsApp direct checkout link', done: true },
      { text: 'Verify GI cluster origin documentation', done: false },
    ],
  },
  {
    num: '02',
    weeks: 'Weeks 03–04',
    title: 'Validate',
    agent: 'Pricing Strategist',
    tag: '02 markets',
    color: '#E34222',
    tasks: [
      { text: 'Test Mumbai & Bengaluru pricing sensitivity', done: false },
      { text: 'Benchmark click-through on Karigar vs Etsy', done: false },
      { text: 'Gather first 10 verified customer reviews', done: false },
      { text: 'Calibrate packing weight for free shipping', done: false },
    ],
  },
  {
    num: '03',
    weeks: 'Month 02',
    title: 'Expand',
    agent: 'Growth Analyst',
    tag: '+32% AOV',
    color: '#C28E3A',
    tasks: [
      { text: 'Launch festive table linen & napkin gift set', done: false },
      { text: 'Activate pre-Diwali gifting purchase window', done: false },
      { text: 'Bundle runners with brass napkin rings', done: false },
      { text: 'Execute corporate gifting outreach', done: false },
    ],
  },
  {
    num: '04',
    weeks: 'Month 03',
    title: 'Scale',
    agent: 'Commerce Agent',
    tag: '₹2.8L volume',
    color: '#0E6655',
    tasks: [
      { text: 'Activate multi-channel inventory sync', done: false },
      { text: 'Turn on automated voice order confirmations', done: false },
      { text: 'Expand into matching cushion covers & throws', done: false },
      { text: 'Scale production capacity with local weaver group', done: false },
    ],
  },
]

export default function RoadmapSection() {
  return (
    <section className="static-section section" id="roadmap" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div>
            <span className="section-label">04 · Your Market Roadmap</span>
            <h2 className="section-title">Your next 90 days, mapped</h2>
            <p className="section-desc">
              A sequenced plan from initial cataloging to recurring artisan revenue — guided by your agent team.
            </p>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: '20px 28px',
              textAlign: 'right',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4, fontWeight: 600 }}>
              90-Day Target Volume
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                fontWeight: 600,
                color: 'var(--emerald)',
                lineHeight: 1,
              }}
            >
              ₹2.8L
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--emerald)', marginTop: 4, fontWeight: 600 }}>
              ↗ Projected +48% net artisan margin
            </div>
          </div>
        </div>

        <div className="roadmap-grid">
          {PHASES.map((p) => (
            <div className="roadmap-card" key={p.num}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    fontWeight: 600,
                    color: p.color,
                  }}
                >
                  {p.num}
                </span>
                <span
                  style={{
                    background: `${p.color}15`,
                    color: p.color,
                    border: `1px solid ${p.color}30`,
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 100,
                  }}
                >
                  {p.tag}
                </span>
              </div>

              <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                {p.weeks}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 18,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '4px 0 2px',
                }}
              >
                {p.title}
              </div>
              <div style={{ fontSize: 11.5, color: p.color, fontWeight: 500, marginBottom: 18 }}>
                Owner: {p.agent}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: task.done ? 'var(--text-primary)' : 'var(--text-muted)',
                    }}
                  >
                    <span
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: task.done ? 'var(--emerald-light)' : 'var(--bg-card-subtle)',
                        border: `1px solid ${task.done ? 'var(--emerald)' : 'var(--border-strong)'}`,
                        color: task.done ? 'var(--emerald)' : 'transparent',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {task.done ? '✓' : ''}
                    </span>
                    <span>{task.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
