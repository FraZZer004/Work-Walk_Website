import {
  ACESFilmicToneMapping, AdditiveBlending, BackSide, BoxGeometry, BufferGeometry, CanvasTexture, CapsuleGeometry, Color,
  CylinderGeometry, DataTexture, DoubleSide, Float32BufferAttribute, Group, LinearFilter, LinearMipmapLinearFilter, Mesh,
  MeshBasicMaterial, MeshPhysicalMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PMREMGenerator, Points,
  PointsMaterial, Scene, ShaderMaterial, Shape, ShapeGeometry, Sprite, SpriteMaterial, SRGBColorSpace, TextureLoader,
  WebGLRenderer,
} from 'three'

/* ---------- Studio: renderer, camera and a softbox environment for the reflections ---------- */

function buildEnvironment() {
  const scene = new Scene()
  scene.add(new Mesh(new BoxGeometry(24, 24, 24), new MeshBasicMaterial({ color: 0x040404, side: BackSide })))
  // Emissive panels play the role of photo-studio softboxes.
  const softbox = (width, height, color, intensity, position) => {
    const panel = new Mesh(
      new PlaneGeometry(width, height),
      new MeshBasicMaterial({ color: new Color(color).multiplyScalar(intensity), side: DoubleSide }),
    )
    panel.position.set(...position)
    panel.lookAt(0, 0, 0)
    scene.add(panel)
  }
  softbox(9, 5, 0xffffff, 7, [0, 9, 3])       // key light, overhead
  softbox(1.6, 10, 0xfff0dd, 16, [-9, 1, 2])  // left strip
  softbox(1.3, 10, 0xffffff, 11, [9, 0, 3])   // right strip
  softbox(7, 3, 0xff8a1e, 5, [0, -8, 4])      // warm bounce from the floor
  softbox(12, 1.2, 0xffb060, 9, [0, 3, -10])  // rim light, behind
  return scene
}

export function createStudio(canvas, { fov = 24 } = {}) {
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.outputColorSpace = SRGBColorSpace
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.setClearColor(0x000000, 0)

  const scene = new Scene()
  const pmrem = new PMREMGenerator(renderer)
  const environment = buildEnvironment()
  scene.environment = pmrem.fromScene(environment, 0.02).texture
  environment.traverse((node) => { node.geometry?.dispose(); node.material?.dispose() })
  pmrem.dispose()

  const camera = new PerspectiveCamera(fov, 1, 0.5, 40)
  return { renderer, scene, camera }
}

/** Frees everything a studio allocated on the GPU. */
export function disposeStudio({ renderer, scene }) {
  scene.traverse((node) => {
    node.geometry?.dispose()
    const materials = Array.isArray(node.material) ? node.material : node.material ? [node.material] : []
    materials.forEach((material) => {
      Object.values(material.uniforms ?? {}).forEach((uniform) => uniform.value?.isTexture && uniform.value.dispose())
      material.map?.dispose()
      material.dispose()
    })
  })
  scene.environment?.dispose()
  renderer.dispose()
}

/* ---------- Geometry ---------- */

export function roundedRect(width, height, radius) {
  const shape = new Shape()
  const x = -width / 2
  const y = -height / 2
  shape.moveTo(x + radius, y)
  shape.lineTo(x + width - radius, y)
  shape.absarc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false)
  shape.lineTo(x + width, y + height - radius)
  shape.absarc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false)
  shape.lineTo(x + radius, y + height)
  shape.absarc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false)
  shape.lineTo(x, y + radius)
  shape.absarc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5, false)
  return shape
}

/** A flat rounded rectangle facing +z, with UVs covering it from corner to corner. */
function face(width, height, radius) {
  const geometry = new ShapeGeometry(roundedRect(width, height, radius), 24)
  const position = geometry.attributes.position
  const uv = geometry.attributes.uv
  for (let i = 0; i < position.count; i++) {
    uv.setXY(i, position.getX(i) / width + 0.5, position.getY(i) / height + 0.5)
  }
  return geometry
}

/**
 * The band of a device: a rounded-rectangle outline swept along an edge profile
 * (flat side, rounded towards the front and the back). Normals are exact, so the
 * metal reflects cleanly. The front and back are left open for flat faces.
 */
