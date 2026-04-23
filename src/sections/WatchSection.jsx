import { motion } from 'framer-motion'
import { Watch, RefreshCw, Zap, Footprints } from 'lucide-react'
import { asset } from '../utils/asset'

const ease = [0.16, 1, 0.3, 1]

const features = [
  {
    icon: Footprints,
    color: '#FF8000',
    title: 'Steps & progress — sans l\'iPhone',
    desc: 'La Watch lit directement le capteur via HealthKit. Pas besoin d\'avoir le téléphone en poche.',
  },
  {
    icon: Zap,
    color: '#FF9500',
    title: 'Heures et salaire synchronisés',
    desc: 'Shifts et salaire estimé remontent automatiquement depuis l\'iPhone via WatchConnectivity.',
  },
  {
    icon: RefreshCw,
    color: '#34C759',
    title: 'Mise à jour en arrière-plan',
    desc: 'Les données se rafraîchissent toutes les ~15 min sans ouvrir l\'app. Un bouton manuel est aussi disponible.',
  },
]

function WatchFrame({ src, alt }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: 220 }}>
      {/* Glow behind watch */}
      <div style={{
        position: 'absolute',
        inset: '-30%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(255,100,0,0.20) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Watch body */}
      <div style={{
        padding: 1.5,
        borderRadius: 52,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.14) 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.5), 0 24px 60px rgba(0,0,0,0.7), 0 0 80px rgba(255,90,0,0.10)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          borderRadius: 51,
          background: 'linear-gradient(160deg, #1e1e1e 0%, #0e0e0e 100%)',
          overflow: 'hidden',
          padding: '12px 10px',
          position: 'relative',
        }}>
          {/* Rim light */}
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: 0, width: 2,
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.10) 100%)',
            pointerEvents: 'none',
          }} />

          <img
            src={src} alt={alt}
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 40 }}
            loading="lazy" draggable={false}
          />
        </div>
      </div>

      {/* Digital Crown — right side */}
      <div style={{
        position: 'absolute', top: '30%', right: -6, width: 6, height: '18%',
        background: 'linear-gradient(to left, rgba(255,255,255,0.06), rgba(255,255,255,0.18))',
        borderRadius: '0 3px 3px 0',
        zIndex: 2,
      }} />
      {/* Side button below crown */}
      <div style={{
        position: 'absolute', top: '52%', right: -5, width: 5, height: '10%',
        background: 'linear-gradient(to left, rgba(255,255,255,0.06), rgba(255,255,255,0.14))',
        borderRadius: '0 2px 2px 0',
        zIndex: 2,
      }} />

      {/* Band top */}
      <div style={{
        position: 'absolute', top: -44, left: '15%', right: '15%', height: 48,
        background: 'linear-gradient(to bottom, #1a1a1a, #151515)',
        borderRadius: '10px 10px 0 0',
        border: '1px solid rgba(255,255,255,0.06)',
        zIndex: 0,
      }} />
      {/* Band bottom */}
      <div style={{
        position: 'absolute', bottom: -44, left: '15%', right: '15%', height: 48,
        background: 'linear-gradient(to top, #1a1a1a, #151515)',
        borderRadius: '0 0 10px 10px',
        border: '1px solid rgba(255,255,255,0.06)',
        zIndex: 0,
      }} />
    </div>
  )
}

export default function WatchSection() {
  return (
    <section id="watch" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 70% 55%, rgba(255,100,0,0.08) 0%, transparent 70%)' }}
      />

      <div className="page-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text — left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center"
                style={{ background: 'rgba(255,128,0,0.12)', border: '1px solid rgba(255,128,0,0.2)' }}>
                <Watch size={13} style={{ color: '#FF8000' }} />
              </div>
              <span className="text-xs font-mono uppercase tracking-[0.14em]" style={{ color: 'rgba(255,128,0,0.7)' }}>
                Apple Watch
              </span>
            </div>

            <h2 className="font-display font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08 }}>
              Tout sur le poignet.<br />
              <span className="text-gradient-orange">Sans sortir le téléphone.</span>
            </h2>

            <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
              L'app Watch affiche en temps réel les pas du jour, les calories, les heures travaillées et le salaire estimé — directement depuis votre poignet.
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

          {/* Watch — right */}
          <motion.div
            initial={{ opacity: 0, x: 40, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <WatchFrame src={asset('/watch.jpg')} alt="Work&Walk Apple Watch" />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
