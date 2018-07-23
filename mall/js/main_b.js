var scene, camera
var renderer
var width, width
var canvas

var cars = []
// var stats

var config = {
  isMobile: false,
  background: 0xffffff
}
width = window.innerWidth
height = window.innerHeight
canvas = document.querySelector('#canvas')

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)
camera.position.set(330, 330, 330)
camera.lookAt(new THREE.Vector3(1000, 0, 100))
console.log("-----", scene.position)
renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

renderer.setSize(width, height)
renderer.setClearColor(config.background)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// 用于选取元素的参数
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(), INTERSECTED;

var mall = new THREE.Object3D()
var svgShapes = document.querySelector('#svg_shapes')

var paths = svgShapes.querySelectorAll('path')
paths.forEach(elem => {
  var d = elem.getAttribute('d')
  var shape = transformSVGPathExposed(d)
  var svgGeometry = new THREE.ExtrudeGeometry(shape, {
    amount: 25,
    stes: 1,
    bevelEnabled: false
  })
  var transform = elem.getAttribute('transform')
  var angle = 0
  if (transform) {
    if (/rotate/.test(transform)) {
      angle = transform.match(/rotate\((\S+)/)[1]
      angle = parseInt(angle) / 180
    }

  }
  svgGeometry.rotateX(Math.PI / 2)
  var color = elem.getAttribute('fill')
  var svgMaterial = new THREE.MeshPhongMaterial({ color: color, shininess: 100 })
  var svgMesh = new THREE.Mesh(svgGeometry, svgMaterial)
  svgMesh.rotation.y = Math.PI * angle
  scene.add(svgMesh)
})

document.addEventListener('click', elementClick, false)

checkUserAgent()

buildAuxSystem()
buildLightSystem()

loop()
onWindowResize()

function elementClick(e) {
  e.preventDefault()
  mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1
  mouse.y = (e.clientY / renderer.domElement.clientWidth) * 2 - 1
  console.log(mouse)
}

function checkUserAgent() {
  var n = navigator.userAgent;
  if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
    config.isMobile = true
    camera.position.set(420, 420, 420)
    renderer.shadowMap.enabled = false
  }
}

function buildLightSystem() {

  if (!config.isMobile) {
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionalLight.position.set(300, 1000, 500);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;

    var d = 300;
    directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight)

    var light = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(light)
  } else {
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 1)
    scene.add(hemisphereLight)

    var light = new THREE.AmbientLight(0xffffff, 0.15)
    scene.add(light)
  }

}

function buildAuxSystem() {
  // stats = new Stats()
  // stats.setMode(0)
  // stats.domElement.style.position = 'absolute'
  // stats.domElement.style.left = '5px'
  // stats.domElement.style.top = '5px'
  // document.body.appendChild(stats.domElement)

  // var axisHelper = new THREE.AxesHelper(200)
  // scene.add(axisHelper)

  var gridHelper = new THREE.GridHelper(320, 32)
  scene.add(gridHelper)

  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.rotateSpeed = 0.35
}
console.log('---------------', scene.children)
function loop() {
  // stats.update()
  cars.forEach(function(car) {
    carMoving(car)
  })
  raycaster.setFromCamera(mouse, camera)
  var intersects = raycaster.intersectObjects(mall.children)
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) 
        INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      console.log('==================', INTERSECTED)
      INTERSECTED.material.color.setHex(0xff0000);
      INTERSECTED.material.emissive.setHex(0xff0000);
    }
  } else {
    if (INTERSECTED) {
       INTERSECTED.material.color.setHex(0x00ff00);
    }
    INTERSECTED = null;
  }
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

function onWindowResize() {
  window.addEventListener('resize', function() {
    width = window.innerWidth
    height = window.innerHeight

    camera.aspect = width / height;
    camera.updateProjectionMatrix()

    renderer.setSize(width, height)
  })
}