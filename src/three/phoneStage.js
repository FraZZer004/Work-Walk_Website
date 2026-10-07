import { buildDust, buildGlow, buildPhone, createStudio, disposeStudio, loadTexture } from './models'

const VISIBLE_HEIGHT = 2.12 // world units visible top to bottom at the phone's depth
const TURN = Math.PI * 2

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const lerp = (a, b, t) => a + (b - a) * t
const smoothstep = (min, max, value) => { const t = clamp((value - min) / (max - min)); return t * t * (3 - 2 * t) }
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t) => 1 - Math.pow(1 - t, 4)

/** Where the phone rests for each step of the page, for the current viewport. */
function restingPoses(count, { width, height, heroBottom, reduced }) {
  const unit = VISIBLE_HEIGHT / height // world units per CSS pixel
  const poses = []

  if (width >= 768) {
    const content = Math.min(width, 1152)
    const x = content * 0.255 * unit
    const scale = Math.min(1, ((content / 2 - 56) * unit) / 0.82)
    for (let i = 0; i < count; i++) {
      const right = reduced || i % 2 === 0
      poses.push({
        x: right ? x : -x, y: -0.03, scale,
        rx: 0.07, ry: (right ? -0.36 : 0.36) + (i > 0 && !reduced ? TURN : 0), rz: right ? 0.03 : -0.03,
      })
    }
    if (!reduced) Object.assign(poses[0], { ry: -0.52, rz: 0.06, scale: scale * 1.05 })
    return poses
  }

  // Phone: the hero shows the top of the device under the text, then it moves up and shrinks.
  const heroScale = Math.min(1.08, (width * unit * 0.82) / 0.716)
  const heroTop = clamp(heroBottom / height, 0.3, 0.8)
  const stepScale = Math.min(0.68, (width * unit * 0.58) / 0.716)
  const stepTop = 86 / height
  for (let i = 0; i < count; i++) {
    poses.push(i === 0
      ? { x: 0, y: VISIBLE_HEIGHT / 2 - heroTop * VISIBLE_HEIGHT - 0.75 * heroScale, scale: heroScale, rx: 0.16, ry: reduced ? 0 : -0.24, rz: 0 }
      : { x: 0, y: VISIBLE_HEIGHT / 2 - stepTop * VISIBLE_HEIGHT - 0.75 * stepScale, scale: stepScale, rx: 0.05, ry: reduced ? 0 : (i % 2 ? 0.2 : -0.2) + TURN, rz: 0 })
  }
  return poses
}

/**
 * The phone that follows the page: it rests beside each step, turns as the visitor
 * scrolls from one to the next, and swaps its screen on the way.
 */
