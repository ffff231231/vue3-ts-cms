import hyRequest from '@/service'

// user相关的网络请求
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}
export function deleteUserById(userId: number) {
  return hyRequest.delete({
    url: `/users/${userId}`
  })
}
