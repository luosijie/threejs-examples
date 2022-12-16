<script setup>
import { onMounted } from 'vue'
import { Scene, TextureLoader, sRGBEncoding, PlaneGeometry, Mesh, MeshBasicMaterial, Color, PerspectiveCamera, WebGLRenderer, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import BackgroundMaterial from './materials/Background.js'
import FloorShadowMaterial from './materials/FloorShadow.js'

onMounted(() => {
   
    const canvas = document.querySelector('#canvas')

    const scene = new Scene()

    const textureLoader = new TextureLoader()

    // texture-baked
    const bakedTexture = textureLoader.load('resources/house-in-desert/textures/baked.jpg')
    bakedTexture.flipY = false
    bakedTexture.encoding = sRGBEncoding

    // texture-floor-shadow
    const floorShadowTexture = textureLoader.load('resources/house-in-desert/textures/floor-shadow.jpg')
    floorShadowTexture.flipY = false
    floorShadowTexture.encoding = sRGBEncoding

    // background
    const backgroundGeometry = new PlaneGeometry(2, 2, 2, 2)
    const backgroundMaterial = new BackgroundMaterial()

    const backgroundMesh = new Mesh(backgroundGeometry, backgroundMaterial)
    backgroundMesh.frustumCulled = false
    backgroundMesh.matrixAutoUpdate = false
    backgroundMesh.updateMatrix()

    scene.add(backgroundMesh)

    // Draco loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')

    // GLTF loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    /**
 * Materials
 */
    const bakedMaterial = new MeshBasicMaterial({ map: bakedTexture })

    const floorShadowMaterial = new FloorShadowMaterial()
    floorShadowMaterial.depthWrite = false
    floorShadowMaterial.uniforms.uShadowColor.value = new Color('#927044')
    floorShadowMaterial.uniforms.tShadow.value = floorShadowTexture
    floorShadowMaterial.uniforms.uAlpha.value = 0.6

    // load-model
    gltfLoader.load(
        'resources/house-in-desert/models/house.glb',
        gltf => {
            const bakedMesh = gltf.scene.children.find(child => child.name === 'baked')
            bakedMesh.material = bakedMaterial
        
            const groundMesh = gltf.scene.children.find(child => child.name === 'ground')
            groundMesh.material = floorShadowMaterial
            scene.add(gltf.scene)
        }
    )

    // sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

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

    // Base camera
    const camera = new PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 12
    camera.position.y = 12
    camera.position.z = 8
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    // renderer
    const renderer = new WebGLRenderer({
        canvas: canvas,
        antialias: true
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputEncoding = sRGBEncoding

    // animate
    const clock = new Clock()

    const tick = () => {
        const elapsedTime = clock.getElapsedTime()

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
    <canvas id="canvas"/>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%; // height: 100%;
    background: #ffffff;
    flex-direction: column;
}
.mask {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    width: 100%;
    height: 100%;
    background: rgb(0 0 0 / 40%);
    flex-direction: column;
    .title {
        padding-bottom: 30px;
    }
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 500px;
        border: 5px solid rgb(255 255 255 / 5%);
        border-radius: 20px;
        background: rgb(0 0 0 / 40%);
        flex-direction: column;
    }
}
.score-container {
    text-align: center;
    color: #ffffff;
}
.title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    color: rgb(255 255 255 / 60%);
}
.score {
    margin-top: 20px;
    font-size: 100px;
    font-weight: bold;
}
button.restart {
    width: 200px;
    height: 40px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 20px;
    background: white;
    cursor: pointer;
}
button.restart:hover {
    color: #232323;
}
.info {
    position: absolute;
    margin: 20px 0;
    width: 100%;
    text-align: center;
    opacity: 0.2;
}
.info a {
    display: block;
    font-size: 16px;
    text-decoration: none;
    color: #ffffff;
    line-height: 28px;
}
a.title {
    font-size: 20px;
    font-weight: bold;
}
.score-gaming {
    margin-top: 10px;
    font-size: 16px;
    color: rgb(255 255 255 / 100%);
}
</style>
