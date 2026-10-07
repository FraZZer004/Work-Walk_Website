import { useEffect, useRef, useState } from 'react'

/** True once the element has scrolled into view (it never flips back). */
export function useInView(margin = '0px 0px -12% 0px') {
  const ref = useRef(null)
  // Without IntersectionObserver (very old browsers), everything is simply visible.
  const [inView, setInView] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect() }
    }, { rootMargin: margin })
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, margin])

  return [ref, inView]
}
