import { Fragment } from 'react'
import { ArrowRight, Bell, CalendarDays, Footprints, Globe, Lock, Map, ScanFace, Wand2 } from 'lucide-react'
import Compare from '../components/Compare'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'
import { trackPointer } from '../utils/pointer'

const icons = { wand: Wand2, bell: Bell, calendar: CalendarDays, lock: Lock, footprints: Footprints, globe: Globe, map: Map }

function ProTag() {
  return <span className="rounded-full bg-accent px-2 py-0.5 text-[0.6875rem] font-bold tracking-wide text-white">PRO</span>
}

/** A photographed schedule being read: the beam passes, the sessions appear. */
function ScanVisual() {
  const sessions = ['08:00 – 16:30', '09:00 – 17:00', '14:00 – 22:00']
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6" aria-hidden="true">
      <div className="relative h-36 w-28 shrink-0 -rotate-3 overflow-hidden rounded-xl border border-white/15 bg-white/[0.06] p-3">
        {[70, 100, 85, 100, 60, 90, 75].map((width, index) => (
          <span key={index} className="mb-2.5 block h-1.5 rounded-full bg-white/20" style={{ width: `${width}%` }} />
        ))}
        <span className="scan-beam absolute inset-x-0 top-2 block h-8 bg-gradient-to-b from-transparent via-accent/60 to-accent [--travel:6.5rem]" />
      </div>
      <ul className="space-y-2">
        {sessions.map((session, index) => (
          <li key={session} className="scan-row glass flex items-center gap-2 rounded-full px-3 py-1.5 font-rounded text-[0.8125rem] font-semibold tabular-nums" style={{ '--d': `${index * 220}ms` }}>
            <span className="h-2 w-2 rounded-full bg-accent" />
            {session}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Notifications arriving one after the other. */
function NotificationVisual() {
  return (
    <div className="mt-6 space-y-2" aria-hidden="true">
      {[0, 1].map((index) => (
        <div key={index} className="notif glass flex items-center gap-3 rounded-2xl p-2.5" style={{ '--d': `${index * 900}ms` }}>
          <img src="/icon-192.jpg" alt="" className="h-8 w-8 rounded-[9px]" />
          <span className="flex-1 space-y-1.5">
            <span className="block h-1.5 w-2/5 rounded-full bg-white/60" />
            <span className="block h-1.5 rounded-full bg-white/20" style={{ width: index ? '70%' : '88%' }} />
          </span>
        </div>
      ))}
    </div>
  )
}

/** The salary, blurred until Face ID has seen you. */
function FaceIdVisual({ ui }) {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.05] p-2.5" aria-hidden="true">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-accent/15">
        <ScanFace className="h-5 w-5 text-accent" strokeWidth={2.2} />
      </span>
      <span className="min-w-0">
        <span className="block text-xs text-faint">{ui.salary}</span>
        <span className="block select-none font-rounded font-bold tabular-nums blur-[5px]">{ui.amount}</span>
      </span>
    </div>
  )
}

/** A finished session, as Apple Health lists it among the workouts. */
function HealthVisual({ ui }) {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.05] p-2.5" aria-hidden="true">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#30d158]/15">
        <Footprints className="h-[1.125rem] w-[1.125rem] text-[#30d158]" strokeWidth={2.4} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{ui.walk}</span>
        <span className="block text-xs tabular-nums text-muted">{ui.walkDetail}</span>
      </span>
      <img src="/icon-192.jpg" alt="" width="22" height="22" loading="lazy" className="h-[1.375rem] w-[1.375rem] shrink-0 rounded-[6px]" />
    </div>
  )
}

/** The two languages, and the currencies the salary can be shown in. */
function LanguageVisual() {
  const chip = 'flex h-8 items-center rounded-full px-2.5'
  return (
    <div className="mt-6 flex flex-wrap items-center gap-1 font-rounded text-[0.8125rem] font-semibold" aria-hidden="true">
      <span className={`${chip} bg-accent text-white`}>FR</span>
      <span className={`${chip} bg-white/[0.06] text-muted`}>EN</span>
      <span className="mx-0.5 h-5 w-px bg-white/15" />
      {['€', '$', '£', 'CHF', 'CA$'].map((symbol, index) => (
        <span key={symbol} className={`${chip} ${index === 0 ? 'bg-white/[0.14] text-ink' : 'bg-white/[0.06] text-muted'}`}>{symbol}</span>
      ))}
    </div>
  )
}

/** A step of the guided tour, moving from one screen to the next. */
function TourVisual() {
  return (
    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white/[0.05] p-2.5 pl-3.5" aria-hidden="true">
      <span className="flex-1">
        <span className="block h-1.5 w-3/5 rounded-full bg-white/55" />
        <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-white/20" />
        <span className="relative mt-3 flex gap-2">
          {[0, 1, 2, 3, 4].map((index) => <span key={index} className="h-2 w-2 rounded-full bg-white/15" />)}
          <span className="tour-step absolute left-0 top-0 h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(255,149,0,0.8)]" />
        </span>
      </span>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white">
        <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
      </span>
    </div>
  )
}

/** A week of the schedule, with the public holiday picked out. */
function HolidayVisual() {
  return (
    <div className="mt-6 grid grid-cols-7 gap-1.5 font-rounded text-[0.8125rem] font-semibold tabular-nums" aria-hidden="true">
      {[11, 12, 13, 14, 15, 16, 17].map((day) => (
        <span
          key={day}
          className={`flex aspect-square items-center justify-center rounded-xl ${day === 14 ? 'bg-accent text-white shadow-[0_10px_22px_-8px_rgba(255,149,0,0.9)]' : 'bg-white/[0.06] text-muted'}`}
        >
          {day}
        </span>
      ))}
    </div>
  )
}

