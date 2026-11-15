import { translations } from '../utils/i18n'

const STEPS_BY_LANG = {
  en: [
    { num: '01', glyph: '⌁', title: 'Listen', subtitle: 'Your story, your language', desc: 'Speak or type in Hindi, Gujarati, Tamil, Bengali, or English. No tech jargon needed.', color: '#E88338' },
    { num: '02', glyph: '◇', title: 'Identify', subtitle: 'Craft, material, technique', desc: 'The AI maps your craft to India’s heritage taxonomy, extraction of materials & artisan technique.', color: '#D96B43' },
    { num: '03', glyph: '₹', title: 'Price', subtitle: 'City-wise market value', desc: 'Real-time price benchmarking across Delhi, Mumbai & Bengaluru to safeguard fair artisan margins.', color: '#C28E3A' },
    { num: '04', glyph: '≡', title: 'List', subtitle: 'A polished product story', desc: 'Compelling SEO-optimized titles and poetic product descriptions crafted for high buyer trust.', color: '#7A3E48' },
    { num: '05', glyph: '◎', title: 'Match', subtitle: 'The right marketplace', desc: 'Direct matching to Amazon Karigar, Meesho, Etsy, or ONDC based on category fit & commission.', color: '#4A7C94' },
  ],
  hi: [
    { num: '01', glyph: '⌁', title: 'सुनें', subtitle: 'आपकी कहानी, आपकी भाषा', desc: 'हिंदी, गुजराती, तमिल या अंग्रेज़ी में बोलें। किसी तकनीकी ज्ञान की आवश्यकता नहीं।', color: '#E88338' },
    { num: '02', glyph: '◇', title: 'पहचानें', subtitle: 'शिल्प, सामग्री और तकनीक', desc: 'एआई आपके हस्तशिल्प को भारत के पारंपरिक शिल्प डेटाबेस और जीआई मानकों से जोड़ता है।', color: '#D96B43' },
    { num: '03', glyph: '₹', title: 'मूल्य तय करें', subtitle: 'शहर-अनुसार उचित मूल्य', desc: 'दिल्ली, मुंबई और बेंगलुरु में कीमतों का विश्लेषण करके उचित लाभ सुनिश्चित करता है।', color: '#C28E3A' },
    { num: '04', glyph: '≡', title: 'लिस्टिंग बनाएं', subtitle: 'आकर्षक उत्पाद कथा', desc: 'एसईओ-अनुकूलित शीर्षक और शिल्प की कहानी जो खरीदारों का विश्वास जीत सके।', color: '#7A3E48' },
    { num: '05', glyph: '◎', title: 'बाज़ार जोड़ें', subtitle: 'सही मंच का चयन', desc: 'अमेज़न कारीगर, मीशो, एट्सी या ओएनडीसी में से सबसे अनुकूल मंच का सुझाव।', color: '#4A7C94' },
  ],
  gu: [
    { num: '01', glyph: '⌁', title: 'સાંભળો', subtitle: 'તમારી વાત, તમારી ભાષા', desc: 'ગુજરાતી, હિન્દી કે અંગ્રેજીમાં બોલો. કોઈ ટેકનિકલ જ્ઞાનની જરૂર નથી.', color: '#E88338' },
    { num: '02', glyph: '◇', title: 'ઓળખો', subtitle: 'ક્રાફ્ટ, કાચો માલ અને પદ્ધતિ', desc: 'એઆઈ તમારી હસ્તકળાને ભારતીય પરંપરાગત કળા અને જીઆઈ ટેગ્સ સાથે સરખાવે છે.', color: '#D96B43' },
    { num: '03', glyph: '₹', title: 'ભાવ નક્કી કરો', subtitle: 'શહેરો મુજબ વાજબી કિંમત', desc: 'મુંબઈ, દિલ્હી અને બેંગલુરુના બજારોનું વિશ્લેષણ કરીને સારો નફો નક્કી કરે છે.', color: '#C28E3A' },
    { num: '04', glyph: '≡', title: 'લિસ્ટિંગ બનાવો', subtitle: 'સુંદર પ્રોડક્ટ વાર્તા', desc: 'એસઈઓ આધારિત ટાઇટલ અને કારીગરીનું સુંદર વર્ણન જે ગ્રાહકોને આકર્ષે.', color: '#7A3E48' },
    { num: '05', glyph: '◎', title: 'બજાર પસંદ કરો', subtitle: 'યોગ્ય પ્લેટફોર્મ', desc: 'એમેઝોન કારીગર, મીશો, એટ્સી કે ઓએનડીસીમાંથી શ્રેષ્ઠ વિકલ્પની ભલામણ.', color: '#4A7C94' },
  ],
}

export default function StepsSection({ lang = 'en' }) {
  const t = translations[lang]?.steps || translations.en.steps
  const steps = STEPS_BY_LANG[lang] || STEPS_BY_LANG.en

  return (
    <section className="steps-section section" id="steps">
      <div className="container">
        <span className="section-label">{t.label}</span>
        <h2 className="section-title">
          {t.title}
        </h2>
        <p className="section-desc">
          {t.subtitle}
        </p>

        <div className="steps-grid">
          {steps.map((step, i) => (
            <div className="step-card" key={step.num}>
              <div className="step-num">{step.num}</div>
              <div
                className="step-icon"
                style={{
                  background: `${step.color}15`,
                  color: step.color,
                  border: `1px solid ${step.color}30`,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {step.glyph}
              </div>
              <div className="step-title">{step.title}</div>
              <div
                style={{
                  fontSize: 11,
                  color: step.color,
                  fontWeight: 500,
                  marginBottom: 8,
                  letterSpacing: '0.02em',
                }}
              >
                {step.subtitle}
              </div>
              <div className="step-desc">{step.desc}</div>
              {i < steps.length - 1 && (
                <span className="step-connector">›</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
