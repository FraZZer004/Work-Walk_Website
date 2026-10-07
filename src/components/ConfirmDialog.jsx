import { useEffect, useId, useRef } from 'react'

/** Asks before an action that cannot be undone. Escape or a click outside cancels. */
export default function ConfirmDialog({ open, title, text, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  const ref = useRef(null)
  const id = useId()

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-text`}
      onClose={onCancel}
      onClick={(event) => { if (event.target === ref.current) onCancel() }}
      className="sheet m-auto w-[calc(100%-2rem)] max-w-sm rounded-[26px] border border-white/10 bg-[#171614] p-0 text-ink shadow-2xl"
    >
      <div className="p-6">
        <h2 id={`${id}-title`} className="title text-xl">{title}</h2>
        <p id={`${id}-text`} className="mt-3 text-[0.9375rem] text-muted">{text}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" autoFocus onClick={onCancel} className="pressable h-12 rounded-2xl bg-white/[0.08] font-semibold hover:bg-white/[0.13]">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className="pressable h-12 rounded-2xl bg-[#e5484d] font-semibold text-white hover:bg-[#ec5d62]">
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
