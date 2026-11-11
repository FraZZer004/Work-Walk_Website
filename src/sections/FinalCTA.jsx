import AppStoreButton from '../components/AppStoreButton'
import Reveal from '../components/Reveal'
import StoreQr from '../components/StoreQr'
import { useLang } from '../i18n'

export default function FinalCTA() {
  const { t } = useLang()

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(56rem_34rem_at_50%_112%,rgba(255,149,0,0.3),transparent_70%)]" />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center px-5 py-28 text-center md:py-40">
        <div className="relative">
          {[0, 1, 2].map((index) => (
            <span key={index} className="ring-pulse no-print absolute inset-0 rounded-[22%] border border-accent/60" style={{ '--d': `${index * 1050}ms` }} aria-hidden="true" />
          ))}
          <img src="/icon-192.jpg" alt="" width="96" height="96" loading="lazy" className="relative h-24 w-24 rounded-[22%] shadow-[0_24px_60px_-18px_rgba(255,149,0,0.7)]" />
        </div>
        <h2 className="display mt-10 text-[clamp(2.4rem,6vw,4.5rem)]">{t.cta.title}</h2>
        <p className="lede mt-5 max-w-lg text-lg">{t.cta.lede}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8">
          <AppStoreButton placement="footer-cta" />
          {/* On a computer: the same link, to scan with the iPhone */}
          <div className="qr-tile no-print items-center gap-4 text-left">
            <span className="rounded-[18px] bg-white p-2.5 shadow-[0_20px_50px_-20px_rgba(255,149,0,0.6)]">
              <StoreQr label={t.cta.qrLabel} className="block h-[5.5rem] w-[5.5rem] text-black" />
            </span>
            <p className="max-w-[11.5rem] text-sm leading-snug text-muted">{t.cta.qr}</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
