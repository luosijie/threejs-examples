
import { RepeatWrapping, Texture } from 'three'
const textures = {
    window: function () {
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        canvas.width = 32
        canvas.height = 32

        let colors = {
            border: '#3c3443',
            top: '#9d94a7',
            bottom: '#796e8c'
        }

        ctx.fillStyle = colors.border
        ctx.fillRect(0, 0, 32, 32)
        ctx.fillStyle = colors.top
        ctx.fillRect(2, 2, 13, 13)
        ctx.fillStyle = colors.top
        ctx.fillRect(17, 2, 13, 13)
        ctx.fillStyle = colors.bottom
        ctx.fillRect(2, 17, 13, 13)
        ctx.fillStyle = colors.bottom
        ctx.fillRect(17, 17, 13, 13)

        let canvasTexture = new Texture(canvas)
        canvasTexture.wrapS = RepeatWrapping
        canvasTexture.wrapT = RepeatWrapping
        canvasTexture.needsUpdate = true

        return canvasTexture
    }
}

export default textures
