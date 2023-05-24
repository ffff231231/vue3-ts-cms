import { deleteUserById, newUserData, postUsersListData } from '@/service/main/system/user'
import type { IUserState } from '@/types'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    usersList: [],
    usersTotalCount: 0,
    cacheQueryInfo: {}
  }),
  actions: {
    // 请求usersList数据的函数
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListResult.data
      this.cacheQueryInfo = queryInfo
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    // 删除用户的函数
    async deleteUserAction(userId: number) {
      // 删除用户
      const deleteResult = await deleteUserById(userId)
      console.log(deleteResult)

      // 重新请求usersList数据
      this.postUsersListAction(this.cacheQueryInfo)
    },
    // 新建用户的函数
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      // 重新请求usersList数据
      this.postUsersListAction(this.cacheQueryInfo)
    }
  }
})

export default useUserStore
