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
            this.camera.position.set(10, 10, 10);
            this.camera.lookAt(this.scene.position);
        },
        // 渲染
        render() {
            this.renderer.render(this.scene, this.camera);
        },
        addGeometry() {
            const shape = new THREE.Shape();
            shape.moveTo(0, 0);
            shape.lineTo(0, 1);
            shape.lineTo(1, 1);
            shape.lineTo(1, 0);
            shape.lineTo(0, 0);

            const d = 'M8.7,2.4V2.2V2.2H8.6H6.3V2V2H6.2H3.7V1.8V1.8H3.6H1h0H0.9v0.1v3.1V5H1h8.2V3.1H8.7V2.4z M5.5,4L5.2,4.1H4.8l0-0.2l-0.3,0V3.3l0.6-0.1l0-0.1l0.4,0L5.5,4L5.5,4z';
            const pathShape = transformSVGPathExposed(d);
            const extrudeSettings = {
                amount: 2,
                bevelEnabled: false
                // curveSegments: 1,
                // depth: 1
            };

            const geometry = new THREE.ExtrudeGeometry(pathShape, extrudeSettings);
            const material = new THREE.MeshPhongMaterial({ color: 0x156289 });
            const mesh = new THREE.Mesh(geometry, material);
            this.scene.add(mesh);

        },
        loop() {
            requestAnimationFrame(this.loop);
            this.render();
        },
        // 辅助控制系统
        control() {
            const canvas = document.querySelector('canvas');
            let controls = new THREE.OrbitControls(this.camera, canvas);
            controls.enableDamping = true
            controls.dampingFactor = 0.25
            controls.rotateSpeed = 0.35
        }
    },
    mounted() {
        this.init();
        this.control();
        this.setCamera();
        buildAuxSystem(this.scene);
        buildLightSystem(this.scene);
        this.addGeometry();
        this.loop();
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
