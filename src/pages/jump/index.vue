<script setup lang="ts">

import { onMounted, reactive, ref } from 'vue'
import Game from './Game'

const score = ref(0)
const dialogs = reactive({
    final: {
        visible: false
    }
})

let game:Game

const restart = () => {
    
    dialogs.final.visible = false
    game && game.restart()
}

onMounted(() => {
    
    game = new Game()
    game.addSuccessFn(() => {
        score.value = game.score
    })
    game.addFailedFn(() => {
        score.value = game.score
        dialogs.final.visible = true
    })
    game.init()
})

</script>

<template>
    <div class="container">
        <div class="mask" v-if="dialogs.final.visible">
            <div class="content">
                <div class="score-container">
                    <p class="title">本次得分</p>
                    <p class="score">{{score}}</p>
                </div>
                <button class="restart" @click="restart">
                    重新开始
                </button>
            </div>
        </div>
        <div class="info">
            <a class="title" href="https://github.com/luosijie/threejs-examples" target="_blank">
                Jump
            </a>
            <a class="author" href="https://luosijie.github.io/" target="_blank">
                Created By Jesse Luo
            </a>
            <div class="score-gaming">
                得分：<span class="score-current">{{score}}</span>
            </div>
        </div>
        <canvas/>
    </div>
</template>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

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
