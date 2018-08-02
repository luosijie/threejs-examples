<template>
    <div class="container">
        <div class="from"><a href="https://github.com/luosijie/threejs-examples/tree/master/mall">项目地址</a></div>
        <canvas id="canvas"></canvas>
        <div class="svg-container">
        </div>
    </div>
</template>
<script>
import svgString from './config/svgString';
export default {
    data() {
        return {
            scene: null,
            camera: null,
            raycaster: null,
            renderer: null,
            mall: null,
            mouse: null,
            INTERSECTED: null // 被选中的物体
        }
    },
    methods: {
        /**
         * 初始化3D环境
         **/
        init() {
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xf0f0f0);
            // 初始化相机配置
            this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
            this.camera.position.set(300, 300, 300);
            this.camera.lookAt(this.scene.position);
            this.raycaster = new THREE.Raycaster();
            // 初始化
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                canvas: document.querySelector('canvas')
            })
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            // document.body.appendChild(renderer.domElement);
            document.addEventListener('mousemove', this.onDocumentMouseMove, false);
            window.addEventListener('resize', this.onWindowResize, false);
        },
        /**
         * 构建商场
         **/
        buildMall() {
            // 获取html中的svg地图路径
            let svgShapes = document.querySelector('#svg_shapes')
            let paths = svgShapes.querySelectorAll('path')
            for (let i = 0; i < paths.length; i++) {
                let d = paths[i].getAttribute('d')
                // 使用插件将svg路径转化为THREE.js形状
                let shape = transformSVGPathExposed(d)
                // 将形状挤出
                let svgGeometry = new THREE.ExtrudeGeometry(shape, {
                    amount: 25,
                    stes: 1,
                    bevelEnabled: false
                })
                // 由于平面转3D是竖直方向的, 需要旋转为水平方向
                svgGeometry.rotateX(Math.PI / 2)
                // 获取svg平面图每个模块对应的颜色
                let color = paths[i].getAttribute('fill')
                let svgMaterial = new THREE.MeshPhongMaterial({ color: color, shininess: 100 })
                let svgMesh = new THREE.Mesh(svgGeometry, svgMaterial)
                svgMesh.name = paths[i].getAttribute('name')
                this.mall.add(svgMesh)
            }
            this.mall.translateX(-200)
            this.mall.translateZ(-200)
            this.mall.translateY(25)
            this.scene.add(this.mall)
        },
        /**
         * 添加每个店面的标签: 暂时用小方块代替
         **/
        addLabel() {
            let material = new THREE.MeshPhongMaterial({ color: 0x000000 })
            // 遍历场景中的元素, 在元素上方添加方块: 未来添加具体标签
            this.mall.children.forEach(elem => {
                let geometry = new THREE.BoxGeometry(2, 20, 2)
                let Mesh = new THREE.Mesh(geometry, material);
                Mesh.position.y = 30
                Mesh.position.x = elem.geometry.boundingSphere.center.x - 200
                Mesh.position.z = elem.geometry.boundingSphere.center.z - 200
                this.scene.add(Mesh)
            })
        },
        /**
         * 构建辅助系统: 网格和坐标
         **/
        buildAuxSystem() {
            let axisHelper = new THREE.AxesHelper(2000)
            this.scene.add(axisHelper)
            let gridHelper = new THREE.GridHelper(600, 60)
            this.scene.add(gridHelper)
            let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
            controls.enableDamping = true
            controls.dampingFactor = 0.25
            controls.rotateSpeed = 0.35
        },
        /**
         * 光照系统
         **/
        buildLightSystem() {
            let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
            directionalLight.position.set(300, 1000, 500);
            directionalLight.target.position.set(0, 0, 0);
            directionalLight.castShadow = true;

            let d = 300;
            directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
            directionalLight.shadow.bias = 0.0001;
            directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
            this.scene.add(directionalLight)

            let light = new THREE.AmbientLight(0xffffff, 0.6)
            this.scene.add(light)

        },
        /**
         * 根据浏览器窗口变化动态更新尺寸
         **/
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        onDocumentMouseMove(event) {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        },
        /**
         * 动画循环
         **/
        loop() {
            requestAnimationFrame(this.loop);
            this.render();
        },
        /**
         * 渲染画布
         **/
        render() {
            // 鼠标位置向摄像机位置发射一条射线
            this.raycaster.setFromCamera(this.mouse, this.camera);
            // 设置射线影响的范围
            let intersects = this.raycaster.intersectObjects(this.mall.children);
            if (intersects.length > 0) {
                if (this.INTERSECTED != intersects[0].object) {
                    if (this.INTERSECTED) 
                        this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                    this.INTERSECTED = intersects[0].object;
                    this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                    this.INTERSECTED.material.emissive.setHex(0xff0000);
                }
            } else {
                if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);
                this.INTERSECTED = null;
            }
            this.renderer.render(this.scene, this.camera);
        }
    },
    mounted() {
        const svgContainer = document.querySelector('.svg-container')
        svgContainer.innerHTML = svgString
        this.mouse = new THREE.Vector2() // 二维坐标用来转化鼠标参数
        this.mall = new THREE.Object3D() // 建一个空对象用来放场景物体

        this.init();
        this.buildLightSystem();
        this.buildAuxSystem();
        this.buildMall();
        this.loop();
        this.addLabel()
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    height: 300px;
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
