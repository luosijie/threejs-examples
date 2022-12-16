import { ShaderMaterial } from 'three'

import shaderFragment from '../shaders/floorShadow/fragment.glsl?raw'
import shaderVertex from '../shaders/floorShadow/vertex.glsl?raw'

export default function ()
{
    const uniforms = {
        tShadow: { value: null },
        uShadowColor: { value: null },
        uAlpha: { value: null }
    }

    const material = new ShaderMaterial({
        wireframe: false,
        transparent: true,
        uniforms,
        vertexShader: shaderVertex,
        fragmentShader: shaderFragment
    })

    return material
}
