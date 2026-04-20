import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import AppStoreBadge from '../components/AppStoreBadge'
import { asset } from '../utils/asset'

const ease = [0.16, 1, 0.3, 1]

export default function FinalCTA() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Deep radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,128,0,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Top border */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,128,0,0.3), transparent)' }}
      />

      <div className="page-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="flex flex-col items-center gap-8"
        >
          {/* App icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <img
              src={asset('/app-icon.jpg')}
              alt="Work&Walk"
              className="w-24 h-24 rounded-[28px] glow-orange-sm"
              style={{ boxShadow: '0 0 40px rgba(255,128,0,0.25), 0 20px 60px rgba(0,0,0,0.6)' }}
            />
          </motion.div>

          {/* Rating */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.4 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease }}
                >
                  <Star size={20} fill="#FF9500" style={{ color: '#FF9500' }} />
                </motion.div>
              ))}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              "Work&Walk is a game changer — I finally know what my day is worth."
            </p>
          </div>

          {/* Headline */}
          <h2
            className="font-display font-bold text-white max-w-2xl"
            style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.06 }}
          >
            Ready to make every{' '}
            <span className="text-gradient-fire">step count?</span>
          </h2>

          <p className="text-base max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Download Work&Walk free today. Your steps, your shifts, and your salary — all in one app.
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ boxShadow: ['0 0 20px rgba(255,128,0,0.2)', '0 0 40px rgba(255,128,0,0.35)', '0 0 20px rgba(255,128,0,0.2)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-2xl"
            >
              <AppStoreBadge />
            </motion.div>
            <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
              iOS 16+ · iPhone · Apple Watch
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
