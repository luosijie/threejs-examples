<template>
    <div class="container">
        <canvas id="canvas"/>
        <canvas id="name"/>
    </div>
</template>
<script setup>
import * as THREE from 'three'
import chinaJson from './config/china.json'
import * as d3geo from 'd3-geo'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue'
import { Scene, Object3D } from 'three'

const scene = new Scene()
const map = new Object3D()

let camera = null
let renderer = null

// 初始化3D环境
const initEnvironment = () => {
    scene.background = new THREE.Color(0xf0f0f0)
    // 设置相机参数
    setCamera()
    // 初始化
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: document.querySelector('canvas')
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    window.addEventListener('resize', onWindowResize, false)
}

const initMap = () => {
    // d3-geo转化坐标
    const projection = d3geo.geoMercator().center([104.0, 37.5]).scale(80).translate([0, 0])
    // 遍历省份构建模型
    chinaJson.features.forEach(elem => {
        // 新建一个省份容器：用来存放省份对应的模型和轮廓线
        const province = new THREE.Object3D()
        const coordinates = elem.geometry.coordinates
        coordinates.forEach(multiPolygon => {
            multiPolygon.forEach(polygon => {
                // 这里的坐标要做2次使用：1次用来构建模型，1次用来构建轮廓线
                const shape = new THREE.Shape()
                const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
                const linePoints = []
                for (let i = 0; i < polygon.length; i++) {
                    const [x, y] = projection(polygon[i])
                    if (i === 0) {
                        shape.moveTo(x, -y)
                    }
                    shape.lineTo(x, -y)
                    linePoints.push(new THREE.Vector3(x, -y, 4.01))
                }
                const extrudeSettings = {
                    depth: 4,
                    bevelEnabled: false
                }
                const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
                const material = new THREE.MeshBasicMaterial({ color: '#d13a34', transparent: true, opacity: 0.6 })
                const mesh = new THREE.Mesh(geometry, material)
                const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints)
                const line = new THREE.Line(lineGeometry, lineMaterial)
                province.add(mesh)
                province.add(line)
            })
        })
        // 将geojson的properties放到模型中，后面会用到
        province.properties = elem.properties
        if (elem.properties.centroid) {
            const [x, y] = projection(elem.properties.centroid)
            province.properties._centroid = [x, y]
        }
        map.add(province)
    })
    scene.add(map)
}

const setCamera = () => {
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.set(0, -70, 90)
    camera.lookAt(0, 0, 0)
}
    
// 显示名称
const showName = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    let canvas = document.querySelector('#name')
    if (!canvas) return
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    // 新建一个离屏canvas
    const offCanvas = document.createElement('canvas')
    offCanvas.width = width
    offCanvas.height = height
    const ctxOffCanvas = canvas.getContext('2d')
    // 设置canvas字体样式
    ctxOffCanvas.font = '16.5px Arial'
    ctxOffCanvas.strokeStyle = '#FFFFFF'
    ctxOffCanvas.fillStyle = '#000000'
    // texts用来存储显示的名称，重叠的部分就不会放到里面
    const texts = []
    /**
     * 遍历省份数据，有2个核心功能
     * 1. 将3维坐标转化成2维坐标
     * 2. 后面遍历到的数据，要和前面的数据做碰撞对比，重叠的就不绘制
     * */
    map.children.forEach((elem, index) => {
        if (!elem.properties._centroid) return
        // 找到中心点
        const y = -elem.properties._centroid[1]
        const x = elem.properties._centroid[0]
        const z = 4
        // 转化为二维坐标
        const vector = new THREE.Vector3(x, y, z)
        const position = vector.project(camera)
        // 构建文本的基本属性：名称，left, top, width, height -> 碰撞对比需要这些坐标数据
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
        // 碰撞对比
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
    // 离屏canvas绘制到canvas中
    ctx.drawImage(offCanvas, 0, 0)
}

// 构建辅助系统: 网格和坐标
const buildAuxSystem = () => {
    let axisHelper = new THREE.AxesHelper(2000)
    scene.add(axisHelper)
    let gridHelper = new THREE.GridHelper(600, 60)
    scene.add(gridHelper)

    let controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.rotateSpeed = 0.35
}

// 光照系统
const buildLightSystem = () => {
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1)
    directionalLight.position.set(300, 1000, 500)
    directionalLight.target.position.set(0, 0, 0)
    directionalLight.castShadow = true

    let d = 300
    const fov = 45 //拍摄距离  视野角值越大，场景中的物体越小
    const near = 1 //相机离视体积最近的距离
    const far = 1000//相机离视体积最远的距离
    const aspect = window.innerWidth / window.innerHeight //纵横比
    directionalLight.shadow.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
    directionalLight.shadow.bias = 0.0001
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

    let light = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(light)

}

// 根据浏览器窗口变化动态更新尺寸
const onWindowResize =  () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

const onDocumentMouseMove = event => {
    event.preventDefault()
}

// 动画循环
const loop = () => {
    showName()
    renderCanvas()
    requestAnimationFrame(loop)
}

// 渲染画布
const renderCanvas = () => {
    renderer.render(scene, camera)
}

onMounted(() => {
    // 初始化3D环境
    initEnvironment()
    // 构建光照系统
    buildLightSystem()
    // 构建辅助系统
    buildAuxSystem()
    initMap()
    loop()

})

</script>
<style lang="scss">
body {
    margin: 0;
    padding: 0;
}
.container {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    canvas {
        position: absolute;
        top: 0;
        left: 0;
        &#name {
            user-select: none;
            pointer-events: none;
        }
    }
}
</style>
