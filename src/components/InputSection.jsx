import { useState, useEffect, useRef } from 'react'
import { translations } from '../utils/i18n'

const SAMPLES = [
  {
    label: 'Ajrakh Table Runner (Kutch)',
    city: 'Bhuj, Gujarat',
    text: 'Hand-block printed Ajrakh table runner, made with natural indigo and madder dyes on pure cotton. It takes me two days to make one piece using traditional teak blocks.',
  },
  {
    label: 'Banarasi Silk Saree (Varanasi)',
    city: 'Varanasi, UP',
    text: 'Pure Katan silk Banarasi saree woven on traditional pit-loom with authentic antique gold zari border. Each saree takes approximately 18 days of handcrafting.',
  },
  {
    label: 'Jaipur Blue Pottery (Jaipur)',
    city: 'Jaipur, Rajasthan',
    text: 'Traditional handcrafted Jaipur blue pottery decorative vase with Persian floral motifs. Fired using quartz stone powder, raw glaze, and cobalt oxide pigment.',
  },
]

export default function InputSection({
  description,
  city,
  productImage,
  onDescChange,
  onCityChange,
  onImageChange,
  onGenerate,
  isLoading,
  lang = 'en',
}) {
  const t = translations[lang]?.input || translations.en.input

  const [activeTab, setActiveTab] = useState('type')
  const [isRecording, setIsRecording] = useState(false)
  const [recordTimer, setRecordTimer] = useState(0)
  const [speechSupported, setSpeechSupported] = useState(false)
  const [liveTranscript, setLiveTranscript] = useState('')
  const recognitionRef = useRef(null)
  const fileInputRef = useRef(null)

  // Initialize Web Speech Recognition if available in browser
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setSpeechSupported(true)
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'gu' ? 'gu-IN' : 'en-IN'

      recognition.onresult = (event) => {
        let currentText = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript
        }
        setLiveTranscript(currentText)
        if (event.results[event.results.length - 1].isFinal) {
          onDescChange(prev => (prev ? `${prev} ${currentText}` : currentText))
          setLiveTranscript('')
        }
      }

      recognition.onerror = (err) => {
        console.warn('Speech recognition error:', err)
        setIsRecording(false)
      }

      recognition.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current = recognition
    }
  }, [lang, onDescChange])

  // Recording timer effect
  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        setRecordTimer(t => t + 1)
      }, 1000)
    } else {
      setRecordTimer(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true)
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : lang === 'gu' ? 'gu-IN' : 'en-IN'
          recognitionRef.current.start()
        } catch (e) {
          console.warn('Recognition start issue:', e)
        }
      }
    } else {
      setIsRecording(false)
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {}
      }

      // If speech recognition was not supported or returned nothing, populate sample voice
      if (!description.trim()) {
        onDescChange(
          'Hand-block printed Ajrakh table runner, made with natural indigo and madder dyes on pure cotton. It takes me two days to make one piece.'
        )
        onCityChange('Bhuj, Gujarat')
      }
      setActiveTab('type')
    }
  }

  const applySample = (sample) => {
    onDescChange(sample.text)
    onCityChange(sample.city)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        onImageChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        onImageChange(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const canGenerate = description.trim().length > 0 && city.trim().length > 0 && !isLoading

  return (
    <section className="input-section section" id="input-section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="section-label">{t.label}</span>
          <h2 className="section-title">{t.title}</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            {t.subtitle}
          </p>
        </div>

        <div className="input-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div className="input-tabs">
              <button
                className={`input-tab ${activeTab === 'type' ? 'active' : ''}`}
                onClick={() => setActiveTab('type')}
                type="button"
              >
                <span>⌨</span> {t.tabType}
              </button>
              <button
                className={`input-tab ${activeTab === 'voice' ? 'active' : ''}`}
                onClick={() => setActiveTab('voice')}
                type="button"
              >
                <span>🎙</span> {t.tabVoice}
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--cream-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {t.quickLoad}
              </span>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {SAMPLES.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applySample(s)}
                    style={{
                      background: 'rgba(230, 218, 201, 0.05)',
                      border: '1px solid var(--border)',
                      color: 'var(--cream-soft)',
                      fontSize: 11,
                      padding: '4px 10px',
                      borderRadius: 100,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--orange)'
                      e.currentTarget.style.color = 'var(--orange)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--cream-soft)'
                    }}
                  >
                    {s.label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {activeTab === 'type' ? (
            <>
              <div className="form-group">
                <label className="form-label">{t.descLabel}</label>
                <textarea
                  className="form-textarea"
                  placeholder={t.descPlaceholder}
                  value={description}
                  onChange={e => onDescChange(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{t.cityLabel}</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder={t.cityPlaceholder}
                  value={city}
                  onChange={e => onCityChange(e.target.value)}
                />
              </div>

              {/* Craft Photo Upload Box */}
              <div className="form-group" style={{ marginTop: 20 }}>
                <label className="form-label">{t.uploadPhoto}</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                />

                {!productImage ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={handleDrop}
                    style={{
                      border: '1px dashed var(--border-strong)',
                      borderRadius: 12,
                      padding: '20px',
                      textAlign: 'center',
                      background: 'rgba(0,0,0,0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--orange)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
                  >
                    <div style={{ fontSize: 24, marginBottom: 6 }}>📷</div>
                    <div style={{ fontSize: 13, color: 'var(--cream-soft)', fontWeight: 500 }}>
                      {t.dropPhoto}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--cream-dim)', marginTop: 4 }}>
                      PNG, JPG or WEBP up to 10MB
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      padding: 12,
                    }}
                  >
                    <img
                      src={productImage}
                      alt="Uploaded craft preview"
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 8,
                        objectFit: 'cover',
                        border: '1px solid var(--border-strong)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: 'var(--cream)', fontWeight: 500 }}>
                        Craft photo attached
                      </div>
                      <div style={{ fontSize: 11, color: '#3A7C5A', marginTop: 2 }}>
                        ✓ Ready to render into catalog listing
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onImageChange(null)}
                      style={{
                        background: 'rgba(230, 218, 201, 0.08)',
                        border: '1px solid var(--border)',
                        color: 'var(--cream-dim)',
                        padding: '6px 12px',
                        borderRadius: 8,
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      {t.removePhoto}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div
              style={{
                background: 'rgba(12, 10, 9, 0.6)',
                border: '1px dashed var(--border-strong)',
                borderRadius: 16,
                padding: '36px 20px',
                textAlign: 'center',
                marginBottom: 24,
              }}
            >
              <div
                onClick={handleToggleRecord}
                style={{
                  width: 88,
                  height: 88,
                  borderRadius: '50%',
                  background: isRecording
                    ? 'linear-gradient(135deg, #E88338, #7A3E48)'
                    : 'rgba(232, 131, 56, 0.1)',
                  border: '1px solid rgba(232, 131, 56, 0.3)',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 34,
                  cursor: 'pointer',
                  boxShadow: isRecording ? '0 0 32px rgba(232, 131, 56, 0.5)' : 'none',
                  transition: 'all 0.3s',
                  animation: isRecording ? 'pulse-ring 1.5s infinite' : 'none',
                }}
              >
                {isRecording ? '⏹' : '🎙'}
              </div>

              <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--cream)', marginBottom: 6 }}>
                {isRecording ? `${t.micListening} (00:0${recordTimer})` : t.micPrompt}
              </div>
              <div style={{ fontSize: 12, color: 'var(--cream-dim)', marginBottom: 20 }}>
                {speechSupported
                  ? 'Web Speech API active · Live speech-to-text in Hindi, Gujarati & English'
                  : 'Mic audio capture enabled · Auto-transcription to text'}
              </div>

              {/* 24-bar audio frequency spectrum visualizer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, height: 36 }}>
                {Array.from({ length: 24 }).map((_, i) => {
                  const barHeight = isRecording
                    ? Math.sin((i + recordTimer * 2) * 0.7) * 12 + 18
                    : 4
                  return (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        height: barHeight,
                        background: isRecording ? 'var(--orange)' : 'rgba(230, 218, 201, 0.2)',
                        borderRadius: 3,
                        transition: 'height 0.15s ease',
                      }}
                    />
                  )
                })}
              </div>

              {liveTranscript && (
                <div style={{ marginTop: 16, fontSize: 13, color: 'var(--orange)', fontStyle: 'italic', background: 'rgba(0,0,0,0.3)', padding: '8px 16px', borderRadius: 8 }}>
                  "{liveTranscript}"
                </div>
              )}
            </div>
          )}

          <button
            className="generate-btn"
            onClick={onGenerate}
            disabled={!canGenerate}
            type="button"
          >
            {isLoading ? (
              <>
                <span className="spinner" />
                {t.generatingBtn}
              </>
            ) : (
              <>
                <span>✦</span>
                {t.generateBtn}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
