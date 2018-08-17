<template>
    <div class="container">
        <div class="from">
            <a href="https://github.com/luosijie/threejs-examples/tree/master/mall">项目地址</a>
        </div>
        <canvas id="canvas"></canvas>
        <div class="svg-container" v-html="svgString">
        </div>
    </div>
</template>
<script>
import svgString from './config/svgString';
export default {
    data() {
        return {
            scene: null, // 场景
            camera: null, // 相机
            renderer: null // 渲染器
        }
    },
    computed: {
        // svg字符串
        svgString() {
            return svgString
        }
    },
    methods: {
        init() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer();
        }
    },
    mounted() {
        this.init();
    }
}

</script>
<style lang="scss" scoped>
.container {
    // margin: 20px 0;
    position: absolute;
    text-align: center;
    /*opacity: 0.2;*/
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

.svg-container {
    position: absolute;
    top: 10px;
    left: 10px;
    background: white;
    width: 240px;
    overflow: hidden;
    border: 1px solid #f2f2f2;
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.from {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 0;
    a {
        color: black;
    }
}

</style>
