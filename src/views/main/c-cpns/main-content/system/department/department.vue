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
      <template #leader="scope">
        <span class="leader">{{ scope.row.leader }}</span>
      </template>
    </page-content>
    <page-dialog :dialog-config="dialogConfigRef" ref="pageDialogRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from '@/components/page-dialog/page-dialog.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import dialogConfig from './config/dialog.config'
import { computed } from 'vue'
import useDepartmentStore from '@/store/main/system/department'
import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'

// 根据从服务器拿到的departmentList数据，填充dialogConfig里面上级部门的options
const dialogConfigRef = computed(() => {
  const departmentStore = useDepartmentStore()
  const parentIdOptions = departmentStore.departmentList.map((item) => {
    return { label: item.name, value: item.id }
  })
  dialogConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options?.push(...parentIdOptions)
    }
  })
  return dialogConfig
})

// 逻辑关系
const { pageContentRef, handleQueryClick, handleResetClick } = usePageContent()
const { pageDialogRef, handleNewClick, handleEditClick } = usePageDialog()
</script>

<style lang="less" scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}

.leader {
  color: rgb(35, 135, 236);
}
</style>
