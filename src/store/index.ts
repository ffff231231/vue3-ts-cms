import { createPinia } from 'pinia'
import type { App } from 'vue'
import useLoginStore from './login/login'

const pinia = createPinia()
function registerPinia(app: App<Element>) {
  // app使用use方法注册pinia
  app.use(pinia)

  // 根据登录用户的菜单树信息，动态注册路由
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAction()
}

export default registerPinia
