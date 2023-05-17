import hyRequest from '@/service'

// user相关的网络请求
export function postUsersListData() {
  return hyRequest.post({
    url: '/users/list',
    data: {
      offset: 0,
      size: 10
    }
  })
}
