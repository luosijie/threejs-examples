<template>
    <div class="container">
        <div class="from">
            <a href="https://github.com/luosijie/threejs-examples/tree/master/mall">项目地址</a>
        </div>
        <canvas id="canvas"/>
        <!-- <div class="svg-container" v-html="svgString">
        </div>-->
    </div>
</template>
<script>
// import svgString from './config/svgString';
import chinaJson from './config/china.json'
import * as d3geo from 'd3-geo'
export default {
    data () {
        return {
            width: null,
            height: null,
            scene: null, // 场景
            camera: null, // 摄像机
            raycaster: null, // 射线
            renderer: null, // 渲染器
            mall: null, // 商场
            mouse: null, // 鼠标位置
            INTERSECTED: null, // 被选中的物体
            labels: [] // 商铺标签
        }
    },
    computed: {
        // svg字符串
        // svgString() {
        //     return svgString
        // }
    },
    methods: {
        /*
         * 初始化3D环境
         */
        init () {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xf0f0f0);
            this.setCamera();
            // 初始化射线
            this.raycaster = new THREE.Raycaster();
            // 初始化
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                canvas: document.querySelector('canvas')
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight - 10);
            // document.body.appendChild(renderer.domElement);
            document.addEventListener('mousemove', this.onDocumentMouseMove, false);
            window.addEventListener('resize', this.onWindowResize, false);
        },
        setCamera () {
            // perspectiveCamera
            this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
            const center = [108.0, 37.5]
            console.log('center', ...center)
            this.camera.position.set(300, 300, 300);
            // this.camera.lookAt(this.scene.position);
            this.camera.lookAt(center[0], 0, center[1]);

            // othograchicCamera
            // this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 1, 20000);
            this.camera.position.set(1000, 1000, 1000);
        },
        /*
         * 构建商场
         */
        buildMall () {
            // 获取html中的svg地图路径
            // const svgShapes = document.querySelector('#svg_shapes')
            // const paths = svgShapes.querySelectorAll('path')
            // const features = chinaJson.features
            const projection = d3geo.geoMercator()
                .center([108.0, 37.5])
                .scale(700)
                .translate([window.innerWidth / 2, window.innerHeight / 2])
            // projection.fitEÎxtent([[0,0],[0,0]],chinaJson)

            console.log('china-json', projection)
            // const extrudeSettings = {
            //     steps: 2,
            //     depth: 16,
            //     bevelEnabled: true,
            //     bevelThickness: 1,
            //     bevelSize: 1,
            //     bevelOffset: 0,
            //     bevelSegments: 1
            // };
            // features.forEach(elem => {
            //     if (elem.properties.type === 'shop') {
            //         const coordinates = elem.geometry.coordinates[0]
            //         const shape = new THREE.Shape()
            //         shape.moveTo(...coordinates[0])
            //         for (let i = 1; i < coordinates.length; i++) {
            //             shape.lineTo(...coordinates[i])
            //         }
            //         const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
            //         const material = new THREE.MeshPhongMaterial({ color: '#ffffff', shininess: 100 })
            //         const mesh = new THREE.Mesh(geometry, material)
            //         this.mall.add(mesh)
            //     }
            // })
        },
        /*
         * 添加每个店面的标签
         */
        addLabel () {
            const width = window.innerWidth
            const height = window.innerHeight
            let material = new THREE.MeshPhongMaterial({ color: 0x000000 })
            // 遍历场景中的元素, 在元素上方添加方块: 未来添加具体标签
            this.mall.children.forEach(elem => {
                const y = -elem.geometry.boundingSphere.center.y + 20
                const x = elem.geometry.boundingSphere.center.x - 200
                const z = elem.geometry.boundingSphere.center.z - 200
                const vector = new THREE.Vector3(x, y, z)
                const position = vector.project(this.camera)
                let span = document.getElementById(elem.uuid)
                if (!span) {
                    span = document.createElement('span')
                    span.id = elem.uuid
                    span.innerText = 'name'
                    span.style.cssText = `
                        position: absolute;
                        font-size: 10px;
                        line-height: 10px;
                    `
                }
                span.style.left = (vector.x + 1) / 2 * width + 'px'
                span.style.top = -(vector.y - 1) / 2 * height + 'px'
                document.body.appendChild(span)
                console.log('elem', elem)
                // const text = this.createText();
                // text.position.y = y
                // text.position.x = x
                // text.position.z = z
                // this.labels.push(text);
                // this.scene.add(text);
            });
        },
        // 添加canvas文字测试
        createText (text = '麦当劳') {
            const canvas = document.createElement('canvas');

            canvas.width = 128;
            canvas.height = 32;

            const ctx = canvas.getContext('2d');

            // ctx.fillStyle = '#796e8c';
            // ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '20px Arial';
            ctx.strokeStyle = '#FFFFFF';
            ctx.strokeText(text, 0, 20);
            ctx.fillStyle = '#000000';
            ctx.fillText(text, 0, 20);

            const canvasTexture = new THREE.CanvasTexture(canvas);

            const spriteMaterail = new THREE.SpriteMaterial({
                map: canvasTexture,
                color: 0xffffff
            });
            const sprite = new THREE.Sprite(spriteMaterail);
            return sprite;
        },
        /*
         * 构建辅助系统: 网格和坐标
         */
        buildAuxSystem () {
            let axisHelper = new THREE.AxesHelper(2000)
            this.scene.add(axisHelper)
            let gridHelper = new THREE.GridHelper(600, 60)
            this.scene.add(gridHelper)
            let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
            controls.enableDamping = true
            controls.dampingFactor = 0.25
            controls.rotateSpeed = 0.35
        },
        /*
         * 光照系统
         */
        buildLightSystem () {
            let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
            directionalLight.position.set(300, 1000, 500);
            directionalLight.target.position.set(0, 0, 0);
            directionalLight.castShadow = true;

            let d = 300;
            const fov = 45 //拍摄距离  视野角值越大，场景中的物体越小
            const near = 1 //相机离视体积最近的距离
            const far = 1000//相机离视体积最远的距离
            const aspect = window.innerWidth / window.innerHeight; //纵横比
            directionalLight.shadow.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
            directionalLight.shadow.bias = 0.0001;
            directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
            this.scene.add(directionalLight)

            let light = new THREE.AmbientLight(0xffffff, 0.6)
            this.scene.add(light)

        },
        getPointScale (position, pointRect) {
            // for perspectiveCamera
            // if (!position) return;
            // const distance = this.camera.position.distanceTo(position);
            // const top = Math.tan(this.camera.fov / 2 * Math.PI / 180) * distance;
            // const merterPerPixel = 2 * top / window.innerHeight;
            // const scaleX = pointRect.w * merterPerPixel;
            // const scaleY = pointRect.h * merterPerPixel;
            // return [scaleX, scaleY, 1.0];

            // for orthographicCamera
            return [50.0, 50.0, 1.0];
        },
        /*
         * 根据浏览器窗口变化动态更新尺寸
         */
        onWindowResize () {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        onDocumentMouseMove (event) {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        },
        /*
         * 动画循环
         */
        loop () {
            requestAnimationFrame(this.loop);
            this.render();
        },
        setLabelScale () {
            this.labels.forEach(elem => {
                const position = elem.position;
                const canvas = elem.material.map.image;
                const pointRect = {
                    w: canvas.width,
                    h: canvas.height
                }
                // const scale = this.getLabelScale(elem.position);
                const scale = this.getPointScale(position, pointRect);
                elem.scale.set(scale[0], scale[1], 1);
            });
        },
        /*
         * 渲染画布
         */
        render () {
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
            // this.renderer.clear();
            this.setLabelScale();
            this.renderer.render(this.scene, this.camera);
            // this.addLabel();
        }
    },
    mounted () {
        this.mouse = new THREE.Vector2() // 二维坐标用来转化鼠标参数
        this.mall = new THREE.Object3D() // 建一个空对象用来放场景物体

        this.init();
        this.buildLightSystem();
        this.buildAuxSystem();
        this.buildMall();
        this.loop();
    }
}

</script>
<style lang="scss" scoped>
#canvas {
    width: 100%;
    height: 100%;
}

.container {
    // margin: 20px 0;
    position: absolute;
    text-align: center;
    /*opacity: 0.2;*/
    width: 100%;
    canvas {
        width: 100%;
        height: 100%;
    }
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
