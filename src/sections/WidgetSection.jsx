import { motion } from 'framer-motion'
import { LayoutGrid, Eye, RefreshCw } from 'lucide-react'
import { asset } from '../utils/asset'

const ease = [0.16, 1, 0.3, 1]

const features = [
  {
    icon: Eye,
    color: '#FF8000',
    title: 'Everything at a glance',
    desc: 'Steps, hours, calories, and salary — visible without unlocking, without opening the app.',
  },
  {
    icon: LayoutGrid,
    color: '#FF9500',
    title: 'Progress bar toward your goal',
    desc: 'The orange gauge shows exactly where you stand against your 10,000-step target.',
  },
  {
    icon: RefreshCw,
    color: '#34C759',
    title: 'Auto-refresh, always up to date',
    desc: 'The widget updates every 15 minutes in the background. Always current, never intrusive.',
  },
]

function WidgetFrame({ src, alt }) {
  return (
    <div className="relative" style={{ maxWidth: 400 }}>
      {/* Glow behind widget */}
      <div style={{
        position: 'absolute',
        inset: '-25%',
        background: 'radial-gradient(ellipse at 60% 40%, rgba(255,100,0,0.18) 0%, rgba(255,40,0,0.06) 50%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Widget frame */}
      <div style={{
        padding: 1.5,
        borderRadius: 28,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.12) 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5), 0 24px 60px rgba(0,0,0,0.65), 0 0 70px rgba(255,90,0,0.12)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ borderRadius: 27, overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
          <img
            src={src} alt={alt}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            loading="lazy" draggable={false}
          />
          {/* Glass sheen */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 45%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Ground shadow */}
      <div style={{
        position: 'absolute',
        bottom: -16, left: '10%', right: '10%', height: 24,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
        filter: 'blur(10px)',
        zIndex: 0,
      }} />
    </div>
  )
}

export default function WidgetSection() {
  return (
    <section id="widget" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 30% 55%, rgba(255,80,0,0.07) 0%, transparent 70%)' }}
      />

      <div className="page-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Widget — left */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease }}
            className="flex justify-center lg:justify-start"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <WidgetFrame src={asset('/widget.jpg')} alt="Work&Walk iOS Widget" />
            </motion.div>
          </motion.div>

          {/* Text — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.2)' }}>
                <LayoutGrid size={13} style={{ color: '#FF8000' }} />
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.14em]" style={{ color: 'rgba(255,128,0,0.7)' }}>
                iOS Widget
              </span>
            </div>

            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08 }}>
              Your day,<br />
              <span className="text-gradient-orange">seen in a second.</span>
            </h2>

            <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
              Add the medium widget to your home screen: steps, hours, calories, and today's salary — no app, no tap, no effort.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                    className="flex items-start gap-4"
                  >
                    <div className="feature-icon-wrap mt-0.5" style={{ background: `${f.color}18` }}>
                      <Icon size={18} style={{ color: f.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white mb-0.5">{f.title}</p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
