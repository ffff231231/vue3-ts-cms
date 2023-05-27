<template>
  <div class="page">
    <page-search
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      :content-config="contentConfig"
      ref="pageContentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
    </page-content>
    <page-dialog
      :dialog-config="dialogConfig"
      ref="pageDialogRef"
      :select-menu-list="selectMenuList"
    >
      <template #menuList>
        <el-tree
          ref="treeRef"
          :data="menuList"
          node-key="id"
          :props="{
            children: 'children',
            label: 'name'
          }"
          show-checkbox
          @check="handleElTreeCheck"
        />
      </template>
    </page-dialog>
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogConfig from './config/dialog.config'
import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'
import useMenuStore from '@/store/main/system/menu'
import { mapSelectMenuListToIds } from '@/utils/map-menus'
import { storeToRefs } from 'pinia'
import { nextTick, ref } from 'vue'
import type { ElTree } from 'element-plus'

// 为了拿到el-tree组件，给el-tree组件绑定一个ref
const treeRef = ref<InstanceType<typeof ElTree>>()

// 为了让role组件中的dialog组件可以回显之前选择的菜单树，需要用到这个回调函数
function callbackSelectMenuList(pageInfo: any) {
  nextTick(() => {
    const menuIds = mapSelectMenuListToIds(pageInfo.menuList)
    treeRef.value?.setCheckedKeys(menuIds)
  })
}

// 获取menuList
const menuStore = useMenuStore()
const { menuList } = storeToRefs(menuStore)

// 点击菜单树中的复选框时，会执行这个函数
const selectMenuList = ref<any>([])
function handleElTreeCheck(data1: any, data2: any) {
  selectMenuList.value = [...data2.checkedKeys, ...data2.halfCheckedKeys]
}

// 逻辑关系
const { pageContentRef, handleQueryClick, handleResetClick } = usePageContent()
const { pageDialogRef, handleNewClick, handleEditClick } = usePageDialog(callbackSelectMenuList)
</script>

<style lang="less" scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
