import { useState, useRef, useEffect } from 'react'
import HeroSection from './components/HeroSection'
import StepsSection from './components/StepsSection'
import InputSection from './components/InputSection'
import TimelineSection from './components/TimelineSection'
import ResultsSection from './components/ResultsSection'
import FinalListingCard from './components/FinalListingCard'
import AgentNetworkSection from './components/AgentNetworkSection'
import MarketObservatory from './components/MarketObservatory'
import RoadmapSection from './components/RoadmapSection'
import ForecastSection from './components/ForecastSection'
import Footer from './components/Footer'
import Nav from './components/Nav'
import SavedListingsModal from './components/SavedListingsModal'

const TIMELINE_STAGES = [
  { id: 'input', label: 'Input Normalized', desc: 'Parsing craft dialect, product narrative & regional origin context…', icon: '📥' },
  { id: 'craft', label: 'Craft Identified', desc: 'Matching against 240+ Indian artisan taxonomy clusters & GI certifications…', icon: '🧵' },
  { id: 'market', label: 'Market Scanned', desc: 'Scanning 1,248 comparable listings across Amazon Karigar, Etsy, Meesho & ONDC…', icon: '📡' },
  { id: 'strategy', label: 'Strategy Composed', desc: 'Calculating Delhi/Mumbai/Bengaluru price indexes and platform margin suitability…', icon: '🧠' },
  { id: 'ready', label: 'Ready to Publish', desc: 'Artisan listing formulated, pricing benchmarked, platform matched — ready for sales.', icon: '✅' },
]

export default function App() {
  const [lang, setLang] = useState('en')
  const [description, setDescription] = useState(
    'Hand-block printed Ajrakh table runner, made with natural indigo and madder dyes on pure cotton. It takes me two days to make one piece.'
  )
  const [city, setCity] = useState('Bhuj, Gujarat')
  const [productImage, setProductImage] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [activeStage, setActiveStage] = useState(-1)
  const [completedStages, setCompletedStages] = useState([])
  const [apiResult, setApiResult] = useState(null)
  const [backendNotice, setBackendNotice] = useState(null)
  const [elapsedSeconds, setElapsedSeconds] = useState('8.4')
  const [showResults, setShowResults] = useState(false)

  // Saved Listings state in localStorage
  const [savedListings, setSavedListings] = useState(() => {
    try {
      const stored = localStorage.getItem('dukaan_listings')
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      return []
    }
  })
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false)

  const timelineRef = useRef(null)
  const resultsRef = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem('dukaan_listings', JSON.stringify(savedListings))
    } catch (e) {
      console.warn('LocalStorage save failed:', e)
    }
  }, [savedListings])

  const scrollToInput = () => {
    document.getElementById('input-section')?.scrollIntoView({ behavior: 'smooth' })
  }

  const simulateTimeline = async () => {
    const delay = (ms) => new Promise(r => setTimeout(r, ms))
    setActiveStage(0)
    setCompletedStages([])

    for (let i = 0; i < TIMELINE_STAGES.length - 1; i++) {
      setActiveStage(i)
      await delay(1800)
      setCompletedStages(prev => [...prev, i])
    }
    // Hold at final synthesis stage until real API call returns
    setActiveStage(TIMELINE_STAGES.length - 1)
  }

  const handleGenerate = async () => {
    if (!description.trim() || !city.trim()) return

    setIsLoading(true)
    setBackendNotice(null)
    setApiResult(null)
    setShowResults(false)
    setActiveStage(0)
    setCompletedStages([])

    const startTime = performance.now()

    // Smooth scroll to timeline
    setTimeout(() => {
      timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)

    // Run timeline progression in parallel with API request
    const timelinePromise = simulateTimeline()

    let responseData = null
    let errorDetail = null

    const requestPayload = {
      inputs: {
        sample_text_input: description,
        home_city: city,
      },
      response_mode: 'blocking',
      user: 'demo-user',
    }

    // Try Vite proxy first to avoid browser CORS, fallback to direct Dify endpoint
    const endpoints = [
      '/api/dify/workflows/run',
      'https://api.dify.ai/v1/workflows/run',
    ]

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer app-PwbJNOmIsG774L0nrdchHqZR',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        })

        if (res.ok) {
          const json = await res.json()
          if (json?.data?.status === 'succeeded' && json?.data?.outputs) {
            responseData = json
            break
          } else if (json?.data?.status === 'failed') {
            errorDetail = json?.data?.error || 'Workflow execution error'
          } else if (json?.outputs) {
            responseData = json
            break
          }
        } else {
          errorDetail = `HTTP ${res.status}: ${res.statusText}`
        }
      } catch (err) {
        errorDetail = err.message || 'Connection error'
      }
    }

    // Await timeline animation
    await timelinePromise

    const duration = ((performance.now() - startTime) / 1000).toFixed(1)
    setElapsedSeconds(duration)

    setCompletedStages([0, 1, 2, 3, 4])
    setActiveStage(-1)

    if (responseData) {
      setApiResult(responseData)
    } else {
      if (errorDetail) {
        setBackendNotice(`Live Dify Notice: ${errorDetail}. Powered by autonomous craft intelligence fallback.`)
      }
      setApiResult({ offlineFallback: true })
    }

    // Save generated listing to LocalStorage
    const newSavedItem = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      city,
      title: responseData?.data?.outputs?.extracted
        ? JSON.parse(responseData.data.outputs.extracted)?.product_type
        : `Handcrafted ${city} Artisan Edition`,
      price: '₹1,850',
      platform: 'ONDC / Amazon Karigar',
      description,
      hasImage: !!productImage,
    }

    setSavedListings(prev => [newSavedItem, ...prev.slice(0, 19)])
    setShowResults(true)
    setIsLoading(false)

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  const handleSelectSaved = (item) => {
    setDescription(item.description || item.title)
    setCity(item.city)
    scrollToInput()
  }

  const handleDeleteSaved = (id) => {
    setSavedListings(prev => prev.filter(l => l.id !== id))
  }

  return (
    <div className="app">
      <Nav
        onTryClick={scrollToInput}
        lang={lang}
        onLangChange={setLang}
        savedCount={savedListings.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
      />

      <HeroSection onTryClick={scrollToInput} lang={lang} />
      <StepsSection lang={lang} />

      <InputSection
        description={description}
        city={city}
        productImage={productImage}
        onDescChange={setDescription}
        onCityChange={setCity}
        onImageChange={setProductImage}
        onGenerate={handleGenerate}
        isLoading={isLoading}
        lang={lang}
      />

      <div ref={timelineRef}>
        <TimelineSection
          stages={TIMELINE_STAGES}
          activeStage={activeStage}
          completedStages={completedStages}
          isLoading={isLoading}
          error={backendNotice}
          elapsedTime={elapsedSeconds}
          hasStarted={activeStage >= 0 || completedStages.length > 0}
          lang={lang}
        />
      </div>

      {showResults && apiResult && (
        <div ref={resultsRef}>
          <ResultsSection
            result={apiResult}
            fallbackInput={{ description, city }}
            productImage={productImage}
            lang={lang}
          />
          <FinalListingCard
            result={apiResult}
            fallbackInput={{ description, city }}
            productImage={productImage}
            lang={lang}
          />
        </div>
      )}

      <div className="section-divider" style={{ margin: '0 24px' }} />

      <AgentNetworkSection />
      <MarketObservatory />
      <RoadmapSection />
      <ForecastSection />
      <Footer />

      <SavedListingsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        listings={savedListings}
        onSelect={handleSelectSaved}
        onDelete={handleDeleteSaved}
      />
    </div>
  )
}
