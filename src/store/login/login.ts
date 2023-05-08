import { defineStore } from 'pinia'
import type { IAccount } from '@/types/index'
import { accountLoginRequest } from '@/service/login/login'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      // 账号登录成功后，获取token等信息
      const result = await accountLoginRequest(account)
      this.id = result.data.id
      this.name = result.data.name
      this.token = result.data.token

      // 将token保存到本地
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 跳转到main页面
      router.push('/main')
    }
  }
})

export default useLoginStore
