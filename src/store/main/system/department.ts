import { postDepartmentsListData } from '@/service/main/system/department'
import type { IDepartmentState } from '@/types'
import { defineStore } from 'pinia'

const useDepartmentStore = defineStore('department', {
  state: (): IDepartmentState => ({
    departmentsList: [],
    departmentsTotalCount: 0
  }),
  actions: {
    async postDepartmentsListAction() {
      const departmentsListResult = await postDepartmentsListData()
      const { list, totalCount } = departmentsListResult.data
      this.departmentsList = list
      this.departmentsTotalCount = totalCount
    }
  }
})

export default useDepartmentStore
