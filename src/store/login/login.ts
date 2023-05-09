import { defineStore } from 'pinia'
import type { IAccount } from '@/types/index'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: {}
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 账号登录成功后，获取登录用户的简短信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token

      // 将token保存到本地
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
