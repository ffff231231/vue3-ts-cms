import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstSubMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

// 全局前置守卫
router.beforeEach((to) => {
  // 只有登录成功(拿到了token),才能真正进入到main页面,否则只能去login页面
  if (to.path !== '/login') {
    const token = localCache.getCache(LOGIN_TOKEN)
    if (!token) {
      return '/login'
    }
  }

  // 如果是进入到main页面
  if (to.path === '/main') {
    return firstSubMenu.url
  }
})

export default router
