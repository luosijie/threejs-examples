import { Scene, Vector3, OrthographicCamera, WebGLRenderer, DirectionalLight, AmbientLight, MeshLambertMaterial, BoxGeometry, Mesh,  AxesHelper } from 'three'

class Game {
    config: any
    isMobile: Boolean

    score: number
    size: any

    canvas: HTMLCanvasElement
    scene: Scene
    camera: OrthographicCamera
    renderer: WebGLRenderer

    cameraPos: any
    cubes: Array<any>
    jumper: any

    cubeState: any
    jumperState: any
    falledState: any
    fallingState: any

    successCallback: Function
    failedCallback: Function
    
    constructor () {
        this.config = {
            background: 0x282828, // 背景颜色
            ground: -1, // 地面y坐标
            fallingSpeed: 0.2, // 游戏失败掉落速度
            cubeColor: 0xbebebe,
            cubeWidth: 4, // 方块宽度
            cubeHeight: 2, // 方块高度
            cubeDeep: 4, // 方块深度
            jumperColor: 0x232323,
            jumperWidth: 1, // jumper宽度
            jumperHeight: 2, // jumper高度
            jumperDeep: 1 // jumper深度
        }
        this.isMobile = false
        // 游戏状态
        this.score = 0
        this.size = {
            width: window.innerWidth,
            height: window.innerHeight
        }

        this.scene = new Scene()
        this.cameraPos = {
            current: new Vector3(0, 0, 0), // 摄像机当前的坐标
            next: new Vector3() // 摄像机即将要移到的位置
        }
        this.camera = new OrthographicCamera(this.size.width / -80, this.size.width / 80, this.size.height / 80, this.size.height / -80, 0, 5000)

        this.cubes = [] // 方块数组
        this.cubeState = {
            nextDir: '' // 下一个方块相对于当前方块的方向: 'left' 或 'right'
        }
        this.jumperState = {
            ready: false, // 鼠标按完没有
            xSpeed: 0, // xSpeed根据鼠标按的时间进行赋值
            ySpeed: 0 // ySpeed根据鼠标按的时间进行赋值
        }
        this.falledState = {
            location: -1, // jumper所在的位置
            distance: 0 // jumper和最近方块的距离
        }
        this.fallingState = {
            speed: 0.2, // 游戏失败后垂直方向上的掉落速度
            end: false // 掉到地面没有
        }

        this.successCallback = () => null
        this.failedCallback = () => null

        this.canvas = this._setCanvas()
        this.renderer = this._setRenderer()
    }
    init () {
        this._checkUserAgent() // 检测是否移动端
        this._setCamera() // 设置摄像机位置
        this._setRenderer() // 设置渲染器参数
        this._setLight() // 设置光照
        this._createCube() // 加一个方块
        this._createCube() // 再加一个方块
        this._createJumper() // 加入游戏者jumper
        this._updateCamera() // 更新相机坐标
        
        // 监听窗口变化的事件
        window.addEventListener('resize', () => {
            this._handleWindowResize()
        })
    }
    // 游戏失败重新开始的初始化配置
    restart () {
        this.score = 0
        this.cameraPos = {
            current: new Vector3(0, 0, 0),
            next: new Vector3()
        }
        this.fallingState = {
            speed: 0.2,
            end: false
        }
        // 删除所有方块
        const length = this.cubes.length
        for (let i = 0; i < length; i++) {
            this.scene.remove(this.cubes.pop())
        }
        // 删除jumper
        this.scene.remove(this.jumper)
        // 显示的分数设为 0
        this.successCallback(this.score)
        this._createCube()
        this._createCube()
        this._createJumper()
        this._updateCamera()
    }
    // 游戏成功的执行函数, 外部传入
    addSuccessFn (fn: Function) {
        this.successCallback = fn
    }
    // 游戏失败的执行函数, 外部传入
    addFailedFn (fn: Function) {
        this.failedCallback = fn
    }
    // 检测是否手机端
    _checkUserAgent () {
        const n = navigator.userAgent
        if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
            this.isMobile = true
        }
    }
    // THREE.js辅助工具
    _createHelpers () {
        const axesHelper = new AxesHelper(10)
        this.scene.add(axesHelper)
    }
    _setCanvas () {
        const canvas = document.querySelector('canvas')
        if (!canvas)  throw Error('canvas is not ready')
        // 事件绑定到canvas中
        const mouseEvents = (this.isMobile) ? {
            down: 'touchstart',
            up: 'touchend'
        } : {
            down: 'mousedown',
            up: 'mouseup'
        }
        
        canvas.addEventListener(mouseEvents.down, () => {
            this._handleMousedown()
        })
        // 监听鼠标松开的事件
        canvas.addEventListener(mouseEvents.up, evt => {
            this._handleMouseup()
        })

        return canvas
    }

    // 窗口缩放绑定的函数
    _handleWindowResize () {
        this._setSize()
        this.camera.left = this.size.width / -80
        this.camera.right = this.size.width / 80
        this.camera.top = this.size.height / 80
        this.camera.bottom = this.size.height / -80
        this.camera.updateProjectionMatrix()
        this.renderer && this.renderer.setSize(this.size.width, this.size.height)
        this._render()
    }
    /**
     *鼠标按下或触摸开始绑定的函数
     *根据鼠标按下的时间来给 xSpeed 和 ySpeed 赋值
     *@return {Number} this.jumperState.xSpeed 水平方向上的速度
     *@return {Number} this.jumperState.ySpeed 垂直方向上的速度
     **/
    _handleMousedown () {
        if (!this.jumperState.ready && this.jumper.scale.y > 0.02) {
            this.jumper.scale.y -= 0.01
            this.jumperState.xSpeed += 0.004
            this.jumperState.ySpeed += 0.008
            this._render()
            requestAnimationFrame(() => {
                this._handleMousedown()
            })
        }
    }
    // 鼠标松开或触摸结束绑定的函数
    _handleMouseup () {
        // 标记鼠标已经松开
        this.jumperState.ready = true
        // 判断jumper是在方块水平面之上，是的话说明需要继续运动
        if (this.jumper.position.y >= 1) {
            // jumper根据下一个方块的位置来确定水平运动方向
            if (this.cubeState.nextDir === 'left') {
                this.jumper.position.x -= this.jumperState.xSpeed
            } else {
                this.jumper.position.z -= this.jumperState.xSpeed
            }
            // jumper在垂直方向上运动
            this.jumper.position.y += this.jumperState.ySpeed
            // 运动伴随着缩放
            if (this.jumper.scale.y < 1) {
                this.jumper.scale.y += 0.02
            }
            // jumper在垂直方向上先上升后下降
            this.jumperState.ySpeed -= 0.01
            // 每一次的变化，渲染器都要重新渲染，才能看到渲染效果
            this._render()
            requestAnimationFrame(() => {
                this._handleMouseup()
            })
        } else {
            // jumper掉落到方块水平位置，开始充值状态，并开始判断掉落是否成功
            this.jumperState.ready = false
            this.jumperState.xSpeed = 0
            this.jumperState.ySpeed = 0
            this.jumper.position.y = 1
            this._checkInCube()
            if (this.falledState.location === 1) {
                // 掉落成功，进入下一步
                this.score++
                this._createCube()
                this._updateCamera()
                if (this.successCallback) {
                    this.successCallback(this.score)
                }
            } else {
                // 掉落失败，进入失败动画
                this._falling()
            }
        }
    }
    /**
     *游戏失败执行的碰撞效果
     *@param {String} dir 传入一个参数用于控制倒下的方向：'rightTop','rightBottom','leftTop','leftBottom','none'
     **/
    _fallingRotate (dir:String) {
        const offset = this.falledState.distance - this.config.cubeWidth / 2
        let rotateAxis = 'z' // 旋转轴
        let rotateAdd = this.jumper.rotation[rotateAxis] + 0.1 // 旋转速度
        let rotateTo = this.jumper.rotation[rotateAxis] < Math.PI / 2 // 旋转结束的弧度
        let fallingTo = this.config.ground + this.config.jumperWidth / 2 + offset

        if (dir === 'rightTop') {
            rotateAxis = 'x'
            rotateAdd = this.jumper.rotation[rotateAxis] - 0.1
            rotateTo = this.jumper.rotation[rotateAxis] > -Math.PI / 2
            this.jumper.geometry.translate.z = offset
        } else if (dir === 'rightBottom') {
            rotateAxis = 'x'
            rotateAdd = this.jumper.rotation[rotateAxis] + 0.1
            rotateTo = this.jumper.rotation[rotateAxis] < Math.PI / 2
            this.jumper.geometry.translate.z = -offset
        } else if (dir === 'leftBottom') {
            rotateAxis = 'z'
            rotateAdd = this.jumper.rotation[rotateAxis] - 0.1
            rotateTo = this.jumper.rotation[rotateAxis] > -Math.PI / 2
            this.jumper.geometry.translate.x = -offset
        } else if (dir === 'leftTop') {
            rotateAxis = 'z'
            rotateAdd = this.jumper.rotation[rotateAxis] + 0.1
            rotateTo = this.jumper.rotation[rotateAxis] < Math.PI / 2
            this.jumper.geometry.translate.x = offset
        } else if (dir === 'none') {
            rotateTo = false
            fallingTo = this.config.ground
        } else {
            throw Error('Arguments Error')
        }
        if (!this.fallingState.end) {
            if (rotateTo) {
                this.jumper.rotation[rotateAxis] = rotateAdd
            } else if (this.jumper.position.y > fallingTo) {
                this.jumper.position.y -= this.config.fallingSpeed
            } else {
                this.fallingState.end = true
            }
            this._render()
            requestAnimationFrame(() => {
                this._falling()
            })
        } else {
            if (this.failedCallback) {
                this.failedCallback()
            }
        }
    }
    /**
     *游戏失败进入掉落阶段
     *通过确定掉落的位置来确定掉落效果
     **/
    _falling () {
        if (this.falledState.location == 0) {
            this._fallingRotate('none')
        } else if (this.falledState.location === -10) {
            if (this.cubeState.nextDir == 'left') {
                this._fallingRotate('leftTop')
            } else {
                this._fallingRotate('rightTop')
            }
        } else if (this.falledState.location === 10) {
            if (this.cubeState.nextDir == 'left') {
                if (this.jumper.position.x < this.cubes[this.cubes.length - 1].position.x) {
                    this._fallingRotate('leftTop')
                } else {
                    this._fallingRotate('leftBottom')
                }
            } else {
                if (this.jumper.position.z < this.cubes[this.cubes.length - 1].position.z) {
                    this._fallingRotate('rightTop')
                } else {
                    this._fallingRotate('rightBottom')
                }
            }
        }
    }
    /**
     *判断jumper的掉落位置
     *@return {Number} this.falledState.location
     * -1 : 掉落在原来的方块，游戏继续
     * -10: 掉落在原来方块的边缘，游戏失败
     *  1 : 掉落在下一个方块，游戏成功，游戏继续
     *  10: 掉落在下一个方块的边缘，游戏失败
     *  0 : 掉落在空白区域，游戏失败
     **/
    _checkInCube () {
        if (this.cubes.length > 1) {
            // jumper 的位置
            const pointO = {
                x: this.jumper.position.x,
                z: this.jumper.position.z
            }
            // 当前方块的位置
            const pointA = {
                x: this.cubes[this.cubes.length - 1 - 1].position.x,
                z: this.cubes[this.cubes.length - 1 - 1].position.z
            }
            // 下一个方块的位置
            const pointB = {
                x: this.cubes[this.cubes.length - 1].position.x,
                z: this.cubes[this.cubes.length - 1].position.z
            }
            let distanceS, // jumper和当前方块的坐标轴距离
                distanceL // jumper和下一个方块的坐标轴距离
            // 判断下一个方块相对当前方块的方向来确定计算距离的坐标轴
            if (this.cubeState.nextDir === 'left') {
                distanceS = Math.abs(pointO.x - pointA.x)
                distanceL = Math.abs(pointO.x - pointB.x)
            } else {
                distanceS = Math.abs(pointO.z - pointA.z)
                distanceL = Math.abs(pointO.z - pointB.z)
            }
            let should = this.config.cubeWidth / 2 + this.config.jumperWidth / 2
            let result = 0
            if (distanceS < should) {
                // 落在当前方块，将距离储存起来，并继续判断是否可以站稳
                this.falledState.distance = distanceS
                result = distanceS < this.config.cubeWidth / 2 ? -1 : -10
            } else if (distanceL < should) {
                this.falledState.distance = distanceL
                // 落在下一个方块，将距离储存起来，并继续判断是否可以站稳
                result = distanceL < this.config.cubeWidth / 2 ? 1 : 10
            } else {
                result = 0
            }
            this.falledState.location = result
        }
    }
    // 每成功一步, 重新计算摄像机的位置，保证游戏始终在画布中间进行
    _updateCameraPos () {
        const lastIndex = this.cubes.length - 1
        const pointA = {
            x: this.cubes[lastIndex].position.x,
            z: this.cubes[lastIndex].position.z
        }
        const pointB = {
            x: this.cubes[lastIndex - 1].position.x,
            z: this.cubes[lastIndex - 1].position.z
        }
        const pointR = new Vector3()
        pointR.x = (pointA.x + pointB.x) / 2
        pointR.y = 0
        pointR.z = (pointA.z + pointB.z) / 2
        this.cameraPos.next = pointR
    }
    // 基于更新后的摄像机位置，重新设置摄像机坐标
    _updateCamera () {
        const c = {
            x: this.cameraPos.current.x,
            y: this.cameraPos.current.y,
            z: this.cameraPos.current.z
        }
        const n = {
            x: this.cameraPos.next.x,
            y: this.cameraPos.next.y,
            z: this.cameraPos.next.z
        }
        if (c.x > n.x || c.z > n.z) {
            this.cameraPos.current.x -= 0.1
            this.cameraPos.current.z -= 0.1
            if (this.cameraPos.current.x - this.cameraPos.next.x < 0.05) {
                this.cameraPos.current.x = this.cameraPos.next.x
            }
            if (this.cameraPos.current.z - this.cameraPos.next.z < 0.05) {
                this.cameraPos.current.z = this.cameraPos.next.z
            }
            this.camera.lookAt(new Vector3(c.x, 0, c.z))
            this._render()
            requestAnimationFrame(() => {
                this._updateCamera()
            })
        }
    }
    // 初始化jumper：游戏主角
    _createJumper () {
        const material = new MeshLambertMaterial({ color: this.config.jumperColor })
        const geometry = new BoxGeometry(this.config.jumperWidth, this.config.jumperHeight, this.config.jumperDeep)
        geometry.translate(0, 1, 0)
        const mesh = new Mesh(geometry, material)
        mesh.position.y = 1
        this.jumper = mesh
        this.scene.add(this.jumper)
    }
    // 新增一个方块, 新的方块有2个随机方向
    _createCube () {
        const material = new MeshLambertMaterial({ color: this.config.cubeColor })
        const geometry = new BoxGeometry(this.config.cubeWidth, this.config.cubeHeight, this.config.cubeDeep)
        const mesh = new Mesh(geometry, material)
        if (this.cubes.length) {
            const random = Math.random()
            this.cubeState.nextDir = random > 0.5 ? 'left' : 'right'
            mesh.position.x = this.cubes[this.cubes.length - 1].position.x
            mesh.position.y = this.cubes[this.cubes.length - 1].position.y
            mesh.position.z = this.cubes[this.cubes.length - 1].position.z
            if (this.cubeState.nextDir === 'left') {
                mesh.position.x = this.cubes[this.cubes.length - 1].position.x - 4 * Math.random() - 6
            } else {
                mesh.position.z = this.cubes[this.cubes.length - 1].position.z - 4 * Math.random() - 6
            }
        }
        this.cubes.push(mesh)
        // 当方块数大于6时，删除前面的方块，因为不会出现在画布中
        if (this.cubes.length > 6) {
            this.scene.remove(this.cubes.shift())
        }
        this.scene.add(mesh)
        // 每新增一个方块，重新计算摄像机坐标
        if (this.cubes.length > 1) {
            this._updateCameraPos()
        }
    }
    _render () {
        this.renderer && this.renderer.render(this.scene, this.camera)
    }
    _setLight () {
        const directionalLight = new DirectionalLight(0xffffff, 1.1)
        directionalLight.position.set(3, 10, 5)
        this.scene.add(directionalLight)

        const light = new AmbientLight(0xffffff, 0.3)
        this.scene.add(light)
    }
    _setCamera () {
        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(this.cameraPos.current)
    }
    _setRenderer () {
        const renderer = new WebGLRenderer({
            antialias: true,
            canvas: this.canvas
        })
        renderer.setSize(this.size.width, this.size.height)
        renderer.setClearColor(this.config.background)
        return renderer
    }
    _setSize () {
        this.size.width = window.innerWidth
        this.size.height = window.innerHeight
    }
}

export default Game
