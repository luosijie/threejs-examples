
import { Scene, TextureLoader, sRGBEncoding, PlaneGeometry, Mesh, MeshBasicMaterial, Color, PerspectiveCamera, WebGLRenderer, Clock } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import createBackgroundMaterial from './materials/createBackground.js'
import createFloorShadowMaterial from './materials/createFloorShadow.js'

import urlImageBaked from './resources/baked.jpg?url'
import urlImageFloorShadow from './resources/floor-shadow.jpg?url'
import urlModelHouse from './resources/house.glb?url'

const canvas = document.querySelector('#canvas')

if (canvas instanceof HTMLCanvasElement) {
    
    const scene = new Scene()

    const textureLoader = new TextureLoader()

    // texture-baked
    const bakedTexture = textureLoader.load(urlImageBaked)
    bakedTexture.flipY = false
    bakedTexture.encoding = sRGBEncoding

    // texture-floor-shadow
    const floorShadowTexture = textureLoader.load(urlImageFloorShadow)
    floorShadowTexture.flipY = false
    floorShadowTexture.encoding = sRGBEncoding

    // background
    const backgroundGeometry = new PlaneGeometry(2, 2, 2, 2)
    const backgroundMaterial = createBackgroundMaterial()

    const backgroundMesh = new Mesh(backgroundGeometry, backgroundMaterial)
    backgroundMesh.frustumCulled = false
    backgroundMesh.matrixAutoUpdate = false
    backgroundMesh.updateMatrix()

    scene.add(backgroundMesh)

    // Draco loader
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    // GLTF loader
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    // Materials
    const bakedMaterial = new MeshBasicMaterial({ map: bakedTexture })

    const floorShadowMaterial = createFloorShadowMaterial()
    floorShadowMaterial.depthWrite = false
    floorShadowMaterial.uniforms.uShadowColor.value = new Color('#927044')
    floorShadowMaterial.uniforms.tShadow.value = floorShadowTexture
    floorShadowMaterial.uniforms.uAlpha.value = 0.6

    // load-model
    gltfLoader.load(
        urlModelHouse,
        gltf => {
            const bakedMesh = gltf.scene.children.find(child => child.name === 'baked')
            if (bakedMesh instanceof Mesh) {
                bakedMesh.material = bakedMaterial
            }
        
            const groundMesh = gltf.scene.children.find(child => child.name === 'ground')
            if (groundMesh instanceof Mesh) {
                groundMesh.material = floorShadowMaterial
            }
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

}
