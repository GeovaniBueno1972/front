import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import Auth from '@/components/auth/Auth'


Vue.use(VueRouter)

const routes = [{
    name: 'auth',
    path: '/',
    component: Auth
}, {
    name: 'home',
    path: '/home',
    component: Home
}, {
    name: 'adminPages',
    path: '/admin',
    component: AdminPages
}
]

export default new VueRouter({
    mode: 'history',
    routes
})