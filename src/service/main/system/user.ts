import hyRequest from '@/service'

// 请求usersList数据的函数
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

// 删除user的函数
export function deleteUserById(userId: number) {
  return hyRequest.delete({
    url: `/users/${userId}`
  })
}

// 新建user的函数
export function newUserData(userInfo: any) {
  return hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 编辑user的函数
export function editUserData(userId: number, userInfo: any) {
  return hyRequest.patch({
    url: `/users/${userId}`,
    data: userInfo
  })
}
