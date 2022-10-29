import { useStore } from '@/stores'
import Cookies from 'js-cookie'
import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const store = useStore()
    if (to.path == '/login') {
        if (store.login) {
            return '/home'
        }
    }
    if (to.path != '/login' && to.path != '/404' ) {
        if (!store.login) {
            if (Cookies.get('login') == '1') {
                store.login = true
                store.userId = Cookies.get('userid') || '获取昵称失败'
                store.userName = Cookies.get('username') || '获取昵称失败'
                return to
            } else {
                return '/login'
            }
        }
    }
})

export default router