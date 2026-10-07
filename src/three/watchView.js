import { buildGlow, buildWatch, createStudio, disposeStudio, loadTexture } from './models'

/** The Apple Watch in its card: it leans towards the pointer and sways gently when left alone. */
export function mountWatch(canvas, { reduced = false, url, onReady } = {}) {
  const studio = createStudio(canvas, { fov: 26 })
  const { renderer, scene, camera } = studio
  camera.position.z = 5.2

  const watch = buildWatch()
  const glow = buildGlow(3.2, 0.42)
  glow.position.z = -1
  scene.add(watch.object, glow)

  let visible = false
  let frame = 0
  let last = 0
  let disposed = false
  const pointer = { x: 0, y: 0 }
  const tilt = { x: 0, y: 0, vx: 0, vy: 0 }

  const resize = () => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    // Keep the watch and a bit of strap inside narrow cards.
    watch.object.scale.setScalar(Math.min(1, camera.aspect * 0.95))
  }

  const render = (now) => {
    frame = 0
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now
    const time = now / 1000

    if (!reduced) {
      tilt.vx += ((pointer.x - tilt.x) * 60 - tilt.vx * 13) * dt
      tilt.vy += ((pointer.y - tilt.y) * 60 - tilt.vy * 13) * dt
      tilt.x += tilt.vx * dt
      tilt.y += tilt.vy * dt
    }
    const idle = reduced ? 0 : 1
    watch.object.rotation.set(
      0.12 + tilt.y * 0.3 + Math.sin(time * 0.8) * 0.02 * idle,
      -0.5 + tilt.x * 0.55 + Math.sin(time * 0.5) * 0.07 * idle,
      0.04,
    )
    watch.object.position.y = Math.sin(time * 0.9) * 0.015 * idle

    renderer.render(scene, camera)
    if (visible) frame = requestAnimationFrame(render)
  }

  const start = () => { if (!frame && visible) { last = performance.now(); frame = requestAnimationFrame(render) } }

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    const rect = canvas.getBoundingClientRect()
    pointer.x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1))
    pointer.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1))
  }
  if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)
  resize()

  loadTexture(url, renderer).then((texture) => {
    if (disposed) { texture.dispose(); return }
    watch.screen.uniforms.a.value = texture
    watch.screen.uniforms.b.value = texture
    renderer.render(scene, camera)
    onReady?.()
    start()
  }).catch(() => {})

  return {
    setVisible(value) { visible = value; if (value) start() },
    dispose() {
      disposed = true
      visible = false
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      disposeStudio(studio)
    },
  }
}
