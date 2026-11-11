import { useLayoutEffect, useRef } from 'react'
import { useLang } from '../i18n'
import { prefersReducedMotion } from '../utils/pointer'

// Thousands separators written out rather than taken from Intl, so the prerendered page and the browser agree.
const SEPARATORS = { fr: ' ', en: ',' }
const formatNumber = (value, lang) => String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, SEPARATORS[lang])

/** A number that counts up to its value the first time `start` becomes true. */
export default function CountUp({ value, start, duration = 1500 }) {
  const { lang } = useLang()
  const ref = useRef(null)

  // Before paint, so the final value never flashes ahead of the count.
  useLayoutEffect(() => {
    if (!start || prefersReducedMotion()) return
    const element = ref.current
    let frame = 0
    const began = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - began) / duration)
      element.textContent = formatNumber(value * (1 - Math.pow(1 - t, 4)), lang)
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    tick(began)
    return () => { cancelAnimationFrame(frame); element.textContent = formatNumber(value, lang) }
  }, [start, value, duration, lang])

  return <span ref={ref} className="tabular-nums">{formatNumber(value, lang)}</span>
}
