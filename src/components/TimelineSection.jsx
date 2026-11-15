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
              padding: '14px 18px',
              background: 'rgba(12, 10, 9, 0.7)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              marginBottom: 28,
              fontSize: 12,
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--orange)' }}>●</span>
              <span style={{ color: 'var(--cream-soft)' }}>{t.pipelineInput}</span>
              <span style={{ color: 'var(--cream-dim)' }}>(Craft story)</span>
            </div>
            <span style={{ color: 'var(--cream-dim)' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--coral)' }}>◇</span>
              <span style={{ color: 'var(--cream-soft)' }}>{t.pipelineCraft}</span>
              <span style={{ color: 'var(--cream-dim)' }}>(Taxonomy & 1,248 comps)</span>
            </div>
            <span style={{ color: 'var(--cream-dim)' }}>→</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#3A7C5A' }}>✓</span>
              <span style={{ color: 'var(--cream-soft)' }}>{t.pipelineReasoning}</span>
              <span style={{ color: 'var(--cream-dim)' }}>(Price / Listing / Market)</span>
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
                  fontSize: 10,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--orange)',
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {t.badge}
              </div>
              <h3 className="timeline-title">{t.title}</h3>
              <p className="timeline-sub" style={{ margin: 0 }}>
                {isLoading
                  ? t.subtitleRunning
                  : t.subtitleDone}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div
                style={{
                  background: isLoading ? 'rgba(232, 131, 56, 0.1)' : 'rgba(58, 124, 90, 0.12)',
                  border: `1px solid ${isLoading ? 'rgba(232, 131, 56, 0.25)' : 'rgba(58, 124, 90, 0.3)'}`,
                  color: isLoading ? 'var(--orange)' : '#3A7C5A',
                  fontSize: 11,
                  fontWeight: 500,
                  padding: '6px 12px',
                  borderRadius: 100,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: isLoading ? 'var(--orange)' : '#3A7C5A',
                    animation: isLoading ? 'blink 1.5s infinite' : 'none',
                  }}
                />
                {isLoading ? t.runningStatus : `Execution completed · ${elapsedTime}s`}
              </div>

              {!isLoading && completedStages.length > 0 && (
                <div
                  style={{
                    background: 'rgba(230, 218, 201, 0.05)',
                    border: '1px solid var(--border)',
                    color: 'var(--cream-soft)',
                    fontSize: 11,
                    fontWeight: 500,
                    padding: '6px 12px',
                    borderRadius: 100,
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
                background: 'rgba(232, 131, 56, 0.08)',
                border: '1px solid rgba(232, 131, 56, 0.25)',
                borderRadius: 12,
                padding: '12px 18px',
                color: 'var(--orange)',
                fontSize: 12,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
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
                      color: state === 'active' ? 'var(--orange)' : 'var(--cream-dim)',
                      width: 44,
                      flexShrink: 0,
                      paddingTop: 6,
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
