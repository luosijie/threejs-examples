var Game = function (callback) {
	// 基本参数
	this.config = {
  	background: 0x282828, // 背景颜色
    ground: -1, // 地面y坐标
    fallingSpeed: 0.2, // 游戏失败掉落速度
  }
  // 场景设置
	this.size = {
		width: window.innerWidth,
		height: window.innerHeight
	}
  this.scene = new THREE.Scene()
  this.cameraPos = {
  	current: new THREE.Vector3(0, 0, 0),
  	next: new THREE.Vector3()
  }
  this.camera = this._setCamera()
  this.renderer = this._setRenderer()
  // 游戏元素
  this.cubes = []
  this.cubeStat = {
  	width: 4, // x
  	height: 2, // y
  	deep: 4, // z
  	lastIndex: 0, // 最新生成的方块
  	nextDir: '' // 'left' 或 'right'
  }
  this.jumperStat = {
  	width: 1, // x
  	height: 2, // y
  	deep: 1, // z
  	ready: false,
  	durTime: 3000,
  	xSpeed: 0,
  	ySpeed: 0
  }
  this.jumper = this._createJumper()
  this.falledStat = {
  	location: -1,
  	distanceS: 0
  }
  this.fallingStat = {
    speed: 0.2,
    end: false
  }
  this.callback = callback
  
}
Game.prototype = {
  init: function () {
    this._createHelpers()
  	this._setLight()
    this._createPlane()
  	this._createCube()
  	this._createCube()
  	this._render()
  	this._updateCamera()

    var self = this
  	document.addEventListener('mousedown', function () {
      self._handleMousedown()
  	})
  	document.addEventListener('mouseup', function () {
      self._handleMouseup()
  	})
  	window.addEventListener('resize', function () {
  		self._handleWindowResize()
  	})
  },
  _createHelpers: function () {
    var axesHelper = new THREE.AxesHelper(10)
    this.scene.add(axesHelper)
  },
  restart: function () {
	  this.scene = new THREE.Scene()
	  this.cameraPos = {
	  	current: new THREE.Vector3(0, 0, 0),
	  	next: new THREE.Vector3()
	  }
	  this.cubes = []
	  this.cubeStat = {
	  	width: 4, // x
	  	height: 2, // y
	  	deep: 4, // z
	  	lastIndex: 0, // 最新生成的方块
	  	nextDir: '' // 'left' 或 'right'
	  }
	  this.jumperStat = {
	  	width: 1, // x
	  	height: 2, // y
	  	deep: 1, // z
	  	ready: false,
	  	durTime: 3000,
	  	xSpeed: 0,
	  	ySpeed: 0
	  }
	  this.jumper = this._createJumper()
	  this.falledStat = {
	  	location: -1,
	  	distanceS: 0
	  }
	  this._setLight()
	  this._createCube()
  	this._createCube()
  	this._render()
  	this._updateCamera()
  },
  _handleWindowResize: function () {
    this._setSize()
    this.camera.aspect = this.size.width / this.size.height;
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.size.width, this.size.height)
  },
  _handleMousedown: function () {
    var self = this
    if (!self.jumperStat.ready && self.jumper.scale.y > 0.02) { 
      self.jumper.scale.y -= 0.01
      self.jumperStat.xSpeed += 0.003
      self.jumperStat.ySpeed += 0.006
	    self._render(self.scene, self.camera)
	    requestAnimationFrame(function(){
	    	self._handleMousedown()
	    })
    }
  },
  _handleMouseup: function () {
    var self = this
    self.jumperStat.ready = true
    if (self.jumper.position.y >= 1) {
    	if (self.cubeStat.nextDir === 'left') {
    	  self.jumper.position.x -= self.jumperStat.xSpeed	
    	} else {
    		self.jumper.position.z -= self.jumperStat.xSpeed
    	}
    	
      self.jumper.position.y += self.jumperStat.ySpeed
      if ( self.jumper.scale.y < 1 ) {
      	self.jumper.scale.y += 0.02
      }
	    self.jumperStat.ySpeed -= 0.01
	    self._render(self.scene, self.camera)
	    requestAnimationFrame(function(){
	    	self._handleMouseup()
	    })	
    } else {
    	self.jumperStat.ready = false
    	self.jumperStat.xSpeed = 0
    	self.jumperStat.ySpeed = 0
    	self.jumper.position.y = 1
    	self._render()
    	self._checkInCube()
    	if (self.falledStat.location === 1) {
    		self._createCube()
    	  self._updateCamera()
    	} else {
    		self._falling()
    	}
    }
    
  },
  _fallingRotate: function (dir) {
    var self = this
    var offset = self.falledStat.distance - self.cubeStat.width / 2
    var rotateAxis = 'z' // 旋转轴
    var rotateAdd = self.jumper.rotation[rotateAxis] + 0.1 // 旋转速度
    var rotateTo = self.jumper.rotation[rotateAxis] < Math.PI/2 // 旋转结束的弧度
    var fallingTo = self.config.ground + self.jumperStat.width / 2 + offset

    if (dir === 'rightTop') {
      rotateAxis = 'x'
      rotateAdd = self.jumper.rotation[rotateAxis] - 0.1
      rotateTo = self.jumper.rotation[rotateAxis] > -Math.PI/2
      self.jumper.geometry.translate.z = offset

    } else if (dir === 'rightBottom') {
      rotateAxis = 'x'
      rotateAdd = self.jumper.rotation[rotateAxis] + 0.1
      rotateTo = self.jumper.rotation[rotateAxis] < Math.PI/2
      self.jumper.geometry.translate.z = -offset
    } else if (dir === 'leftBottom') {
      rotateAxis = 'z'
      rotateAdd = self.jumper.rotation[rotateAxis] - 0.1
      rotateTo = self.jumper.rotation[rotateAxis] > -Math.PI/2
      self.jumper.geometry.translate.x = -offset
    } else if (dir === 'leftTop') {
      rotateAxis = 'z'
      rotateAdd = self.jumper.rotation[rotateAxis] + 0.1
      rotateTo = self.jumper.rotation[rotateAxis] < Math.PI/2
      self.jumper.geometry.translate.x = offset
    } else if (dir === 'none') {
      rotateTo = false
      fallingTo = self.config.ground
    } else {
      throw Error('Arguments Error')
    }
    if (!self.fallingStat.end) {
      if (rotateTo) {
        self.jumper.rotation[rotateAxis] = rotateAdd
      } else if (self.jumper.position.y > fallingTo) {
        self.jumper.position.y -= self.config.fallingSpeed
      } else {
        self.fallingStat.end = true
      }
      self._render()
      requestAnimationFrame(function(){
        self._falling()
      })  
    } else {
      self.callback()
    }
    
    
  },
  _falling: function () {
  	var self = this
  	if (self.falledStat.location == 0) {
      self._fallingRotate('none')
  	} else if (self.falledStat.location === -10) {
  		if (self.cubeStat.nextDir == 'left') {
  			self._fallingRotate('leftTop')
  		} else {
  			self._fallingRotate('rightTop')
  		} 		
  	} else if (self.falledStat.location === 10) {
  		if (self.cubeStat.nextDir == 'left') {
  			if (self.jumper.position.x < self.cubes[self.cubeStat.lastIndex].position.x) {
          self._fallingRotate('leftTop')
  			} else {
          self._fallingRotate('leftBottom')
	  		}
  		} else {
  			if (self.jumper.position.z < self.cubes[self.cubeStat.lastIndex].position.z) {
  				self._fallingRotate('rightTop')
  			} else {
          self._fallingRotate('rightBottom')
	  		}
  		} 	
  	} 
  },
  _checkInCube: function () {
  	if (this.cubes.length > 1) {
      var pointO = {
	    	x: this.jumper.position.x,
	    	z: this.jumper.position.z
	    }
	    var pointA = {
	    	x: this.cubes[this.cubeStat.lastIndex - 1].position.x,
	    	z: this.cubes[this.cubeStat.lastIndex - 1].position.z
	    }
	    var pointB = {
	    	x: this.cubes[this.cubeStat.lastIndex].position.x,
	    	z: this.cubes[this.cubeStat.lastIndex].position.z
	    }

	    var distanceS = Math.sqrt(Math.pow((pointO.x - pointA.x),2) + Math.pow((pointO.z - pointA.z),2))
	    var distanceL = Math.sqrt(Math.pow((pointO.x - pointB.x),2) + Math.pow((pointO.z - pointB.z),2))
	    var should = this.cubeStat.width / 2 + this.jumperStat.width /2
	    var result = false
	    if (distanceS < should ) {
	    	this.falledStat.distance = distanceS
	    	result = distanceS < this.cubeStat.width / 2 ? -1 : -10
	    } else if (distanceL < should) {
	    	this.falledStat.distance = distanceL
	    	result = distanceL < this.cubeStat.width / 2 ? 1 : 10
	    } else {
	    	result = 0
	    }
	    this.falledStat.location = result
  	}
  },
  _updateCameraPos: function () {
  	var lastIndex = this.cubes.length - 1
    var pointA = {
      x: this.cubes[lastIndex].position.x,
      z: this.cubes[lastIndex].position.z
    }
    var pointB = {
    	x: this.cubes[lastIndex - 1].position.x,
    	z: this.cubes[lastIndex - 1].position.z
    }
    var pointR = new THREE.Vector3()
    pointR.x = (pointA.x + pointB.x) / 2
    pointR.y = 0
    pointR.z = (pointA.z + pointB.z) / 2

    this.cameraPos.next = pointR

  },
  _updateCamera: function () {
  	  var self = this
  	  var c = {
  	  	x: self.cameraPos.current.x,
  	  	y: self.cameraPos.current.y,
  	  	z: self.cameraPos.current.z
  	  }
  	  var n = {
  	  	x: self.cameraPos.next.x,
  	  	y: self.cameraPos.next.y,
  	  	z: self.cameraPos.next.z
  	  }
  	  
  	  if (c.x > n.x  || c.z > n.z) {
  	  	
  	  	self.cameraPos.current.x -= 0.1
  	  	self.cameraPos.current.z -= 0.1
  	  	if (self.cameraPos.current.x - self.cameraPos.next.x < 0.05) {
  	  		self.cameraPos.current.x = self.cameraPos.next.x
  	  	}
  	  	if (self.cameraPos.current.z - self.cameraPos.next.z < 0.05) {
  	  		self.cameraPos.current.z = self.cameraPos.next.z
  	  	}
	  	  self.camera.lookAt(new THREE.Vector3(c.x, 0, c.z))
	      self._render()
	  	  requestAnimationFrame(function(){
	  	  	self._updateCamera()
	  	  })
  	  }
        
  },
  _createPlane: function () {
    var geometry = new THREE.PlaneBufferGeometry(10,10, 10)
    var material = new THREE.MeshLambertMaterial({color: 0x858585})
    var mesh = new THREE.Mesh(geometry, material)
    mesh.recieveShadow = true
    geometry.rotateX(-0.5 * Math.PI)
    mesh.position.y = -1
    this.scene.add(mesh)
  },
  _createJumper: function () {
    var material = new THREE.MeshLambertMaterial({color: 0x232323})
    var geometry = new THREE.CubeGeometry(this.jumperStat.width,this.jumperStat.height,this.jumperStat.deep)
    geometry.translate(0,1,0)
    var mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.position.y = 1
    this.scene.add(mesh)
    return mesh
  },
  _createCube: function () {
    var material = new THREE.MeshLambertMaterial({color: 0xbebebe})
    var geometry = new THREE.CubeGeometry(this.cubeStat.width,this.cubeStat.height,this.cubeStat.deep)
    var mesh = new THREE.Mesh(geometry, material)
    mesh.castShadow = true
    mesh.recieveShadow = true
    if( this.cubes.length ) {
    	var random = Math.random()
    	this.cubeStat.nextDir =  random > 0.5 ? 'left' : 'right' 
    	mesh.position.x = this.cubes[this.cubeStat.lastIndex].position.x
    	mesh.position.y = this.cubes[this.cubeStat.lastIndex].position.y
    	mesh.position.z = this.cubes[this.cubeStat.lastIndex].position.z
    	if (this.cubeStat.nextDir === 'left') {
        mesh.position.x = this.cubes[this.cubeStat.lastIndex].position.x-4*Math.random() - 6
      } else {
      	mesh.position.z = this.cubes[this.cubeStat.lastIndex].position.z-4*Math.random() - 6
      } 
      this.cubeStat.lastIndex++
  	}
    
  	this.cubes.push(mesh)
    this.scene.add(mesh)

    if ( this.cubes.length > 1) {
      this._updateCameraPos()
  	}

    return mesh 
  },
  _render: function () {
    this.renderer.render(this.scene, this.camera)
  },
  _setLight: function () {
    var directionalLight = new THREE.DirectionalLight( 0xffffff , 1.2)
    directionalLight.position.set( 1, 1.3, 0 )
    directionalLight.target.position.set(0,0,0)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)

    directionalLight.shadow.mapSize.width = 512
    directionalLight.shadow.mapSize.height = 512
    directionalLight.shadow.camera.near = 0.5
    directionalLight.shadow.camera.far = 500

    var light = new THREE.AmbientLight( 0xffffff, 0.3 )
    this.scene.add( light )
  },
  _setCamera: function () {
  	var camera = new THREE.OrthographicCamera(this.size.width / -80, this.size.width / 80, this.size.height / 80, this.size.height / -80, 0, 5000)
    camera.position.set(100, 100, 100)
    camera.lookAt(this.cameraPos.current)
    return camera
  },
  _setRenderer: function () {
  	var renderer = new THREE.WebGLRenderer({antialias: true})
    renderer.setSize(this.size.width, this.size.height)
    renderer.setClearColor(this.config.background)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    document.body.appendChild(renderer.domElement)
    return renderer
  },
  _setSize: function () {
  	this.size.width = window.innerWidth,
  	this.size.height = window.innerHeight
  }
}