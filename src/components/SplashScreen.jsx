import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { asset } from '../utils/asset'

// Single ripple wave — starts at logo size, expands outward and fades
function RippleWave({ delay, toScale, opacity, strokeWidth, blur }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: 140,
        height: 140,
        border: `${strokeWidth}px solid rgba(255,128,0,${opacity})`,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        pointerEvents: 'none',
      }}
      initial={{ scale: 1, opacity }}
      animate={{ scale: toScale, opacity: 0 }}
      transition={{
        duration: 1.5,
        delay,
        ease: [0.0, 0.0, 0.4, 1.0],
      }}
    />
  )
}

export default function SplashScreen({ onFinished }) {
  const [opening, setOpening] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    // Start curtain opening after ripple animation plays
    const t1 = setTimeout(() => setOpening(true), 2200)
    // Remove splash from DOM after curtain is fully gone
    const t2 = setTimeout(() => {
      setDone(true)
      onFinished?.()
    }, 3100)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [onFinished])

  if (done) return null

  // Custom easing matching SwiftUI .timingCurve(0.6, 0.1, 0.3, 1.0)
  const curtainEase = [0.6, 0.1, 0.3, 1.0]

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 9999 }}>

      {/* ── TOP CURTAIN — diagonal bottom edge ─────────────────────────── */}
      {/* Matches SwiftUI path: (0,0)→(w,0)→(w,h*0.45)→(0,h*0.60) */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 45%, 0% 60%)' }}
        animate={{ y: opening ? '-100%' : '0%' }}
        transition={{ duration: 0.8, ease: curtainEase }}
      />

      {/* ── BOTTOM CURTAIN — diagonal top edge ─────────────────────────── */}
      {/* Matches SwiftUI path: (0,h*0.59)→(w,h*0.44)→(w,h)→(0,h) */}
      <motion.div
        className="absolute inset-0 bg-black"
        style={{ clipPath: 'polygon(0% 59%, 100% 44%, 100% 100%, 0% 100%)' }}
        animate={{ y: opening ? '100%' : '0%' }}
        transition={{ duration: 0.8, ease: curtainEase }}
      />

      {/* ── LOGO + RIPPLES — fades out as soon as curtain starts ────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Ripple waves — largest first in DOM so they render behind */}
        {/* Wave 4: widest, most transparent, most blur */}
        <RippleWave delay={0.45} toScale={3.5} opacity={0.2} strokeWidth={1} blur={6} />
        {/* Wave 3 */}
        <RippleWave delay={0.3}  toScale={2.8} opacity={0.4} strokeWidth={2} blur={4} />
        {/* Wave 2 */}
        <RippleWave delay={0.15} toScale={2.0} opacity={0.6} strokeWidth={3} blur={2} />
        {/* Wave 1: tightest, solid orange, no blur */}
        <RippleWave delay={0}    toScale={1.4} opacity={1.0} strokeWidth={4} blur={0} />

        {/* App logo — subtle heartbeat matching wave 1 */}
        <motion.img
          src={asset('/app-icon.jpg')}
          alt="Work&Walk"
          className="absolute rounded-full object-cover"
          style={{
            width: 140,
            height: 140,
            boxShadow:
              '0 0 30px rgba(255,128,0,0.65), 0 0 60px rgba(255,128,0,0.2)',
          }}
          animate={{ scale: [1.0, 0.96, 1.0] }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  )
}
