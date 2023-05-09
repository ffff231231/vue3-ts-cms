import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 用户第一次登录的时候，还没有token，那个时候发送网络请求不会携带token。
      // 当用户第一次登录成功，返回token后，就会将token保存到本地。
      // 后面再发送网络请求的时候，就会携带token了。
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }
  }
})

export default hyRequest
