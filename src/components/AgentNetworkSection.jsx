import { useState } from 'react'

const AGENT_ROSTER = [
  {
    id: 'voice',
    icon: '⌁',
    name: 'Voice Companion',
    role: 'Multilingual voice agent',
    status: '12 languages · Agent active',
    color: '#E88338',
    chat: [
      {
        sender: 'artisan',
        name: 'Ismailbhai (Kutch)',
        text: 'Maine ek natural indigo aur madder dye ka table runner banaya hai. Do din lagte hain. Isko online kitne me bechu?',
        time: 'Just now',
        audio: true,
      },
      {
        sender: 'agent',
        name: 'Voice Companion',
        text: 'Aapka Ajrakh block-print kaam bahut anmol hai! Market analysis ke hisaab se Delhi me ₹1,650 aur Mumbai me ₹1,850 sabse sahi daam rahega. Isse aapko 48% se zyada ka bachat (margin) milega.',
        time: '0.4s ago',
        audio: true,
      },
    ],
  },
  {
    id: 'craft',
    icon: '◇',
    name: 'Craft Intelligence',
    role: 'Vision + language agent',
    status: 'Taxonomy v4.2 · Active',
    color: '#D96B43',
    chat: [
      {
        sender: 'artisan',
        name: 'Artisan Studio',
        text: 'Identified raw materials: Teakwood hand-carved blocks, natural fermented indigo vat, harda mordant treatment on unbleached 20s cotton.',
        time: '1m ago',
      },
      {
        sender: 'agent',
        name: 'Craft Intelligence',
        text: 'Verified: Traditional 16-stage Kutch Ajrakh resist dyeing technique. Geographical Indication (GI) tag criteria met. Generating authenticity verification tokens for marketplace trust score.',
        time: '45s ago',
      },
    ],
  },
  {
    id: 'price',
    icon: '₹',
    name: 'Pricing Strategist',
    role: 'Market reasoning agent',
    status: '3 metros scanned · Active',
    color: '#C28E3A',
    chat: [
      {
        sender: 'artisan',
        name: 'System Trigger',
        text: 'Comparing local maker cost ₹860 against metropolitan premium textile clusters.',
        time: '2m ago',
      },
      {
        sender: 'agent',
        name: 'Pricing Strategist',
        text: 'Optimized pricing matrix: Delhi (₹1,650, 48% margin), Mumbai (₹1,850, 55% margin), Bengaluru (₹1,750, 50% margin). Accounts for logistics, platform commissions, and festive gift purchasing power.',
        time: '1.2m ago',
      },
    ],
  },
  {
    id: 'listing',
    icon: '✦',
    name: 'Listing Concierge',
    role: 'Commerce writing agent',
    status: 'SEO engine · Active',
    color: '#7A3E48',
    chat: [
      {
        sender: 'artisan',
        name: 'Draft Request',
        text: 'Generate Amazon Karigar & Etsy compliant catalog titles and narrative description.',
        time: '3m ago',
      },
      {
        sender: 'agent',
        name: 'Listing Concierge',
        text: 'Listing composed with 94% SEO keyword saturation for "Handwoven Kutch Ajrakh Table Runner". Formatted with artisanal heritage storytelling to appeal to luxury home decor buyers.',
        time: '2.5m ago',
      },
    ],
  },
]

