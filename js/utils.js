var utils = {
  makeShape: function (arry) {
    if (window.THREE && arry.length) {
      var shape = new THREE.Shape()
      shape.moveTo(arry[0][0], arry[0][1])
      
      for (var i=1; i<arry.length; i++) {
        shape.lineTo(arry[i][0], arry[i][1])
      }

      return shape
    }else {
      console.error('Need Three.js!')
    }
  },
  makeExtrudeGeometry: function (arry, amount) {
    var shape = this.makeShape(arry)
    var extrudeSetting = {
      steps: 1,
      amount: amount,
      bevelEnabled: true,
      bevelThickness: 0.5,
      bevelSize: 1,
      bevelSegments: 1
    }
    var geometry = new THREE.ExtrudeGeometry(shape, extrudeSetting)
    geometry.rotateX( -0.5 * Math.PI)
    return geometry
  }
}