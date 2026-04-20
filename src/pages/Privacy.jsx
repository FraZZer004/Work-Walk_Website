import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../sections/Footer'

const ease = [0.16, 1, 0.3, 1]

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2
        className="font-display font-bold text-white text-xl mb-4"
        style={{ letterSpacing: '-0.02em' }}
      >
        {title}
      </h2>
      <div className="text-sm leading-relaxed space-y-3" style={{ color: 'var(--text-secondary)' }}>
        {children}
      </div>
    </div>
  )
}

export default function Privacy() {
  return (
    <>
      <main className="min-h-screen pt-24 pb-0">
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
              Legal
            </span>
            <h1
              className="mt-3 mb-2 font-display font-bold text-white"
              style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}
            >
              Privacy Policy
            </h1>
            <p className="text-sm mb-12" style={{ color: 'var(--text-tertiary)' }}>
              Last updated: April 2026
            </p>

            {/* Divider */}
            <div className="h-px mb-12" style={{ background: 'rgba(255,255,255,0.06)' }} />

            {/* Content */}
            <Section title="Overview">
              <p>
                Work&Walk is built with your privacy as a first principle. We do not collect, transmit, or store any personal data on external servers. Everything stays on your device.
              </p>
            </Section>

            <Section title="Data We Access">
              <p>
                Work&Walk reads health data (step count, calories burned, distance traveled, heart rate, and floors climbed) exclusively from Apple HealthKit. This data is read locally and is never transmitted to any server.
              </p>
              <p>
                Your schedule, salary settings (hourly rate and deduction percentage), and profile data (weight, height, gender) are stored entirely on your device using Apple's local storage APIs.
              </p>
            </Section>

            <Section title="Apple HealthKit">
              <p>
                Work&Walk requests HealthKit read permissions when you first open the app. You can revoke access at any time from <strong className="text-white">Settings → Privacy & Security → Health → Work&Walk</strong>.
              </p>
              <p>
                HealthKit data is never shared with third parties, never uploaded to a cloud service, and is only used to power the step-tracking and analytics features within the app.
              </p>
            </Section>

            <Section title="Data Storage">
              <p>
                All your data — shifts, salary parameters, health profile, and preferences — is stored locally in the app's sandboxed container on your iPhone. It is not backed up to our servers. If you use iCloud Backup, the app's local data may be included in your personal iCloud backup under Apple's standard policies.
              </p>
            </Section>

            <Section title="In-App Purchases">
              <p>
                Work&Walk offers an optional Premium subscription. All payment processing is handled exclusively by Apple through the App Store. We never see or store your payment details.
              </p>
            </Section>

            <Section title="Analytics & Crash Reporting">
              <p>
                We do not embed any third-party analytics SDKs (e.g., Firebase, Mixpanel, Amplitude). We may receive anonymized crash logs through Apple's standard crash reporting mechanism, which is subject to Apple's own privacy policies.
              </p>
            </Section>

            <Section title="No Data Selling">
              <p>
                We do not sell, rent, or share your data with any third party, advertiser, or data broker. Ever.
              </p>
            </Section>

            <Section title="Children">
              <p>
                Work&Walk is not directed at children under 13. We do not knowingly collect data from children.
              </p>
            </Section>

            <Section title="Changes to This Policy">
              <p>
                If we update this Privacy Policy, we will revise the "Last updated" date above. Continued use of the app after changes constitutes acceptance of the updated policy.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about privacy? Reach us at{' '}
                <a href="mailto:workandwalkapp@gmail.com" className="text-[#FF8000] hover:underline">
                  workandwalkapp@gmail.com
                </a>
                .
              </p>
            </Section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
