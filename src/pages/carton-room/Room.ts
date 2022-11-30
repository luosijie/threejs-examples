import { Group, Mesh, Scene } from 'three'

export default class Room {
    body: Scene
    constructor (resoureces: any) {
        this.body = this.setBody(resoureces)
    }

    private setBody (resoureces:any) {
        const modelRoom = resoureces.modelRoom
        const scene = modelRoom.scene
        
        scene.scale.set(0.11, 0.11, 0.11)
        scene.children.forEach((e:Group|Mesh) => {
            if (e instanceof Group) {
                e.children.forEach(m => {
                    m.castShadow = true
                    m.receiveShadow = true
                })
            } else { 
                e.castShadow = true
                e.receiveShadow = true
            }
        })
        return scene
    }
}