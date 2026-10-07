import { useId, useState } from 'react'
import { Plus } from 'lucide-react'
import { trackPointer } from '../utils/pointer'

/** Questions that unfold one at a time. */
export default function Faq({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <div key={item.q} className="card spot" onPointerMove={trackPointer}>
            <h3>
              <button
                type="button"
                id={`${id}-q${index}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${index}`}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 rounded-[26px] px-6 py-5 text-left font-semibold"
              >
                {item.q}
                <Plus
                  className={`h-5 w-5 shrink-0 transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? 'rotate-45 text-accent' : 'text-faint'}`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div id={`${id}-a${index}`} role="region" aria-labelledby={`${id}-q${index}`} className="acc-panel" data-open={isOpen}>
              <div>
                <p className="px-6 pb-6 text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
