import { postRoleListData } from '@/service/main/system/role'
import type { IRoleState } from '@/types'
import { defineStore } from 'pinia'

const useRoleStore = defineStore('role', {
  state: (): IRoleState => ({
    roleList: [],
    roleTotalCount: 0
  }),
  actions: {
    async postRoleListAction() {
      const roleListResult = await postRoleListData()
      const { list, totalCount } = roleListResult.data
      this.roleList = list
      this.roleTotalCount = totalCount
    }
  }
})

export default useRoleStore
