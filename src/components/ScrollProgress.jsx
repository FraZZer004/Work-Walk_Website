import { useCallback, useRef } from 'react'
import { useScroll } from '../hooks/useScroll'

/** The thin bar at the very top that fills as the page is read. */
export default function ScrollProgress() {
  const ref = useRef(null)

  const update = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    const value = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
    if (ref.current) ref.current.style.transform = `scaleX(${value})`
  }, [])
  useScroll(update)

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}
