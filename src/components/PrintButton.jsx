import { Printer } from 'lucide-react'

export default function PrintButton({ label }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="pressable no-print inline-flex h-10 items-center gap-2 rounded-full bg-white/[0.08] px-4 text-sm font-semibold hover:bg-white/[0.13]"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )
}
