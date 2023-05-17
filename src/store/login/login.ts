import { defineStore } from 'pinia'
import type { IAccount, ILoginState } from '@/types/index'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN, USER_INFO, USER_MENUS } from '@/global/constants'
import { firstSubMenu, mapMenusToRoutes } from '@/utils/map-menus'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USER_INFO) ?? {},
    userMenus: localCache.getCache(USER_MENUS) ?? []
  }),
  actions: {
    // 用户输入账号和密码，点击登录按钮后，会执行这个函数
    async accountLoginAction(account: IAccount) {
      // 账号登录成功后，获取登录用户的简短信息，并将简短信息中的token保存到pinia和本地
      const loginResult = await accountLoginRequest(account)
      const userId = loginResult.data.id
      const token = loginResult.data.token
      this.token = token
      localCache.setCache(LOGIN_TOKEN, token)

      // 根据用户id，获取登录用户的详细信息，并将详细信息保存到pinia和本地
      const userInfoResult = await getUserInfoById(userId)
      const roleId = userInfoResult.data.role.id
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      localCache.setCache(USER_INFO, userInfo)

      // 根据角色id，获取登录用户的菜单树信息，并将菜单树信息保存到pinia和本地
      const userMenusResult = await getUserMenusByRoleId(roleId)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      localCache.setCache(USER_MENUS, userMenus)

      // 根据登录用户的菜单树信息，动态注册路由
      const matchRoutes = mapMenusToRoutes(userMenus)
      matchRoutes.forEach((route) => router.addRoute('main', route))

      // 跳转到第一个匹配到本地路由对象的二级菜单所对应的页面。
      router.push(firstSubMenu.url)
    },
    // 用户刷新浏览器后，会执行这个函数，重新注册路由
    loadLocalCacheAction() {
      if (this.token && this.userInfo && this.userMenus) {
        // 根据登录用户的菜单树信息，动态注册路由
        const matchRoutes = mapMenusToRoutes(this.userMenus)
        matchRoutes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
