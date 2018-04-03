var container;
var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(),
  INTERSECTED;
var radius = 100,
  theta = 0;
var mall = new THREE.Object3D();
init();
buildLightSystem();
buildAuxSystem();
buildMall();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  var info = document.createElement('div');
  info.style.position = 'absolute';
  info.style.top = '10px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  container.appendChild(info);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(300, 300, 300);
  camera.lookAt(scene.position);
  raycaster = new THREE.Raycaster();
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

// 构建商场建筑
function buildMall() {
  // 获取html中的svg地图路径
  var svgShapes = document.querySelector('#svg_shapes')
  var paths = svgShapes.querySelectorAll('path')
  paths.forEach(elem => {
    var d = elem.getAttribute('d')
    // 使用插件将svg路径转化为THREE.js形状
    var shape = transformSVGPathExposed(d)
    // 将形状挤出
    var svgGeometry = new THREE.ExtrudeGeometry(shape, {
      amount: 25,
      stes: 1,
      bevelEnabled: false
    })
    // 由于平面转3D是竖直方向的, 需要旋转为水平方向
    svgGeometry.rotateX(Math.PI / 2)
    // 获取svg平面图每个模块对应的颜色
    var color = elem.getAttribute('fill')
    var svgMaterial = new THREE.MeshPhongMaterial({ color: color, shininess: 100 })
    var svgMesh = new THREE.Mesh(svgGeometry, svgMaterial)
    mall.add(svgMesh)
    console.log("222", svgMesh);
  })
  mall.translateX(-200)
  mall.translateZ(-200)
  mall.translateY(35)
  scene.add(mall)
}
/**
 * 辅助系统: 网格和坐标
 **/
function buildAuxSystem() {
  var axisHelper = new THREE.AxesHelper(2000)
  scene.add(axisHelper)
  var gridHelper = new THREE.GridHelper(600, 60)
  scene.add(gridHelper)
}
/**
 * 光照系统
 **/
function buildLightSystem() {

  var directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
  directionalLight.position.set(300, 1000, 500);
  directionalLight.target.position.set(0, 0, 0);
  directionalLight.castShadow = true;

  var d = 300;
  directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
  directionalLight.shadow.bias = 0.0001;
  directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight)

  var light = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(light)

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
//
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  // theta += 0.1;
  // camera.position.x = radius * Math.sin(THREE.Math.degToRad(theta));
  // camera.position.y = radius * Math.sin(THREE.Math.degToRad(theta));
  // camera.position.z = radius * Math.cos(THREE.Math.degToRad(theta));
  // camera.lookAt(scene.position);
  // camera.updateMatrixWorld();
  // find intersections
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(mall.children);
  if (intersects.length > 0) {
    if (INTERSECTED != intersects[0].object) {
      if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
      INTERSECTED = intersects[0].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex(0xff0000);
    }
  } else {
    if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
    INTERSECTED = null;
  }
  renderer.render(scene, camera);
}