import { AnimationMixer, Clock, Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, Object3D, Scene } from 'three'
import pane from './pane'
import emitter, { EmitterType } from './emitter'

export default class Room {
    body: Scene
    children: {[key: string]: Object3D}
    mixer: AnimationMixer

    constructor (resoureces: any) {
        this.children = {}
        this.body = this.setBody(resoureces)
        this.mixer = this.setMixer(resoureces)

        this.init()
    }

    private init () {
        this.onMousemove()
        this.buildPane()

        emitter.on(EmitterType.Tick, (clock: Clock) => {
            const delta = clock.getDelta()
            this.mixer.update(delta)
        })
    }

    // Crete models from resources
    private setBody (resoureces:any) {
        const modelRoom = resoureces.modelRoom
        const scene = modelRoom.scene
        
        scene.scale.set(0.11, 0.11, 0.11)
        scene.children.forEach((e:Group|Mesh) => {
            e.castShadow = true
            e.receiveShadow = true

            if (e instanceof Group) {
                e.children.forEach(m => {
                    m.castShadow = true
                    m.receiveShadow = true
                })
            }

            if (e.name === 'Aquarium') {
                const glass = e.children[0]
                if (glass instanceof Mesh) {
                    const material = new MeshPhysicalMaterial()
                    material.roughness = 0
                    material.color.set(0x549dd2)
                    material.ior = 3
                    material.transmission = 1
                    material.opacity = 1
                    glass.material = material
                }
            }

            if (e.name === 'Computer') {
                const screen = e.children[1]
                if (screen instanceof Mesh) {
                    screen.material = new MeshBasicMaterial({
                        map: resoureces.textureKda
                    })
                }
            }

            if (e.name === 'Mini_Floor') {
                e.position.x = -0.289521
                e.position.z = 8.83572
            }
            
            if (e.name === 'Cube') {
                e.position.set(0, -1, 0)
                e.rotation.y = Math.PI / 4
            }

            const name = e.name.toLowerCase()
            this.children[name] = e
            
            e.scale.set(0, 0, 0)
            
        })

        return scene
    }

    private setMixer (resources: any) {
        const mixer = new AnimationMixer(this.body)
        const swim = mixer.clipAction(resources.modelRoom.animations[0])
        swim.play()
        return mixer
    }

    private buildPane () {
        // Camera
        const room = pane.addFolder({
            title: 'room'
        })
        // Camera position
        const roomPosition = room.addFolder({
            title: 'position',
            expanded: false
        })
        roomPosition.addInput(this.body.position, 'x', { min: -10, max: 20, step: 0.01 })
        roomPosition.addInput(this.body.position, 'y', { min: -10, max: 20, step: 0.01 })
        roomPosition.addInput(this.body.position, 'z', { min: -10, max: 20, step: 0.01 })

        // Camera rotation
        const roomRotation = room.addFolder({
            title: 'rotation',
            expanded: false
        })
        roomRotation.addInput(this.body.rotation, 'x', { min: -1, max: 1, step: 0.01 })
        roomRotation.addInput(this.body.rotation, 'y', { min: -1, max: 1, step: 0.01 })
        roomRotation.addInput(this.body.rotation, 'z', { min: -1, max: 1, step: 0.01 })
    }

    private onMousemove () {
        window.addEventListener('mousemove', evt => {
            const offset = (evt.clientX - window.innerWidth / 2) * 2
            const rotation =  offset / window.innerWidth * 0.05
            this.body.rotation.y = rotation
        })
    }
}