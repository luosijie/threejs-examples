import {
    Scene,
    WebGLRenderer,
    DirectionalLight,
    AmbientLight,
    AxesHelper,
    GridHelper,
    sRGBEncoding,
    PCFSoftShadowMap,
    OrthographicCamera,
    CineonToneMapping
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import { Pane } from 'tweakpane'
import pane from './pane'

interface Size {
    width: number
    height: number
    aspect: number
    pixelRatio: number
    frustum: number
}

export default class World {
    canvas: HTMLCanvasElement

    size: Size
    scene: Scene
    camera: OrthographicCamera
    renderer: WebGLRenderer

    sunLight: DirectionalLight
    ambientLight: AmbientLight

    // orbitControls: OrbitControls
    
    constructor (canvas: HTMLCanvasElement) {
        this.canvas = canvas

        this.size = this.setSize()

        this.scene = new Scene()
        this.camera = this.setCamera()
        this.renderer = this.setRenderer()
        
        this.sunLight = this.setSunLight()
        this.ambientLight = this.setAmbientLight()

        // this.orbitControls = this.setOrbitControls()

        this.init()
    }
    
    init () {
        this.scene.add(this.camera)
        this.scene.add(this.sunLight)
        this.scene.add(this.ambientLight)

        this.buildPane()
        
        this.buildHelper()

    }

    updateSize () {
        this.size = this.setSize()

        this.camera.left = (-this.size.aspect * this.size.frustum) / 2
        this.camera.right = (this.size.aspect * this.size.frustum) / 2
        this.camera.top = this.size.frustum / 2
        this.camera.bottom = -this.size.frustum / 2
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.size.width, this.size.height)
        this.renderer.setPixelRatio(this.size.pixelRatio)
    }

    render () {
        this.camera.updateMatrixWorld()
        this.renderer.render(this.scene, this.camera)
    }

    private buildPane () {

        // Camera
        const camera = pane.addFolder({
            title: 'camera'
        })
        // Camera position
        const cameraPosition = camera.addFolder({
            title: 'position',
            expanded: false
        })
        cameraPosition.addInput(this.camera.position, 'x', { min: -10, max: 20, step: 0.01 })
        cameraPosition.addInput(this.camera.position, 'y', { min: -10, max: 20, step: 0.01 })
        cameraPosition.addInput(this.camera.position, 'z', { min: -10, max: 20, step: 0.01 })

        // Camera rotation
        const cameraRotation = camera.addFolder({
            title: 'rotation',
            expanded: false
        })
        cameraRotation.addInput(this.camera.rotation, 'x', { min: -1, max: 1, step: 0.01 })
        cameraRotation.addInput(this.camera.rotation, 'y', { min: -1, max: 1, step: 0.01 })
        cameraRotation.addInput(this.camera.rotation, 'z', { min: -1, max: 1, step: 0.01 })
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
            frustum: 5
        }
    }

    private setCamera () {
        const camera = new OrthographicCamera(
            (-this.size.aspect * this.size.frustum) / 2,
            (this.size.aspect * this.size.frustum) / 2,
            this.size.frustum / 2,
            -this.size.frustum / 2,
            -50,
            50
        )
        camera.position.y = 7.1
        camera.position.z = 10
        camera.rotation.x = -Math.PI / 5
        return camera
    }

    private setRenderer () {
        const renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas
        })
        renderer.physicallyCorrectLights = true
        renderer.outputEncoding = sRGBEncoding
        renderer.toneMapping = CineonToneMapping
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
    
    // private setOrbitControls () {
    //     const orbitControls = new OrbitControls(this.camera, this.canvas)
    //     orbitControls.enableDamping = true
    //     return orbitControls
    // }
}

