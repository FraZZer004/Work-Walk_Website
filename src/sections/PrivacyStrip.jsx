import { Link } from 'react-router-dom'
import { ArrowRight, EyeOff, HeartPulse, ShieldCheck, Smartphone } from 'lucide-react'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'
import { trackPointer } from '../utils/pointer'

const icons = [Smartphone, HeartPulse, EyeOff]

export default function PrivacyStrip() {
  const { t } = useLang()

  return (
    <section className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <Reveal>
          <ShieldCheck className="h-10 w-10 text-accent" strokeWidth={2.2} aria-hidden="true" />
          <p className="eyebrow mt-6">{t.privacy.eyebrow}</p>
          <h2 className="title mt-3 text-[clamp(2rem,4.8vw,3.5rem)]">{t.privacy.title}</h2>
          <p className="mt-6 text-[0.9375rem] text-muted">{t.privacy.note}</p>
          <Link to="/privacy" className="nudge pressable mt-6 inline-flex items-center gap-1.5 font-semibold text-accent hover:text-[#ffb040]">
            {t.privacy.link}
            <ArrowRight className="nudge-icon h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="space-y-3 self-center">
          {t.privacy.points.map((point, index) => {
            const Icon = icons[index]
            return (
              <Reveal as="li" key={point} delay={index * 80} className="card spot flex items-center gap-5 p-5 md:p-6" onPointerMove={trackPointer}>
                <Icon className="h-7 w-7 shrink-0 text-accent" strokeWidth={2.1} aria-hidden="true" />
                <span className="text-lg">{point}</span>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
