import hyRequest from '@/service'

// user相关的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
