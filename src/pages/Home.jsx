import {
  Activity,
  BarChart2,
  RefreshCw,
  FileText,
  Zap,
  CalendarDays,
  Wand2,
  Heart,
  Scale,
  Flame,
} from 'lucide-react'
import { asset } from '../utils/asset'
import Hero from '../sections/Hero'
import Features from '../sections/Features'
import ShowcaseSection from '../sections/ShowcaseSection'
import WatchSection from '../sections/WatchSection'
import WidgetSection from '../sections/WidgetSection'
import Trophies from '../sections/Trophies'
import Premium from '../sections/Premium'
import FinalCTA from '../sections/FinalCTA'
import Footer from '../sections/Footer'

// Section divider
function Divider() {
  return (
    <div className="flex justify-center">
      <div
        className="w-px h-16"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(255,128,0,0.2), transparent)' }}
      />
    </div>
  )
}

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <Hero />

      <Divider />

      {/* 2. Feature highlights — 3 glass cards */}
      <Features />

      <Divider />

      {/* 3. Dashboard showcase */}
      <ShowcaseSection
        id="dashboard"
        side="right"
        screenshot={asset('/screenshot-home.png')}
        screenshotAlt="Work&Walk Dashboard"
        badge="Dashboard"
        headline="Your workday,"
        headlineAccent="at a glance."
        description="Real-time counters for today's steps and hours worked. Sync Apple Health in one tap, see your weekly bar chart, and jump to any feature from the home screen."
        features={[
          { icon: Activity, title: 'Live step counter', desc: 'Steps for today, updated in real time from Apple Health.', color: '#FF9500' },
          { icon: BarChart2, title: 'Weekly bar chart', desc: 'Work vs. Personal steps for the last 7 days, side by side.', color: '#FF8000' },
          { icon: RefreshCw, title: 'Refresh data', desc: 'One tap to pull the latest data from Apple Health.', color: '#FF9900' },
        ]}
        bgGlow="orange"
      />

      <Divider />

      {/* 4. Analytics showcase */}
      <ShowcaseSection
        id="analytics"
        side="left"
        screenshot={asset('/screenshot-analyse.png')}
        screenshotAlt="Work&Walk Analytics"
        badge="Analytics"
        headline="Your metrics."
        headlineAccent="Deeply yours."
        description="Navigate week by week. Compare Work vs. Personal steps, calories, distance, heart rate, and floors. Every metric has a progress bar so you see exactly where you stand."
        features={[
          { icon: Activity, title: 'Work vs. Personal', desc: 'See exactly how much activity came from your shifts.', color: '#FF9500' },
          { icon: Heart, title: 'Heart rate tracking', desc: 'Monitor your exertion across every work session.', color: '#FF2D55' },
          { icon: BarChart2, title: 'Weekly navigation', desc: 'Browse any past week with a simple ← → swipe.', color: '#34C759' },
        ]}
        counter={{ to: 32820, label: 'example — steps tracked in a week', prefix: '' }}
        bgGlow="none"
      />

      <Divider />

      {/* 5. Salary showcase */}
      <ShowcaseSection
        id="salary"
        side="right"
        screenshot={asset('/screenshot-salary.png')}
        screenshotAlt="Work&Walk Salary"
        badge="Salary"
        headline="Finally know what you"
        headlineAccent="actually earned."
        description="Enter your hourly rate and deduction percentage. Work&Walk calculates your estimated net salary from your logged hours — and lets you export a clean PDF report."
        features={[
          { icon: Zap, title: 'Net salary calculator', desc: 'Gross rate × hours worked, minus your deduction %.', color: '#FF8000' },
          { icon: FileText, title: 'Export PDF', desc: 'One-tap monthly report, ready to share or archive.', color: '#007AFF' },
          { icon: BarChart2, title: 'Month navigation', desc: 'Browse any previous month with clean history.', color: '#FF9500' },
        ]}
        counter={{ to: 559.05, decimals: 2, prefix: '$', label: 'example — estimated net salary for a month' }}
        bgGlow="gold"
      />

      <Divider />

      {/* 6. Schedule showcase */}
      <ShowcaseSection
        id="schedule"
        side="left"
        screenshot={asset('/screenshot-schedule.png')}
        screenshotAlt="Work&Walk Schedule"
        badge="Schedule"
        headline="Your shifts,"
        headlineAccent="your calendar."
        description="A full monthly calendar with work days highlighted in orange. Switch between calendar and list view, add shifts manually, or let the magic wand fill your month automatically."
        features={[
          { icon: CalendarDays, title: 'Monthly calendar', desc: 'Work days highlighted in orange. Tap for shift details.', color: '#FF8000' },
          { icon: Wand2, title: 'Magic fill', desc: 'Smart auto-complete fills your recurring schedule instantly.', color: '#FF9900' },
          { icon: FileText, title: 'List view', desc: 'Prefer a list? Switch with one tap and see all shifts cleanly.', color: '#32ADE6' },
        ]}
        counter={{ to: 61, suffix: 'h', label: 'example — hours logged in a month' }}
        bgGlow="none"
      />

      <Divider />

      {/* 7. Health & Physique showcase */}
      <ShowcaseSection
        id="health"
        side="right"
        screenshot={asset('/screenshot-profile.png')}
        screenshotAlt="Work&Walk Health Profile"
        badge="Health"
        headline="Walk more."
        headlineAccent="Live better."
        description="Track your BMI with a color-coded gauge, calculate your basal metabolic rate, and discover your theoretical ideal weight — all without any cloud uploads."
        features={[
          { icon: Scale, title: 'BMI tracker', desc: 'Color-coded gauge from Underweight to Obese, always current.', color: '#34C759' },
          { icon: Flame, title: 'Basal metabolism', desc: 'Daily calorie needs calculated from your real measurements.', color: '#FF9500' },
          { icon: Heart, title: 'Ideal weight', desc: 'Theoretical target based on height, gender, and standard formulas.', color: '#FF2D55' },
        ]}
        bgGlow="green"
      />

      <Divider />

      {/* 8. Apple Watch */}
      <WatchSection />

      <Divider />

      {/* 9. Widget iOS */}
      <WidgetSection />

      <Divider />

      {/* 10. Trophies */}
      <Trophies />

      <Divider />

      {/* 9. Premium */}
      <Premium />

      <Divider />

      {/* 10. Final CTA */}
      <FinalCTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}
