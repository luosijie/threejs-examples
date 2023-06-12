
import Sketch, { Config } from './Sketch'

const canvas = document.querySelector('#canvas')

if (canvas instanceof HTMLCanvasElement) {
    
    const sketch = new Sketch({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        
        range: 800,
        speed: 1,
        maxParticleCount: 1000,
        particleCount: 500,
        showLines: true,
        connectionsDist: 150,
        connectionsLimit: 10
    })

    window.addEventListener('resize', () => {
        sketch.updateSize(window.innerWidth, window.innerHeight)
    })
}
