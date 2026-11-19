export default function SavedListingsModal({ isOpen, onClose, listings, onSelect, onDelete }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(28, 25, 23, 0.65)',
        backdropFilter: 'blur(8px)',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '1px solid var(--border)',
          borderRadius: 24,
          maxWidth: 680,
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(40, 30, 20, 0.25)',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'var(--bg-card-subtle)',
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              Saved Artisan Listings ({listings.length})
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Stored locally on your device for fast reloading & export
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 22, cursor: 'pointer', padding: 4 }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {listings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>No saved listings yet. Generate your first craft strategy above!</div>
            </div>
          ) : (
            listings.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '16px 20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'var(--emerald)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                    {item.city} · {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '4px 0' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span>Price: <strong style={{ color: 'var(--emerald)' }}>{item.price}</strong></span>
                    <span>Platform: {item.platform}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => { onSelect(item); onClose(); }}
                    style={{
                      background: 'var(--emerald-light)',
                      border: '1px solid var(--emerald-border)',
                      color: 'var(--emerald)',
                      padding: '7px 14px',
                      borderRadius: 100,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid var(--border)',
                      color: 'var(--vermilion)',
                      padding: '7px 12px',
                      borderRadius: 100,
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                    title="Delete saved listing"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', background: 'var(--bg-card-subtle)' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '8px 18px',
              borderRadius: 100,
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
