import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

// Scroll-triggered animated number counter
export default function AnimatedCounter({
  to,
  from = 0,
  duration = 2.2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const [display, setDisplay] = useState(from)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        setDisplay(v)
      },
    })

    return () => controls.stop()
  }, [isInView, from, to, duration])

  const formatted = decimals > 0
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString()

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