function band(width, height, radius, depth, edge, { corner = 22, round = 9 } = {}) {
  const outline = []
  const centers = [
    [width / 2 - radius, height / 2 - radius, 0],
    [-(width / 2 - radius), height / 2 - radius, Math.PI / 2],
    [-(width / 2 - radius), -(height / 2 - radius), Math.PI],
    [width / 2 - radius, -(height / 2 - radius), Math.PI * 1.5],
  ]
  for (const [cx, cy, start] of centers) {
    for (let i = 0; i <= corner; i++) {
      const angle = start + (i / corner) * (Math.PI / 2)
      outline.push({ cx, cy, nx: Math.cos(angle), ny: Math.sin(angle) })
    }
  }

  const profile = []
  for (const [z0, from] of [[-depth / 2 + edge, -Math.PI / 2], [depth / 2 - edge, 0]]) {
    for (let i = 0; i <= round; i++) {
      const angle = from + (i / round) * (Math.PI / 2)
      profile.push({ inset: edge * (1 - Math.cos(angle)), z: z0 + edge * Math.sin(angle), out: Math.cos(angle), up: Math.sin(angle) })
    }
  }

  const positions = []
  const normals = []
  for (const point of outline) {
    for (const step of profile) {
      const reach = radius - step.inset
      positions.push(point.cx + point.nx * reach, point.cy + point.ny * reach, step.z)
      normals.push(point.nx * step.out, point.ny * step.out, step.up)
    }
  }

  const indices = []
  const rows = profile.length
  for (let j = 0; j < outline.length; j++) {
    const next = (j + 1) % outline.length
    for (let i = 0; i < rows - 1; i++) {
      const a = j * rows + i
      const b = next * rows + i
      const c = next * rows + i + 1
      const d = j * rows + i + 1
      indices.push(a, b, c, a, c, d)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('normal', new Float32BufferAttribute(normals, 3))
  geometry.setIndex(indices)
  return geometry
}

/* ---------- Materials ---------- */

const blank = new DataTexture(new Uint8Array([10, 9, 8, 255]), 1, 1)
blank.colorSpace = SRGBColorSpace
blank.needsUpdate = true

/**
 * The lit display. Unlit and not tone-mapped, so screenshots keep their exact colours.
 * `mix` wipes from texture `a` to texture `b`, top to bottom, with a thin orange edge.
 */
export function screenMaterial() {
  return new ShaderMaterial({
    uniforms: { a: { value: blank }, b: { value: blank }, mixValue: { value: 0 } },
    vertexShader: /* glsl */`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform sampler2D a;
      uniform sampler2D b;
      uniform float mixValue;
      varying vec2 vUv;
      void main() {
        float softness = 0.22;
        float front = mixValue * (1.0 + softness);
        float k = 1.0 - smoothstep(front - softness, front, 1.0 - vUv.y);
        vec3 color = mix(texture2D(a, vUv).rgb, texture2D(b, vUv).rgb, k);
        color += vec3(1.0, 0.32, 0.0) * k * (1.0 - k) * 0.55;
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }`,
    toneMapped: false,
  })
}

/** Cover glass: adds only the reflections of the studio on top of what is behind it. */
function glassMaterial() {
  return new MeshPhysicalMaterial({
    color: 0x000000, roughness: 0.03, metalness: 0, ior: 1.5, envMapIntensity: 0.3,
    transparent: true, blending: AdditiveBlending, depthWrite: false,
  })
}

export function loadTexture(url, renderer) {
  return new Promise((resolve, reject) => {
    new TextureLoader().load(url, (texture) => {
      texture.colorSpace = SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      texture.minFilter = LinearMipmapLinearFilter
      texture.magFilter = LinearFilter
      resolve(texture)
    }, undefined, reject)
  })
}

/* ---------- iPhone ---------- */

export function buildPhone() {
  const W = 0.716
  const H = 1.5
  const D = 0.0875
  const R = 0.118
  const EDGE = 0.014
  const INSET = 0.024 // from the device edge to the lit display

  const phone = new Group()
  const aluminium = new MeshStandardMaterial({ color: 0xcf5a17, metalness: 1, roughness: 0.36 })
  const darkGlass = new MeshStandardMaterial({ color: 0x030303, metalness: 0, roughness: 0.25 })

  phone.add(new Mesh(band(W, H, R, D, EDGE), aluminium))

  // Front: black glass, display, Dynamic Island, then the reflective cover glass.
  const front = new Mesh(face(W - 2 * EDGE, H - 2 * EDGE, R - EDGE), darkGlass)
  front.position.z = D / 2
  phone.add(front)

  const screenWidth = W - 2 * INSET
  const screenHeight = H - 2 * INSET
  const screen = new Mesh(face(screenWidth, screenHeight, R - INSET), screenMaterial())
  screen.position.z = D / 2 + 0.0006
  phone.add(screen)

  const island = new Mesh(face(0.205, 0.06, 0.03), new MeshBasicMaterial({ color: 0x000000 }))
  island.position.set(0, screenHeight / 2 - 0.05, D / 2 + 0.001)
  phone.add(island)

  const glass = new Mesh(face(W - 2 * EDGE, H - 2 * EDGE, R - EDGE), glassMaterial())
  glass.position.z = D / 2 + 0.0014
  glass.renderOrder = 2
  phone.add(glass)

  // Back: everything is built facing +z, then the group is turned around.
  const back = new Group()
  back.rotation.y = Math.PI
  back.position.z = -D / 2
  phone.add(back)

  back.add(new Mesh(face(W - 2 * EDGE, H - 2 * EDGE, R - EDGE), new MeshStandardMaterial({ color: 0xc9561a, metalness: 0.92, roughness: 0.5 })))

  const window_ = new Mesh(face(0.57, 0.82, 0.075), new MeshStandardMaterial({ color: 0xd4631f, metalness: 0.7, roughness: 0.3 }))
  window_.position.set(0, -0.2, 0.0006)
  back.add(window_)

  // Camera plateau across the top, with three lenses, the flash and the LiDAR.
  const plateauHeight = 0.34
  const plateauDepth = 0.026
  const plateauY = H / 2 - 0.032 - plateauHeight / 2
  const plateau = new Group()
  plateau.position.set(0, plateauY, plateauDepth / 2 - 0.002)
  plateau.add(new Mesh(band(W - 0.064, plateauHeight, 0.1, plateauDepth, 0.011), aluminium))
  const plateauTop = new Mesh(face(W - 0.064 - 0.022, plateauHeight - 0.022, 0.089), new MeshStandardMaterial({ color: 0xcf5a18, metalness: 0.9, roughness: 0.4 }))
  plateauTop.position.z = plateauDepth / 2
  plateau.add(plateauTop)
  back.add(plateau)

  const ringMaterial = new MeshStandardMaterial({ color: 0xb04c12, metalness: 1, roughness: 0.22 })
  const lensMaterial = new MeshPhysicalMaterial({ color: 0x020305, metalness: 0, roughness: 0.04, clearcoat: 1, clearcoatRoughness: 0.02 })
  const coatingMaterial = new MeshPhysicalMaterial({ color: 0x0b1530, metalness: 0.6, roughness: 0.15, clearcoat: 1 })
  const disc = (radius, depth, material, x, y, z) => {
    const mesh = new Mesh(new CylinderGeometry(radius, radius, depth, 56), material)
    mesh.rotation.x = Math.PI / 2
    mesh.position.set(x, y, z)
    plateau.add(mesh)
  }
  const top = plateauDepth / 2
  for (const [x, y] of [[-0.2, 0.078], [-0.2, -0.078], [-0.055, 0]]) {
    disc(0.07, 0.02, ringMaterial, x, y, top + 0.008)
    disc(0.057, 0.022, lensMaterial, x, y, top + 0.009)
    disc(0.03, 0.023, coatingMaterial, x, y, top + 0.009)
  }
  disc(0.024, 0.004, new MeshStandardMaterial({ color: 0xfff1c9, emissive: 0x3a2a10, roughness: 0.5 }), 0.2, 0.08, top + 0.001)
  disc(0.02, 0.004, lensMaterial, 0.2, -0.08, top + 0.001)

  // Side buttons: thin capsules sitting on the band.
  const button = (side, y, length) => {
    const mesh = new Mesh(new CapsuleGeometry(0.016, length, 6, 14), aluminium)
    mesh.scale.x = 0.42
    mesh.position.set(side * (W / 2), y, 0)
    phone.add(mesh)
  }
  button(-1, 0.44, 0.03)  // action
  button(-1, 0.3, 0.085)  // volume up
  button(-1, 0.15, 0.085) // volume down
  button(1, 0.24, 0.15)   // power
  button(1, -0.3, 0.07)   // camera control

  return { object: phone, screen: screen.material, height: H, width: W }
}

/* ---------- Apple Watch ---------- */

function strap(width, length, thickness, bend) {
  const geometry = new BoxGeometry(width, length, thickness, 1, 28, 1)
  const position = geometry.attributes.position
  for (let i = 0; i < position.count; i++) {
    const along = position.getY(i) + length / 2
    const angle = along / bend
    const reach = bend + position.getZ(i)
    position.setY(i, Math.sin(angle) * reach)
    position.setZ(i, -bend + Math.cos(angle) * reach)
  }
  geometry.computeVertexNormals()
  return geometry
}

export function buildWatch() {
  const W = 0.87
  const H = 1
  const D = 0.23
  const R = 0.25
  const EDGE = 0.085
  const INSET = 0.097

  const watch = new Group()
  const metal = new MeshStandardMaterial({ color: 0xb9b3aa, metalness: 1, roughness: 0.3 })
  const rubber = new MeshStandardMaterial({ color: 0xf07a1c, metalness: 0, roughness: 0.62 })

  watch.add(new Mesh(band(W, H, R, D, EDGE, { round: 14 }), metal))

  const front = new Mesh(face(W - 2 * EDGE, H - 2 * EDGE, R - EDGE), new MeshStandardMaterial({ color: 0x030303, roughness: 0.2 }))
  front.position.z = D / 2
  watch.add(front)

  const screen = new Mesh(face(W - 2 * INSET, H - 2 * INSET, R - INSET), screenMaterial())
  screen.position.z = D / 2 + 0.001
  watch.add(screen)

  const glass = new Mesh(face(W - 2 * EDGE, H - 2 * EDGE, R - EDGE), glassMaterial())
  glass.position.z = D / 2 + 0.002
  glass.renderOrder = 2
  watch.add(glass)

  const backPlate = new Mesh(face(W - 2 * EDGE, H - 2 * EDGE, R - EDGE), new MeshStandardMaterial({ color: 0x151515, roughness: 0.3, metalness: 0.4 }))
  backPlate.rotation.y = Math.PI
  backPlate.position.z = -D / 2
  watch.add(backPlate)

  // Digital Crown, with an orange cap, and the side button below it.
  const crown = new Mesh(new CylinderGeometry(0.075, 0.075, 0.06, 40), metal)
  crown.rotation.z = Math.PI / 2
  crown.position.set(W / 2 + 0.022, 0.19, 0)
  watch.add(crown)
  const cap = new Mesh(new CylinderGeometry(0.052, 0.052, 0.006, 40), new MeshStandardMaterial({ color: 0xff8a1e, metalness: 0.3, roughness: 0.4 }))
  cap.rotation.z = Math.PI / 2
  cap.position.set(W / 2 + 0.054, 0.19, 0)
  watch.add(cap)
  const side = new Mesh(new CapsuleGeometry(0.03, 0.15, 6, 14), metal)
  side.scale.x = 0.3
  side.position.set(W / 2 - 0.002, -0.13, 0)
  watch.add(side)

  // Sport band: two straps curving away behind the case.
  const strapGeometry = strap(0.66, 1.05, 0.06, 0.62)
  const upper = new Mesh(strapGeometry, rubber)
  upper.position.set(0, H / 2 - 0.06, -0.035)
  watch.add(upper)
  const lower = new Mesh(strapGeometry, rubber)
  lower.rotation.z = Math.PI
  lower.position.set(0, -(H / 2 - 0.06), -0.035)
  watch.add(lower)

  return { object: watch, screen: screen.material, height: H, width: W }
}

/* ---------- Atmosphere ---------- */

function radialTexture(stops) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  stops.forEach(([offset, color]) => gradient.addColorStop(offset, color))
  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  return texture
}

/** A soft orange glow that sits behind a device. */
export function buildGlow(scale = 3.6, opacity = 0.5) {
  const material = new SpriteMaterial({
    map: radialTexture([[0, 'rgba(255,140,20,0.9)'], [0.35, 'rgba(255,110,10,0.32)'], [1, 'rgba(255,90,0,0)']]),
    blending: AdditiveBlending, transparent: true, depthWrite: false, opacity, toneMapped: false,
  })
  const sprite = new Sprite(material)
  sprite.scale.setScalar(scale)
  sprite.renderOrder = -1
  return sprite
}

/** Slow dust motes around the device, for depth. */
export function buildDust(count = 150) {
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 9
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6
    positions[i * 3 + 2] = -3.2 + Math.random() * 4.2
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  const material = new PointsMaterial({
    map: radialTexture([[0, 'rgba(255,190,120,1)'], [0.4, 'rgba(255,150,60,0.35)'], [1, 'rgba(255,120,0,0)']]),
    size: 0.045, sizeAttenuation: true, transparent: true, opacity: 0.55,
    blending: AdditiveBlending, depthWrite: false, toneMapped: false,
  })
  return new Points(geometry, material)
}
