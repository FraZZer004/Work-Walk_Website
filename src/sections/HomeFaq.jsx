import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Faq from '../components/Faq'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'

export default function HomeFaq() {
  const { t } = useLang()

  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal>
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 className="title mt-3 text-[clamp(2rem,4.8vw,3.5rem)]">{t.faq.title}</h2>
          <Link to="/support" className="nudge pressable mt-6 inline-flex items-center gap-1.5 font-semibold text-accent hover:text-[#ffb040]">
            {t.faq.more}
            <ArrowRight className="nudge-icon h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal delay={80}>
          <Faq items={t.support.faq.slice(0, 5)} />
        </Reveal>
      </div>
    </section>
  )
}
