import hyRequest from '@/service'

// role相关的网络请求
export function postRoleListData() {
  return hyRequest.post({
    url: '/role/list',
    data: {
      offset: 0,
      size: 100
    }
  })
}
