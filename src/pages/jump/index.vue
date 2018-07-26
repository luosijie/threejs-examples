<template>
    <div class="container">
        <div class="mask">
            <div class="content">
                <div class="score-container">
                    <p class="title">本次得分</p>
                    <p class="score">0</p>
                </div>
                <button class="restart">
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
                得分：<span class="score-current">0</span>
            </div>
        </div>
    </div>
</template>
<script>
import Game from './js/game.js';
export default {
    name: 'jump',
    data() {
        return {}
    },
    mounted() {
        const game = new Game()
        game.init()
        game.addSuccessFn(success)
        game.addFailedFn(failed)

        let mask = document.querySelector('.mask')
        let restartButton = document.querySelector('.restart')
        let score = document.querySelector('.score')

        restartButton.addEventListener('click', restart)

        // 游戏重新开始，执行函数
        function restart() {
            mask.style.display = 'none'
            game.restart()
        }
        // 游戏失败执行函数
        function failed() {
            score.innerText = game.score
            mask.style.display = 'flex'
        }
        // 游戏成功，更新分数
        function success(score) {
            var scoreCurrent = document.querySelector('.score-current')
            scoreCurrent.innerText = score
        }
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
    width: 100%; // height: 100%;
    background: #ffffff;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

body {
    padding: 0;
    margin: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
}

.mask {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 500px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.4);
    border: 5px solid rgba(255, 255, 255, 0.05);
}

.score-container {
    color: #ffffff;
    text-align: center;
}

.title {
    font-size: 20px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.6);
}

.score {
    font-size: 100px;
    font-weight: bold;
    margin-top: 20px;
}

button.restart {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background: white;
    border: none;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
}

button.restart:hover {
    color: #232323;
}

.info {
    margin: 20px 0;
    position: absolute;
    text-align: center;
    opacity: 0.2;
    width: 100%;
}

.info a {
    display: block;
    font-size: 16px;
    line-height: 28px;
    color: #ffffff;
    text-decoration: none;
}

a.title {
    font-size: 20px;
    font-weight: bold;
}

.score-gaming {
    margin-top: 10px;
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
}

</style>
