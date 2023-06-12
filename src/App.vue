
<script setup>

const cover = name => {
    return new URL(`./assets/covers/${name}.png`, import.meta.url).href
}
    
const workList = [
    { link: '/pages/bedroom/', img: cover('bedroom') },
    { link: '', img: '' },
    { link: '/pages/house-in-desert/', img: cover('house-in-desert') },
    { link: '/pages/jump/', img: cover('jump') },
    { link: 'pages/mini-city/', img: cover('mini-city') },
    { link: 'pages/china-map/', img: cover('china-map') }
]

</script>

<template>
    <div class="container">
        <div class="info">
            <img src="./assets/logo.png" alt="Three.js Examples" class="logo">
            <a href="https://github.com/luosijie/threejs-examples" target="_blank" class="title">Three.js Example</a>
            <a href="https://luosijie.github.io/" target="_blank" class="author">Jesse Luo</a>
        </div>
        <div class="works">
            <div v-for="(item, index) in workList" :key="index">
                <a :href="item.link" v-if="item.img">
                    <img :src="item.img">
                </a>
            </div>
        </div>
    </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: #ffffff;
    flex-direction: column;
}

.info {
    margin: 60px;
    text-align: center;

    img {
        margin: 35px;
    }

    a {
        display: block;
        font-size: 24px;
        text-decoration: none;
        color: #232323;
    }

    a.author {
        margin: 18px;
        font-size: 18px;
        color: #b0b0b0;
    }
}

.works {
    display: flex;
    justify-content: center;
    margin-bottom: 60px;
    width: 1050px;
    flex-wrap: wrap;

    div {
        overflow: hidden;
        margin: 15px;
        width: 320px;
        height: 240px;
        border-radius: 4px;
        background: #f4f4f4;

        a {
            position: relative;
            display: block;
            width: 100%;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
                transition: all 0.1s linear;
                object-fit: cover;
            }
        }

        &:hover img {
            transform: scale(1.1);
        }
    }
}

@media screen and (max-width: 600px) {
    .works {
        width: 100%;
    }
}

</style>
