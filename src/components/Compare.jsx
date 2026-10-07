import { useState } from 'react'
import { ChevronsLeftRight } from 'lucide-react'

/**
 * Two versions of the same screen with a divider to drag between them.
 * An invisible range input covers the picture: dragging, tapping and the arrow keys all work.
 */
export default function Compare({ before, after, labels, alt, sliderLabel }) {
  const [value, setValue] = useState(52)
  const image = 'absolute inset-0 h-full w-full select-none object-cover object-top'

  return (
    <div className="relative aspect-[780/1240] overflow-hidden rounded-[22px] border border-white/10 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent">
      <img src={after.src} alt={alt} width="780" height="1696" loading="lazy" decoding="async" draggable="false" className={image} />
      <img
        src={before.src} alt="" width="780" height="1696" loading="lazy" decoding="async" draggable="false"
        className={image}
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      />

      <span className="glass pointer-events-none absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs font-semibold">{labels[0]}</span>
      <span className="glass pointer-events-none absolute bottom-3 right-3 rounded-full px-3 py-1 text-xs font-semibold">{labels[1]}</span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90" style={{ left: `${value}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-bg shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <input
        type="range" min="0" max="100" value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label={sliderLabel}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
      />
    </div>
  )
}
