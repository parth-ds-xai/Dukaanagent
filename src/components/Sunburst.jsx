export function Sunburst({ size = 80, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
    >
      <defs>
        {/* Vermilion to Emerald Radial Gradient */}
        <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E34222" />
          <stop offset="55%" stopColor="#D45B30" />
          <stop offset="85%" stopColor="#046A38" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#046A38" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF4E6" />
          <stop offset="40%" stopColor="#FBD38D" />
          <stop offset="75%" stopColor="#E34222" />
          <stop offset="100%" stopColor="#046A38" />
        </radialGradient>
        <filter id="sunburstGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Decorative Outer Aura */}
      <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(4, 106, 56, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(227, 66, 34, 0.2)" strokeWidth="1" />

      {/* Radiating Artisan Sun Spokes */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16
        const rad = (angle * Math.PI) / 180
        const isLong = i % 2 === 0
        const inner = 22
        const outer = isLong ? 54 : 42
        const x1 = 60 + inner * Math.cos(rad)
        const y1 = 60 + inner * Math.sin(rad)
        const x2 = 60 + outer * Math.cos(rad)
        const y2 = 60 + outer * Math.sin(rad)
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={isLong ? '#E34222' : '#046A38'}
            strokeWidth={isLong ? 2.5 : 1.75}
            strokeLinecap="round"
            opacity={isLong ? 0.95 : 0.8}
          />
        )
      })}

      {/* Middle Golden Ring */}
      <circle cx="60" cy="60" r="26" fill="none" stroke="#046A38" strokeWidth="1.2" opacity="0.35" />

      {/* Central Radiant Core */}
      <circle cx="60" cy="60" r="18" fill="url(#coreGrad)" />
      <circle cx="60" cy="60" r="9" fill="#FFF9F0" />
      <circle cx="60" cy="60" r="4" fill="#E34222" />
    </svg>
  )
}
