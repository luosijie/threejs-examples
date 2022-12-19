<script setup>
import { onMounted, reactive, ref } from 'vue'
import { Scene, sRGBEncoding, PerspectiveCamera, WebGLRenderer, Clock, AxesHelper, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

import Loader, { LoaderType } from '@/utils/Loader.ts'
import Model from './Model.ts'

const loader = new Loader()
loader.load([
    { name: 'horse', type: LoaderType.GLTF, path: '/resources/sampler-particles/horse.glb' },
    { name: 'skull', type: LoaderType.GLTF, path: '/resources/sampler-particles/skull.glb' }
])

let horse, skull

const menu = reactive({
    options: ['horse', 'skull'],
    active: 'horse'
})

const toggle = value => {
    if (value === menu.active) return
    menu.active = value

    if (value === 'horse') {
        horse.show()
        skull.hide()
    } else {
        horse.hide()
        skull.show()
    }
}

onMounted(() => {

    // sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
   
    const canvas = document.querySelector('#canvas')

    // Renderer
    const renderer = new WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha:true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = sRGBEncoding

    // Scene
    const scene = new Scene()

    // Camera
    const camera = new PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 5
    camera.position.y = 1

    loader.onLoadEnd(() => {
        horse = new Model(loader.resources.horse, scene)
        skull = new Model(loader.resources.skull, scene)
        
        horse.show()
    })

    window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    window.addEventListener('mousemove', evt => {
        const x = evt.clientX
        const y = evt.clientY
        gsap.to(scene.rotation, {
            y: gsap.utils.mapRange(0, window.innerWidth, 0.5, -0.5, x),
            x: gsap.utils.mapRange(0, window.innerHeight, .5, -.5, y)
        })
    })

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.enabled = false

    // animate
    const clock = new Clock()

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()

        if (horse) {
            horse.material.uniforms.uTime.value = elapsedTime
        }

        if (skull) {
            skull.material.uniforms.uTime.value = elapsedTime
        }

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
})

</script>

<template>
    <div class="actions">
        <button
            v-for="item in menu.options" 
            @click="toggle(item)" 
            :key="item" 
            :class="{ active: item === menu.active }"
        >
            {{ item }}
        </button>
    </div>
    <div class="info">
        <a href="https://www.awwwards.com/academy/course/impress-everyone-with-a-3d-particle-scene-starting-from-bad-models" class="" target="_blank">Tutorial From Fabio Ottaviani</a>
    </div>
    <canvas id="canvas"/>
</template>

<style scoped lang="scss">
.actions {
    position: fixed;
    display: flex;
    justify-content: center;
    padding: 10px;
    width: 100%;
    button {
        width: 80px;
        height: 30px;
        border-radius: 15px;
        background: #999999;
        cursor: pointer;
        &.active {
            font-weight: bold;
            background: white;
        }
    }
}
.info {
    position: fixed;
    bottom: 20px;
    width: 100%;
    text-align: center;
    a {
        color: #666666;
    }
}
</style>
