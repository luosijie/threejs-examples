import * as THREE from 'three'
let utils = {
    makeShape: function () {
        let shape
        if (arguments.length) {
            let arry = arguments[0]
            shape = new THREE.Shape()
            shape.moveTo(arry[0][0], arry[0][1])
            for (let i = 1; i < arry.length; i++) {
                shape.lineTo(arry[i][0], arry[i][1])
            }
            if (arguments.length > 1) {
                for (let i = 1; i < arguments.length; i++) {
                    let pathCoords = arguments[i]
                    let path = new THREE.Path()
                    path.moveTo(pathCoords[0][0], pathCoords[0][1])
                    for (let i = 1; i < pathCoords.length; i++) {
                        path.lineTo(pathCoords[i][0], pathCoords[i][1])
                    }
                    shape.holes.push(path)
                }
            }
            return shape
        } else {
            console.error('Something wrong!')
        }
    },
    makeExtrudeGeometry: function (shape, depth) {
        let extrudeSetting = {
            steps: 1,
            depth,
            bevelEnabled: false
        }
        let geometry = new THREE.ExtrudeGeometry(shape, extrudeSetting)
        geometry.rotateX(-0.5 * Math.PI)
        return geometry
    },
    makeShapeGeometry: function (shapeCoords) {
        let shape = this.makeShape(shapeCoords)
        let geometry = new THREE.ShapeGeometry(shape)
        return geometry
    },
    makeMesh: function (type, geometry, color) {
        let material
        let mesh
        if (type === 'lambert') {
            material = new THREE.MeshLambertMaterial({ color: color })
        } else if (type === 'phong') {
            material = new THREE.MeshPhongMaterial({ color: color })
        } else {
            console.error('unrecognized type!')
        }

        mesh = new THREE.Mesh(geometry, material)

        mesh.castShadow = true
        mesh.receiveShadow = true

        return mesh

    }
}

export default utils
