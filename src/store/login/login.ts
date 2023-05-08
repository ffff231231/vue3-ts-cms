import { defineStore } from 'pinia'
import type { IAccount } from '@/types/index'
import { accountLoginRequest } from '@/service/login/login'
import { localCache } from '@/utils/cache'

const LOGIN_TOKEN = 'login/token'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: localCache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async accountLoginAction(account: IAccount) {
      const result = await accountLoginRequest(account)
      this.id = result.data.id
      this.name = result.data.name
      this.token = result.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
    }
  }
})

export default useLoginStore
