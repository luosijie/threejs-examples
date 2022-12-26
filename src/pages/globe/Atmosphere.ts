import { AdditiveBlending, BackSide, Mesh, MeshBasicMaterial, ShaderMaterial, SphereGeometry, Texture } from 'three'
import vertexShader from './shaders/atmosphere/vertex.glsl?raw'
import fragmentShader from './shaders/atmosphere/fragment.glsl?raw'
export default class Atmosphere {
    mesh: Mesh
    constructor () {

        this.mesh = this.setMesh()
    }
    setMesh () {
        const geometry = new SphereGeometry(5, 50, 50)
        const material = new ShaderMaterial({
            vertexShader,
            fragmentShader,
            blending: AdditiveBlending,
            side: BackSide
        })
        const mesh = new Mesh(geometry, material)
        mesh.scale.set(1.1, 1.1, 1.1)

        return mesh
    }
}