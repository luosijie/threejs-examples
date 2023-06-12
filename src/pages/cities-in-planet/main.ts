
import Loader, { LoaderType } from '@/utils/Loader'
import Sketch from './Sketch'

const loader = new Loader()
loader.load([
    { name: 'globe', type: LoaderType.Texture, path: './assets/globe.jpg' }
])

let sketch: Sketch

const canvas = document.querySelector('#canvas')
if (canvas instanceof HTMLCanvasElement) {
    loader.onLoadEnd(() => {
        const config = {
            canvas,
            resources: loader.resources,
            radius: 5
        }
        sketch = new Sketch(config)
    })

}

window.addEventListener('resize', () => {
    sketch &&  sketch.updateSize()
})

window.addEventListener('mousemove', evt => {
    sketch && sketch.updateMouse(evt.clientX, evt.clientY)
})
