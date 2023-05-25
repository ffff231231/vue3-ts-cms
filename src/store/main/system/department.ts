import { postDepartmentListData } from '@/service/main/system/department'
import type { IDepartmentState } from '@/types'
import { defineStore } from 'pinia'

const useDepartmentStore = defineStore('department', {
  state: (): IDepartmentState => ({
    departmentList: [],
    departmentTotalCount: 0
  }),
  actions: {
    async postDepartmentListAction() {
      const departmentListResult = await postDepartmentListData()
      const { list, totalCount } = departmentListResult.data
      this.departmentList = list
      this.departmentTotalCount = totalCount
    }
  }
})

export default useDepartmentStore
