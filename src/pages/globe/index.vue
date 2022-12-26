<script setup>
import { onMounted} from 'vue'

import Loader, { LoaderType } from '@/utils/Loader.ts'
import Sketch from './Sketch.ts'

const loader = new Loader()
loader.load([
    { name: 'globe', type: LoaderType.Texture, path: '/resources/globe/globe.jpg' }
])

onMounted(() => {

    const canvas = document.querySelector('#canvas')

    loader.onLoadEnd(() => {
        const config = {
            canvas,
            resources: loader.resources
        }
        new Sketch(config)
    })
})

</script>

<template>
    <div class="container">
        <div class="info">
            <a href="https://www.youtube.com/watch?v=vM8M4QloVL0" class="" target="_blank">
                Tutorial From Chris Courses
            </a>
        </div>
        <canvas id="canvas"/>
    </div>
</template>

<style scoped lang="scss">
.container {
    position: relative;
    background: black;
    .info {
        position: fixed;
        bottom: 20px;
        width: 100%;
        text-align: center;
        a {
            color: #666666;
        }
    }

}
</style>
