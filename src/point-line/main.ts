
import Sketch, { Config } from './Sketch'

const canvas = document.querySelector('#canvas')

if (canvas instanceof HTMLCanvasElement) {
    
    const sketch = new Sketch({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        
        range: 8,
        speed: .01,
        maxParticleCount: 500,
        particleCount: 100,
        showLines: true,
        connectionsDist: 5,
        connectionsLimit: 3
    })

    window.addEventListener('resize', () => {
        sketch.updateSize(window.innerWidth, window.innerHeight)
    })
}
