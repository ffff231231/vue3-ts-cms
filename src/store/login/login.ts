import { defineStore } from 'pinia'
import type { IAccount, ILoginState } from '@/types/index'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 账号登录成功后，获取登录用户的简短信息，并将简短信息中的token保存到pinia
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 将token保存到本地
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 根据用户id，获取登录用户的详细信息，并将详细信息保存到pinia
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 根据角色id，获取登录用户的菜单树信息，并将菜单树信息保存到pinia
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      this.userMenus = userMenusResult.data

      // 跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
