import { useState } from 'react'
import { parseApiResult } from '../utils/parseResult'
import { Sunburst } from './Sunburst'
import { translations } from '../utils/i18n'

export default function FinalListingCard({ result, fallbackInput, productImage, lang = 'en' }) {
  const t = translations[lang]?.storefront || translations.en.storefront
  const [copied, setCopied] = useState(false)
  const [copiedShare, setCopiedShare] = useState(false)
  const [showOndcModal, setShowOndcModal] = useState(false)
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishStatus, setPublishStatus] = useState('idle')

  const data = parseApiResult(result, fallbackInput)

  const listingText = `${data.title}

${data.listing_description}

Price: ${data.recommended_price}
Category: Home & Living · Artisan Handloom
Origin: ${data.home_city}
Crafted with: ${data.materials}
Platform Recommendation: ${data.platform}`

  const handleCopy = () => {
    navigator.clipboard.writeText(listingText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Check out my new artisan listing on DukaanAgent:\n\n*${data.title}*\nPrice: ${data.recommended_price}\n\n${data.listing_description}`
    )
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  }

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedShare(true)
      setTimeout(() => setCopiedShare(false), 2000)
    })
  }

  // ONDC Retail Catalog JSON Generation
  const ondcJson = JSON.stringify(
    {
      context: {
        domain: 'ONDC:RET10',
        country: 'IND',
        city: data.home_city,
        action: 'catalog_publish',
        timestamp: new Date().toISOString(),
      },
      message: {
        catalog: {
          bpp_descriptor: { name: 'DukaanAgent Artisan Seller' },
          bpp_providers: [
            {
              id: `ARTISAN_${data.home_city.replace(/[^A-Za-z]/g, '').toUpperCase()}_01`,
              descriptor: { name: `${data.home_city} Artisan Collective` },
              items: [
                {
                  id: `ITEM_${Date.now()}`,
                  descriptor: {
                    name: data.title,
                    short_desc: data.listing_description.slice(0, 120),
                    long_desc: data.listing_description,
                    images: productImage ? [productImage.slice(0, 50) + '...'] : [],
                  },
                  price: {
                    currency: 'INR',
                    value: data.recommended_price.replace(/[^0-9]/g, '') || '1850',
                  },
                  category_id: 'Home & Living',
                  tags: {
                    craft_type: data.product_type,
                    materials: data.materials,
                    geographical_indication: 'Authentic Indian Artisan',
                  },
                },
              ],
            },
          ],
        },
      },
    },
    null,
    2
  )

  const handleDownloadOndc = () => {
    const blob = new Blob([ondcJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ondc-catalog-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSimulatePublish = () => {
    setPublishStatus('publishing')
    setTimeout(() => {
      setPublishStatus('success')
    }, 2000)
  }

  return (
    <section className="listing-card-section section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <span className="section-label">{t.badge}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t.subtitle}
          </p>
        </div>

        <div className="final-listing-card">
          {/* Header preview with craft photo or textile banner */}
          <div
            style={{
              height: 140,
              background: 'linear-gradient(135deg, #046A38 0%, #034D28 55%, #E34222 100%)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 28px',
              borderBottom: '1px solid var(--border)',
            }}
          >
            {productImage ? (
              <img
                src={productImage}
                alt="Product visual"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.35,
                  filter: 'contrast(1.15)',
                }}
              />
            ) : (
              <div className="textile-pattern" style={{ opacity: 0.25 }} />
            )}

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Sunburst size={44} />
              <div>
                <div style={{ fontSize: 11, color: '#F9EBD7', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Craft Certified · YC Commerce
                </div>
                <div style={{ fontSize: 17, color: '#FFFFFF', fontWeight: 600, fontFamily: 'var(--font-display)' }}>
                  Authentic Handcrafted Artisan Edition
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                color: 'var(--text-primary)',
                fontSize: 12,
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <span>📍</span> Handmade in {data.home_city}
            </div>
          </div>

          <div className="listing-card-header">
            <div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 4, fontWeight: 500 }}>
                Home & Living · Table Linen & Heritage Handloom
              </div>
              <div className="listing-card-name">{data.title}</div>
            </div>

            <div
              style={{
                background: 'var(--emerald-light)',
                border: '1px solid var(--emerald-border)',
                color: 'var(--emerald)',
                fontSize: 12,
                fontWeight: 600,
                padding: '6px 14px',
                borderRadius: 100,
              }}
            >
              ✓ Ready to publish
            </div>
          </div>

          <div className="listing-card-body">
            <div className="listing-price-row">
              <div>
                <div className="listing-price">{data.recommended_price}</div>
                <div className="listing-price-sub">
                  Recommended pricing for {data.platform} · Free delivery eligible
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Target Marketplace
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                  }}
                >
                  {data.platform}
                </div>
              </div>
            </div>

            <div className="listing-desc-block">
              <strong style={{ color: 'var(--text-primary)', fontSize: 14 }}>{data.title}</strong>
              {'\n\n'}
              {data.listing_description}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 12,
                marginBottom: 24,
              }}
            >
              {[
                { label: 'Craft Technique', val: data.product_type },
                { label: 'Raw Materials', val: data.materials },
                { label: 'Origin Cluster', val: data.home_city },
              ].map(({ label, val }) => (
                <div
                  key={label}
                  style={{
                    background: 'var(--bg-card-subtle)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                className={`copy-btn ${copied ? 'copied' : ''}`}
                onClick={handleCopy}
                type="button"
                style={{ flex: 1, minWidth: 200 }}
              >
                {copied ? t.copiedBtn : t.copyBtn}
              </button>

              <button
                type="button"
                onClick={() => setShowPublishModal(true)}
                style={{
                  background: 'var(--emerald-light)',
                  border: '1px solid var(--emerald-border)',
                  color: 'var(--emerald)',
                  padding: '13px 22px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s ease',
                }}
              >
                {t.publishBtn}
              </button>

              <button
                type="button"
                onClick={() => setShowOndcModal(true)}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  padding: '13px 20px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {t.exportOndcBtn}
              </button>

              <button
                onClick={handleWhatsAppShare}
                type="button"
                title="Share via WhatsApp"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 100,
                  background: 'rgba(37, 211, 102, 0.12)',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  color: '#075E54',
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                }}
              >
                W
              </button>

              <button
                onClick={handleShareLink}
                type="button"
                title="Share link"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 100,
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {copiedShare ? '✓' : '↗'}
              </button>
            </div>
          </div>
        </div>

        {/* Modal: ONDC Catalog JSON */}
        {showOndcModal && (
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
                borderRadius: 20,
                maxWidth: 640,
                width: '100%',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(40, 30, 20, 0.2)',
              }}
            >
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                    ONDC Beckn Retail Catalog Schema
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Standard protocol payload for Open Network for Digital Commerce
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOndcModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
                <pre
                  style={{
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border)',
                    padding: 16,
                    borderRadius: 12,
                    fontSize: 12,
                    color: 'var(--emerald)',
                    overflowX: 'auto',
                    fontFamily: 'monospace',
                  }}
                >
                  {ondcJson}
                </pre>
              </div>

              <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(ondcJson)
                    alert('ONDC JSON copied to clipboard!')
                  }}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    padding: '8px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Copy JSON
                </button>
                <button
                  type="button"
                  onClick={handleDownloadOndc}
                  style={{
                    background: 'var(--grad-emerald)',
                    border: 'none',
                    color: '#FFFFFF',
                    padding: '8px 18px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Download .json
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Direct Marketplace Publish Simulation */}
        {showPublishModal && (
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
                borderRadius: 20,
                maxWidth: 520,
                width: '100%',
                overflow: 'hidden',
                padding: 28,
                boxShadow: '0 24px 64px rgba(40, 30, 20, 0.2)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 19, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                    Direct Marketplace Publish
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Target channel: {data.platform} (Amazon Karigar Partner API)
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowPublishModal(false); setPublishStatus('idle'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: 20, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              {publishStatus === 'idle' && (
                <div>
                  <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                    Publishing will push your verified craft listing directly to {data.platform} with the following parameters:
                  </p>

                  <div style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'var(--text-muted)' }}>SKU Identifier:</span>
                      <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace', fontWeight: 600 }}>DKA-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'var(--text-muted)' }}>Channel Price:</span>
                      <span style={{ color: 'var(--emerald)', fontWeight: 700 }}>{data.recommended_price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Commission Bracket:</span>
                      <span style={{ color: 'var(--emerald)', fontWeight: 600 }}>5% GI Artisan Rate</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePublish}
                    style={{
                      width: '100%',
                      background: 'var(--grad-emerald)',
                      border: 'none',
                      color: '#FFFFFF',
                      padding: 14,
                      borderRadius: 100,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: 14,
                      boxShadow: 'var(--shadow-md)',
                    }}
                  >
                    Confirm & Publish Listing
                  </button>
                </div>
              )}

              {publishStatus === 'publishing' && (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div className="spinner" style={{ width: 36, height: 36, margin: '0 auto 16px', borderWidth: 3, borderColor: 'var(--emerald)', borderTopColor: 'transparent' }} />
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
                    Transmitting payload to {data.platform} Seller API…
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                    Validating geographical indication and taxonomy compliance
                  </div>
                </div>
              )}

              {publishStatus === 'success' && (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--emerald)', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
                    Listing Published Successfully!
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
                    Your listing is now registered in the Karigar seller queue under Draft ASIN <code style={{ color: 'var(--emerald)', fontWeight: 600 }}>B0DKA{Date.now().toString().slice(-5)}</code>.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setShowPublishModal(false); setPublishStatus('idle'); }}
                    style={{
                      background: 'var(--emerald-light)',
                      border: '1px solid var(--emerald-border)',
                      color: 'var(--emerald)',
                      padding: '10px 24px',
                      borderRadius: 100,
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