export function mountPhoneStage(canvas, { reduced = false, onReady } = {}) {
  const studio = createStudio(canvas)
  const { renderer, scene, camera } = studio
  camera.position.z = VISIBLE_HEIGHT / 2 / Math.tan((camera.fov * Math.PI) / 360)

  const phone = buildPhone()
  const glow = buildGlow()
  const dust = buildDust()
  glow.position.z = -0.9
  scene.add(phone.object, glow, dust)

  let stepScreens = []     // for each step, the index of its texture
  let textures = []
  let poses = []
  let layout = { width: 1, height: 1, heroBottom: 0 }
  // The part of the scroll between two steps during which the phone travels. On phones the
  // text slides over the device, so it waits until the previous card has gone past.
  let travelWindow = [0.16, 0.66]
  let target = 0           // scroll progress, in steps
  let progress = 0         // the same, smoothed
  let visible = false
  let frame = 0
  let last = 0
  let introStart = 0
  let ready = false
  let request = 0          // identifies the latest texture load
  const pointer = { x: 0, y: 0 }
  const tilt = { x: 0, y: 0, vx: 0, vy: 0 }

  const resize = () => {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    layout = { ...layout, width, height }
    poses = restingPoses(stepScreens.length, { ...layout, reduced })
    travelWindow = width >= 768 ? [0.16, 0.66] : [0.5, 0.94]
  }

  const render = (now) => {
    frame = 0
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
    last = now
    const time = now / 1000

    // Stay glued to the scroll position, with just enough smoothing to hide wheel steps.
    progress = reduced ? target : lerp(progress, target, 1 - Math.exp(-dt * 11))
    const max = poses.length - 1
    const index = Math.min(Math.floor(clamp(progress, 0, max)), Math.max(0, max - 1))
    const t = max > 0 ? easeInOut(smoothstep(travelWindow[0], travelWindow[1], progress - index)) : 0
    const from = poses[index]
    const to = poses[Math.min(index + 1, max)]

    if (from && to) {
      const intro = reduced ? 1 : easeOut(clamp((now - introStart) / 1900))
      const travel = Math.sin(Math.PI * t)

      // Decorative pointer tracking: a spring, so the phone has a little momentum.
      if (!reduced) {
        tilt.vx += ((pointer.x - tilt.x) * 70 - tilt.vx * 15) * dt
        tilt.vy += ((pointer.y - tilt.y) * 70 - tilt.vy * 15) * dt
        tilt.x += tilt.vx * dt
        tilt.y += tilt.vy * dt
      }
      const idle = reduced ? 0 : 1

      const object = phone.object
      object.position.set(
        lerp(from.x, to.x, t),
        lerp(from.y, to.y, t) + Math.sin(time * 0.9) * 0.012 * idle - (1 - intro) * 1.5,
        travel * 0.25,
      )
      object.rotation.set(
        lerp(from.rx, to.rx, t) + tilt.y * 0.09 + Math.sin(time * 0.7) * 0.012 * idle,
        lerp(from.ry, to.ry, t) + tilt.x * 0.16 - (1 - intro) * 2.6,
        lerp(from.rz, to.rz, t) + Math.sin(time * 0.55) * 0.008 * idle,
      )
      object.scale.setScalar(lerp(from.scale, to.scale, t) * (0.86 + 0.14 * intro))

      glow.position.x = object.position.x * 0.92
      glow.position.y = object.position.y + 0.05
      glow.material.opacity = 0.5 * intro
      dust.position.y = progress * 0.22 + time * 0.012
      dust.rotation.z = time * 0.006

      const screen = phone.screen.uniforms
      screen.a.value = textures[stepScreens[index]] ?? screen.a.value
      screen.b.value = textures[stepScreens[Math.min(index + 1, max)]] ?? screen.a.value
      screen.mixValue.value = smoothstep(0.4, 0.6, t)
    }

    renderer.render(scene, camera)
    if (ready === 'pending') { ready = true; onReady?.() }
    if (visible) frame = requestAnimationFrame(render)
  }

  const start = () => { if (!frame && visible) { last = performance.now(); frame = requestAnimationFrame(render) } }

  const onPointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1
  }
  if (!reduced) window.addEventListener('pointermove', onPointerMove, { passive: true })

  const observer = new ResizeObserver(resize)
  observer.observe(canvas)

  return {
    /** `urls`: one texture per screen; `screens`: for each step, which of them it shows. */
    setScreens(urls, screens) {
      stepScreens = screens
      const current = ++request
      resize()
      // The first screen is enough to show the phone; the others arrive behind it.
      urls.forEach((url, i) => {
        loadTexture(url, renderer).then((texture) => {
          if (current !== request) { texture.dispose(); return }
          textures[i]?.dispose()
          textures[i] = texture
          if (i === 0 && !ready) { ready = 'pending'; introStart = performance.now(); start() }
        }).catch(() => {})
      })
    },
    setProgress(value) { target = value },
    setLayout(next) { layout = { ...layout, ...next }; resize() },
    setVisible(value) { visible = value; if (value) start() },
    dispose() {
      visible = false
      request++
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      textures.forEach((texture) => texture?.dispose())
      disposeStudio(studio)
    },
  }
}
