
import { Scene, TextureLoader, sRGBEncoding, PlaneGeometry, Mesh, MeshBasicMaterial, Color, PerspectiveCamera, WebGLRenderer, Clock, MeshMatcapMaterial } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import createBackgroundMaterial from './materials/createBackground.js'

import urlRoom from './resources/room.glb?url'
import urlPlants from './resources/plants.glb?url'
import urlMatcapGreen from './resources/matcap-green.webp?url'
import urlImageBaked from './resources/baked.webp?url'

const canvas : HTMLCanvasElement = <HTMLCanvasElement> document.querySelector('#canvas')

// Set loaders

const textureLoader = new TextureLoader()

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// Set canvas size
const size = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Init scene
const scene = new Scene()

// Set camera
const camera = new PerspectiveCamera(45, size.width / size.height, 0.1, 100)
camera.position.set(3.25, 1.02, 3.47)
scene.add(camera)

// Set background
const backgroundGeometry = new PlaneGeometry(2, 2, 2, 2)
const backgroundMaterial = createBackgroundMaterial()

const backgroundMesh = new Mesh(backgroundGeometry, backgroundMaterial)
backgroundMesh.frustumCulled = false
backgroundMesh.matrixAutoUpdate = false
backgroundMesh.updateMatrix()

scene.add(backgroundMesh)

// Load room
const roomTexture = textureLoader.load(urlImageBaked)
roomTexture.flipY = false
roomTexture.encoding = sRGBEncoding

gltfLoader.load(
    urlRoom,
    gltf => {
        const bakedMesh : Mesh = <Mesh> gltf.scene.children.find(child => child.name === 'main')

        bakedMesh.material = new MeshBasicMaterial({ map: roomTexture })

        scene.add(gltf.scene)
    }
)

// Load plants
const plantsTexture = textureLoader.load(urlMatcapGreen)
plantsTexture.flipY = false
plantsTexture.encoding = sRGBEncoding

gltfLoader.load(
    urlPlants,
    gltf => {
        const mesh : Mesh = <Mesh> gltf.scene.children.find(child => child.name === 'plants')
        
        mesh.material = new MeshMatcapMaterial({
            matcap: plantsTexture
        })

        scene.add(gltf.scene)
    }
)

window.addEventListener('resize', () => {
    // Update size
    size.width = window.innerWidth
    size.height = window.innerHeight

    // Update camera
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// renderer
const renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = sRGBEncoding

const tick = () => {

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()
