import { createRouter, createWebHashHistory } from 'vue-router'

const modules = import.meta.glob('@/pages/*/index.vue')

const module = (name:String) => {
    return modules[`/src/pages/${name}/index.vue`]
}

// import Home from '@/pages/home/index.vue'
// import Jump from '@/pages/jump/index.vue'
// import MiniCity from '@/pages/mini-city/index.vue'
// import ChinaMap from '@/pages/china-map/index.vue'

const routes = [
    {
        path: '/',
        component: module('home')
    },

    {
        path: '/jump',
        component: module('jump')
    },

    {
        path: '/mini-city',
        component: module('mini-city')
    },

    {
        path: '/china-map',
        component: module('china-map')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
