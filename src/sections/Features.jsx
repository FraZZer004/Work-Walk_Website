import { motion } from 'framer-motion'
import { Activity, CalendarDays, DollarSign } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const cards = [
  {
    icon: Activity,
    iconBg: 'rgba(255,149,0,0.15)',
    iconColor: '#FF9500',
    borderGlow: 'rgba(255,149,0,0.12)',
    title: 'Apple Health, connected.',
    desc: 'Every step, calorie, and kilometer from your work sessions — automatically synced, beautifully visualized.',
    accent: '#FF9500',
  },
  {
    icon: CalendarDays,
    iconBg: 'rgba(255,128,0,0.15)',
    iconColor: '#FF8000',
    borderGlow: 'rgba(255,128,0,0.12)',
    title: 'Your shifts, your way.',
    desc: 'Log, edit, and visualize your work calendar with monthly totals, smart fill, and clean exports.',
    accent: '#FF8000',
  },
  {
    icon: DollarSign,
    iconBg: 'rgba(52,199,89,0.12)',
    iconColor: '#34C759',
    borderGlow: 'rgba(52,199,89,0.1)',
    title: 'Payday, previewed.',
    desc: 'Enter your hourly rate, we do the math. Export a clean PDF salary report anytime.',
    accent: '#34C759',
  },
]

export default function Features() {
  return (
    <section id="features" className="section-padding">
      <div className="page-container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono uppercase tracking-[0.15em]" style={{ color: 'rgba(255,128,0,0.7)' }}>
            What it does
          </span>
          <h2
            className="mt-3 font-display font-bold text-white"
            style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}
          >
            One app. Three superpowers.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease } }}
                className="glass-card p-7 flex flex-col gap-5 cursor-default group"
                style={{
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.05)`,
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = `0 0 40px ${card.borderGlow}, 0 0 0 1px rgba(255,255,255,0.07)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px rgba(255,255,255,0.05)`
                }}
              >
                <div
                  className="feature-icon-wrap"
                  style={{ background: card.iconBg }}
                >
                  <Icon size={20} style={{ color: card.iconColor }} />
                </div>

                <div>
                  <h3
                    className="font-display font-bold text-white text-lg mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {card.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="mt-auto h-0.5 w-10 rounded-full opacity-60 group-hover:w-16 transition-all duration-300"
                  style={{ background: card.accent }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