// Bar widths of the receipt's (decorative) barcode, in pixels.
const BARS = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2]

/**
 * The receipt of the day that the app shares as a story (ShareManager.swift in the app), rebuilt in HTML.
 * It feeds out of its slot when the card scrolls into view.
 */
function Receipt({ ui, alt }) {
  const rule = 'my-3 border-t border-dashed border-[#141414]/60'
  return (
    <div role="img" aria-label={alt} className="relative mx-auto w-full max-w-[15rem]">
      <div className="absolute inset-x-0 top-0 z-10 h-3 rounded-full bg-black/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.09)]" aria-hidden="true" />
      <div className="overflow-hidden px-2.5 pb-5 pt-1.5" aria-hidden="true">
        <div className="receipt-feed drop-shadow-[0_14px_18px_rgba(0,0,0,0.55)]">
          <div className="receipt-paper bg-[#faf7f2] px-4 pb-8 pt-4 font-mono text-[0.625rem] leading-snug text-[#141414]">
            <div className="text-center">
              <img src="/icon-192.jpg" alt="" width="28" height="28" loading="lazy" className="mx-auto h-7 w-7 rounded-full" />
              <p className="mt-1.5 text-[0.6875rem] font-bold tracking-[0.25em]">WORK &amp; WALK</p>
              <p className="text-[#141414]/60">{ui.official}</p>
              <p className="text-[#141414]/60">{ui.date}</p>
            </div>
            <div className={rule} />
            <ul className="space-y-1">
              {ui.rows.map(([label, value]) => (
                <li key={label} className="flex items-baseline gap-1.5">
                  <span>{label}</span>
                  <span className="mb-[0.2em] flex-1 border-b border-dotted border-[#141414]/40" />
                  <span className="font-bold">{value}</span>
                </li>
              ))}
            </ul>
            <div className={rule} />
            <p className="flex items-baseline justify-between font-black">
              <span className="text-[0.75rem]">{ui.total}</span>
              <span className="text-[0.8125rem]">{ui.double}</span>
            </p>
            <p className="text-right text-[0.5625rem] text-[#141414]/60">{ui.why}</p>
            <p className="mt-2.5 text-center italic">{ui.thanks}</p>
            <div className="mt-2 flex h-6 justify-center gap-[2px]">
              {BARS.map((width, index) => <span key={index} className="bg-[#141414]" style={{ width }} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Details() {
  const { t, lang } = useLang()
  const [first, ...others] = t.details.items
  const FirstIcon = icons[first.icon]

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">{t.details.eyebrow}</p>
        <h2 className="title mt-3 text-[clamp(2rem,4.8vw,3.5rem)]">{t.details.title}</h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        <Reveal className="card spot grid items-center gap-8 p-6 sm:grid-cols-2 md:col-span-2 md:p-8" onPointerMove={trackPointer}>
          <div>
            <div className="flex items-center gap-3">
              <FirstIcon className="h-6 w-6 text-accent" strokeWidth={2.2} aria-hidden="true" />
              {first.pro && <ProTag />}
            </div>
            <h3 className="title mt-5 text-2xl">{first.title}</h3>
            <p className="mt-2 text-muted">{first.text}</p>
          </div>
          <ScanVisual />
        </Reveal>

        <Reveal delay={80} className="card spot flex flex-col p-6 md:row-span-2" onPointerMove={trackPointer}>
          <h3 className="title text-2xl">{t.details.theme.title}</h3>
          <p className="mb-6 mt-2 text-muted">{t.details.theme.text}</p>
          <div className="mx-auto mt-auto w-full max-w-[17rem]">
            <Compare
              before={{ src: `/screens/home-light-${lang}.webp` }}
              after={{ src: `/screens/home-${lang}.webp` }}
              labels={[t.details.theme.light, t.details.theme.dark]}
              alt={t.details.theme.alt}
              sliderLabel={t.details.theme.slider}
            />
          </div>
        </Reveal>

        {others.map((item, index) => {
          const Icon = icons[item.icon]
          return (
            <Fragment key={item.title}>
              <Reveal delay={(index % 3) * 70} className="card spot p-6" onPointerMove={trackPointer}>
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 text-accent" strokeWidth={2.2} aria-hidden="true" />
                  {item.pro && <ProTag />}
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{item.text}</p>
                {item.icon === 'bell' && <NotificationVisual />}
                {item.icon === 'calendar' && <HolidayVisual />}
                {item.icon === 'lock' && <FaceIdVisual ui={t.details.visuals} />}
                {item.icon === 'footprints' && <HealthVisual ui={t.details.visuals} />}
                {item.icon === 'globe' && <LanguageVisual />}
                {item.icon === 'map' && <TourVisual />}
              </Reveal>

              {/* Right after the Health card, so that on large screens it fills the last column of the two last rows */}
              {item.icon === 'footprints' && (
                <Reveal delay={140} className="card spot flex flex-col p-6 md:row-span-2" onPointerMove={trackPointer}>
                  <h3 className="title text-2xl">{t.details.receipt.title}</h3>
                  <p className="mb-6 mt-2 text-muted">{t.details.receipt.text}</p>
                  <div className="mt-auto">
                    <Receipt ui={t.details.receipt.ui} alt={t.details.receipt.alt} />
                  </div>
                </Reveal>
              )}
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
