import { translations } from '../utils/i18n'

export default function TimelineSection({
  stages,
  activeStage,
  completedStages,
  isLoading,
  error,
  elapsedTime = '8.4',
  hasStarted,
  lang = 'en',
}) {
  const t = translations[lang]?.timeline || translations.en.timeline

  if (!hasStarted && !error) return null

  const getStepState = (i) => {
    if (completedStages.includes(i)) return 'done'
    if (activeStage === i) return 'active'
    return 'pending'
  }

  const timestamps = ['00:00', '00:02', '00:04', '00:06', '00:08']

  return (
    <section className="timeline-section" id="timeline-section">
      <div className="container">
        <div className="timeline-container">
          {/* Top pipeline flow diagram */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 20px',
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: 14,
              marginBottom: 28,
              fontSize: 12.5,
              flexWrap: 'wrap',
              gap: 10,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--vermilion)', fontWeight: 700 }}>●</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{t.pipelineInput}</span>
              <span style={{ color: 'var(--text-muted)' }}>(Craft story)</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--ochre)', fontWeight: 700 }}>◇</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{t.pipelineCraft}</span>
              <span style={{ color: 'var(--text-muted)' }}>(Taxonomy & 1,248 comps)</span>
            </div>
            <span style={{ color: 'var(--text-muted)' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--emerald)', fontWeight: 700 }}>✓</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{t.pipelineReasoning}</span>
              <span style={{ color: 'var(--text-muted)' }}>(Price / Listing / Market)</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 24,
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--emerald)',
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {t.badge}
              </div>
              <h3 className="timeline-title">{t.title}</h3>
              <p className="timeline-sub" style={{ margin: 0 }}>
                {isLoading ? t.subtitleRunning : t.subtitleDone}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div
                style={{
                  background: isLoading ? 'var(--vermilion-light)' : 'var(--emerald-light)',
                  border: `1px solid ${isLoading ? 'var(--vermilion-border)' : 'var(--emerald-border)'}`,
                  color: isLoading ? 'var(--vermilion)' : 'var(--emerald)',
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '6px 14px',
                  borderRadius: 100,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: isLoading ? 'var(--vermilion)' : 'var(--emerald)',
                    animation: isLoading ? 'blink 1.5s infinite' : 'none',
                  }}
                />
                {isLoading ? t.runningStatus : `Execution completed · ${elapsedTime}s`}
              </div>

              {!isLoading && completedStages.length > 0 && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '6px 14px',
                    borderRadius: 100,
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  {t.confidence}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div
              style={{
                background: 'var(--vermilion-light)',
                border: '1px solid var(--vermilion-border)',
                borderRadius: 12,
                padding: '12px 18px',
                color: 'var(--vermilion)',
                fontSize: 12.5,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontWeight: 500,
              }}
            >
              <span style={{ fontSize: 16 }}>ℹ</span>
              <span>{error}</span>
            </div>
          )}

          <div className="timeline-steps">
            {stages.map((stage, i) => {
              const state = getStepState(i)
              return (
                <div key={stage.id} className={`tl-step ${state}`}>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      color: state === 'active' ? 'var(--vermilion)' : 'var(--text-muted)',
                      width: 44,
                      flexShrink: 0,
                      paddingTop: 6,
                      fontWeight: 600,
                    }}
                  >
                    {timestamps[i]}
                  </div>

                  <div className="tl-icon-wrap">
                    {state === 'done' ? '✓' : state === 'active' ? '⟳' : stage.icon}
                  </div>

                  <div className="tl-content">
                    <div className="tl-label">{stage.label}</div>
                    <div className="tl-desc">{stage.desc}</div>
                  </div>

                  <span className="tl-status">
                    {state === 'done' ? 'Complete' : state === 'active' ? 'Synthesizing…' : 'Queued'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
