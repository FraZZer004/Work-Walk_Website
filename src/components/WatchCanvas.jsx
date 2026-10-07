import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../utils/pointer'

const SCREEN = '/screens/watch.webp'

/** The 3D Apple Watch. It is only built when its card comes near the viewport. */
export default function WatchCanvas({ alt }) {
  const canvasRef = useRef(null)
  const [status, setStatus] = useState('loading') // loading | ready | off

  useEffect(() => {
    const canvas = canvasRef.current
    let view = null
    let requested = false
    let disposed = false
    let visible = false

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      view?.setVisible(visible)
      if (!visible || requested) return
      requested = true
      import('../three/watchView.js').then(({ mountWatch }) => {
        if (disposed) return
        view = mountWatch(canvas, { reduced: prefersReducedMotion(), url: SCREEN, onReady: () => setStatus('ready') })
        view.setVisible(visible)
      }).catch(() => { if (!disposed) setStatus('off') })
    }, { rootMargin: '300px' })
    observer.observe(canvas)

    return () => { disposed = true; observer.disconnect(); view?.dispose() }
  }, [])

  return (
    <div className="relative aspect-[4/3] w-full" role="img" aria-label={alt}>
      <canvas ref={canvasRef} aria-hidden="true" className={`h-full w-full transition-opacity duration-700 ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`} />
      {status === 'loading' && (
        <div className="no-print absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <div className="shimmer aspect-[87/100] h-[58%] rounded-[28%]" />
        </div>
      )}
      <img
        src={SCREEN} alt="" width="416" height="496" loading="lazy" decoding="async"
        className={status === 'off' ? 'absolute left-1/2 top-1/2 h-[70%] w-auto -translate-x-1/2 -translate-y-1/2 rounded-[22%] border border-white/15' : 'print-shot hidden'}
      />
    </div>
  )
}
