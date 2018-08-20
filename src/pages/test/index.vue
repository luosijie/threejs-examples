<template>
    <div class="container">
        <canvas id="canvas"></canvas>
        <div class="svg-container" v-html="svgString" />
    </div>
</template>
<script>
import svgString from './config/svgString';
import { buildLightSystem, buildAuxSystem } from '@/utils';
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
        // 初始化
        init() {
            this.scene = new THREE.Scene();
            this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
            this.renderer = new THREE.WebGLRenderer({
                canvas: document.querySelector('canvas')
            });
            this.renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
        },
        // 设置摄像机参数
        setCamera() {
            this.camera.position.set(3, 3, 3);
            this.camera.lookAt(this.scene.position);
        },
        // 渲染
        render() {
            this.renderer.render(this.scene, this.camera);
        },
        addGeometry() {
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            var material = new THREE.MeshPhongMaterial({ color: 0x156289 });
            var cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
        }
    },
    mounted() {
        this.init();
        this.setCamera();
        buildAuxSystem(this.scene);
        buildLightSystem(this.scene);
        this.addGeometry();
        this.render();
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
    background: black;
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

</style>
