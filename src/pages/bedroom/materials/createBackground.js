import { RGBAFormat, Color, DataTexture, LinearFilter, ShaderMaterial } from 'three'

import vertexShader from '../shaders/background/vertex.glsl'
import fragmentShader from '../shaders/background/fragment.glsl'

export default function () {
    const topLeft = new Color('#79452E')
    const topRight = new Color('#743C25')
    const bottomRight = new Color('#723c25')
    const bottomLeft = new Color('#733c25')

    const data = new Uint8Array([
        Math.round(bottomLeft.r * 255), Math.round(bottomLeft.g * 255), Math.round(bottomLeft.b * 255), 255,
        Math.round(bottomRight.r * 255), Math.round(bottomRight.g * 255), Math.round(bottomRight.b * 255), 255,
        Math.round(topLeft.r * 255), Math.round(topLeft.g * 255), Math.round(topLeft.b * 255), 255,
        Math.round(topRight.r * 255), Math.round(topRight.g * 255), Math.round(topRight.b * 255), 255
    ])

    // texture-floor
    const texture = new DataTexture(data, 2, 2, RGBAFormat)
    texture.magFilter = LinearFilter
    texture.needsUpdate = true

    const uniforms = {
        tBackground: { value: texture }
    }

    const material = new ShaderMaterial({
        wireframe: false,
        transparent: false,
        uniforms,
        vertexShader,
        fragmentShader
    })

    return material
}
