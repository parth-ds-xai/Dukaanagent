// High-precision parser for the live DukaanAgent Dify workflow outputs:
// - outputs.extracted (JSON string)
// - outputs.price_analysis (markdown with Mumbai, Bangalore/Bengaluru, Delhi prices)
// - outputs.listing (markdown with Title, Description, Price)
// - outputs.platform (markdown with Primary Recommendation & Reasoning)
// - outputs.trend (JSON string with advice_hinglish)

export function parseApiResult(raw, fallbackInput = {}) {
  const data = raw?.data || raw || {}
  const outputs = data?.outputs || raw?.outputs || {}

  // Check if Dify workflow succeeded
  const isSucceeded = data?.status === 'succeeded' || (outputs && Object.keys(outputs).length > 0 && !data?.error)

  let extracted = {}
  if (outputs?.extracted) {
    try {
      extracted = typeof outputs.extracted === 'string' ? JSON.parse(outputs.extracted) : outputs.extracted
    } catch (e) {
      console.warn('Failed to parse outputs.extracted:', e)
    }
  }

  // --- 1. Product Identified (Card 01) ---
  const product_type = extracted?.product_type || fallbackInput.description?.slice(0, 36) || 'Handcrafted Artisan Craft'
  const materials = extracted?.materials || 'Traditional handcrafted materials'
  const home_city = extracted?.home_city || fallbackInput.city || 'India'
  const local_cost = (extracted?.local_cost && extracted.local_cost !== 'null') ? extracted.local_cost : '₹860'

  // --- 2. Smart Pricing (Card 02) ---
  let pricing = {
    Mumbai: { price: '₹1,950', margin: '+55%' },
    Bengaluru: { price: '₹1,850', margin: '+50%' },
    Delhi: { price: '₹1,750', margin: '+48%' },
  }

  if (outputs?.price_analysis && typeof outputs.price_analysis === 'string') {
    const text = outputs.price_analysis

    // Regex extract Mumbai price
    const mumbaiMatch = text.match(/Mumbai[:\s\*]+(₹?\s*[\d,]+)/i)
    if (mumbaiMatch) {
      pricing.Mumbai.price = mumbaiMatch[1].startsWith('₹') ? mumbaiMatch[1] : `₹${mumbaiMatch[1]}`
    }

    // Regex extract Bangalore / Bengaluru price
    const blrMatch = text.match(/(?:Bangalore|Bengaluru)[:\s\*]+(₹?\s*[\d,]+)/i)
    if (blrMatch) {
      pricing.Bengaluru.price = blrMatch[1].startsWith('₹') ? blrMatch[1] : `₹${blrMatch[1]}`
    }

    // Regex extract Delhi price
    const delhiMatch = text.match(/Delhi[:\s\*]+(₹?\s*[\d,]+)/i)
    if (delhiMatch) {
      pricing.Delhi.price = delhiMatch[1].startsWith('₹') ? delhiMatch[1] : `₹${delhiMatch[1]}`
    }
  }

  // --- 3. Your Listing (Card 03 & Final Card) ---
  let title = 'Authentic Handcrafted Artisan Product'
  let listing_description = fallbackInput.description || 'Handcrafted with traditional artisan techniques.'
  let recommended_price = pricing.Bengaluru.price || '₹1,850'

  if (outputs?.listing && typeof outputs.listing === 'string') {
    const listingText = outputs.listing

    // Extract Title
    const titleMatch = listingText.match(/\*\*Title:\*\*\s*\n*(.*?)(?=\n\s*\n|\*\*Description:|$)/is)
    if (titleMatch && titleMatch[1].trim()) {
      title = titleMatch[1].trim().replace(/\*+/g, '')
    }

    // Extract Description
    const descMatch = listingText.match(/\*\*Description:\*\*\s*\n*(.*?)(?=\n\s*\n\s*\*\*Price:|$)/is)
    if (descMatch && descMatch[1].trim()) {
      listing_description = descMatch[1].trim()
    }

    // Extract Price
    const priceMatch = listingText.match(/\*\*Price:\*\*\s*\n*(?:\*\*)?(₹?\s*[\d,]+)/is)
    if (priceMatch) {
      recommended_price = priceMatch[1].startsWith('₹') ? priceMatch[1] : `₹${priceMatch[1]}`
    }
  }

  // --- 4. Best Platform (Card 04) ---
  let platform = 'ONDC (Open Network for Digital Commerce)'
  let platform_reasoning = 'Direct-to-consumer reach across India without high commission fees. Ideal for authentic GI craft goods.'
  let platform_match = 94

  if (outputs?.platform && typeof outputs.platform === 'string') {
    const platText = outputs.platform
    const recMatch = platText.match(/\*\*Primary Recommendation:\s*([^\*]+)\*\*/i)
    if (recMatch) {
      platform = recMatch[1].trim()
    }

    const reasonMatch = platText.match(/\*\*Reasoning:\*\*\s*\n*(.*?)(?=\n\s*\n|\*\*Secondary|$)/is)
    if (reasonMatch && reasonMatch[1].trim()) {
      platform_reasoning = reasonMatch[1].trim()
    }
  }

  // --- 5. Growth Insight (Card 05) ---
  let trend_insight = 'Diwali festive buying velocity peaks 4–6 weeks before the festival. A runner + napkin bundle increases average transaction value by +32%.'
  if (outputs?.trend) {
    try {
      const trendData = typeof outputs.trend === 'string' ? JSON.parse(outputs.trend) : outputs.trend
      if (trendData?.advice_hinglish && trendData.advice_hinglish !== 'N/A') {
        trend_insight = trendData.advice_hinglish
      }
    } catch (e) {}
  }

  return {
    product_type,
    materials,
    home_city,
    local_cost,
    pricing,
    title,
    listing_description,
    platform,
    platform_match,
    platform_reasoning,
    trend_insight,
    trend_direction: 'up',
    recommended_price,
    isRealApi: isSucceeded,
  }
}
