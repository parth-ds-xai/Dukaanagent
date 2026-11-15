export function Sunburst({ size = 80, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="40%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f97316" />
        </radialGradient>
      </defs>
      {/* Rays */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16
        const rad = (angle * Math.PI) / 180
        const isLong = i % 2 === 0
        const inner = 22
        const outer = isLong ? 56 : 44
        const x1 = 60 + inner * Math.cos(rad)
        const y1 = 60 + inner * Math.sin(rad)
        const x2 = 60 + outer * Math.cos(rad)
        const y2 = 60 + outer * Math.sin(rad)
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={isLong ? '#f97316' : '#fbbf24'}
            strokeWidth={isLong ? 2.5 : 1.5}
            strokeLinecap="round"
            opacity={isLong ? 0.9 : 0.6}
          />
        )
      })}
      {/* Outer ring */}
      <circle cx="60" cy="60" r="52" fill="none" stroke="url(#sunburstGrad)" strokeWidth="1" opacity="0.3" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(249,115,22,0.2)" strokeWidth="1" />
      {/* Core */}
      <circle cx="60" cy="60" r="18" fill="url(#coreGrad)" />
      <circle cx="60" cy="60" r="10" fill="#fef9c3" opacity="0.9" />
    </svg>
  )
}
