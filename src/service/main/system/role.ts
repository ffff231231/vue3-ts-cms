import hyRequest from '@/service'

// role相关的网络请求
export function postRolesListData() {
  return hyRequest.post({
    url: '/role/list'
  })
}
