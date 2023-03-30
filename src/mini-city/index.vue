<template>
    <div class="container">
        <div class="info">
            <a class="title" href="https://github.com/luosijie/threejs-examples" target="_blank">
                Mini City
            </a>
            <a class="author" href="https://luosijie.github.io/" target="_blank">
                Created By Jesse Luo
            </a>
        </div>
        <canvas/>
    </div>
</template>
<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Car from './js/Car'
import textures from './js/textures.js'
import treesPosition from './config/treesPosition'
import utils from './js/utils.js'
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'

let scene
export default {
    name: 'MiniCity',
    data () {
        return {
            camera: null,
            renderer: null,
            cars: [],
            width: '',
            height: '',
            config: {
                isMobile: false,
                background: 0x282828
            }
        }
    },
    methods: {
        checkUserAgent () {
            let n = navigator.userAgent
            if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
                this.config.isMobile = true
                this.camera.position.set(420, 420, 420)
                this.renderer.shadowMap.enabled = false
            }
        },
        buildMovingCars () {
            let carsPosition = [
                [-130, 145, 0],
                [10, 145, 0],
                [145, 20, 0.5],
                [30, -145, 1],
                [-145, -60, 1.5]
            ]
            carsPosition.forEach(elem => {
                let car = new Car()
                let x = elem[0],
                    z = elem[1],
                    r = elem[2]
                car.setPosition(x, 0, z)
                car.mesh.rotation.y = r * Math.PI
                this.cars.push(car)
                scene.add(car.mesh)
            })
        },
        buildStaticCars () {
            let carsPosition = [
                [-84, 82, 1.5],
                [-58, 82, 1.5],
                [-32, 82, 1.5],
                [84, 82, 1.5]
            ]
            carsPosition.forEach(elem => {
                let car = new Car()
                let x = elem[0],
                    z = elem[1],
                    r = elem[2]
                car.setPosition(x, 0, z)
                car.mesh.rotation.y = r * Math.PI
                scene.add(car.mesh)
            })
        },
        buildRoad () {
            let road = new THREE.Object3D()
            let roadColor = 0xffffff
            let roadBorderOuterCoords = [
                [-160, 160],
                [160, 160],
                [160, -160],
                [-160, -160]
            ]
            let roadBorderOuterHoleCoords = [
                [-159, 159],
                [-159, -159],
                [159, -159],
                [159, 159]
            ]
            let roadBorderOuterShape = utils.makeShape(roadBorderOuterCoords, roadBorderOuterHoleCoords)
            let roadBorderOuterGeometry = utils.makeExtrudeGeometry(roadBorderOuterShape, 0.1)
            let roadBorderOuter = utils.makeMesh('phong', roadBorderOuterGeometry, roadColor)
            road.add(roadBorderOuter)

            let roadBorderInnerCoords = [
                [-131, 131],
                [-131, -131],
                [131, -131],
                [131, 131],
                [19, 131],
                [19, 99],
                [99, 99],
                [99, -99],
                [-99, -99],
                [-99, 99],
                [-19, 99],
                [-19, 131]
            ]
            let roadBorderInnerShape = utils.makeShape(roadBorderInnerCoords)
            let roadBorderInnnerGeometry = utils.makeExtrudeGeometry(roadBorderInnerShape, 0.1)
            let roadBoaderInnder = utils.makeMesh('phong', roadBorderInnnerGeometry, roadColor)
            roadBoaderInnder.rotation.y = Math.PI
            road.add(roadBoaderInnder)

            const roadLines = []
            let roadLineGeometry = new THREE.BoxGeometry(20, 0.1, 2)

            const roadLinesBottomGeometrys = [] 
            for (let i = 0; i < 9; i++) {
                let geometry = roadLineGeometry.clone()
                geometry.translate(i * 30, 0, -1)
                roadLinesBottomGeometrys.push(geometry)
            }
            const roadLinesBottomGeometry = mergeBufferGeometries(roadLinesBottomGeometrys)
            roadLinesBottomGeometry.translate(-120, 0, 145)
            roadLines.push(roadLinesBottomGeometry)

            let roadLinesTopGeometry = roadLinesBottomGeometry.clone()
            roadLinesTopGeometry.translate(0, 0, -290)
            roadLines.push(roadLinesTopGeometry)

            let roadLinesLeftGeometry = roadLinesBottomGeometry.clone()
            roadLinesLeftGeometry.rotateY(0.5 * Math.PI)
            roadLines.push(roadLinesLeftGeometry)

            let roadLinesRightGeometry = roadLinesBottomGeometry.clone()
            roadLinesRightGeometry.rotateY(-0.5 * Math.PI)
            roadLines.push(roadLinesRightGeometry)

            const roadLinesGeometry = mergeBufferGeometries(roadLines)
            const roadLinesMesh = utils.makeMesh('phong', roadLinesGeometry, roadColor)
            road.add(roadLinesMesh)

            scene.add(road)
        },
        buildbuilding () {
            let _this = this
            let planeGeometry = new THREE.BoxGeometry(320, 6, 320)
            let plane = utils.makeMesh('lambert', planeGeometry, 0x6f5f6a)
            plane.position.y = -3
            scene.add(plane)

            addFense()
            addGreen()
            addTrees()
            addHospital()
            addLamps()

            function addLamps () {
                let lampsPosition = [
                    [-12.5, 12.5, 1.25],
                    [-7.5, 12.5, -0.5],
                    [-2.5, 12.5, -0.5],
                    [2.5, 12.5, -0.5],
                    [7.5, 12.5, -0.5],
                    [12.5, 12.5, -0.25],
                    [12.5, 7.5, 0],
                    [12.5, 2.5, 0],
                    [12.5, -2.5, 0],
                    [12.5, -7.5, 0],
                    [12.5, -12.5, 0.25],
                    [7.5, -12.5, 0.5],
                    [2.5, -12.5, 0.5],
                    [-2.5, -12.5, 0.5],
                    [-7.5, -12.5, 0.5],
                    [-12.5, -12.5, 0.75],
                    [-12.5, -7.5, 1],
                    [-12.5, -2.5, 1],
                    [-12.5, 2.5, 1],
                    [-12.5, 7.5, 1]
                ]

                lampsPosition.forEach(function (elem) {
                    let x = elem[0] * 10,
                        z = elem[1] * 10,
                        r = elem[2]
                    let lamp = createLamp()
                    lamp.rotation.y = r * Math.PI
                    lamp.position.set(x, 0, z)
                    scene.add(lamp)
                })
            }

            function addHospital () {
                let hospital = createHospital()
                hospital.position.z = -20
                scene.add(hospital)
            }

            function addGreen () {
                let greenCoords = [
                    [-120, -120],
                    [-120, 120],
                    [120, 120],
                    [120, -120],
                    [20, -120],
                    [20, -100],
                    [100, -100],
                    [100, 100],
                    [-100, 100],
                    [-100, -100],
                    [-20, -100],
                    [-20, -120],
                    [-120, -120]
                ]
                let greenShape = utils.makeShape(greenCoords)

                let greenGeometry = utils.makeExtrudeGeometry(greenShape, 3)
                let green = utils.makeMesh('lambert', greenGeometry, 0xc0c06a)
                scene.add(green)
            }

            function addFense () {
                let fenseCoords = [
                    [-130, -130],
                    [-130, 130],
                    [130, 130],
                    [130, -130],
                    [20, -130],
                    [20, -120],
                    [120, -120],
                    [120, 120],
                    [-120, 120],
                    [-120, -120],
                    [-20, -120],
                    [-20, -130],
                    [-130, -130]
                ]
                let fenseShape = utils.makeShape(fenseCoords)

                let fenseGeometry = utils.makeExtrudeGeometry(fenseShape, 3)
                let fense = utils.makeMesh('lambert', fenseGeometry, 0xe5cabf)
                scene.add(fense)
            }

            function addTrees () {
                treesPosition.forEach(function (elem) {
                    let x = elem[0],
                        y = 1,
                        z = elem[1]
                    let tree = createTree(x, y, z)
                    scene.add(tree)
                })
            }

            function createLamp () {
                let lamp = new THREE.Object3D()
                let pillarGeomertry = new THREE.BoxGeometry(2, 30, 2)
                pillarGeomertry.translate(0, 15, 0)
                let pillar = utils.makeMesh('phong', pillarGeomertry, 0xebd1c2)
                lamp.add(pillar)

                let connectGeometry = new THREE.BoxGeometry(10, 1, 1)
                let connect = utils.makeMesh('phong', connectGeometry, 0x2c0e0e)
                connect.position.set(3, 30, 0)
                lamp.add(connect)

                let lightGeometry = new THREE.BoxGeometry(6, 2, 4)
                let light
                light = utils.makeMesh('phong', lightGeometry, 0xebd1c2)
                light.position.set(10, 30, 0)
                lamp.add(light)

                return lamp
            }

            function createHospital () {
                let hospital = new THREE.Object3D()

                let baseGeometry = new THREE.BoxGeometry(180, 3, 140)
                let base = utils.makeMesh('lambert', baseGeometry, 0xffffff)
                base.position.y = 1
                hospital.add(base)

                let frontMainCoords = [
                    [-80, -30],
                    [-80, 20],
                    [50, 20],
                    [50, 0],
                    [20, -30],
                    [-80, -30]
                ]
                let frontMainShape = utils.makeShape(frontMainCoords)
                let frontMainGeometry = utils.makeExtrudeGeometry(frontMainShape, 100)
                let frontMainMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
                frontMainMaterial.map.repeat.set(0.1, 0.08)
                let frontMain = new THREE.Mesh(frontMainGeometry, frontMainMaterial)
                frontMain.castShadow = true
                frontMain.receiveShadow = true
                hospital.add(frontMain)

                let frontTopShape = frontMainShape
                let frontTopGeometry = utils.makeExtrudeGeometry(frontTopShape, 5)
                let frontTop = utils.makeMesh('lambert', frontTopGeometry, 0xb1a7af)
                frontTop.position.y = 100
                hospital.add(frontTop)

                const frontRoofShelfs = []
                let frontRoofShelfCubeGeometry = new THREE.BoxGeometry(2, 2, 40)
                // for z-axis
                for (let i = 0; i < 12; i++) {
                    let geometry = frontRoofShelfCubeGeometry.clone()
                    geometry.translate(i * 5, 0, 0)
                    frontRoofShelfs.push(geometry)
                }
                // for x-axis
                for (let i = 0; i < 2; i++) {
                    let geometry = frontRoofShelfCubeGeometry.clone()
                    geometry.rotateY(0.5 * Math.PI)
                    geometry.scale(1.6, 1, 1)
                    geometry.translate(27, 0, -15 + i * 30)
                    frontRoofShelfs.push(geometry)
                }
                // for y-axis
                let frontRoofShelfCubeYPosition = [
                    [0, 0],
                    [1, 0],
                    [0, 1],
                    [1, 1]
                ]
                for (let i = 0; i < frontRoofShelfCubeYPosition.length; i++) {
                    let p = frontRoofShelfCubeYPosition[i]
                    let geometry = frontRoofShelfCubeGeometry.clone()
                    geometry.scale(1, 1, 0.4)
                    geometry.rotateX(0.5 * Math.PI)
                    geometry.translate(p[0] * 55, 0, -15 + p[1] * 30)
                    frontRoofShelfs.push(geometry)
                }
                const frontRoofShelfGeometry = mergeBufferGeometries(frontRoofShelfs)
                let frontRoofShelf = utils.makeMesh('phong', frontRoofShelfGeometry, 0xffffff)
                frontRoofShelf.position.set(-70, 115, 5)
                hospital.add(frontRoofShelf)

                let frontPlatGeometry = new THREE.BoxGeometry(150, 3, 90)
                let fronPlat = utils.makeMesh('lambert', frontPlatGeometry, 0x0792a5)
                fronPlat.position.set(-3, 18, 25)
                hospital.add(fronPlat)

                let frontPlatVerticalGeometry = new THREE.BoxGeometry(150, 15, 3)
                let frontPlatVertical = utils.makeMesh('phong', frontPlatVerticalGeometry, 0x0792a5)
                frontPlatVertical.receiveShadow = false
                frontPlatVertical.position.set(-3, 24, 68.5)
                hospital.add(frontPlatVertical)

                let frontPlatVerticalWhiteGeometry = new THREE.BoxGeometry(150, 3, 3)
                let frontPlatVerticalWhite = utils.makeMesh('phong', frontPlatVerticalWhiteGeometry, 0xffffff)
                frontPlatVerticalWhite.position.set(-3, 33, 68.5)
                hospital.add(frontPlatVerticalWhite)

                let frontPlatPillarGeometry = new THREE.CylinderGeometry(2, 2, 15, 32)
                let frontPlatPillar = utils.makeMesh('lambert', frontPlatPillarGeometry, 0xffffff)
                frontPlatPillar.position.set(-60, 10, 55)
                hospital.add(frontPlatPillar)

                let frontPlatPillar2 = frontPlatPillar.clone()
                frontPlatPillar2.position.set(55, 10, 55)
                hospital.add(frontPlatPillar2)

                let frontBorderVerticles = new THREE.Object3D()
                let frontBorderVerticleGeometry = new THREE.BoxGeometry(4, 106, 4)
                let frontBorderVerticleMesh = utils.makeMesh('phong', frontBorderVerticleGeometry, 0xffffff)
                let frontBorderVerticle1 = frontBorderVerticleMesh.clone()
                frontBorderVerticle1.position.set(-80, 52, 30)
                frontBorderVerticles.add(frontBorderVerticle1)
                let frontBorderVerticle2 = frontBorderVerticleMesh.clone()
                frontBorderVerticle2.position.set(-80, 52, -20)
                frontBorderVerticles.add(frontBorderVerticle2)
                let frontBorderVerticle3 = frontBorderVerticleMesh.clone()
                frontBorderVerticle3.position.set(50, 52, -18)
                frontBorderVerticles.add(frontBorderVerticle3)
                hospital.add(frontBorderVerticles)

                let frontRoofCoords = [
                    [-82, -32],
                    [20, -32],
                    [52, 0],
                    [52, 22],
                    [-82, 22],
                    [-82, -32]
                ]
                let frontRoofHolePath = [
                    [-78, -28],
                    [20, -28],
                    [48, 0],
                    [48, 18],
                    [-78, 18],
                    [-78, -28]
                ]
                let frontRoofShape = utils.makeShape(frontRoofCoords, frontRoofHolePath)
                let frontRoofGeometry = utils.makeExtrudeGeometry(frontRoofShape, 8)
                let frontRoof = utils.makeMesh('phong', frontRoofGeometry, 0xffffff)
                frontRoof.position.y = 100
                hospital.add(frontRoof)

                let backMainCoords = [
                    [-80, 20],
                    [-80, 60],
                    [80, 60],
                    [80, 20],
                    [-80, 20]
                ]
                let backMainHolePath = [
                    [-78, 22],
                    [78, 22],
                    [78, 58],
                    [-78, 58],
                    [-78, 22]
                ]
                let backMainShape = utils.makeShape(backMainCoords, backMainHolePath)

                let backMainGeometry = utils.makeExtrudeGeometry(backMainShape, 90)
                let backMain = utils.makeMesh('lambert', backMainGeometry, 0xf2e21b)
                hospital.add(backMain)

                let backMiddleCoords = [
                    [0, 0],
                    [36, 0],
                    [36, 70],
                    [0, 70],
                    [0, 0]
                ]
                let backMiddleHolePath = [
                    [2, 2],
                    [34, 2],
                    [34, 68],
                    [2, 68],
                    [2, 2]
                ]
                let backMiddleShape = utils.makeShape(backMiddleCoords, backMiddleHolePath)
                let backMiddkeGeometry = utils.makeExtrudeGeometry(backMiddleShape, 165)
                let backMiddle = utils.makeMesh('lambert', backMiddkeGeometry, 0xffffff)

                backMiddle.rotation.x = -0.5 * Math.PI
                backMiddle.rotation.z = -0.5 * Math.PI
                backMiddle.position.y = 86
                backMiddle.position.z = -58
                backMiddle.position.x = -78
                hospital.add(backMiddle)

                let backMiddleWindowGeometry = new THREE.PlaneGeometry(32, 66, 1, 1)
                let backMiddleWindowMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
                backMiddleWindowMaterial.map.repeat.set(2, 6)

                let backMiddleWindow = new THREE.Mesh(backMiddleWindowGeometry, backMiddleWindowMaterial)
                backMiddleWindow.position.set(83, 51, -40)
                backMiddleWindow.rotation.y = 0.5 * Math.PI
                hospital.add(backMiddleWindow)

                let windowBackOrigin = createWindow()
                windowBackOrigin.scale.set(0.6, 0.6, 1)
                windowBackOrigin.rotation.y = Math.PI
                windowBackOrigin.position.set(65, 75, -61)
                for (let i = 0; i < 7; i++) {
                    for (let j = 0; j < 4; j++) {
                        let windowObj = windowBackOrigin.clone()
                        windowObj.position.x -= i * 22
                        windowObj.position.y -= j * 20
                        hospital.add(windowObj)
                    }
                }

                return hospital
            }

            function createWindow () {
                let windowObj = new THREE.Object3D()
                let glassGeometry = new THREE.PlaneGeometry(20, 20)
                let glass = utils.makeMesh('phong', glassGeometry, 0x6a5e74)
                windowObj.add(glass)

                let windowBorderGeometry = new THREE.BoxGeometry(22, 2, 2)
                let windowBorder = utils.makeMesh('phong', windowBorderGeometry, 0xffffff)

                let windowBorderTop = windowBorder.clone()
                windowBorderTop.position.y = 10
                windowObj.add(windowBorderTop)

                let windowBorderBottom = windowBorder.clone()
                windowBorderBottom.position.y = -10
                windowObj.add(windowBorderBottom)

                let windowBorderLeft = windowBorder.clone()
                windowBorderLeft.rotation.z = 0.5 * Math.PI
                windowBorderLeft.position.x = -10
                windowObj.add(windowBorderLeft)

                let windowBorderRight = windowBorderLeft.clone()
                windowBorderRight.position.x = 10
                windowObj.add(windowBorderRight)

                return windowObj
            }

            function createTree (x, y, z) {
                x = x || 0
                y = y || 0
                z = z || 0

                let tree = new THREE.Object3D()

                let treeTrunkGeometry = new THREE.BoxGeometry(2, 16, 2)
                let treeTrunk = utils.makeMesh('lambert', treeTrunkGeometry, 0x8a613a)
                treeTrunk.position.y = 8
                tree.add(treeTrunk)

                let treeLeafsGeometry = new THREE.BoxGeometry(8, 8, 8)
                let treeLeafs = utils.makeMesh('lambert', treeLeafsGeometry, 0x9c9e5d)
                treeLeafs.position.y = 13
                tree.add(treeLeafs)

                tree.position.set(x, y, z)

                return tree
            }
        },
        buildLightSystem () {

            if (!this.config.isMobile) {
                let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1)
                directionalLight.position.set(300, 1000, 500)
                directionalLight.target.position.set(0, 0, 0)
                directionalLight.castShadow = true

                let d = 300
                directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600)
                directionalLight.shadow.bias = 0.0001
                directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024
                scene.add(directionalLight)

                let light = new THREE.AmbientLight(0xffffff, 0.3)
                scene.add(light)
            } else {
                let hemisphereLight = new THREE.HemisphereLight(0xffffff, 1)
                scene.add(hemisphereLight)

                let light = new THREE.AmbientLight(0xffffff, 0.15)
                scene.add(light)
            }
        },
        // 构建辅助系统
        buildAuxSystem () {
            let gridHelper = new THREE.GridHelper(320, 32)
            scene.add(gridHelper)

            let controls = new OrbitControls(this.camera, this.renderer.domElement)
            controls.enableDamping = true
            controls.dampingFactor = 0.25
            controls.rotateSpeed = 0.35
        },
        carMoving (car) {
            let angle = car.mesh.rotation.y
            let x = car.mesh.position.x,
                z = car.mesh.position.z

            if (x < 145 && z === 145) {
                car.forward()
            } else if (angle < 0.5 * Math.PI) {
                car.turnLeft(0.5 * Math.PI, 0.1)
            } else if (x === 145 && z > -145) {
                car.forward()
            } else if (angle < Math.PI) {
                car.turnLeft(0.5 * Math.PI, 0.1)
            } else if (x > -145 && z == -145) {
                car.forward()
            } else if (angle < 1.5 * Math.PI) {
                car.turnLeft(0.5 * Math.PI, 0.1)
            } else if (x === -145 && z < 145) {
                car.mesh.rotation.y = 1.5 * Math.PI
                car.forward()
            } else if (angle < 2 * Math.PI) {
                car.turnLeft(0.5 * Math.PI, 0.1)
            } else {
                car.setPosition(-145, 0, 145)
                car.mesh.rotation.set(0, 0, 0)
            }
        },
        onWindowResize () {
            window.addEventListener('resize', () => {
                this.width = window.innerWidth
                this.height = window.innerHeight

                this.camera.aspect = this.width / this.height
                this.camera.updateProjectionMatrix()

                this.renderer.setSize(this.width, this.height)
            })
        },
        loop () {
            // stats.update()
            this.cars.forEach(car => {
                this.carMoving(car)
            })
            this.renderer.render(scene, this.camera)
            requestAnimationFrame(this.loop)
        }
    },
    mounted () {

        this.width = window.innerWidth
        this.height = window.innerHeight

        scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 5000)
        this.camera.position.set(330, 330, 330)
        this.camera.lookAt(scene.position)

        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            canvas: document.querySelector('canvas')
        })
        this.renderer.setSize(this.width, this.height)
        this.renderer.setClearColor(this.config.background)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // document.body.appendChild(this.renderer.domElement)

        this.checkUserAgent()

        this.buildAuxSystem()
        this.buildLightSystem()
        this.buildbuilding()
        this.buildRoad()
        this.buildStaticCars()
        this.buildMovingCars()

        this.loop()
        this.onWindowResize()
    }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;
    text-align: center;
    .info {
        position: absolute;
        padding: 10px;
        width: 100%;
        opacity: 0.2;
    }
    a {
        display: block;
        font-size: 16px;
        text-decoration: none;
        color: #ffffff;
        line-height: 28px;
    }
}
a.title {
    font-size: 20px;
    font-weight: bold;
}

</style>
