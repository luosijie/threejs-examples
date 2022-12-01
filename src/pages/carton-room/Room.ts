import { Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, Object3D, Scene } from 'three'

export default class Room {
    body: Scene
    children: {[key: string]: Object3D}

    constructor (resoureces: any) {
        this.children = {}
        this.body = this.setBody(resoureces)
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

        console.log('chidren in room', this.children)

        return scene
    }
}