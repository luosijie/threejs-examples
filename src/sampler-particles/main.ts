
import { Scene, sRGBEncoding, PerspectiveCamera, WebGLRenderer, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

import Loader, { LoaderType } from '@/utils/Loader'
import Model from './Model'
import { Pane } from 'tweakpane'

const pane = new Pane()
pane.addBlade({
    view: 'list',
    label: 'scene',
    options: [
        { text: 'horse', value: 'horse' },
        { text: 'skull', value: 'skull' }
    ],
    value: 'horse'
})

const loader = new Loader()
loader.load([
    { name: 'horse', type: LoaderType.GLTF, path: './resources/horse.glb' },
    { name: 'skull', type: LoaderType.GLTF, path: './resources/skull.glb' }
])

// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
   
const canvas = document.querySelector('#canvas')

if (canvas instanceof HTMLCanvasElement) {

    loader.onLoadEnd(() => {

        // Renderer
        const renderer = new WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha:true
        })
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.outputEncoding = sRGBEncoding
    
        // Scene
        const scene = new Scene()
    
        // Camera
        const camera = new PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
        camera.position.z = 5
        camera.position.y = 1

        const horse = new Model(loader.resources.horse, scene)
        const skull = new Model(loader.resources.skull, scene)
        
        horse.show()

        pane.on('change', evt => {
            const value = evt.value
            if (value === 'horse') {
                horse.show()
                skull.hide()
            } else {
                horse.hide()
                skull.show()
            }
        })

        window.addEventListener('resize', () => {
        // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
    
            // Update camera
            camera.aspect = sizes.width / sizes.height
            camera.updateProjectionMatrix()
    
            // Update renderer
            renderer.setSize(sizes.width, sizes.height)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        })
    
        window.addEventListener('mousemove', evt => {
            const x = evt.clientX
            const y = evt.clientY
            gsap.to(scene.rotation, {
                y: gsap.utils.mapRange(0, window.innerWidth, 0.5, -0.5, x),
                x: gsap.utils.mapRange(0, window.innerHeight, .5, -.5, y)
            })
        })
    
        // Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.enabled = false
    
        // animate
        const clock = new Clock()
    
        const tick = () => {
            const elapsedTime = clock.getElapsedTime()
    
            if (horse) {
                horse.material.uniforms.uTime.value = elapsedTime
            }
    
            if (skull) {
                skull.material.uniforms.uTime.value = elapsedTime
            }
    
            // Update controls
            controls.update()
    
            // Render
            renderer.render(scene, camera)
    
            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
    
        tick()
    })

}
