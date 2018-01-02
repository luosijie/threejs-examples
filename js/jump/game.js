var Game = function () {
	// 基本参数
	this.config = {
  	background: 0x282828
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
  
}
Game.prototype = {
  init: function () {
  	this._setLight()
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
  _reset: function () {
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
  _falling: function () {
  	var self = this
  	var fallingSpeed = 0.2
  	var fallingTo = -1
  	var offset = self.falledStat.distance - self.cubeStat.width / 2
  	if (self.falledStat.location == 0) {
  		if (self.jumper.position.y > fallingTo) {
        self.jumper.position.y -= fallingSpeed
  		}	else {
  			self._reset()
  		}
  	} else if (self.falledStat.location === -10) {
  		if (self.cubeStat.nextDir == 'left') {
  			self.jumper.geometry.translate.z = offset
  			if (self.jumper.rotation.z < Math.PI/2) {
  				self.jumper.rotation.z += 0.1
  			} else if (self.jumper.position.y > fallingTo) {
          self.jumper.position.y -= fallingSpeed
  			} else {
	  			self._reset()
	  		}   
  		} else {
  			self.jumper.geometry.translate.z = offset
  			if (self.jumper.rotation.x > -Math.PI/2) {
  				self.jumper.rotation.x -= 0.1
  			} else if (self.jumper.position.y > fallingTo) {
          self.jumper.position.y -= fallingSpeed
  			} else {
	  			self._reset()
	  		}
  		} 		
  	} else if (self.falledStat.location === 10) {
  		if (self.cubeStat.nextDir == 'left') {
  			if (self.jumper.position.x < self.cubes[self.cubeStat.lastIndex].position.x) {
  				self.jumper.geometry.translate.x = offset
  				if (self.jumper.rotation.z < Math.PI/2) {
	  				self.jumper.rotation.z += 0.1
	  			} else if (self.jumper.position.y > fallingTo) {
	          self.jumper.position.y -= fallingSpeed
	  			} else {
		  			self._reset()
		  		}
  			} else {
  				self.jumper.geometry.translate.x = -offset
	  			if (self.jumper.rotation.z > -Math.PI/2) {
	  				self.jumper.rotation.z -= 0.1
	  			} else if (self.jumper.position.y > fallingTo) {
	          self.jumper.position.y -= fallingSpeed
	  			} else {
		  			self._reset()
		  		}
	  		}
  		} else {
  			if (self.jumper.position.z < self.cubes[self.cubeStat.lastIndex].position.z) {
  				self.jumper.geometry.translate.z = offset
  				if (self.jumper.rotation.x > Math.PI/2) {
	  				self.jumper.rotation.x -= 0.1
	  			} else if (self.jumper.position.y > fallingTo) {
	          self.jumper.position.y -= fallingSpeed
	  			} else {
		  			self._reset()
		  		}
  			} else {
  				self.jumper.geometry.translate.z = -offset
	  			if (self.jumper.rotation.x < Math.PI/2) {
	  				self.jumper.rotation.x += 0.1
	  			} else if (self.jumper.position.y > fallingTo) {
	          self.jumper.position.y -= fallingSpeed
	  			} else {
		  			self._reset()
		  		}
	  		}
  		} 	
  	}
  	self._render()
  	requestAnimationFrame(function(){
      self._falling()
  	})
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
  	  	
  	  	self.cameraPos.current.x -= 0.07
  	  	self.cameraPos.current.z -= 0.07
  	  	if (self.cameraPos.current.x - self.cameraPos.next.x < 0.07) {
  	  		self.cameraPos.current.x = self.cameraPos.next.x
  	  	}
  	  	if (self.cameraPos.current.z - self.cameraPos.next.z < 0.03) {
  	  		self.cameraPos.current.z = self.cameraPos.next.z
  	  	}
	  	  self.camera.lookAt(new THREE.Vector3(c.x, 0, c.z))
	      self._render()
	  	  requestAnimationFrame(function(){
	  	  	self._updateCamera()
	  	  })
  	  }
        
  },
  _createJumper: function () {
    var material = new THREE.MeshLambertMaterial({color: 0x232323})
    var geometry = new THREE.CubeGeometry(this.jumperStat.width,this.jumperStat.height,this.jumperStat.deep)
    geometry.translate(0,1,0)
    var mesh = new THREE.Mesh(geometry, material)
    mesh.position.y = 1
    this.scene.add(mesh)
    return mesh
  },
  _createCube: function () {
    var material = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
    var geometry = new THREE.CubeGeometry(this.cubeStat.width,this.cubeStat.height,this.cubeStat.deep)
    var mesh = new THREE.Mesh(geometry, material)
    if( this.cubes.length ) {
    	var random = Math.random()
    	this.cubeStat.nextDir =  random > 0.5 ? 'left' : 'right' 
    	mesh.position.x = this.cubes[this.cubeStat.lastIndex].position.x
    	mesh.position.y = this.cubes[this.cubeStat.lastIndex].position.y
    	mesh.position.z = this.cubes[this.cubeStat.lastIndex].position.z
    	if (this.cubeStat.nextDir === 'left') {
        mesh.position.x = this.cubes[this.cubeStat.lastIndex].position.x-3*Math.random() -6
      } else {
      	mesh.position.z = this.cubes[this.cubeStat.lastIndex].position.z-3*Math.random() -6
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
    var directionalLight = new THREE.DirectionalLight( 0xffffff , 1.1);
    directionalLight.position.set( 300, 1000, 500 );
    directionalLight.target.position.set( 0, 0, 0 );
    directionalLight.castShadow = true;

    var d = 300;
    directionalLight.shadow.camera = new THREE.OrthographicCamera( -d, d, d, -d,  500, 1600 );
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
    this.scene.add(directionalLight)

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