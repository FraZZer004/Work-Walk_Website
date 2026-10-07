import { useRef } from 'react'
import { BriefcaseBusiness, Euro, Flame } from 'lucide-react'
import CountUp from './CountUp'
import { useInView } from '../hooks/useInView'
import { prefersReducedMotion } from '../utils/pointer'

/**
 * The home-screen widget, rebuilt in HTML so it stays sharp at any size.
 * It leans towards the mouse; its numbers and bar fill when it scrolls into view.
 */
export default function WidgetTile({ ui, alt }) {
  const tileRef = useRef(null)
  const [viewRef, inView] = useInView()

  const lean = (event) => {
    if (event.pointerType !== 'mouse' || prefersReducedMotion()) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    tileRef.current.style.transitionDuration = '160ms'
    tileRef.current.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 12}deg) translateZ(0)`
  }
  const settle = () => {
    tileRef.current.style.transitionDuration = '700ms'
    tileRef.current.style.transform = ''
  }

  const rows = [
    { icon: BriefcaseBusiness, label: ui.work, value: '8.0h', color: '#ff9f0a', bg: '#2b1d0b' },
    { icon: Flame, label: ui.calories, value: '86 kcal', color: '#ff453a', bg: '#2a1211' },
    { icon: Euro, label: ui.pay, value: '95€', color: '#30d158', bg: '#0f2716' },
  ]

  return (
    <div ref={viewRef} className="w-full [container-type:inline-size] [perspective:1100px]" onPointerMove={lean} onPointerLeave={settle}>
      <div
        ref={tileRef}
        role="img"
        aria-label={alt}
        className={`relative grid aspect-[1016/468] grid-cols-[1fr_auto_1fr] overflow-hidden rounded-[6.2cqw] border border-white/10 bg-[#0b0a09] shadow-[0_3cqw_8cqw_-3cqw_rgba(0,0,0,0.9)] transition-transform ease-out [transform-style:preserve-3d] ${inView ? 'is-in' : ''}`}
      >
        <div className="pointer-events-none absolute -right-[12cqw] -top-[14cqw] h-[46cqw] w-[46cqw] rounded-full bg-[radial-gradient(closest-side,rgba(255,159,10,0.5),transparent)]" />
        <div className="pointer-events-none absolute -bottom-[16cqw] -left-[12cqw] h-[40cqw] w-[40cqw] rounded-full bg-[radial-gradient(closest-side,rgba(255,69,58,0.3),transparent)]" />

        <div className="relative flex flex-col justify-center pl-[6.4cqw] pr-[4cqw]" aria-hidden="true">
          <div className="flex items-center gap-[2cqw]">
            <img src="/icon-192.jpg" alt="" className="h-[6.4cqw] w-[6.4cqw] rounded-full" />
            <span className="text-[3.5cqw] font-semibold">Work&amp;Walk</span>
          </div>
          <p className="mt-[4.2cqw] font-rounded text-[6.6cqw] font-bold leading-none"><CountUp value={2154} start={inView} /></p>
          <p className="mt-[1.6cqw] text-[3.8cqw] font-semibold leading-none text-[#ff9f5a]">{ui.steps}</p>
          <div className="mt-[4.6cqw] h-[0.9cqw] overflow-hidden rounded-full bg-white/10">
            <div className="bar-fill h-full rounded-full bg-gradient-to-r from-[#ffb05a] to-[#ff5a3a]" style={{ '--v': 0.21, '--d': '200ms' }} />
          </div>
          <p className="mt-[2cqw] text-[2.5cqw] text-faint">{ui.goal}</p>
        </div>

        <div className="relative my-[7cqw] w-px bg-white/10" />

        <ul className="relative flex flex-col justify-center gap-[3cqw] pl-[4.4cqw] pr-[4cqw]" aria-hidden="true">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center gap-[2.8cqw]">
              <span className="flex h-[8.2cqw] w-[8.2cqw] shrink-0 items-center justify-center rounded-full" style={{ background: row.bg }}>
                <row.icon className="h-[4.2cqw] w-[4.2cqw]" style={{ color: row.color }} strokeWidth={2.4} />
              </span>
              <span className="leading-none">
                <span className="block text-[2.7cqw] text-muted">{row.label}</span>
                <span className="mt-[1cqw] block text-[4.1cqw] font-bold">{row.value}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
