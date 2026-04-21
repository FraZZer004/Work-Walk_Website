export default function DeviceFrame({ screenshot, alt, size = 'md', glow = true }) {
  const widths = { sm: 200, md: 260, lg: 320 }
  const w = widths[size] || widths.md

  const outerR  = Math.round(w * 0.135)
  const screenR = Math.round(w * 0.085)
  const bezelV  = Math.round(w * 0.04)
  const bezelH  = Math.round(w * 0.032)
  const diW     = Math.round(w * 0.31)
  const diH     = Math.round(w * 0.055)
  const diTop   = Math.round(w * 0.025)

  return (
    <div className="relative flex-shrink-0 select-none" style={{ width: w }}>

      {/* Titanium gradient ring — wraps the body, creates metallic border illusion */}
      <div style={{
        padding: 1.5,
        borderRadius: outerR + 2,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.04) 55%, rgba(255,255,255,0.18) 100%)',
        boxShadow: glow
          ? [
              '0 2px 4px rgba(0,0,0,0.5)',
              '0 20px 50px rgba(0,0,0,0.7)',
              '0 60px 100px rgba(0,0,0,0.45)',
              '0 0 90px rgba(255,90,0,0.10)',
            ].join(', ')
          : '0 20px 60px rgba(0,0,0,0.75)',
      }}>

        {/* Phone body */}
        <div style={{
          borderRadius: outerR,
          background: 'linear-gradient(160deg, #212121 0%, #131313 50%, #0c0c0c 100%)',
          padding: `${bezelV}px ${bezelH}px`,
          position: 'relative',
          overflow: 'hidden',
        }}>

          {/* Left rim light */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0, left: 0,
            width: 2,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.12) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Screen area */}
          <div style={{ borderRadius: screenR, overflow: 'hidden', background: '#000', position: 'relative' }}>

            {/* Dynamic Island */}
            <div style={{
              position: 'absolute', top: diTop, left: '50%', transform: 'translateX(-50%)',
              width: diW, height: diH,
              background: '#000', borderRadius: 100, zIndex: 10, pointerEvents: 'none',
            }} />

            <img
              src={screenshot} alt={alt}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              loading="lazy" draggable={false}
            />

            {/* Glass sheen — top-left light source */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, transparent 55%)',
              pointerEvents: 'none', zIndex: 5,
            }} />

            {/* Screen edge inner shadow */}
            <div style={{
              position: 'absolute', inset: 0,
              boxShadow: 'inset 0 0 16px rgba(0,0,0,0.4)',
              borderRadius: screenR,
              pointerEvents: 'none', zIndex: 6,
            }} />
          </div>
        </div>
      </div>

      {/* Hardware buttons */}
      <div style={{ position:'absolute', top:'18%', left:-2.5, width:2.5, height:'5.5%', background:'rgba(255,255,255,0.12)', borderRadius:'2px 0 0 2px' }} />
      <div style={{ position:'absolute', top:'27%', left:-2.5, width:2.5, height:'9%',   background:'rgba(255,255,255,0.12)', borderRadius:'2px 0 0 2px' }} />
      <div style={{ position:'absolute', top:'38%', left:-2.5, width:2.5, height:'9%',   background:'rgba(255,255,255,0.12)', borderRadius:'2px 0 0 2px' }} />
      <div style={{ position:'absolute', top:'28%', right:-2.5, width:2.5, height:'14%', background:'rgba(255,255,255,0.12)', borderRadius:'0 2px 2px 0' }} />
    </div>
  )
}
