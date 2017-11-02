var textures = {
  window: function () {
    var canvas = document.createElement( 'canvas' );
    var ctx = canvas.getContext( '2d' );

    canvas.width = 30
    canvas.height = 30

    var colors = {
      border: '#3c3443',
      top: '#9d94a7',
      bottom: '#796e8c'
    }

    ctx.fillStyle = colors.border
    ctx.fillRect(0, 0, 30, 30)
    ctx.fillStyle = colors.top
    ctx.fillRect(2, 2, 12, 12)
    ctx.fillStyle = colors.top
    ctx.fillRect(16, 2, 12, 12)
    ctx.fillStyle = colors.bottom
    ctx.fillRect(2, 16, 12, 12)
    ctx.fillStyle = colors.bottom
    ctx.fillRect(16, 16, 12, 12)

    var canvasTexture = new THREE.Texture(canvas);
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.RepeatWrapping;
    canvasTexture.needsUpdate = true;
    
    return canvasTexture;
  }
}