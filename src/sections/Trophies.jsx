import { motion } from 'framer-motion'
import { Heart, Activity, CalendarDays, Clock, DollarSign, TrendingUp, Flame, Zap, Award, Star } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const categories = [
  {
    label: 'Health',
    color: '#FF9500',
    bg: 'rgba(255,149,0,0.12)',
    trophies: [
      { icon: Heart, name: 'First Steps', desc: 'Log your first 1,000 steps' },
      { icon: Activity, name: 'Power Walker', desc: 'Reach 10,000 steps in a shift' },
      { icon: Zap, name: 'Calorie Crusher', desc: 'Burn 500 kcal in a day' },
    ],
  },
  {
    label: 'Sessions',
    color: '#FF6666',
    bg: 'rgba(255,102,102,0.12)',
    trophies: [
      { icon: CalendarDays, name: 'First Shift', desc: 'Log your very first session' },
      { icon: Award, name: 'Regular', desc: 'Log 20 shifts total' },
      { icon: Star, name: 'Veteran', desc: 'Complete 100 sessions' },
    ],
  },
  {
    label: 'Time',
    color: '#FFBF00',
    bg: 'rgba(255,191,0,0.12)',
    trophies: [
      { icon: Clock, name: 'Early Bird', desc: 'Log a shift before 7am' },
      { icon: Award, name: 'Century', desc: 'Reach 100 hours worked' },
      { icon: Star, name: 'Dedicated', desc: 'Work 200 hours total' },
    ],
  },
  {
    label: 'Money',
    color: '#CC6600',
    bg: 'rgba(204,102,0,0.12)',
    trophies: [
      { icon: DollarSign, name: 'First Paycheck', desc: 'Calculate your first salary' },
      { icon: TrendingUp, name: 'Rising', desc: 'Calculate $500 in a month' },
      { icon: Award, name: 'High Earner', desc: 'Hit $1,000 monthly estimate' },
    ],
  },
  {
    label: 'Streak',
    color: '#FF7200',
    bg: 'rgba(255,114,0,0.12)',
    trophies: [
      { icon: Flame, name: 'On Fire', desc: 'Work 5 days in a row' },
      { icon: Zap, name: 'Unstoppable', desc: 'Maintain a 14-day streak' },
      { icon: Star, name: 'Legend', desc: 'Keep a 30-day streak' },
    ],
  },
]

function TrophyCard({ icon: Icon, name, desc, color, bg, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass-card p-4 flex flex-col items-center text-center gap-3 cursor-default"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ background: bg }}
      >
        <Icon size={22} style={{ color }} />
      </div>
      <div>
        <p className="font-semibold text-sm text-white">{name}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
      </div>
    </motion.div>
  )
}

export default function Trophies() {
  let globalIndex = 0

  return (
    <section id="trophies" className="section-padding">
      <div className="page-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-14"
        >
          <span className="text-xs font-mono uppercase tracking-[0.14em]" style={{ color: 'rgba(255,128,0,0.7)' }}>
            Achievements
          </span>
          <h2
            className="mt-3 font-display font-bold text-white"
            style={{ fontSize: 'clamp(30px, 4vw, 48px)' }}
          >
            Earn your badges.{' '}
            <span className="text-gradient-orange">Own your progress.</span>
          </h2>
          <p className="mt-4 text-base max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Unlock trophies across 5 categories as you build the habit of tracking your work life.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="flex flex-col gap-12">
          {categories.map((cat) => (
            <div key={cat.label}>
              {/* Category label */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="flex items-center gap-3 mb-5"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                <span
                  className="text-sm font-semibold font-mono"
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
                <div className="flex-1 h-px" style={{ background: `${cat.color}20` }} />
              </motion.div>

              {/* Trophy grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {cat.trophies.map((t) => {
                  const idx = globalIndex++
                  return (
                    <TrophyCard
                      key={t.name}
                      icon={t.icon}
                      name={t.name}
                      desc={t.desc}
                      color={cat.color}
                      bg={cat.bg}
                      index={idx}
                    />
                  )
                })}
                {/* Locked placeholder trophies */}
                {[...Array(3)].map((_, i) => {
                  const idx = globalIndex++
                  return (
                    <motion.div
                      key={`locked-${i}`}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.04, ease }}
                      className="glass-card p-4 flex flex-col items-center text-center gap-3 opacity-30"
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                      >
                        <Award size={22} style={{ color: 'rgba(255,255,255,0.2)' }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white/30">Locked</p>
                        <p className="text-xs mt-0.5 text-white/15">Keep going...</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
