import { AdditiveBlending, BufferAttribute, BufferGeometry, Float32BufferAttribute, LineBasicMaterial, Mesh, Points, PointsMaterial, Scene, ShaderMaterial, Vector3 } from 'three'
import { MeshSurfaceSampler  } from 'three/examples/jsm/math/MeshSurfaceSampler'

import vertexShader from './shaders/model/vertex.glsl?raw'
import fragmentShader from './shaders/model/fragment.glsl?raw'
import gsap from 'gsap'

export default class Model {
    scene: Scene
    mesh: Points
    material: ShaderMaterial
    constructor (source: any, scene: Scene) {

        this.scene = scene
        this.material = this.setMaterial()
        this.mesh = this.setMesh(source)
    }
    setMaterial () {
        const material = new ShaderMaterial({
            uniforms: {
                uTime: {
                    value: 0
                },
                uScale: {
                    value: 0
                }
            },
            transparent: true,
            depthTest: false,
            depthWrite: false,
            blending: AdditiveBlending,
            vertexShader,
            fragmentShader
        })
        return material
    }
    setMesh (source: any) {
        const mesh = source.scene.children[0]
        const sampler = new MeshSurfaceSampler(mesh)
        sampler.build()

        const nums = 20000
        const positions = []
        const randomness = []
        const position = new Vector3()
        for (let i = 0; i < nums; i++) {
            sampler.sample(position)
            positions.push(position.x, position.y, position.z)
            randomness.push(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1)
        }
        
        const geometry = new BufferGeometry()
        
        geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
        geometry.setAttribute('aRandom', new Float32BufferAttribute(randomness, 3))

        return new Points(geometry, this.material)
    }
    show () {
        this.scene.add(this.mesh)
        setTimeout(() => {
            gsap.to(this.material.uniforms.uScale, {
                duration: .8,
                value: 1,
                ease: 'power3.out'
            })
        }, 800)
    }
    hide () {
        gsap.to(this.material.uniforms.uScale, {
            value: 0,
            duration: .8,
            ease: 'power3.out',
            onComplete: () => {
                this.scene.remove(this.mesh)
            }
        })
    }
}