import PrintButton from '../components/PrintButton'
import { useLang } from '../i18n'

export default function Privacy() {
  const { t } = useLang()

  return (
    <main id="main" tabIndex={-1} className="page mx-auto max-w-3xl px-5 pb-24 pt-[calc(8rem+env(safe-area-inset-top))] outline-none">
      <h1 className="display text-[clamp(2.2rem,5vw,3.5rem)]">{t.policy.title}</h1>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">{t.policy.updated}</p>
        <PrintButton label={t.support.print} />
      </div>

      <div className="mt-10 space-y-4">
        {t.policy.sections.map((section) => (
          <section key={section.title} className="card p-6">
            <h2 className="text-lg font-semibold tracking-tight">{section.title}</h2>
            {section.text.split('\n').map((paragraph) => (
              <p key={paragraph} className="mt-3 text-muted">{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
