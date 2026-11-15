# DukaanAgent — Artisan Commerce Intelligence

> **AI-powered pricing, listings, and market access for Indian artisans — in their own language, in minutes.**

DukaanAgent is an artisan commerce platform that transforms simple craft descriptions or voice notes into a complete digital commerce strategy, complete with regional pricing intelligence, catalog-ready product copy, marketplace matching, and seasonal growth roadmaps.

---

## 🌟 Key Features

### 1. Functional Features
- **Natural Craft Ingestion**: Type in any language or select regional craft presets (*Kutch Ajrakh*, *Varanasi Banarasi Silk*, *Jaipur Blue Pottery*).
- **Native Web Speech-to-Text**: Real-time browser speech recognition with 24-bar audio frequency visualizer in Hindi, Gujarati, and English.
- **Craft Photo Upload**: Drag-and-drop or select product images (PNG, JPG, WEBP) to render directly into your generated product listing.
- **Autonomous Orchestration Timeline**: Animated 5-stage progress tracker (*Input Normalized → Craft Identified → Market Scanned → Strategy Composed → Ready to Publish*) with live execution metrics and confidence scoring.
- **5-Card Decision Matrix**:
  - **Card 01 (Identify)**: Heritage craft classification, materials, origin, and baseline maker cost.
  - **Card 02 (Price)**: Dynamic 3-city retail price breakdown (**Delhi NCR**, **Mumbai**, **Bengaluru**) with fair artisan margins (+48% to +55%).
  - **Card 03 (List)**: Catalog title, storytelling narrative, and craft photo preview.
  - **Card 04 (Match)**: Target marketplace recommendation (e.g., **Amazon Karigar**, **ONDC**) with fee and logistics advantages.
  - **Card 05 (Grow)**: 12-month demand velocity chart and festive bundling insights.
- **Workshop-to-Storefront Card**:
  - One-click clipboard copy (`navigator.clipboard`).
  - Direct WhatsApp customer sharing.
  - One-click link sharing.
  - **Export to ONDC**: Generates standard Beckn Retail Catalog Protocol JSON (`ONDC:RET10`) with download support.
  - **Direct Marketplace Publish**: Simulates channel publishing to Amazon Karigar with live ASIN/SKU assignment.
- **Saved Listings (LocalStorage)**: Automatically persists generated strategies locally with a management drawer.
- **Full Multilingual UI**: Real-time toggle between **English**, **हिंदी (Hindi)**, and **ગુજરાતી (Gujarati)**.

### 2. Vision & Concept Screens
- **Agent Network**: Interactive multi-agent console featuring 4 specialized agents (*Voice Companion*, *Craft Intelligence*, *Pricing Strategist*, *Listing Concierge*) with bilingual dialogue.
- **Market Observatory**: Top KPI cards (₹2.8L Revenue Potential, 92% Karigar fit), City Demand Index across 4 metros, and a 1,248-signal comparable market dataset table with pagination.
- **90-Day Roadmap**: 4 sequenced milestone phases (*Foundation*, *Validate*, *Expand*, *Scale*) towards a ₹2.8L target volume.
- **Seasonal Demand Forecast**: Interactive SVG curve showing the 60-day pre-Diwali demand velocity with hoverable milestones (*Today*, *Oct 12 Gift Rush*, *Diwali Peak*).

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 4, Pure CSS3 Design Tokens
- **Typography**: Fraunces (Display Serif) & Poppins / Inter (Sans-Serif)
- **Visualizations**: Pure SVG Curved Area Charts, Circular Progress Gauges, Animated Audio Spectrum Bars
- **AI Backend Integration**: Dify.ai Workflow Runner API (`/v1/workflows/run`)
- **Networking**: Client-side fetch + Vite dev reverse proxy (`/api/dify`)
- **Persistence & Audio**: Browser LocalStorage & Web Speech API

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/dukaanagent.git

# Navigate into project directory
cd dukaanagent

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

MIT License. Crafted with care for India's handmade economy.
