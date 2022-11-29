
<script setup>
import { onMounted } from 'vue'
import Loader, { LoaderType } from '@/utils/Loader.ts'
import World from './World.ts'
import Room from './Room.ts'

const resources = [
    { name: 'modelRoom', type: LoaderType.GLTF, path: '/resources/carton-room/models/room.glb'},
    { name: 'textureKda', type: LoaderType.Video, path: '/resources/carton-room/textures/kda.mp4'}
]

const loader = new Loader()

onMounted(() => {
    const canvas = document.querySelector('#canvas')

    const world = new World(canvas)
    world.init()

    loader.load(resources)
    loader.onLoadEnd(() => {
        const room = new Room(loader.resources)
        world.scene.add(room.body)
    })

    window.addEventListener('resize', () => {
        world.updateSize()
    })

})

</script>
<template>
    <div class="container">
        <canvas id="canvas"/>
    </div>
</template>
<style lang="scss" scoped>
.container {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    canvas {
        position: absolute;
        top: 0;
        left: 0;
        &#name {
            user-select: none;
            pointer-events: none;
        }
    }
}
</style>
