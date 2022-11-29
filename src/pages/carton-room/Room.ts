import { Scene } from 'three'

export default class Room {
    body: Scene
    constructor (resoureces: any) {
        console.log(resoureces)
        this.body = this.setBody(resoureces)
    }

    private setBody (resoureces:any) {
        const modelRoom = resoureces.modelRoom
        return modelRoom.scene
    }
}