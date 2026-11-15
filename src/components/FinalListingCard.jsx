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
          {/* Header preview with craft photo or textile pattern */}
          <div
            style={{
              height: 140,
              background: 'linear-gradient(135deg, #1C130D, #2D1A10)',
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
                  opacity: 0.45,
                  filter: 'brightness(0.7) contrast(1.1)',
                }}
              />
            ) : (
              <div className="textile-pattern" style={{ opacity: 0.35 }} />
            )}

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
              <Sunburst size={40} />
              <div>
                <div style={{ fontSize: 11, color: 'var(--orange)', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Craft Certified
                </div>
                <div style={{ fontSize: 16, color: 'var(--cream)', fontWeight: 500 }}>
                  Authentic Handcrafted Artisan Edition
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                background: 'rgba(12, 10, 9, 0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid var(--border-strong)',
                color: 'var(--cream)',
                fontSize: 12,
                padding: '6px 14px',
                borderRadius: 100,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span>📍</span> Handmade in {data.home_city}
            </div>
          </div>

          <div className="listing-card-header">
            <div>
              <div style={{ fontSize: 11, color: 'var(--cream-dim)', marginBottom: 4 }}>
                Home & Living · Table Linen & Handloom
              </div>
              <div className="listing-card-name">{data.title}</div>
            </div>

            <div
              style={{
                background: 'rgba(58, 124, 90, 0.1)',
                border: '1px solid rgba(58, 124, 90, 0.25)',
                color: '#3A7C5A',
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
                <div style={{ fontSize: 11, color: 'var(--cream-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Target Marketplace
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 20,
                    color: 'var(--cream)',
                    fontWeight: 500,
                  }}
                >
                  {data.platform}
                </div>
              </div>
            </div>

            <div className="listing-desc-block">
              <strong style={{ color: 'var(--cream)', fontSize: 14 }}>{data.title}</strong>
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
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: 12,
                    padding: '12px 14px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontSize: 10, color: 'var(--cream-dim)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--cream-soft)' }}>
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
                  background: 'rgba(232, 131, 56, 0.15)',
                  border: '1px solid rgba(232, 131, 56, 0.35)',
                  color: 'var(--orange)',
                  padding: '13px 20px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {t.publishBtn}
              </button>

              <button
                type="button"
                onClick={() => setShowOndcModal(true)}
                style={{
                  background: 'rgba(230, 218, 201, 0.05)',
                  border: '1px solid var(--border)',
                  color: 'var(--cream-soft)',
                  padding: '13px 18px',
                  borderRadius: 100,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
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
                  color: '#25D366',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
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
                  background: 'rgba(230, 218, 201, 0.05)',
                  border: '1px solid var(--border)',
                  color: 'var(--cream-soft)',
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
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
                borderRadius: 20,
                maxWidth: 640,
                width: '100%',
                maxHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--cream)' }}>
                    ONDC Beckn Retail Catalog Schema
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--cream-dim)' }}>
                    Standard protocol payload for Open Network for Digital Commerce
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowOndcModal(false)}
                  style={{ background: 'none', border: 'none', color: 'var(--cream-dim)', fontSize: 20, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ padding: 20, overflowY: 'auto', flex: 1 }}>
                <pre
                  style={{
                    background: 'rgba(0,0,0,0.5)',
                    padding: 16,
                    borderRadius: 12,
                    fontSize: 12,
                    color: '#C28E3A',
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
                    background: 'rgba(230, 218, 201, 0.08)',
                    border: '1px solid var(--border)',
                    color: 'var(--cream)',
                    padding: '8px 16px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 13,
                  }}
                >
                  Copy JSON
                </button>
                <button
                  type="button"
                  onClick={handleDownloadOndc}
                  style={{
                    background: 'var(--grad-brand)',
                    border: 'none',
                    color: 'var(--cream)',
                    padding: '8px 18px',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 500,
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
                borderRadius: 20,
                maxWidth: 520,
                width: '100%',
                overflow: 'hidden',
                padding: 28,
                boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--cream)', fontFamily: 'var(--font-display)' }}>
                    Direct Marketplace Publish
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--cream-dim)' }}>
                    Target channel: {data.platform} (Amazon Karigar Partner API)
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowPublishModal(false); setPublishStatus('idle'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--cream-dim)', fontSize: 20, cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              {publishStatus === 'idle' && (
                <div>
                  <p style={{ fontSize: 13, color: 'var(--cream-dim)', lineHeight: 1.6, marginBottom: 20 }}>
                    Publishing will push your verified craft listing directly to {data.platform} with the following parameters:
                  </p>

                  <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'var(--cream-dim)' }}>SKU Identifier:</span>
                      <span style={{ color: 'var(--cream)', fontFamily: 'monospace' }}>DKA-{Date.now().toString().slice(-6)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'var(--cream-dim)' }}>Channel Price:</span>
                      <span style={{ color: 'var(--orange)', fontWeight: 600 }}>{data.recommended_price}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--cream-dim)' }}>Commission Bracket:</span>
                      <span style={{ color: '#3A7C5A' }}>5% GI Artisan Rate</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSimulatePublish}
                    style={{
                      width: '100%',
                      background: 'var(--grad-brand)',
                      border: 'none',
                      color: 'var(--cream)',
                      padding: 14,
                      borderRadius: 100,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: 14,
                    }}
                  >
                    Confirm & Publish Listing
                  </button>
                </div>
              )}

              {publishStatus === 'publishing' && (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div className="spinner" style={{ width: 36, height: 36, margin: '0 auto 16px', borderWidth: 3 }} />
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--cream)' }}>
                    Transmitting payload to {data.platform} Seller API…
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--cream-dim)', marginTop: 6 }}>
                    Validating geographical indication and taxonomy compliance
                  </div>
                </div>
              )}

              {publishStatus === 'success' && (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>🎉</div>
                  <div style={{ fontSize: 18, fontWeight: 600, color: '#3A7C5A', fontFamily: 'var(--font-display)', marginBottom: 6 }}>
                    Listing Published Successfully!
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--cream-dim)', marginBottom: 20 }}>
                    Your listing is now registered in the Karigar seller queue under Draft ASIN <code style={{ color: 'var(--orange)' }}>B0DKA{Date.now().toString().slice(-5)}</code>.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setShowPublishModal(false); setPublishStatus('idle'); }}
                    style={{
                      background: 'rgba(230, 218, 201, 0.1)',
                      border: '1px solid var(--border)',
                      color: 'var(--cream)',
                      padding: '10px 24px',
                      borderRadius: 100,
                      cursor: 'pointer',
                      fontSize: 13,
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
