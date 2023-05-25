import hyRequest from '@/service'

// role相关的网络请求
export function postRoleListData() {
  return hyRequest.post({
    url: '/role/list'
  })
}
