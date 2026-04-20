import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Footer from '../sections/Footer'

const ease = [0.16, 1, 0.3, 1]

const faqs = [
  {
    q: 'How does Apple Health sync work?',
    a: "Work&Walk reads your step count, calories, distance, heart rate, and floor data directly from Apple HealthKit. Tap the \"Refresh\" button on the Dashboard to pull the latest data. No account needed — it all stays on your device.",
  },
  {
    q: 'How is my salary calculated?',
    a: 'Go to the Salary tab and set your gross hourly rate and deduction percentage. Work&Walk multiplies your logged hours from the Schedule by your rate, then applies the deduction to give you an estimated net figure. It\'s an estimate — not a payslip.',
  },
  {
    q: 'Is my data stored in the cloud?',
    a: 'No. All your data — shifts, salary settings, health profile — is stored locally on your iPhone. Nothing is sent to our servers. See our Privacy Policy for full details.',
  },
  {
    q: 'How do I add a work session?',
    a: 'Open the Schedule tab and tap the "+" button (top right). Fill in the date, start time, and end time, then save. You can also long-press any existing shift to edit it, or use the magic wand button to auto-fill recurring shifts.',
  },
  {
    q: 'What does the Magic Fill button do?',
    a: "Magic Fill intelligently fills your remaining work days in the current month based on your existing patterns. It's perfect if you have a regular weekly schedule and don't want to add shifts one by one.",
  },
  {
    q: "What's included in Premium?",
    a: 'Premium unlocks: advanced analytics, PDF salary export, the full trophy library, complete health profile (BMI + metabolism + ideal weight), magic fill, and priority support. Download is free — Premium is an optional upgrade.',
  },
  {
    q: 'Can I use Work&Walk with Apple Watch?',
    a: 'Yes! Work&Walk includes an Apple Watch companion app. View your real-time step count and shift status directly from your wrist.',
  },
  {
    q: 'How do I export my salary report as PDF?',
    a: "Navigate to the Salary tab and tap the blue export button (top right). This generates a clean PDF summary of your month's sessions, hours, and estimated earnings. Requires Premium.",
  },
  {
    q: "I can't see my steps — what should I do?",
    a: 'Make sure you\'ve granted HealthKit permissions: go to Settings → Privacy & Security → Health → Work&Walk, and toggle on "Steps," "Active Energy," and "Distance." Then tap Refresh on the Dashboard.',
  },
]

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease }}
      className="rounded-2xl overflow-hidden"
      style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.05)' }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        onClick={() => setOpen(v => !v)}
      >
        <span className="font-semibold text-sm text-white leading-snug">{q}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} style={{ color: open ? '#FF8000' : 'rgba(255,255,255,0.3)' }} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
          >
            <p
              className="px-5 pb-5 text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)', borderTop: '1px solid rgba(255,255,255,0.04)' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Support() {
  return (
    <>
      <main className="min-h-screen pt-24">
        <div className="page-container max-w-2xl py-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Back */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm mb-10 transition-colors"
              style={{ color: 'var(--text-tertiary)' }}
            >
              ← Back to Work&Walk
            </Link>

            {/* Header */}
            <span className="text-xs font-mono uppercase tracking-[0.14em]" style={{ color: 'rgba(255,128,0,0.7)' }}>
              Help Center
            </span>
            <h1
              className="mt-3 mb-2 font-display font-bold text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
            >
              Support & FAQ
            </h1>
            <p className="text-sm mb-12" style={{ color: 'var(--text-tertiary)' }}>
              Answers to the most common questions about Work&Walk.
            </p>

            <div className="h-px mb-12" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* FAQ list */}
            <div className="flex flex-col gap-3 mb-16">
              {faqs.map((item, i) => (
                <FaqItem key={item.q} q={item.q} a={item.a} index={i} />
              ))}
            </div>

            {/* Contact form */}
            <div
              className="rounded-2xl p-6"
              style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <h2 className="font-display font-bold text-white text-lg mb-1">
                Still need help?
              </h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                Send us a message and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:workandwalkapp@gmail.com?subject=Work%26Walk%20Support"
                className="appstore-btn"
                style={{ width: 'fit-content' }}
              >
                Email Support
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
