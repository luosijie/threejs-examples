import { createRouter, createWebHashHistory } from 'vue-router'

const modules = import.meta.glob('@/pages/*/index.vue')

const module = (name:String) => {
    return modules[`/src/pages/${name}/index.vue`]
}

console.log(modules)

import Home from '@/pages/home/index.vue'
import Jump from '@/pages/jump/index.vue'
import MiniCity from '@/pages/mini-city/index.vue'
import ChinaMap from '@/pages/china-map/index.vue'
import HouseInDesert from '@/pages/house-in-desert/index.vue'
import CartonRoom from '@/pages/carton-room/index.vue'
import SamplerParticles from '@/pages/sampler-particles/index.vue'

const routes = [
    {
        path: '/',
        component: Home
    },

    {
        path: '/jump',
        component: Jump
    },

    {
        path: '/mini-city',
        component: MiniCity
    },

    {
        path: '/china-map',
        component: ChinaMap
    },

    {
        path: '/house-in-desert',
        component: HouseInDesert
    },
    {
        path: '/carton-room',
        component: CartonRoom
    },

    {
        path: '/sampler-particles',
        component: SamplerParticles
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
