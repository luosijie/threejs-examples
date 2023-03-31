import gsap from 'gsap'
import { BoxGeometry, BoxHelper, PointsMaterial, Group, Mesh, AdditiveBlending, PerspectiveCamera, Scene, BufferGeometry, WebGLRenderer, Material, BufferAttribute, DynamicDrawUsage, Points, Vector3, Line } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Pane } from 'tweakpane'

export interface Config {
    canvas: HTMLCanvasElement,
    width: number,
    height: number,

    range: number,
    maxParticleCount: number,
    particleCount: number,
    speed: number
}

interface PointsInfo {
    positions: Float32Array,
    velocities: Array<Vector3>
    lines: Array<Line>
}

export default class Sketch {
    controls: OrbitControls

    canvas: HTMLCanvasElement
    config: Config

    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera

    group: Group
    points: Points
    pointsInfo: PointsInfo

    constructor (config: Config) {
        this.config = config

        this.canvas = config.canvas
        
        this.scene = new Scene()
        this.renderer = this.createRenderer()
        this.camera = this.createCamera()
        this.controls = new OrbitControls(this.camera, this.canvas)

        this.group = new Group()
        this.pointsInfo = {
            positions: new Float32Array(this.config.maxParticleCount * 3),
            velocities: new Array(this.config.maxParticleCount),
            lines: []
        }
        this.points = this.createPoints()

        this.initPane()
        this.init()
    }

    private initPane () {
        const pane = new Pane()
        pane.addInput(this.config, 'particleCount', { min: 0, max: this.config.maxParticleCount }).on('change', evt => {
            const value = evt.value
            this.points.geometry.setDrawRange(0, value)
        })
        pane.addInput(this.config, 'speed', { min: 0, max: .1 })
    }

    private init () {
        this.updateCamera()

        this.group.add(this.points)
        this.scene.add(this.group)

        this.setHelper()

    }

    private createPoints () {
        const range = this.config.range
        const maxParticleCount = this.config.maxParticleCount
        const particleCount = this.config.particleCount

        const positions = this.pointsInfo.positions
        const velocities = this.pointsInfo.velocities
        for (let i = 0; i < maxParticleCount; i++ ) {
            const x = (Math.random() - 0.5) * range
            const y = (Math.random() - 0.5) * range
            const z = (Math.random() - 0.5) * range

            positions[i * 3 + 0] = x
            positions[i * 3 + 1] = y
            positions[i * 3 + 2] = z

            velocities[i] = new Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            )
        }

        const bufferGeomety = new BufferGeometry()
        bufferGeomety.setAttribute('position', new BufferAttribute(positions, 3).setUsage(DynamicDrawUsage))
        bufferGeomety.setDrawRange(0, particleCount)

        const material = new PointsMaterial({ color: 0xffffff, size: 3, blending: AdditiveBlending, transparent: true, sizeAttenuation: false })

        const points = new Points(bufferGeomety, material)

        return points
    }

    private updatePoints () {
        const positions = this.pointsInfo.positions
        const velocities = this.pointsInfo.velocities
        const lines = this.pointsInfo.lines
        const halfRange = this.config.range / 2
        
        if (lines.length) {
            for (let i = 0; i < lines.length; i++) {
                this.group.remove(lines[i])
            }
        }
        for (let i = 0; i < this.config.particleCount; i++) {
            // update position
            const x =  i * 3 + 0
            const y =  i * 3 + 1
            const z =  i * 3 + 2
            positions[x] += velocities[i].x * this.config.speed
            positions[y] += velocities[i].y * this.config.speed
            positions[z] += velocities[i].z * this.config.speed

            if (positions[x] > halfRange || positions[x] < -halfRange) {
                velocities[i].x = -velocities[i].x
            }
            if (positions[y] > halfRange || positions[y] < -halfRange) {
                velocities[i].y = -velocities[i].y
            }
            if (positions[z] > halfRange || positions[z] < -halfRange) {
                velocities[i].z = -velocities[i].z
            }

            for (let j = 0; j < this.config.particleCount; j++) {
                //
            }
        }

        this.points.geometry.attributes.position.needsUpdate = true

        // update line
    }

    private setHelper () {
        const range = this.config.range
        const boxHelper = new BoxHelper(
            new Mesh(new BoxGeometry(range, range, range)),
            0xf0f0f0
        )
        if (boxHelper.material instanceof Material) {
            boxHelper.material.blending = AdditiveBlending
            boxHelper.material.transparent = true
        }
        this.group.add(boxHelper)
    }

    private createRenderer () {
        const renderer = new WebGLRenderer({ antialias: true, canvas: this.canvas, alpha: true })
        renderer.setSize( this.config.width, this.config.height)
        renderer.setAnimationLoop( this.render.bind(this) )
        return renderer
    }

    private render () {
        this.updatePoints()

        this.controls.update()
        this.renderer.render( this.scene, this.camera )
    }

    private createCamera () {
        const camera = new PerspectiveCamera(70, this.config.width / this.config.height, 0.01, 1000 )
        camera.position.x = 6
        camera.position.y = 6
        camera.position.z = 8
        return camera
    }

    private updateCamera () {
        this.camera.aspect = this.config.width / this.config.height

        this.camera.updateProjectionMatrix()
    }

    updateSize (width: number, height: number) {
        // Update sizes
        this.config.width = width
        this.config.height = height

        // Update camera
        
        this.updateCamera()

        // Update renderer
        this.renderer.setSize(this.config.width, this.config.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    }
}