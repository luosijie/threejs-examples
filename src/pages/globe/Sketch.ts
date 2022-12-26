import gsap from 'gsap'
import { Clock, Group, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Config, Size } from './Types'

import Globe from './Globe'
import Atmosphere from './Atmosphere'
import Stars from './Stars'

interface Mouse {
    x: number,
    y: number
}

export default class Sketch {
    config: Config
    size: Size
    mouse: Mouse

    controls: OrbitControls

    canvas: HTMLCanvasElement
    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera

    group: Group
    globe: Globe
    atmosphere: Atmosphere
    stars: Stars
    constructor (config: Config) {
        this.config = config

        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.mouse = {
            x: 0, 
            y: 0
        }

        this.canvas = config.canvas
        this.renderer = this.setRenderer()
        this.scene = new Scene()
        this.camera = this.setCamera()
        this.controls = new OrbitControls(this.camera, this.canvas)

        this.group = new Group()
        this.globe = new Globe(config.resources.globe)
        this.atmosphere = new Atmosphere()
        this.stars = new Stars()

        this.updateCamera()

        this.init()
    }

    init () {
        this.scene.add(this.atmosphere.mesh)

        this.group.add(this.globe.mesh)
        this.scene.add(this.group)

        this.scene.add(this.stars.points)

        window.addEventListener('resize', () => {
            this.updateSize()
        })

        window.addEventListener('mousemove', evt => {
            this.mouse.x = (evt.clientX / this.size.width) * 2 - 1
            this.mouse.y = (evt.clientY / this.size.height) * 2 - 1
        })
    }

    render () {
        this.globe.mesh.rotation.y += 0.002

        gsap.to(this.group.rotation, {
            y: this.mouse.x
        })

        this.controls.update()
        this.renderer.render( this.scene, this.camera )
    }

    setCamera () {
        const camera = new PerspectiveCamera(70, this.size.width / this.size.height, 0.01, 1000 )
        camera.position.z = 15
        return camera
    }

    updateCamera () {

        // const angle = Math.atan( (this.size.height / 2) / 100 )
        // const fov = angle * 180 / Math.PI * 2
        // this.camera.fov = fov

        this.camera.aspect = this.size.width / this.size.height

        this.camera.updateProjectionMatrix()
    }

    setRenderer () {
        const renderer = new WebGLRenderer({ antialias: true, canvas: this.canvas, alpha: true })
        renderer.setSize( this.size.width, this.size.height)
        renderer.setAnimationLoop( this.render.bind(this) )
        return renderer
    }

    updateSize () {
        // Update sizes
        this.size.width = window.innerWidth
        this.size.height = window.innerHeight

        // Update camera
        
        this.updateCamera()

        // Update renderer
        this.renderer.setSize(this.size.width, this.size.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    }
}