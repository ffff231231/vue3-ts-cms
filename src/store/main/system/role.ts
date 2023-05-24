import { postRolesListData } from '@/service/main/system/role'
import type { IRoleState } from '@/types/main/system/role'
import { defineStore } from 'pinia'

const useRoleStore = defineStore('role', {
  state: (): IRoleState => ({
    rolesList: [],
    rolesTotalCount: 0
  }),
  actions: {
    async postRolesListAction() {
      const rolesListResult = await postRolesListData()
      const { list, totalCount } = rolesListResult.data
      this.rolesList = list
      this.rolesTotalCount = totalCount
    }
  }
})

export default useRoleStore
