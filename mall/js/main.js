var camera, scene, raycaster, renderer;
var mouse = new THREE.Vector2(), // 二维坐标用来转化鼠标参数
    INTERSECTED; // 被选中的物体
var mall = new THREE.Object3D(); // 建一个空对象用来放场景物体

init();
buildLightSystem();
buildAuxSystem();
buildMall();
loop();
addLabel()

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);
  // 初始化相机配置
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.set(300, 300, 300);
  camera.lookAt(scene.position);
  raycaster = new THREE.Raycaster();
  // 初始化
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  window.addEventListener('resize', onWindowResize, false);
}

/**
 * 构建商场建筑
 **/
function buildMall() {
  // 获取html中的svg地图路径
  var svgShapes = document.querySelector('#svg_shapes')
  var paths = svgShapes.querySelectorAll('path')
  for (var i = 0; i < paths.length; i++) {
    var d = paths[i].getAttribute('d')
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
    var color = paths[i].getAttribute('fill')
    var svgMaterial = new THREE.MeshPhongMaterial({ color: color, shininess: 100 })
    var svgMesh = new THREE.Mesh(svgGeometry, svgMaterial)
    svgMesh.name = paths[i].getAttribute('name')
    mall.add(svgMesh)
  }
  // paths.forEach(elem => {
  //   var d = elem.getAttribute('d')
  //   // 使用插件将svg路径转化为THREE.js形状
  //   var shape = transformSVGPathExposed(d)
  //   // 将形状挤出
  //   var svgGeometry = new THREE.ExtrudeGeometry(shape, {
  //     amount: 25,
  //     stes: 1,
  //     bevelEnabled: false
  //   })
  //   // 由于平面转3D是竖直方向的, 需要旋转为水平方向
  //   svgGeometry.rotateX(Math.PI / 2)
  //   // 获取svg平面图每个模块对应的颜色
  //   var color = elem.getAttribute('fill')
  //   var svgMaterial = new THREE.MeshPhongMaterial({ color: color, shininess: 100 })
  //   var svgMesh = new THREE.Mesh(svgGeometry, svgMaterial)
  //   svgMesh.name = elem.getAttribute('name')
  //   mall.add(svgMesh)
  // })
  mall.translateX(-200)
  mall.translateZ(-200)
  mall.translateY(25)
  scene.add(mall)
}
/**
 * 添加每个店面的标签: 暂时用小方块代替
 **/
function addLabel() {
  var material = new THREE.MeshPhongMaterial({ color: 0x000000 })
  // 遍历场景中的元素, 在元素上方添加方块: 未来添加具体标签
  mall.children.forEach(elem => {
    var geometry = new THREE.BoxGeometry(2,20,2)
    var Mesh = new THREE.Mesh(geometry, material);
    Mesh.position.y = 30
    console.log(elem)
    Mesh.position.x = elem.geometry.boundingSphere.center.x - 200
    Mesh.position.z = elem.geometry.boundingSphere.center.z - 200
    scene.add(Mesh)
  })
}
/**
 * 辅助系统: 网格和坐标
 **/
function buildAuxSystem() {
  var axisHelper = new THREE.AxesHelper(2000)
  scene.add(axisHelper)
  var gridHelper = new THREE.GridHelper(600, 60)
  scene.add(gridHelper)
  var controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.rotateSpeed = 0.35
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

function loop() {
  requestAnimationFrame(loop);
  render();
}

function render() {
  // 鼠标位置向摄像机位置发射一条射线
  raycaster.setFromCamera(mouse, camera);
  // 设置射线影响的范围
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