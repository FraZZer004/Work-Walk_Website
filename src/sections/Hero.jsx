import { useRef } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import DeviceFrame from '../components/DeviceFrame'
import AppStoreBadge from '../components/AppStoreBadge'
import { asset } from '../utils/asset'

const ease = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function Hero() {
  const areaRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-14 - 4, -14 + 4]), { stiffness: 80, damping: 22 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5 + 3, 5 - 3]),  { stiffness: 80, damping: 22 })

  const onMove = (e) => {
    const r = areaRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] rounded-full" style={{ width: 700, height: 700, background: 'radial-gradient(circle, rgba(255,128,0,0.13) 0%, transparent 68%)' }} />
        <div className="absolute bottom-[-10%] left-[-5%] rounded-full"  style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(255,153,0,0.07) 0%, transparent 70%)' }} />
      </div>

      <div className="page-container w-full py-16 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left — text */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-7">
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 text-xs font-mono border rounded-full px-4 py-1.5"
              style={{ borderColor: 'rgba(255,128,0,0.3)', color: '#FF8000', background: 'rgba(255,128,0,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8000] animate-pulse-slow" />
              Available on the App Store
            </span>
          </motion.div>

          <motion.h1 variants={item} className="font-display font-extrabold text-white"
            style={{ fontSize: 'clamp(44px, 6.5vw, 84px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Every step<br />at work<br />
            <span className="text-gradient-fire">counts.</span>
          </motion.h1>

          <motion.p variants={item} className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Work&Walk tracks your steps, logs your shifts, and calculates your net salary — all in one place.
          </motion.p>

          <motion.div variants={item} className="flex flex-col gap-2">
            <div><AppStoreBadge /></div>
            <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              Free to download · Premium available
            </span>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap items-center gap-2 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            {['Steps & calories', 'Shift scheduling', 'Net salary', 'Apple Health sync'].map(label => (
              <span key={label} className="text-xs font-mono px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — phone 3D */}
        <motion.div
          ref={areaRef}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="hidden lg:flex justify-center lg:justify-end items-center"
          style={{ perspective: 900 }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          {/* Glow halo behind the phone */}
          <div className="absolute pointer-events-none" style={{
            width: 480, height: 580,
            background: 'radial-gradient(ellipse at 50% 45%, rgba(255,100,0,0.18) 0%, rgba(255,60,0,0.06) 50%, transparent 75%)',
            borderRadius: '50%',
            filter: 'blur(8px)',
          }} />

          {/* Phone wrapper: float + 3D tilt */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            style={{ rotateY, rotateX, position: 'relative', zIndex: 1 }}
          >
            <DeviceFrame screenshot={asset('/screenshot-home.png')} alt="Work&Walk Dashboard" size="lg" />

            {/* Ground shadow — scales with float */}
            <motion.div
              animate={{ scaleX: [1, 0.88, 1], opacity: [0.6, 0.35, 0.6] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: -28,
                left: '10%',
                right: '10%',
                height: 28,
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, transparent 70%)',
                filter: 'blur(10px)',
                transformOrigin: 'center',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Mobile — flat */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="flex lg:hidden justify-center"
        >
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <DeviceFrame screenshot={asset('/screenshot-home.png')} alt="Work&Walk Dashboard" size="md" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
