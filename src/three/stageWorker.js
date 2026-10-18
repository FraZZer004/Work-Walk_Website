/**
 * Runs the 3D phone or watch off the main thread, on an OffscreenCanvas handed over by src/three/host.js.
 * Building the scene, compiling its shaders and drawing every frame then never block scrolling or taps, even on a slow
 * device or without a GPU. Messages: { type: 'init', kind, canvas, options } first, then { type: <method>, args }.
 */
if (!self.requestAnimationFrame) {
  // Workers without requestAnimationFrame: a 60 fps timer does the same job.
  self.requestAnimationFrame = (callback) => setTimeout(() => callback(performance.now()), 16)
  self.cancelAnimationFrame = (id) => clearTimeout(id)
}

let stage = null
const pending = []

self.onmessage = async ({ data }) => {
  if (data.type !== 'init') {
    if (stage) stage[data.type]?.(...data.args)
    else pending.push(data)
    return
  }
  try {
    const onReady = () => self.postMessage({ type: 'ready' })
    if (data.kind === 'phone') {
      const { mountPhoneStage } = await import('./phoneStage.js')
      stage = mountPhoneStage(data.canvas, { ...data.options, onReady })
    } else {
      const { mountWatch } = await import('./watchView.js')
      stage = mountWatch(data.canvas, { ...data.options, onReady })
    }
    pending.splice(0).forEach((message) => stage[message.type]?.(...message.args))
  } catch (error) {
    self.postMessage({ type: 'error', message: String(error?.message ?? error) })
  }
}
