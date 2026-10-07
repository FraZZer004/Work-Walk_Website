import Reveal from '../components/Reveal'
import WatchCanvas from '../components/WatchCanvas'
import WidgetTile from '../components/WidgetTile'
import { useLang } from '../i18n'
import { trackPointer } from '../utils/pointer'

export default function Devices() {
  const { t } = useLang()
  const { watch, widget } = t.devices

  return (
    <section id="devices" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
      <Reveal className="max-w-2xl">
        <p className="eyebrow">{t.devices.eyebrow}</p>
        <h2 className="title mt-3 text-[clamp(2rem,4.8vw,3.5rem)]">{t.devices.title}</h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        <Reveal className="card spot flex flex-col overflow-hidden" onPointerMove={trackPointer}>
          <WatchCanvas alt={watch.alt} />
          <div className="mt-auto p-6 pt-2 md:p-8 md:pt-2">
            <h3 className="title text-2xl">{watch.title}</h3>
            <p className="mt-2 text-muted">{watch.text}</p>
          </div>
        </Reveal>

        <Reveal delay={90} className="card spot flex flex-col" onPointerMove={trackPointer}>
          <div className="flex flex-1 items-center justify-center px-6 py-12 md:px-10">
            <WidgetTile ui={widget.ui} alt={widget.alt} />
          </div>
          <div className="p-6 pt-2 md:p-8 md:pt-2">
            <h3 className="title text-2xl">{widget.title}</h3>
            <p className="mt-2 text-muted">{widget.text}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
