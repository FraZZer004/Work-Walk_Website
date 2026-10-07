import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, BarChart3, CalendarDays, Check, CircleUser, Euro, House } from 'lucide-react'
import AppStoreButton from '../components/AppStoreButton'
import Reveal from '../components/Reveal'
import { useInView } from '../hooks/useInView'
import { useScroll } from '../hooks/useScroll'
import { useLang } from '../i18n'
import { prefersReducedMotion } from '../utils/pointer'

const TAB_ICONS = { home: House, schedule: CalendarDays, analysis: BarChart3, salary: Euro, profile: CircleUser }
const SCREENS = ['home', 'schedule', 'analysis', 'salary', 'profile', 'goals']
// For each step of the page (hero, the five tabs, goals), the screen the phone shows.
const STEP_SCREENS = [0, 0, 1, 2, 3, 4, 5]
const screenUrl = (id, lang) => `/screens/${id}-${lang}.webp`

/**
 * The top of the home page: the hero, the five tabs of the app and its goals.
 * One 3D phone stays pinned on screen and follows the text as the page scrolls.
 */
export default function Showcase() {
  const { t, lang } = useLang()
  const tabs = t.tour.tabs
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const heroTextRef = useRef(null)
  const stepRefs = useRef([])
  const stageRef = useRef(null)
  const metrics = useRef({ top: 0, tops: [] })
  const langRef = useRef(lang)
  const [active, setActive] = useState(0)
  const [status, setStatus] = useState('loading') // loading | ready | off (no WebGL)
  const [barsRef, barsInView] = useInView()

  const measure = useCallback(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const top = wrap.getBoundingClientRect().top
    metrics.current = { top: top + window.scrollY, tops: stepRefs.current.map((step) => step.offsetTop) }
    stageRef.current?.setLayout({ heroBottom: heroTextRef.current.getBoundingClientRect().bottom - top + 30 })
  }, [])

  // Scroll position, expressed in steps: 2.5 is halfway between the second and third tab.
  const follow = useCallback(() => {
    const { top, tops } = metrics.current
    if (tops.length < 2) return
    const y = window.scrollY - top
    let index = 0
    while (index < tops.length - 2 && y >= tops[index + 1]) index++
    const progress = Math.min(tops.length - 1, Math.max(0, index + (y - tops[index]) / (tops[index + 1] - tops[index])))
    stageRef.current?.setProgress(progress)
    setActive(Math.round(progress))
  }, [])
  useScroll(follow)

  useEffect(() => {
    langRef.current = lang
    stageRef.current?.setScreens(SCREENS.map((id) => screenUrl(id, lang)), STEP_SCREENS)
  }, [lang])

  useEffect(() => {
    const wrap = wrapRef.current
    let disposed = false
    let visible = true

    const viewport = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      stageRef.current?.setVisible(visible)
    })
    viewport.observe(wrap)
    const layout = new ResizeObserver(() => { measure(); follow() })
    layout.observe(wrap)

    import('../three/phoneStage.js').then(({ mountPhoneStage }) => {
      if (disposed) return
      const stage = mountPhoneStage(canvasRef.current, { reduced: prefersReducedMotion(), onReady: () => setStatus('ready') })
      stageRef.current = stage
      stage.setScreens(SCREENS.map((id) => screenUrl(id, langRef.current)), STEP_SCREENS)
      measure()
      follow()
      stage.setVisible(visible)
    }).catch(() => { if (!disposed) setStatus('off') })

    return () => {
      disposed = true
      viewport.disconnect()
      layout.disconnect()
      stageRef.current?.dispose()
      stageRef.current = null
    }
  }, [measure, follow])

  const goToStep = (index) => stepRefs.current[index]?.scrollIntoView()
  const tabBarVisible = active >= 1 && active <= tabs.length
  const titleWords = t.hero.title[0].split(' ')
  // Without WebGL the screenshots are shown in the page; they are always there for print.
  const shot = (wide) => (status === 'off' ? `mt-6 ${wide} rounded-[2rem] border border-white/15` : 'print-shot hidden')

  return (
    <div ref={wrapRef} className="relative">
      {/* Pinned layer: the phone */}
      <div className="no-print pointer-events-none sticky top-0 h-screen overflow-hidden supports-[height:100lvh]:h-[100lvh]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`h-full w-full transition-opacity duration-700 ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
        />
        {status === 'loading' && (
          <div className="absolute inset-0 mx-auto grid max-w-6xl px-5 md:grid-cols-2" aria-hidden="true">
            <div className="col-start-1 flex items-end justify-center pb-16 md:col-start-2 md:items-center md:pb-0">
              <div className="spinner md:hidden" />
              <div className="shimmer hidden aspect-[716/1500] h-[68vh] rounded-[3.2rem] md:block" />
            </div>
          </div>
        )}

      </div>

      {/* The text, scrolling over the pinned layer */}
      <div className="print-flow pointer-events-none relative z-10 -mt-[100vh] supports-[height:100lvh]:-mt-[100lvh]">
        <section
          ref={(el) => { stepRefs.current[0] = el }}
          className="print-flow relative mx-auto flex min-h-[100svh] max-w-6xl items-start px-5 pt-[calc(6.5rem+env(safe-area-inset-top))] md:items-center md:pt-16"
        >
          <div ref={heroTextRef} className="fade-exit pointer-events-auto md:w-[54%]">
            <h1 className="display text-[clamp(2.7rem,7.6vw,5.6rem)]">
              {titleWords.map((word, index) => (
                <span key={word + index}><span className="word" style={{ '--i': index }}>{word}</span>{' '}</span>
              ))}
              <span className="word text-flame pb-[0.14em]" style={{ '--i': titleWords.length }}>{t.hero.title[1]}</span>
            </h1>
            <p className="lede rise mt-5 max-w-xl text-[1.0625rem] md:mt-7 md:text-xl" style={{ '--d': '480ms' }}>{t.hero.lede}</p>
            <div className="rise mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-9" style={{ '--d': '580ms' }}>
              <AppStoreButton placement="hero" />
              <a href="#features" className="group hidden items-center gap-2 font-semibold sm:inline-flex">
                {t.hero.more}
                <ArrowDown className="h-4 w-4 text-accent transition-transform duration-200 ease-out group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
            </div>
            <ul className="rise mt-9 hidden flex-wrap gap-x-6 gap-y-2 text-sm text-muted md:flex" style={{ '--d': '680ms' }}>
              {t.hero.trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-accent" strokeWidth={2.6} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <img src={screenUrl('home', lang)} alt={t.hero.alt} width="780" height="1696" loading="lazy" decoding="async" className={shot('w-56')} />
          </div>

          <div className="no-print absolute bottom-8 left-5 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-faint md:flex" aria-hidden="true">
            <span className="relative block h-9 w-px overflow-hidden bg-white/15">
              <span className="scroll-cue absolute inset-x-0 top-0 block h-1/3 bg-accent" />
            </span>
            {t.hero.scroll}
          </div>
        </section>

        {tabs.map((tab, index) => {
          const Icon = TAB_ICONS[tab.id]
          return (
            <section
              key={tab.id}
              id={index === 0 ? 'features' : undefined}
              ref={(el) => { stepRefs.current[index + 1] = el }}
              className="print-flow mx-auto flex min-h-[100svh] max-w-6xl items-end px-3 pb-[5.25rem] md:items-center md:px-5 md:pb-0"
            >
              <Reveal className={`fade-exit max-md:glass pointer-events-auto w-full rounded-[26px] p-5 max-md:bg-[rgba(20,18,16,0.84)] md:w-[41%] md:p-0 ${index % 2 === 0 ? 'md:ml-auto motion-reduce:md:ml-0' : ''}`}>
                <p className="eyebrow flex items-center gap-2">
                  <Icon className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                  <span className="tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px w-5 bg-accent/50" aria-hidden="true" />
                  {tab.label}
                </p>
                <h2 className="title mt-3 text-[clamp(1.55rem,3.7vw,3.1rem)] md:mt-4">{tab.title}</h2>
                <p className="lede mt-2.5 text-[0.9375rem] md:mt-5 md:text-lg">{tab.text}</p>
                <ul className="mt-4 space-y-2 text-[0.9375rem] md:mt-7 md:space-y-3.5 md:text-base">
                  {tab.points.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <img src={screenUrl(tab.id, lang)} alt="" width="780" height="1696" loading="lazy" decoding="async" className={shot('w-48')} />
              </Reveal>
            </section>
          )
        })}

        <section
          ref={(el) => { stepRefs.current[tabs.length + 1] = el }}
          className="print-flow mx-auto flex min-h-[100svh] max-w-6xl items-end px-3 pb-[5.25rem] md:items-center md:px-5 md:pb-0"
        >
          <Reveal className="fade-exit max-md:glass pointer-events-auto w-full rounded-[26px] p-5 max-md:bg-[rgba(20,18,16,0.84)] md:w-[46%] md:p-0">
            <p className="eyebrow">{t.goals.eyebrow}</p>
            <h2 className="title mt-3 text-[clamp(1.55rem,3.7vw,3.1rem)] md:mt-4">{t.goals.title}</h2>
            <p className="lede mt-5 hidden text-lg md:block">{t.goals.lede}</p>

            {/* The bars fill once, when the list scrolls into view */}
            <ul ref={barsRef} className={`mt-5 grid grid-cols-2 gap-x-5 gap-y-4 md:mt-9 md:gap-x-8 md:gap-y-5 ${barsInView ? 'is-in' : ''}`}>
              {t.goals.items.map((item, index) => (
                <li key={item.label}>
                  <div className="flex items-end justify-between gap-2">
                    <span className="min-w-0">
                      <span className="block text-[0.625rem] font-medium uppercase tracking-wide text-faint md:text-[0.6875rem] md:tracking-wider">{item.label}</span>
                      <span className="block text-sm font-semibold md:text-base">{item.name}</span>
                    </span>
                    <span className="font-rounded font-bold tabular-nums md:text-lg" style={{ color: item.color }}>
                      {Math.round(item.value * 100)}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="bar-fill h-full rounded-full" style={{ background: item.color, '--v': item.value, '--d': `${index * 70}ms` }} />
                  </div>
                </li>
              ))}
            </ul>
            <img src={screenUrl('goals', lang)} alt={t.goals.alt} width="780" height="1696" loading="lazy" decoding="async" className={shot('w-48')} />
          </Reveal>
        </section>
      </div>

      {/* The app's tab bar, floating above the text like the real one (large screens) */}
      <div className="no-print pointer-events-none fixed inset-x-0 bottom-6 z-30 hidden justify-center md:flex">
        <nav aria-label={t.tour.nav} data-hidden={!tabBarVisible} inert={!tabBarVisible} className="pop glass pointer-events-auto relative grid grid-cols-5 rounded-full p-1">
          <span
            aria-hidden="true"
            className="absolute bottom-1 left-1 top-1 w-[calc((100%-0.5rem)/5)] rounded-full bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{ transform: `translateX(${Math.min(tabs.length - 1, Math.max(0, active - 1)) * 100}%)` }}
          />
          {tabs.map((tab, index) => {
            const Icon = TAB_ICONS[tab.id]
            const current = active === index + 1
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => goToStep(index + 1)}
                aria-current={current ? 'step' : undefined}
                className={`relative flex h-11 w-[6.75rem] items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-200 ${current ? 'text-white' : 'text-muted hover:text-ink'}`}
              >
                <Icon className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
