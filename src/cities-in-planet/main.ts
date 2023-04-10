
import Loader, { LoaderType } from '@/utils/Loader'
import Sketch from './Sketch'

const loader = new Loader()
loader.load([
    { name: 'globe', type: LoaderType.Texture, path: './assets/globe.jpg' }
])

const canvas = document.querySelector('#canvas')

if (canvas instanceof HTMLCanvasElement) {
    loader.onLoadEnd(() => {
        const config = {
            canvas,
            resources: loader.resources
        }
        new Sketch(config)
    })

}
