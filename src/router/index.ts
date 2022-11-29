import { createRouter, createWebHashHistory } from 'vue-router'

const modules = import.meta.glob('@/pages/*/index.vue')

const module = (name:String) => {
    return modules[`/src/pages/${name}/index.vue`]
}

console.log(modules)

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
    },

    {
        path: '/house-in-desert',
        component: module('house-in-desert')
    },

    {
        path: '/carton-room',
        component: module('carton-room')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
