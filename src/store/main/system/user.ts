import { deleteUserById, postUsersListData } from '@/service/main/system/user'
import type { IUserState } from '@/types'
import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { list, totalCount } = usersListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserAction(userId: number) {
      const deleteResult = await deleteUserById(userId)
      console.log(deleteResult)
    }
  }
})

export default useUserStore
