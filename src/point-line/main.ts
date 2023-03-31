
import Sketch, { Config } from './Sketch'

const canvas = document.querySelector('#canvas')

if (canvas instanceof HTMLCanvasElement) {
    
    const sketch = new Sketch({
        canvas,
        width: window.innerWidth,
        height: window.innerHeight,
        
        range: 8,
        speed: .05,
        maxParticleCount: 1000,
        particleCount: 500
    })

    window.addEventListener('resize', () => {
        sketch.updateSize(window.innerWidth, window.innerHeight)
    })
}
