import { Check, Crown } from 'lucide-react'
import Reveal from '../components/Reveal'
import { useLang } from '../i18n'

export default function Pro() {
  const { t } = useLang()

  return (
    <section id="pro" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      {/* A light travels around the border of the card */}
      <Reveal className="relative overflow-hidden rounded-[30px] p-px">
        <span className="orbit no-print absolute -inset-[60%] bg-[conic-gradient(from_0deg,transparent_0_68%,#ff9500_84%,#ffd08a_88%,transparent_100%)]" aria-hidden="true" />
        <span className="absolute inset-0 rounded-[30px] border border-white/10" aria-hidden="true" />
        <div className="relative overflow-hidden rounded-[29px] bg-[#121110] p-6 md:p-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(44rem_28rem_at_100%_0%,rgba(255,149,0,0.2),transparent_70%)]" />
          <div className="relative grid gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Crown className="h-9 w-9 text-accent" strokeWidth={2.2} aria-hidden="true" />
              <p className="eyebrow mt-6">{t.pro.eyebrow}</p>
              <h2 className="title mt-3 text-[clamp(1.9rem,4.2vw,3rem)]">{t.pro.title}</h2>
              <p className="lede mt-5 text-lg">{t.pro.lede}</p>
            </div>

            <ul className="space-y-5 self-center">
              {t.pro.items.map((item, index) => (
                <Reveal as="li" key={item.title} delay={index * 60} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15">
                    <Check className="h-4 w-4 text-accent" strokeWidth={3} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold">{item.title}</span>
                    <span className="mt-0.5 block text-[0.9375rem] text-muted">{item.text}</span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
