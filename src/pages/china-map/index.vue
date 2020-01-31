<template>
    <div class="container">
        <div class="from">
            <router-link to="/">home</router-link>
            <a href="https://github.com/luosijie/threejs-examples/tree/master/src/pages/china-map">code</a>
        </div>
        <canvas id="canvas"/>
        <canvas id="name"/>
    </div>
</template>
<script>
import chinaJson from './config/china.json'
import * as d3geo from 'd3-geo'
export default {
    data () {
        return {
            scene: null, // 场景
            camera: null, // 摄像机
            renderer: null, // 渲染器
            map: null // 地图容器
        }
    },
    methods: {
        // 初始化3D环境
        initEnvironment () {
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0xf0f0f0)
            // 建一个空对象存放对象
            this.map = new THREE.Object3D()
            // 设置相机参数
            this.setCamera();
            // 初始化
            this.renderer = new THREE.WebGLRenderer({
                alpha: true,
                canvas: document.querySelector('canvas')
            })
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(window.innerWidth, window.innerHeight - 10)
            document.addEventListener('mousemove', this.onDocumentMouseMove, false)
            window.addEventListener('resize', this.onWindowResize, false)
            // 构建光照系统
            this.buildLightSystem()
            // 构建辅助系统
            this.buildAuxSystem()
        },
        initMap () {
            console.log('json', chinaJson)
            const projection = d3geo.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0]);
            chinaJson.features.forEach(elem => {
                const province = new THREE.Object3D()
                const coordinates = elem.geometry.coordinates
                coordinates.forEach(multiPolygon => {
                    multiPolygon.forEach(polygon => {
                        const shape = new THREE.Shape()
                        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
                        const linGeometry = new THREE.Geometry()
                        for (let i = 0; i < polygon.length; i++) {
                            const [x, y] = projection(polygon[i])
                            if (i === 0) {
                                shape.moveTo(x, -y)
                            }
                            shape.lineTo(x, -y);
                            linGeometry.vertices.push(new THREE.Vector3(x, -y, 4.01))
                        }
                        const extrudeSettings = {
                            depth: 4,
                            bevelEnabled: false
                        };
                        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
                        const material = new THREE.MeshBasicMaterial({ color: '#d13a34', transparent: true, opacity: 0.6 })
                        const mesh = new THREE.Mesh(geometry, material)
                        province.add(mesh)
                        const line = new THREE.Line(linGeometry, lineMaterial)
                        province.add(line)
                    })
                })
                // 设置省份元素属性
                province.properties = elem.properties
                if (elem.properties.centroid) {
                    const [x, y] = projection(elem.properties.centroid)
                    province.properties._centroid = [x, y]
                }
                this.map.add(province)
            })
            this.scene.add(this.map)
        },
        setCamera () {
            this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
            this.camera.position.set(0, -70, 90);
            this.camera.lookAt(0, 0, 0);
        },
        // 显示名称
        showName () {
            const width = window.innerWidth
            const height = window.innerHeight
            let canvas = document.querySelector('#name')
            if (!canvas) return
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            const offCanvas = document.createElement('canvas')
            offCanvas.width = width
            offCanvas.height = height
            const ctxOffCanvas = canvas.getContext('2d');
            ctxOffCanvas.font = '16.5px Arial';
            ctxOffCanvas.strokeStyle = '#FFFFFF';
            ctxOffCanvas.fillStyle = '#000000';
            // 遍历场景中的元素, 在元素上方添加方块: 未来添加具体标签
            const texts = [];
            this.map.children.forEach((elem, index) => {
                if (!elem.properties._centroid) return
                const y = -elem.properties._centroid[1]
                const x = elem.properties._centroid[0]
                const z = 4
                const vector = new THREE.Vector3(x, y, z)
                const position = vector.project(this.camera)
                const name = elem.properties.name
                const left = (vector.x + 1) / 2 * width
                const top = -(vector.y - 1) / 2 * height
                const text = {
                    name,
                    left,
                    top,
                    width: ctxOffCanvas.measureText(name).width,
                    height: 16.5
                }
                let show = true
                for (let i = 0; i < texts.length; i++) {
                    if (
                        (text.left + text.width) < texts[i].left ||
                        (text.top + text.height) < texts[i].top ||
                        (texts[i].left + texts[i].width) < text.left ||
                        (texts[i].top + texts[i].height) < text.top
                    ) {
                        show = true
                    } else {
                        show = false
                        break
                    }
                }
                if (show) {
                    texts.push(text)
                    ctxOffCanvas.strokeText(name, left, top)
                    ctxOffCanvas.fillText(name, left, top)
                }
            })
            ctx.drawImage(offCanvas, 0, 0)
        },
        // 构建辅助系统: 网格和坐标
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
        // 光照系统
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
        // 根据浏览器窗口变化动态更新尺寸
        onWindowResize () {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        onDocumentMouseMove (event) {
            event.preventDefault();
        },
        // 动画循环
        loop () {
            this.showName()
            this.render()
            requestAnimationFrame(this.loop)
        },
        // 渲染画布
        render () {
            this.renderer.render(this.scene, this.camera);
        }
    },
    mounted () {
        this.initEnvironment()
        this.initMap()
        this.loop()
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
    #name {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
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
