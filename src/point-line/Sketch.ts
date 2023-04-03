import gsap from 'gsap'
import { BoxGeometry, BoxHelper, PointsMaterial, Group, Mesh, AdditiveBlending, PerspectiveCamera, Scene, BufferGeometry, WebGLRenderer, Material, BufferAttribute, DynamicDrawUsage, Points, Vector3, Line, LineBasicMaterial, LineSegments, sRGBEncoding } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Pane } from 'tweakpane'

export interface Config {
    canvas: HTMLCanvasElement,
    width: number,
    height: number,

    range: number,
    maxParticleCount: number,
    particleCount: number,
    speed: number,

    showLines: boolean,
    connectionsDist: number,
    connectionsLimit: number
}

interface PointInfo {
    position: Vector3,
    velocity: Vector3,
    connections: number
}

export default class Sketch {
    controls: OrbitControls

    canvas: HTMLCanvasElement
    config: Config

    renderer: WebGLRenderer
    scene: Scene
    camera: PerspectiveCamera

    group: Group

    pointInfos: Array<PointInfo>
    pointsPositionArray: Float32Array
    points: Points

    linesPositionArray: Float32Array
    linesColorArray: Float32Array
    lines: LineSegments

    constructor (config: Config) {
        this.config = config

        this.canvas = config.canvas
        
        this.scene = new Scene()
        this.renderer = this.createRenderer()
        this.camera = this.createCamera()
        this.controls = new OrbitControls(this.camera, this.canvas)

        this.group = new Group()

        this.pointInfos = new Array(this.config.maxParticleCount)
        this.pointsPositionArray = new Float32Array(this.config.maxParticleCount * 3)
        this.points = this.createPoints()

        const linesNum = this.config.particleCount * this.config.particleCount / 2
        this.linesPositionArray = new Float32Array(linesNum * 3)
        this.linesColorArray = new Float32Array(linesNum * 3)
        this.lines = this.createLines()

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
        pane.addInput(this.config, 'showLines')
        pane.addInput(this.config, 'connectionsDist', { min: 0, max: 300 })
        pane.addInput(this.config, 'connectionsLimit',  { min: 0, max: 10 })
    }

    private init () {
        this.updateCamera()

        this.group.add(this.points)
        this.group.add(this.lines)

        this.scene.add(this.group)

        this.setHelper()

    }

    private createPoints () {
        const range = this.config.range
        const maxParticleCount = this.config.maxParticleCount
        const particleCount = this.config.particleCount

        for (let i = 0; i < maxParticleCount; i++ ) {

            const x = (Math.random() - 0.5) * range
            const y = (Math.random() - 0.5) * range
            const z = (Math.random() - 0.5) * range
            
            this.pointsPositionArray[i * 3 + 0] = x
            this.pointsPositionArray[i * 3 + 1] = y
            this.pointsPositionArray[i * 3 + 2] = z

            const position = new Vector3(x, y, z)
            const velocity = new Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1

            )

            const pointInfo = {
                position,
                velocity,
                connections: 0
            }

            this.pointInfos[i] = pointInfo
        }

        const bufferGeomety = new BufferGeometry()
        bufferGeomety.setAttribute('position', new BufferAttribute(this.pointsPositionArray, 3).setUsage(DynamicDrawUsage))
        bufferGeomety.setDrawRange(0, particleCount)

        const material = new PointsMaterial({ color: 0xffffff, size: 3, blending: AdditiveBlending, transparent: true, sizeAttenuation: false })

        const points = new Points(bufferGeomety, material)

        return points
    }

    private createLines () {
        const bufferGeometry = new BufferGeometry()
        bufferGeometry.setAttribute('position', new BufferAttribute(this.linesPositionArray, 3).setUsage(DynamicDrawUsage))
        bufferGeometry.setAttribute('color', new BufferAttribute(this.linesColorArray, 3).setUsage(DynamicDrawUsage))
        bufferGeometry.computeBoundingSphere()
        bufferGeometry.setDrawRange(0, 0)
        
        const material = new LineBasicMaterial({
            vertexColors: true,
            blending: AdditiveBlending, 
            transparent: true 
        })
        const lines = new LineSegments(bufferGeometry, material)

        return lines
    }

    private updatePoints () {
        const particleCount = this.config.particleCount

        const halfRange = this.config.range / 2
        
        let linesIndex = 0
        let totalLines = 0

        for (let i = 0; i < particleCount; i++) {
            this.pointInfos[i].connections = 0
        }

        for (let i = 0; i < particleCount; i++) {

            const point = this.pointInfos[i]
            // update point info
            const pointPosition = point.position
            const pointVelocity = point.velocity
     
            pointPosition.x += pointVelocity.x * this.config.speed
            pointPosition.y += pointVelocity.y * this.config.speed
            pointPosition.z += pointVelocity.z * this.config.speed

            // collision check
            if (pointPosition.x > halfRange || pointPosition.x < -halfRange) {
                pointVelocity.x = -pointVelocity.x
            }
            if (pointPosition.y > halfRange || pointPosition.y < -halfRange) {
                pointVelocity.y = -pointVelocity.y
            }
            if (pointPosition.z > halfRange || pointPosition.z < -halfRange) {
                pointVelocity.z = -pointVelocity.z
            }
            
            this.pointsPositionArray[i * 3 + 0] = pointPosition.x
            this.pointsPositionArray[i * 3 + 1] = pointPosition.y
            this.pointsPositionArray[i * 3 + 2] = pointPosition.z

            if ( point.connections >= this.config.connectionsLimit) continue

            for (let j = i + 1; j < particleCount; j++) {
                const startPoint = point
                const endPoint = this.pointInfos[j]
                
                if (point.connections >= this.config.connectionsLimit || endPoint.connections >= this.config.connectionsLimit) continue
                
                const distance = startPoint.position.distanceTo(endPoint.position)
                if (distance >= this.config.connectionsDist) continue

                startPoint.connections++
                endPoint.connections++

                let alpha = 1. - distance / this.config.connectionsDist
                    
                this.linesPositionArray[linesIndex * 3 + 0] = startPoint.position.x
                this.linesPositionArray[linesIndex * 3 + 1] = startPoint.position.y
                this.linesPositionArray[linesIndex * 3 + 2] = startPoint.position.z

                this.linesColorArray[linesIndex * 3 + 0] = alpha
                this.linesColorArray[linesIndex * 3 + 1] = alpha
                this.linesColorArray[linesIndex * 3 + 2] = alpha

                linesIndex++

                this.linesPositionArray[linesIndex * 3 + 0] = endPoint.position.x
                this.linesPositionArray[linesIndex * 3 + 1] = endPoint.position.y
                this.linesPositionArray[linesIndex * 3 + 2] = endPoint.position.z

                this.linesColorArray[linesIndex * 3 + 0] = alpha
                this.linesColorArray[linesIndex * 3 + 1] = alpha
                this.linesColorArray[linesIndex * 3 + 2] = alpha

                linesIndex ++

                totalLines++
            }
        }
        // console.log('sss', this.linesPositionArray)

        this.lines.geometry.attributes.position.needsUpdate = true
        this.lines.geometry.attributes.color.needsUpdate = true
        this.lines.geometry.setDrawRange(0, totalLines * 2)
        
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
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
        renderer.setSize( this.config.width, this.config.height)
        renderer.outputEncoding = sRGBEncoding
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