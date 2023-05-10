import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
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
      path: '/main',
      component: () => import('../views/main/main.vue'),
      children: [
        {
          path: 'system/user',
          component: () =>
            import('../views/main/c-cpns/main-content/system/user.vue')
        },
        {
          path: 'system/role',
          component: () =>
            import('../views/main/c-cpns/main-content/system/role.vue')
        },
        {
          path: 'system/menu',
          component: () =>
            import('../views/main/c-cpns/main-content/system/menu.vue')
        },
        {
          path: 'system/department',
          component: () =>
            import('../views/main/c-cpns/main-content/system/department.vue')
        },
        {
          path: 'analysis/dashboard',
          component: () =>
            import('../views/main/c-cpns/main-content/analysis/dashboard.vue')
        },
        {
          path: 'analysis/overview',
          component: () =>
            import('../views/main/c-cpns/main-content/analysis/overview.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/not-found.vue')
    }
  ]
})

router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache(LOGIN_TOKEN)
    if (!token) {
      return '/login'
    }
  }
})

export default router
