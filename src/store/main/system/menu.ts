import { postMenuListData } from '@/service/main/system/menu'
import type { IMenuState } from '@/types'
import { defineStore } from 'pinia'

const useMenuStore = defineStore('menu', {
  state: (): IMenuState => ({
    menuList: [],
    menuTotalCount: 0
  }),
  actions: {
    async postMenuListAction() {
      const menuListResult = await postMenuListData()
      const { list, totalCount } = menuListResult.data
      this.menuList = list
      this.menuTotalCount = totalCount
    }
  }
})

export default useMenuStore
