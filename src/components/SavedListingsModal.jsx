export default function SavedListingsModal({ isOpen, onClose, listings, onSelect, onDelete }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
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
          background: 'var(--paper)',
          border: '1px solid var(--border-strong)',
          borderRadius: 24,
          maxWidth: 680,
          width: '100%',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
        }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--cream)', fontFamily: 'var(--font-display)' }}>
              Saved Artisan Listings ({listings.length})
            </div>
            <div style={{ fontSize: 12, color: 'var(--cream-dim)' }}>
              Stored locally on your device for fast reloading & export
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--cream-dim)', fontSize: 20, cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 24, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {listings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--cream-dim)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📦</div>
              <div>No saved listings yet. Generate your first craft strategy above!</div>
            </div>
          ) : (
            listings.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(0,0,0,0.3)',
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
                  <div style={{ fontSize: 11, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {item.city} · {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--cream)', margin: '4px 0' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--cream-dim)', display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span>Price: <strong style={{ color: 'var(--orange)' }}>{item.price}</strong></span>
                    <span>Platform: {item.platform}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    onClick={() => { onSelect(item); onClose(); }}
                    style={{
                      background: 'rgba(232, 131, 56, 0.15)',
                      border: '1px solid rgba(232, 131, 56, 0.3)',
                      color: 'var(--orange)',
                      padding: '8px 14px',
                      borderRadius: 8,
                      fontSize: 12,
                      cursor: 'pointer',
                      fontWeight: 500,
                    }}
                  >
                    Load Strategy
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      color: '#f87171',
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                    title="Delete saved item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(230, 218, 201, 0.08)',
              border: '1px solid var(--border)',
              color: 'var(--cream)',
              padding: '8px 20px',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
