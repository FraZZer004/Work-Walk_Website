/**
 * Puts the 3D phone or watch on a canvas of the page. Where the browser can (OffscreenCanvas + module workers), the 3D
 * runs in src/three/stageWorker.js so the page stays responsive; elsewhere it runs here, on the main thread.
 * Either way the caller gets the same object: the stage's own methods (setScreens, setProgress, setLayout, setVisible),
 * plus dispose(). The host keeps the stage told of the canvas size and of the mouse.
 *   kind: 'phone' | 'watch'; options: { reduced, url (watch), onReady, onError }
 */
const METHODS = ['setScreens', 'setProgress', 'setLayout', 'setVisible']

export async function mountStage(kind, canvas, { onReady, onError, ...options } = {}) {
  const stageOptions = { ...options, pixelRatio: window.devicePixelRatio || 1 }
  let send
  let stop

  if (typeof canvas.transferControlToOffscreen === 'function' && typeof Worker !== 'undefined') {
    const worker = new Worker(new URL('./stageWorker.js', import.meta.url), { type: 'module' })
    worker.onmessage = ({ data }) => {
      if (data.type === 'ready') onReady?.()
      if (data.type === 'error') onError?.(new Error(data.message))
    }
    worker.onerror = (event) => { event.preventDefault(); onError?.(new Error(event.message)) }
    const offscreen = canvas.transferControlToOffscreen()
    worker.postMessage({ type: 'init', kind, canvas: offscreen, options: stageOptions }, [offscreen])
    send = (type, ...args) => worker.postMessage({ type, args })
    stop = () => { send('dispose'); setTimeout(() => worker.terminate(), 100) }
  } else {
    const module = kind === 'phone' ? await import('./phoneStage.js') : await import('./watchView.js')
    const mount = kind === 'phone' ? module.mountPhoneStage : module.mountWatch
    const stage = mount(canvas, { ...stageOptions, onReady })
    send = (type, ...args) => stage[type]?.(...args)
    stop = () => stage.dispose()
  }

  // Size: the canvas's CSS pixels.
  const resize = () => send('setSize', canvas.clientWidth, canvas.clientHeight)
  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()

  // Pointer: the phone follows it over the window, the watch over its own card.
  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    if (kind === 'phone') {
      send('setPointer', (event.clientX / window.innerWidth) * 2 - 1, (event.clientY / window.innerHeight) * 2 - 1)
    } else {
      const rect = canvas.getBoundingClientRect()
      const clamp = (value) => Math.max(-1, Math.min(1, value))
      send('setPointer', clamp(((event.clientX - rect.left) / rect.width) * 2 - 1), clamp(((event.clientY - rect.top) / rect.height) * 2 - 1))
    }
  }
  if (!options.reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })

  const host = {
    dispose() {
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      stop()
    },
  }
  METHODS.forEach((method) => { host[method] = (...args) => send(method, ...args) })
  return host
}
