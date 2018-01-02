var game = new Game()
game.init()

// var scene, camera
// var renderer
// var width, height

// var config = {
// 	isMobile: false,
// 	background: 0x282828
// }

// width = window.innerWidth
// height = window.innerHeight

// scene = new THREE.Scene()
// camera = new THREE.OrthographicCamera(width / -16, width / 16, height / 16, height / -16, 0, 5000)
// camera.position.set(100, 100, 100)
// camera.lookAt(new THREE.Vector3(0, 0, 0))
// console.log(scene.position)
// scene.add(camera)

// renderer = new THREE.WebGLRenderer({antialias: true})
// renderer.setSize(width, height)
// renderer.setClearColor(config.background)
// renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
// document.body.appendChild(renderer.domElement)

// addCube()
// addRole()
// addLight()
// render()

// function addLight () {
// 	var directionalLight = new THREE.DirectionalLight( 0xffffff , 1.1);
//   directionalLight.position.set( 300, 1000, 500 );
//   directionalLight.target.position.set( 0, 0, 0 );
//   directionalLight.castShadow = true;

//   var d = 300;
//   directionalLight.shadow.camera = new THREE.OrthographicCamera( -d, d, d, -d,  500, 1600 );
//   directionalLight.shadow.bias = 0.0001;
//   directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
//   scene.add(directionalLight)

//   var light = new THREE.AmbientLight( 0xffffff, 0.3 )
//   scene.add( light )
// }
// function Jumper () {

// }
// function addRole () {
// 	var cubeMaterial = new THREE.MeshLambertMaterial({color: 0x858585})
// 	var cubeGeometry = new THREE.CubeGeometry(2,5,2)
// 	var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// 	cube.position.set(0,5, 0)
// 	scene.add(cube)
// }
// function addCube () {
//  var cubeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
//  var cubeGeometry = new THREE.CubeGeometry(10,5,10)
//  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
//  scene.add(cube) 
// }
// function render () {
// 	renderer.render(scene, camera)
// }
