'use client'
import { useEffect, useRef } from 'react'

export default function BuildingScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let animId: number
    let THREE: typeof import('three')

    const init = async () => {
      THREE = await import('three')

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
      renderer.setClearColor(0x000000, 0)

      const scene  = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
      camera.position.set(4, 3, 5)
      camera.lookAt(0, 1.5, 0)

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
      dirLight.position.set(5, 8, 5)
      scene.add(dirLight)
      const coralLight = new THREE.PointLight(0xC0392B, 1.5, 8)
      coralLight.position.set(0, 4, 0)
      scene.add(coralLight)
      const tealLight = new THREE.PointLight(0x148F77, 0.8, 6)
      tealLight.position.set(-3, 2, -2)
      scene.add(tealLight)

      const building = new THREE.Group()

      // Base
      const baseGeo = new THREE.BoxGeometry(1.7, 0.1, 1.5)
      const baseMat = new THREE.MeshStandardMaterial({ color: 0x0D1B2A, metalness: 0.5, roughness: 0.4 })
      building.add(new THREE.Mesh(baseGeo, baseMat))

      // Floor data: [y, width, depth]
      const floors: [number, number, number][] = [
        [0.15, 1.2, 1.0], [0.47, 1.15, 0.95], [0.79, 1.1, 0.9],
        [1.11, 1.05, 0.88], [1.43, 1.0, 0.85], [1.75, 0.95, 0.82],
        [2.07, 0.88, 0.78], [2.39, 0.80, 0.72],
      ]

      const floorMats = [
        new THREE.MeshStandardMaterial({ color: 0x1A2E44, metalness: 0.3, roughness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0x162840, metalness: 0.3, roughness: 0.6 }),
      ]

      floors.forEach(([y, w, d], i) => {
        const geo = new THREE.BoxGeometry(w, 0.28, d)
        const mesh = new THREE.Mesh(geo, floorMats[i % 2])
        mesh.position.y = y
        building.add(mesh)

        // Windows — front face
        const cols = Math.floor(w / 0.22)
        const winMat = new THREE.MeshStandardMaterial({
          color: Math.random() > 0.4 ? 0xFEF9E7 : 0x1A2E44,
          emissive: Math.random() > 0.4 ? 0xD4AC0D : 0x000000,
          emissiveIntensity: Math.random() > 0.4 ? 0.6 : 0,
        })
        for (let c = 0; c < cols; c++) {
          const wx = -w / 2 + 0.18 + c * 0.22
          const wGeo = new THREE.BoxGeometry(0.08, 0.12, 0.02)
          const wm = new THREE.Mesh(wGeo, winMat.clone())
          wm.position.set(wx, y + 0.04, d / 2 + 0.01)
          building.add(wm)
          const wm2 = wm.clone()
          wm2.position.set(wx, y + 0.04, -d / 2 - 0.01)
          building.add(wm2)
        }
      })

      // Roof
      const roofGeo = new THREE.BoxGeometry(0.78, 0.07, 0.70)
      const roofMat = new THREE.MeshStandardMaterial({ color: 0xC0392B, metalness: 0.6, roughness: 0.3 })
      const roof = new THREE.Mesh(roofGeo, roofMat)
      roof.position.y = 2.71
      building.add(roof)

      // Antenna
      const antGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.7, 8)
      const antMat = new THREE.MeshStandardMaterial({ color: 0xC0392B, metalness: 0.8 })
      const ant = new THREE.Mesh(antGeo, antMat)
      ant.position.y = 3.1
      building.add(ant)

      // Antenna tip — glowing gold sphere
      const tipGeo = new THREE.SphereGeometry(0.045, 8, 8)
      const tipMat = new THREE.MeshStandardMaterial({ color: 0xD4AC0D, emissive: 0xD4AC0D, emissiveIntensity: 2 })
      const tip = new THREE.Mesh(tipGeo, tipMat)
      tip.position.y = 3.48
      building.add(tip)

      scene.add(building)

      // Floating spheres
      const spheres: THREE.Mesh[] = []
      const spherePositions: [number, number, number][] = [
        [-2.5, 1.0, -1.2], [2.8, 1.5, -0.8], [-2.0, -0.5, 1.5],
        [2.2, -1.0, 0.8],  [0.5, 3.5, -1.8],
      ]
      spherePositions.forEach(([x, y, z], i) => {
        const geo = new THREE.SphereGeometry(0.07 + i * 0.015, 16, 16)
        const mat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xC0392B : 0x148F77,
          transparent: true, opacity: 0.75,
          roughness: 0.2, metalness: 0.4,
        })
        const s = new THREE.Mesh(geo, mat)
        s.position.set(x, y, z)
        scene.add(s)
        spheres.push(s)
      })

      // Resize handler
      const onResize = () => {
        if (!canvas) return
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        renderer.setSize(w, h)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      window.addEventListener('resize', onResize)

      // Mouse parallax
      let mx = 0, my = 0
      const onMouse = (e: MouseEvent) => {
        mx = (e.clientX / window.innerWidth  - 0.5) * 2
        my = (e.clientY / window.innerHeight - 0.5) * 2
      }
      window.addEventListener('mousemove', onMouse)

      // Animate
      const clock = new THREE.Clock()
      const animate = () => {
        animId = requestAnimationFrame(animate)
        const t = clock.getElapsedTime()

        building.rotation.y = t * 0.18 + mx * 0.15
        building.rotation.x = my * 0.05

        spheres.forEach((s, i) => {
          s.position.y = spherePositions[i][1] + Math.sin(t * (1.2 + i * 0.3) + i) * 0.35
          s.rotation.y = t * 0.5
        })

        // Pulse tip
        tipMat.emissiveIntensity = 1.5 + Math.sin(t * 3) * 0.8

        renderer.render(scene, camera)
      }
      animate()

      return () => {
        window.removeEventListener('resize', onResize)
        window.removeEventListener('mousemove', onMouse)
        cancelAnimationFrame(animId)
        renderer.dispose()
      }
    }

    let cleanup: (() => void) | undefined
    init().then((fn) => { cleanup = fn })
    return () => { cleanup?.(); cancelAnimationFrame(animId) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
