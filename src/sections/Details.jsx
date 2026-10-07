import { Bell, CalendarDays, Globe, Lock, Map, Wand2 } from 'lucide-react'
import Compare from '../components/Compare'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'
import { trackPointer } from '../utils/pointer'

const icons = { wand: Wand2, bell: Bell, calendar: CalendarDays, lock: Lock, globe: Globe, map: Map }

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
            <Reveal key={item.title} delay={(index % 3) * 70} className="card spot p-6" onPointerMove={trackPointer}>
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-accent" strokeWidth={2.2} aria-hidden="true" />
                {item.pro && <ProTag />}
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-muted">{item.text}</p>
              {item.icon === 'bell' && <NotificationVisual />}
              {item.icon === 'calendar' && <HolidayVisual />}
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
