import {
  ACESFilmicToneMapping, DirectionalLight, HemisphereLight, Mesh, MeshPhysicalMaterial,
  PerspectiveCamera, PMREMGenerator, Scene, TorusKnotGeometry, Vector3, WebGLRenderer,
} from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

export function mountSculpture(host: HTMLElement, setVisible: (visible: boolean) => void) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('webgl2', { alpha: true, antialias: true })
  if (!context) return

  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.toneMapping = ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.94

  const scene = new Scene()
  const camera = new PerspectiveCamera(32, 1, 0.1, 40)
  camera.position.set(0, 0, 7.6)

  const room = new RoomEnvironment()
  const pmrem = new PMREMGenerator(renderer)
  const reflections = pmrem.fromScene(room, 0.04)
  scene.environment = reflections.texture
  room.dispose()
  pmrem.dispose()

  const segments = 576
  const sides = 24
  const geometry = new TorusKnotGeometry(1.04, 0.275, segments, sides, 2, 3)
  const positions = geometry.attributes.position!
  const normals = geometry.attributes.normal!
  const position = new Vector3()
  const normal = new Vector3()
  for (let ring = 0; ring <= segments; ring++) {
    const rib = 0.018 * Math.cos(ring / segments * Math.PI * 2 * 72)
    for (let side = 0; side <= sides; side++) {
      const vertex = ring * (sides + 1) + side
      position.fromBufferAttribute(positions, vertex).addScaledVector(normal.fromBufferAttribute(normals, vertex), rib)
      positions.setXYZ(vertex, position.x, position.y, position.z)
    }
  }
  geometry.computeVertexNormals()
  const material = new MeshPhysicalMaterial({
    color: 0x9edd19, metalness: 0.73, roughness: 0.31, clearcoat: 0.4, clearcoatRoughness: 0.28,
  })
  const sculpture = new Mesh(geometry, material)
  scene.add(sculpture, new HemisphereLight(0xecffc5, 0x222805, 0.9))
  const key = new DirectionalLight(0xf6ffd9, 1.8)
  key.position.set(-3, 5, 4)
  const rim = new DirectionalLight(0x9bd318, 2.5)
  rim.position.set(4, 0, -3)
  scene.add(key, rim)

  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  let frame = 0
  let aimX = 0
  let aimY = 0
  let turnX = 0
  let turnY = 0
  let contextLost = false
  let inView = true
  let painted = false

  function draw() {
    frame = 0
    if (contextLost || !inView) return
    turnX += (aimX - turnX) * 0.14
    turnY += (aimY - turnY) * 0.14
    sculpture.rotation.set(0.37 + turnX, -0.30 + turnY, -0.25)
    renderer.render(scene, camera)
    if (!painted) {
      painted = true
      setVisible(true)
    }
    if (Math.abs(aimX - turnX) + Math.abs(aimY - turnY) > 0.002) schedule()
  }

  function schedule() {
    if (!frame && !contextLost && inView) frame = requestAnimationFrame(draw)
  }

  function resize() {
    const { clientWidth: width, clientHeight: height } = host
    if (!width || !height) return
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.position.z = 8.35 * Math.max(1, 1 / camera.aspect)
    camera.updateProjectionMatrix()
    schedule()
  }

  function move(event: PointerEvent) {
    if (motion.matches || (event.pointerType !== 'mouse' && event.buttons === 0)) return
    const bounds = host.getBoundingClientRect()
    aimY = (event.clientX - bounds.left - bounds.width / 2) / bounds.width * 1.15
    aimX = (event.clientY - bounds.top - bounds.height / 2) / bounds.height * 0.85
    schedule()
  }

  function reset() {
    aimX = 0
    aimY = 0
    if (motion.matches) turnX = turnY = 0
    schedule()
  }

  function loseContext() {
    contextLost = true
    setVisible(false)
  }

  host.append(canvas)
  host.addEventListener('pointermove', move)
  host.addEventListener('pointerleave', reset)
  host.addEventListener('pointerup', reset)
  host.addEventListener('pointercancel', reset)
  motion.addEventListener('change', reset)
  canvas.addEventListener('webglcontextlost', loseContext)
  const sizes = new ResizeObserver(resize)
  sizes.observe(host)
  const viewport = new IntersectionObserver(([entry]) => {
    inView = Boolean(entry?.isIntersecting)
    schedule()
  })
  viewport.observe(host)
  resize()

  return () => {
    cancelAnimationFrame(frame)
    sizes.disconnect()
    viewport.disconnect()
    host.removeEventListener('pointermove', move)
    host.removeEventListener('pointerleave', reset)
    host.removeEventListener('pointerup', reset)
    host.removeEventListener('pointercancel', reset)
    motion.removeEventListener('change', reset)
    canvas.removeEventListener('webglcontextlost', loseContext)
    reflections.dispose()
    geometry.dispose()
    material.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    canvas.remove()
  }
}
