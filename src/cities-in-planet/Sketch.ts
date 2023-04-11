import gsap from 'gsap'
import { Clock, Group, Mesh, PerspectiveCamera, Scene, Vector2, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Size } from './Types'

import Globe from './Globe'
import Atmosphere from './Atmosphere'
import Stars from './Stars'
import Cities from './Cities'

interface Mouse {
    x: number,
    y: number
}

interface Config {
    canvas: HTMLCanvasElement,
    resources: any,
    radius: number
}

export default class Sketch {
    config: Config
    size: Size
    mouse: Mouse

    controls: OrbitControls

    clock: Clock

    canvas: HTMLCanvasElement
    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera

    group: Group
    globe: Globe
    stars: Stars
    atmosphere: Atmosphere
    cities: Cities
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

        this.clock = new Clock()

        this.canvas = config.canvas
        this.renderer = this.createRender()
        this.scene = new Scene()
        this.camera = this.createCamera()
        this.controls = new OrbitControls(this.camera, this.canvas)

        this.group = new Group()
        this.globe = new Globe(config.resources.globe, this.config.radius)
        this.cities = new Cities(this.config.radius)

        this.atmosphere = new Atmosphere()
        this.stars = new Stars()

        this.updateCamera()

        this.init()
    }

    init () {

        this.group.add(this.globe.main)
        this.group.add(this.cities.main)
        
        this.scene.add(this.group)

        this.scene.add(this.atmosphere.main)

        this.scene.add(this.stars.main)
       
    }

    render () {
        const elapsedTime = this.clock.getElapsedTime()

        this.controls.update()
        this.cities.update(elapsedTime)
        this.renderer.render( this.scene, this.camera )
    }

    private createCamera () {
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

    private createRender () {
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

    updateMouse (x: number, y: number) {
        this.mouse.x = (x / this.size.width) * 2 - 1
        this.mouse.y = (y / this.size.height) * 2 - 1
    }
}