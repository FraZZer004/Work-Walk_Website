import { useLayoutEffect, useRef } from 'react'
import { useLang } from '../i18n'
import { prefersReducedMotion } from '../utils/pointer'

/** A number that counts up to its value the first time `start` becomes true. */
export default function CountUp({ value, start, duration = 1500 }) {
  const { lang } = useLang()
  const ref = useRef(null)
  const locale = lang === 'fr' ? 'fr-FR' : 'en-US'

  // Before paint, so the final value never flashes ahead of the count.
  useLayoutEffect(() => {
    if (!start || prefersReducedMotion()) return
    const element = ref.current
    const format = new Intl.NumberFormat(locale)
    let frame = 0
    const began = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - began) / duration)
      element.textContent = format.format(Math.round(value * (1 - Math.pow(1 - t, 4))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    tick(began)
    return () => { cancelAnimationFrame(frame); element.textContent = format.format(value) }
  }, [start, value, duration, locale])

  return <span ref={ref} className="tabular-nums">{new Intl.NumberFormat(locale).format(value)}</span>
}
