import { Mesh, MeshBasicMaterial, ShaderMaterial, SphereGeometry, Texture } from 'three'
import vertexShader from './shaders/globe/vertex.glsl?raw'
import fragmentShader from './shaders/globe/fragment.glsl?raw'
export default class Globe {
    mesh: Mesh
    constructor (texture: Texture) {

        this.mesh = this.setMesh(texture)
    }
    setMesh (texture: Texture) {
        
        const geometry = new SphereGeometry(5, 50, 50)
        const material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTexture: {
                    value: texture
                }
            }
        })
        const mesh = new Mesh(geometry, material)

        return mesh
    }
}