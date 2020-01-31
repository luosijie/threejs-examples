<template>
    <div class="container">
        <div class="info">
            <img src="static/img/logo.png" alt="Three.js Examples" class="logo">
            <a href="https://github.com/luosijie/threejs-examples" target="_blank" class="title">Three.js Example</a>
            <a href="https://luosijie.github.io/" target="_blank" class="author">Jesse Luo</a>
        </div>
        <div class="works">
            <div v-for="(item, index) in workList" :key="index">
                <router-link :to="item.link" v-if="item.img">
                    <img :src="item.img">
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {
            workList: [
                { link: '', img: '' },
                { link: '/mini-city', img: 'static/img/threejs-example-mini-city.png' },
                { link: '', img: '' },
                { link: '/jump', img: 'static/img/threejs-example-jump.png' },
                { link: '/test', img: '' },
                { link: '/china-map', img: 'static/img/threejs-example-china-map.png' }
            ]
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

.info {
    margin: 60px;
    text-align: center;
    img {
        margin: 35px;
    }
    a {
        display: block;
        color: #232323;
        text-decoration: none;
        font-size: 24px;
    }
    a.author {
        margin: 18px;
        color: #b0b0b0;
        font-size: 18px;
    }
}

.works {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1050px;
    margin-bottom: 60px;
    div {
        width: 320px;
        height: 240px;
        overflow: hidden;
        background: #f4f4f4;
        border-radius: 4px;
        margin: 15px;
        a {
            display: block;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.1s linear;
                -webkit-transition: all 0.1s linear;
            }
        }
        &:hover img {
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
        }
    }
}

@media screen and (max-width: 600px) {
    .works {
        width: 100%;
    }
}

</style>
