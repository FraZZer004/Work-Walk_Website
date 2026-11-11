import { Check, Crown } from 'lucide-react'
import AppStoreButton from '../components/AppStoreButton'
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

          {/* The two plans, with the same prices as the subscription screen of the app */}
          <div className="relative mt-10 grid gap-6 border-t border-white/10 pt-8 md:mt-14 md:grid-cols-[1fr_auto] md:items-center md:gap-12 md:pt-12">
            <ul aria-label={t.pro.plansLabel} className="grid gap-3 sm:grid-cols-2">
              {t.pro.plans.map((plan) => (
                <li
                  key={plan.name}
                  className={`rounded-[22px] border p-5 ${plan.badge ? 'border-accent/55 bg-accent/[0.07] shadow-[inset_0_1px_0_rgba(255,180,90,0.18)]' : 'border-white/10 bg-white/[0.03]'}`}
                >
                  <p className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{plan.name}</span>
                    {plan.badge && <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold tabular-nums text-white">{plan.badge}</span>}
                  </p>
                  <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
                    <span className="font-rounded text-[2rem] font-bold leading-none tracking-tight tabular-nums">{plan.price}</span>
                    <span className="text-muted">{plan.period}</span>
                  </p>
                  <p className={`mt-2 text-sm ${plan.badge ? 'font-medium text-[#ffb766]' : 'text-muted'}`}>{plan.note}</p>
                </li>
              ))}
            </ul>
            <div className="md:max-w-[15.5rem]">
              <AppStoreButton placement="pro" qr="up" />
              <p className="mt-4 text-xs leading-relaxed text-faint">{t.pro.legal}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
