const PHASES = [
  {
    num: '01',
    weeks: 'Weeks 01–02',
    title: 'Foundation',
    agent: 'Listing Concierge',
    tag: '06 listings',
    color: '#E88338',
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
    color: '#D96B43',
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
    color: '#7A3E48',
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
              background: 'rgba(232, 131, 56, 0.08)',
              border: '1px solid rgba(232, 131, 56, 0.25)',
              borderRadius: 20,
              padding: '20px 28px',
              textAlign: 'right',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ fontSize: 11, color: 'var(--cream-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
              90-Day Target Volume
            </div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 34,
                fontWeight: 500,
                color: 'var(--orange)',
                lineHeight: 1,
              }}
            >
              ₹2.8L
            </div>
            <div style={{ fontSize: 11, color: '#3A7C5A', marginTop: 4, fontWeight: 500 }}>
              ↗ Projected +48% net artisan margin
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
          className="roadmap-grid-responsive"
        >
          {PHASES.map((phase) => (
            <div
              key={phase.num}
              className="roadmap-phase"
              style={{
                borderTop: `2px solid ${phase.color}`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span className="roadmap-phase-label">{phase.weeks}</span>
                <span
                  style={{
                    background: `${phase.color}15`,
                    color: phase.color,
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 100,
                    border: `1px solid ${phase.color}30`,
                  }}
                >
                  {phase.tag}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: phase.color,
                  }}
                >
                  Phase {phase.num}
                </span>
                <span style={{ color: 'var(--border-strong)' }}>·</span>
                <span style={{ fontSize: 11, color: 'var(--cream-dim)' }}>{phase.agent}</span>
              </div>

              <div className="roadmap-phase-title">{phase.title}</div>

              <div style={{ marginTop: 16 }}>
                {phase.tasks.map((task, i) => (
                  <div key={i} className="roadmap-task">
                    <div className={`task-check ${task.done ? 'done' : 'todo'}`}>
                      {task.done ? '✓' : ''}
                    </div>
                    <span style={{ color: task.done ? 'var(--cream-soft)' : 'var(--cream-dim)' }}>
                      {task.text}
                    </span>
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
