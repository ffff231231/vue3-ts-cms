import { deleteUserById, postUsersListData } from '@/service/main/system/system'
import type { ISystemState } from '@/types'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
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

export default useSystemStore
