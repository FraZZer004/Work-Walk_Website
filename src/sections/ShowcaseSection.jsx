import { motion } from 'framer-motion'
import DeviceFrame from '../components/DeviceFrame'
import AnimatedCounter from '../components/AnimatedCounter'

const ease = [0.16, 1, 0.3, 1]

// Reusable alternating showcase layout — phone left or right
export default function ShowcaseSection({
  id,
  side = 'right',          // 'left' | 'right' — which side the phone is on
  screenshot,
  screenshotAlt,
  badge,
  headline,
  headlineAccent,          // optional string to color in orange/gradient
  description,
  features = [],           // [{ icon: LucideIcon, title, desc, color? }]
  counter,                 // { to, prefix, suffix, decimals, label } — animated counter
  bgGlow = 'none',         // 'orange' | 'gold' | 'green' | 'none'
  children,                // extra content below features
}) {
  const glowStyle = {
    orange: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,128,0,0.10) 0%, transparent 70%)',
    gold:   'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,221,0,0.07) 0%, transparent 70%)',
    green:  'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(52,199,89,0.08) 0%, transparent 70%)',
    none:   'none',
  }[bgGlow]

  const phoneFirst = side === 'left'

  const textContent = (
    <motion.div
      initial={{ opacity: 0, x: phoneFirst ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease }}
      className="flex flex-col gap-6"
    >
      {/* Badge */}
      {badge && (
        <span
          className="text-xs font-mono uppercase tracking-[0.14em]"
          style={{ color: 'rgba(255,128,0,0.7)' }}
        >
          {badge}
        </span>
      )}

      {/* Animated counter (optional big number) */}
      {counter && (
        <p
          className="font-display font-bold text-[#FF8000]"
          style={{ fontSize: 'clamp(40px, 5vw, 64px)', letterSpacing: '-0.03em', lineHeight: 1 }}
        >
          <AnimatedCounter
            to={counter.to}
            prefix={counter.prefix}
            suffix={counter.suffix}
            decimals={counter.decimals || 0}
          />
        </p>
      )}
      {counter?.label && (
        <p className="text-sm font-mono -mt-4" style={{ color: 'var(--text-tertiary)' }}>
          {counter.label}
        </p>
      )}

      {/* Headline */}
      <h2
        className="font-display font-bold text-white"
        style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08 }}
      >
        {headline}
        {headlineAccent && (
          <>
            {' '}
            <span className="text-gradient-orange">{headlineAccent}</span>
          </>
        )}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      )}

      {/* Feature list */}
      {features.length > 0 && (
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
                <div
                  className="feature-icon-wrap mt-0.5"
                  style={{ background: f.color ? `${f.color}18` : 'rgba(255,128,0,0.12)' }}
                >
                  <Icon size={18} style={{ color: f.color || '#FF8000' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white mb-0.5">{f.title}</p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {children}
    </motion.div>
  )

  const phoneContent = (
    <motion.div
      initial={{ opacity: 0, x: phoneFirst ? -40 : 40, y: 16 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, ease }}
      className="flex justify-center"
    >
      <DeviceFrame
        screenshot={screenshot}
        alt={screenshotAlt}
        size="lg"
      />
    </motion.div>
  )

  return (
    <section
      id={id}
      className="section-padding relative overflow-hidden"
      style={{ background: bgGlow !== 'none' ? glowStyle : undefined }}
    >
      {/* Glow layer */}
      {bgGlow !== 'none' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glowStyle }}
        />
      )}

      <div className="page-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {phoneFirst ? (
            <>
              {phoneContent}
              {textContent}
            </>
          ) : (
            <>
              {textContent}
              {phoneContent}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
