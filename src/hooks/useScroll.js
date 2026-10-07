import { useEffect } from 'react'

/** Calls `onFrame` at most once per frame while the page scrolls or resizes, and once on mount. */
export function useScroll(onFrame) {
  useEffect(() => {
    let frame = 0
    const run = () => { frame = 0; onFrame() }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(run) }
    run()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [onFrame])
}
