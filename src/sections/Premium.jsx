import { motion } from 'framer-motion'
import { Crown, BarChart2, FileText, Sparkles, Lock, Trophy, Activity } from 'lucide-react'
import AppStoreBadge from '../components/AppStoreBadge'

const ease = [0.16, 1, 0.3, 1]

const premiumFeatures = [
  { icon: BarChart2, label: 'Advanced Analytics', desc: 'Deep-dive stats across all your sessions.' },
  { icon: FileText, label: 'PDF Export', desc: 'Beautiful monthly salary reports, shareable anywhere.' },
  { icon: Trophy, label: 'All Trophies', desc: 'Unlock the full achievement library.' },
  { icon: Activity, label: 'BMI & Metabolism', desc: 'Full health profile with ideal weight and BMR.' },
  { icon: Sparkles, label: 'Magic Fill', desc: 'AI-assisted schedule completion for the month.' },
  { icon: Lock, label: 'Priority Support', desc: 'Direct line to the team whenever you need help.' },
]

export default function Premium() {
  return (
    <section id="premium" className="section-padding relative overflow-hidden">
      {/* Subtle gold radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,221,0,0.055) 0%, transparent 70%)',
        }}
      />

      <div className="page-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="max-w-2xl mx-auto"
        >
          {/* Premium card */}
          <div
            className="rounded-3xl p-px"
            style={{
              background: 'linear-gradient(135deg, rgba(255,221,0,0.35) 0%, rgba(255,153,0,0.2) 50%, rgba(255,221,0,0.1) 100%)',
            }}
          >
            <div
              className="rounded-3xl p-8 md:p-12 text-center"
              style={{ background: 'linear-gradient(160deg, #1A1500 0%, #0F0F0F 60%, #0A0A0A 100%)' }}
            >
              {/* Crown */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="flex justify-center mb-6"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #FFDD00 0%, #FF9900 100%)' }}
                >
                  <Crown size={32} className="text-black" />
                </div>
              </motion.div>

              {/* Heading */}
              <span className="text-xs font-mono uppercase tracking-[0.14em] text-[#FFDD00]/70">
                Work&Walk Premium
              </span>
              <h2
                className="mt-3 font-display font-bold text-gradient-premium"
                style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}
              >
                Go further with Premium.
              </h2>
              <p className="mt-4 text-base max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Unlock the full power of Work&Walk. One subscription, every feature.
              </p>

              {/* Features grid */}
              <div className="grid sm:grid-cols-2 gap-4 mt-10 text-left">
                {premiumFeatures.map((f, i) => {
                  const Icon = f.icon
                  return (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.07, ease }}
                      className="flex items-start gap-3 p-4 rounded-2xl"
                      style={{ background: 'rgba(255,221,0,0.05)', border: '1px solid rgba(255,221,0,0.08)' }}
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: 'rgba(255,221,0,0.1)' }}
                      >
                        <Icon size={17} style={{ color: '#FFDD00' }} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{f.label}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center gap-3 mt-10">
                <AppStoreBadge />
                <p className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>
                  Free download · Premium unlocks everything
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
