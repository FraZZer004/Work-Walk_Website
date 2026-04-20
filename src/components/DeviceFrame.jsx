// iPhone 16 Pro CSS mockup — bezel approach, screenshot fills screen naturally (no crop)
export default function DeviceFrame({ screenshot, alt, size = 'md', glow = true }) {
  const widths = { sm: 200, md: 260, lg: 320 }
  const w = widths[size] || widths.md

  // Radii scale with phone width
  const outerRadius = Math.round(w * 0.135)   // phone body corner
  const screenRadius = Math.round(w * 0.085)  // screen area corner (inset from body)

  // Bezel thickness (top/bottom more pronounced than sides)
  const bezelV = Math.round(w * 0.04)   // vertical (top/bottom)
  const bezelH = Math.round(w * 0.032)  // horizontal (left/right)

  // Dynamic Island size
  const diWidth = Math.round(w * 0.31)
  const diHeight = Math.round(w * 0.055)
  const diTop = Math.round(w * 0.025)

  return (
    <div
      className="relative flex-shrink-0 select-none"
      style={{ width: w }}
    >
      {/* Phone body — no overflow:hidden here, just the outer shell */}
      <div
        style={{
          background: 'linear-gradient(160deg, #1A1A1A 0%, #0D0D0D 100%)',
          borderRadius: outerRadius,
          border: '2px solid rgba(255,255,255,0.10)',
          padding: `${bezelV}px ${bezelH}px`,
          boxShadow: glow
            ? '0 0 0 1px rgba(0,0,0,0.85), 0 48px 96px rgba(0,0,0,0.75), 0 0 60px rgba(255,128,0,0.09)'
            : '0 0 0 1px rgba(0,0,0,0.85), 0 48px 96px rgba(0,0,0,0.75)',
          position: 'relative',
        }}
      >
        {/* Screen area — clips content at screen radius */}
        <div
          style={{
            borderRadius: screenRadius,
            overflow: 'hidden',
            position: 'relative',
            background: '#000',
            display: 'block',
          }}
        >
          {/* Dynamic Island overlay */}
          <div
            style={{
              position: 'absolute',
              top: diTop,
              left: '50%',
              transform: 'translateX(-50%)',
              width: diWidth,
              height: diHeight,
              background: '#000',
              borderRadius: 100,
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* Screenshot — full width, natural height, no cropping */}
          <img
            src={screenshot}
            alt={alt}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            loading="lazy"
            draggable={false}
          />

          {/* Subtle sheen */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(140deg, rgba(255,255,255,0.035) 0%, transparent 55%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Left: mute button */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: -3,
          width: 3,
          height: '5.5%',
          background: 'rgba(255,255,255,0.13)',
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* Left: volume up */}
      <div
        style={{
          position: 'absolute',
          top: '27%',
          left: -3,
          width: 3,
          height: '9%',
          background: 'rgba(255,255,255,0.13)',
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* Left: volume down */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: -3,
          width: 3,
          height: '9%',
          background: 'rgba(255,255,255,0.13)',
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* Right: power button */}
      <div
        style={{
          position: 'absolute',
          top: '28%',
          right: -3,
          width: 3,
          height: '14%',
          background: 'rgba(255,255,255,0.13)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  )
}