export default function AgentNetworkSection() {
  const [selectedAgent, setSelectedAgent] = useState('voice')
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState({})

  const currentAgent = AGENT_ROSTER.find(a => a.id === selectedAgent) || AGENT_ROSTER[0]
  const currentChat = messages[selectedAgent] || currentAgent.chat

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg = {
      sender: 'artisan',
      name: 'You (Artisan)',
      text: inputText,
      time: 'Just now',
    }

    const agentReply = {
      sender: 'agent',
      name: currentAgent.name,
      text: `Noted. Processing "${inputText}" through ${currentAgent.role} models to calibrate live market access.`,
      time: 'Instant',
    }

    setMessages(prev => ({
      ...prev,
      [selectedAgent]: [...currentChat, newMsg, agentReply],
    }))
    setInputText('')
  }

  return (
    <section className="static-section section" id="agent-network">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="section-label">A team of agents, working as one</span>
          <h2 className="section-title">The DukaanAgent Network</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Four specialized autonomous agents collaborate in the background, each managing a specific domain of your craft business.
          </p>
        </div>

        <div className="agent-network">
          {/* Left sidebar agent switcher */}
          <div className="agent-sidebar">
            <div className="agent-sidebar-title">Active Autonomous Agents</div>
            {AGENT_ROSTER.map((agent) => (
              <div
                key={agent.id}
                className={`agent-item ${selectedAgent === agent.id ? 'active' : ''}`}
                onClick={() => setSelectedAgent(agent.id)}
                style={{
                  borderLeft: selectedAgent === agent.id ? `2px solid ${agent.color}` : '2px solid transparent',
                }}
              >
                <div
                  className="agent-avatar"
                  style={{
                    background: `${agent.color}15`,
                    color: agent.color,
                    border: `1px solid ${agent.color}30`,
                    fontWeight: 600,
                  }}
                >
                  {agent.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="agent-name">{agent.name}</div>
                  <div className="agent-role">{agent.role}</div>
                </div>
                <div
                  className="agent-status-dot"
                  style={{ background: '#3A7C5A' }}
                  title="Agent Active"
                />
              </div>
            ))}
          </div>

          {/* Right chat / console pane */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Console Header */}
            <div
              style={{
                padding: '16px 24px',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(12, 10, 9, 0.4)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: `${currentAgent.color}20`,
                    color: currentAgent.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {currentAgent.icon}
                </span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--cream)' }}>
                    {currentAgent.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--cream-dim)' }}>
                    {currentAgent.status}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#3A7C5A' }}>
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#3A7C5A',
                    display: 'inline-block',
                    animation: 'blink 2s infinite',
                  }}
                />
                Live Network Node
              </div>
            </div>

            {/* Message stream */}
            <div className="agent-chat" style={{ flex: 1 }}>
              {currentChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`chat-msg ${msg.sender === 'artisan' ? 'outgoing' : ''}`}
                >
                  <div
                    className="chat-avatar"
                    style={{
                      background: msg.sender === 'artisan' ? 'rgba(232, 131, 56, 0.15)' : `${currentAgent.color}20`,
                      color: msg.sender === 'artisan' ? 'var(--orange)' : currentAgent.color,
                    }}
                  >
                    {msg.sender === 'artisan' ? '👤' : currentAgent.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: 'var(--cream-dim)',
                        marginBottom: 4,
                        textAlign: msg.sender === 'artisan' ? 'right' : 'left',
                      }}
                    >
                      {msg.name} · {msg.time}
                    </div>
                    <div className="chat-bubble">
                      {msg.text}
                      {msg.audio && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                          <span style={{ fontSize: 12 }}>🔊</span>
                          <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            {[12, 18, 24, 16, 28, 20, 14, 22, 10].map((h, i) => (
                              <div
                                key={i}
                                style={{
                                  width: 2,
                                  height: h * 0.6,
                                  background: currentAgent.color,
                                  borderRadius: 1,
                                }}
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: 10, color: 'var(--cream-dim)', marginLeft: 4 }}>Voice note</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Console Input Bar */}
            <form
              onSubmit={handleSend}
              style={{
                padding: '16px 20px',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                gap: 10,
                alignItems: 'center',
                background: 'rgba(12, 10, 9, 0.5)',
              }}
            >
              <button
                type="button"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--cream-dim)',
                  fontSize: 16,
                  cursor: 'pointer',
                  padding: '4px',
                }}
                title="Voice input"
              >
                ⌁
              </button>
              <input
                type="text"
                placeholder={`Ask ${currentAgent.name} in Hindi, Gujarati, or English...`}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                style={{
                  flex: 1,
                  background: 'rgba(230, 218, 201, 0.04)',
                  border: '1px solid var(--border)',
                  borderRadius: 100,
                  padding: '10px 18px',
                  color: 'var(--cream)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--grad-brand)',
                  border: 'none',
                  color: 'var(--cream)',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ↑
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
