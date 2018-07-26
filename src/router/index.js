import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: (resolve) => require(['@/pages/index'], resolve)
        },
        {
            path: '/jump',
            name: 'jump',
            component: (resolve) => require(['@/pages/jump'], resolve)
        },
        {
            path: '/mini-city',
            name: 'index',
            component: (resolve) => require(['@/pages/mini-city'], resolve)
        },
        {
            path: '/mall',
            name: 'index',
            component: (resolve) => require(['@/pages/mall'], resolve)
        }
    ]
})
