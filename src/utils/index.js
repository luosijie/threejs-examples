/**
 * 构建通用光照系统
 **/
export function buildLightSystem(scene) {
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
    directionalLight.position.set(300, 1000, 500);
    directionalLight.target.position.set(0, 0, 0);
    directionalLight.castShadow = true;

    let d = 300;
    directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
    directionalLight.shadow.bias = 0.0001;
    directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight)

    let light = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(light)

};

/**
 * 构建通用辅助系统: 网格和坐标
 **/
export function buildAuxSystem(scene) {
    // 坐标系统
    let axisHelper = new THREE.AxesHelper(2000)
    scene.add(axisHelper)
    
    // 网格辅助
    let gridHelper = new THREE.GridHelper(60, 60)
    scene.add(gridHelper)
};
