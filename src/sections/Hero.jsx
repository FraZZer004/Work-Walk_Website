import { motion } from 'framer-motion'
import DeviceFrame from '../components/DeviceFrame'
import AppStoreBadge from '../components/AppStoreBadge'

const ease = [0.16, 1, 0.3, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className="font-mono font-medium text-base text-[#FF8000]">{value}</span>
      <span className="text-xs text-white/35 font-sans">{label}</span>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Background radial glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-15%] right-[-10%] rounded-full"
          style={{
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(255,128,0,0.13) 0%, transparent 68%)',
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] rounded-full"
          style={{
            width: 500,
            height: 500,
            background: 'radial-gradient(circle, rgba(255,153,0,0.07) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="page-container w-full py-16 md:py-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-7"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 text-xs font-mono border rounded-full px-4 py-1.5"
              style={{ borderColor: 'rgba(255,128,0,0.3)', color: '#FF8000', background: 'rgba(255,128,0,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8000] animate-pulse-slow" />
              Available on the App Store
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display font-extrabold text-white"
            style={{ fontSize: 'clamp(44px, 6.5vw, 84px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
          >
            Every step<br />
            at work<br />
            <span className="text-gradient-fire">counts.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={item} className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Work&Walk tracks your steps, logs your shifts, and calculates your net salary — all in one place.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-col gap-2">
            <div>
              <AppStoreBadge />
            </div>
            <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              Free to download · Premium available
            </span>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={item}
            className="flex items-center gap-5 pt-2 border-t"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}
          >
            <StatPill value="32,820" label="steps tracked" />
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <StatPill value="61h" label="shifts logged" />
            <div className="w-px h-6" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <StatPill value="$559" label="calculated" />
          </motion.div>
        </motion.div>

        {/* Right — device */}
        <motion.div
          initial={{ opacity: 0, x: 56, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease }}
          className="flex justify-center lg:justify-end"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <DeviceFrame
              screenshot="/screenshot-home.png"
              alt="Work&Walk Dashboard"
              size="lg"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
