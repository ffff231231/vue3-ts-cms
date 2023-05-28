import {
  deletePageById,
  editPageData,
  newPageData,
  postPageListData
} from '@/service/main/system/page'
import type { IPageState } from '@/types'
import { defineStore } from 'pinia'
import useRoleStore from './role'
import useDepartmentStore from './department'
import useMenuStore from './menu'

const usePageStore = defineStore('page', {
  state: (): IPageState => ({
    pageList: [],
    pageTotalCount: 0,
    cacheQueryInfo: {}
  }),
  actions: {
    // 请求pageList数据的action函数
    async postPageListAction(pageName: string, queryInfo: any) {
      const pagesListResult = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = pagesListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
      this.cacheQueryInfo = queryInfo
    },

    // 删除page的action函数
    async deletePageAction(pageName: string, pageId: number) {
      // 删除page
      const deleteResult = await deletePageById(pageName, pageId)
      console.log(deleteResult)

      // 重新请求pageList数据
      this.postPageListAction(pageName, this.cacheQueryInfo)

      // 重新请求roleList数据
      const roleStore = useRoleStore()
      roleStore.postRoleListAction()

      // 重新请求departmentList数据
      const departmentStore = useDepartmentStore()
      departmentStore.postDepartmentListAction()

      // 重新请求menuList数据
      const menuStore = useMenuStore()
      menuStore.postMenuListAction()
    },

    // 新建page的action函数
    async newPageDataAction(pageName: string, pageInfo: any) {
      // 新建page
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)

      // 重新请求pageList数据
      this.postPageListAction(pageName, this.cacheQueryInfo)

      // 重新请求roleList数据
      const roleStore = useRoleStore()
      roleStore.postRoleListAction()

      // 重新请求departmentList数据
      const departmentStore = useDepartmentStore()
      departmentStore.postDepartmentListAction()

      // 重新请求menuList数据
      const menuStore = useMenuStore()
      menuStore.postMenuListAction()
    },

    // 编辑page的action函数
    async editPageDataAction(pageName: string, pageId: number, pageInfo: any) {
      // 编辑page
      const editResult = await editPageData(pageName, pageId, pageInfo)
      console.log(editResult)

      // 重新请求pageList数据
      this.postPageListAction(pageName, this.cacheQueryInfo)

      // 重新请求roleList数据
      const roleStore = useRoleStore()
      roleStore.postRoleListAction()

      // 重新请求departmentList数据
      const departmentStore = useDepartmentStore()
      departmentStore.postDepartmentListAction()

      // 重新请求menuList数据
      const menuStore = useMenuStore()
      menuStore.postMenuListAction()
    }
  }
})

export default usePageStore
