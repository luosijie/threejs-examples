import { Mesh, ShaderMaterial, SphereGeometry, Texture } from 'three'
import vertexShader from './shaders/globe/vertex.glsl?raw'
import fragmentShader from './shaders/globe/fragment.glsl?raw'
export default class Globe {
    main: Mesh
    texture: Texture
    radius: number
    constructor (texture: Texture, radius: number) {
        this.texture = texture
        this.radius = radius

        this.main = this.create(this.texture)
    }
    create (texture: Texture) {
        
        const geometry = new SphereGeometry(this.radius, 50, 50)
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