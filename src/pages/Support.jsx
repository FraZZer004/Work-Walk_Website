import { Mail } from 'lucide-react'
import Faq from '../components/Faq'
import { SUPPORT_EMAIL } from '../components/FloatingActions'
import PrintButton from '../components/PrintButton'
import { useLang } from '../i18n'

export default function Support() {
  const { t } = useLang()

  return (
    <main id="main" tabIndex={-1} className="page mx-auto max-w-3xl px-5 pb-24 pt-[calc(8rem+env(safe-area-inset-top))] outline-none">
      <h1 className="display text-[clamp(2.2rem,5vw,3.5rem)]">{t.support.title}</h1>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="lede text-lg">{t.support.lede}</p>
        <PrintButton label={t.support.print} />
      </div>

      <div className="mt-10">
        <Faq items={t.support.faq} />
      </div>

      <section className="card mt-12 flex flex-col items-start gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <h2 className="title text-xl">{t.support.contactTitle}</h2>
          <p className="mt-1 text-muted">{t.support.contactText}</p>
          <p className="print-only mt-1">{SUPPORT_EMAIL}</p>
        </div>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=Work%26Walk`}
          className="btn no-print inline-flex h-12 shrink-0 items-center gap-2 rounded-2xl bg-accent px-5 font-semibold text-white"
        >
          <span className="sheen" aria-hidden="true" />
          <Mail className="h-5 w-5" aria-hidden="true" />
          {t.support.contactCta}
        </a>
      </section>
    </main>
  )
}
