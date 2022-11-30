import {
    Scene,
    WebGLRenderer,
    DirectionalLight,
    AmbientLight,
    AxesHelper,
    PerspectiveCamera,
    GridHelper,
    sRGBEncoding,
    PCFSoftShadowMap
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface Size {
    width: number
    height: number
    aspect: number
    pixelRatio: number
    frustrum: number
}

export default class World {
    canvas: HTMLCanvasElement

    size: Size
    scene: Scene
    camera: PerspectiveCamera
    renderer: WebGLRenderer

    sunLight: DirectionalLight
    ambientLight: AmbientLight

    orbitControls: OrbitControls
    
    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.size = this.setSize()

        this.scene = new Scene()
        this.camera = this.setCamera()
        this.renderer = this.setRenderer()
        
        this.sunLight = this.setSunLight()
        this.ambientLight = this.setAmbientLight()

        this.orbitControls = this.setOrbitControls()

        this.init()
    }
    
    init () {
        this.scene.add(this.camera)
        this.scene.add(this.sunLight)
        this.scene.add(this.ambientLight)
        
        this.buildHelper()

        const tick = () => {
            this.render()
            this.orbitControls.update()
            window.requestAnimationFrame(tick)
        }
    
        tick()
    }

    updateSize () {
        this.size = this.setSize()

        this.camera.aspect = this.size.aspect
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.size.width, this.size.height)
    }

    render () {
        this.renderer.render(this.scene, this.camera)
    }

    private buildHelper () {
        const axesHelper = new AxesHelper(30)
        this.scene.add(axesHelper)

        const gridHelper = new GridHelper(100, 30, 0x2C2C2C, 0x888888)
        this.scene.add(gridHelper)
    }

    private setSize () {
        const width = window.innerWidth
        const height = window.innerHeight
        return {
            width,
            height,
            aspect: width / height,
            pixelRatio: Math.min(window.devicePixelRatio, 2),
            frustrum: 5
        }
    }

    private setCamera () {
        const camera = new PerspectiveCamera(35, this.size.aspect, 0.1, 1000)
        camera.position.x = 29
        camera.position.y = 14
        camera.position.z = 12
        camera.lookAt(0, 0, 0)
        return camera
    }

    private setRenderer () {
        const renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas
        })
        renderer.physicallyCorrectLights = true
        renderer.outputEncoding = sRGBEncoding
        renderer.toneMappingExposure = 1.75
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = PCFSoftShadowMap
        renderer.setSize(this.size.width, this.size.height)
        renderer.setPixelRatio(this.size.pixelRatio)
        return renderer
    }

    private setSunLight () {
        const directionalLight = new DirectionalLight('#ffffff', 3)
        directionalLight.castShadow = true
        directionalLight.shadow.camera.far = 20
        directionalLight.shadow.mapSize.set(2048, 2048)
        directionalLight.shadow.normalBias = 0.05
        
        directionalLight.position.set(-1.5, 7, 3)
        return directionalLight
    }

    private setAmbientLight () {
        const ambientLight = new AmbientLight('#ffffff', 1)
        return ambientLight
    }
    
    private setOrbitControls () {
        const orbitControls = new OrbitControls(this.camera, this.canvas)
        orbitControls.enableDamping = true
        return orbitControls
    }
}

