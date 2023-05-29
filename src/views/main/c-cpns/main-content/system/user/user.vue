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
      <template #enable="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" size="small" plain>
          {{ scope.row.enable ? '启用' : '禁用' }}
        </el-button>
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
import usePageContent from '@/hooks/usePageContent'
import usePageDialog from '@/hooks/usePageDialog'
import useDepartmentStore from '@/store/main/system/department'
import useRoleStore from '@/store/main/system/role'
import { computed } from 'vue'

// 根据从服务器拿到的roleList数据，填充dialogConfig里面roleId中的options
// 根据从服务器拿到的departmentList数据，填充dialogConfig里面departmentId中的options
const dialogConfigRef = computed(() => {
  const roleStore = useRoleStore()
  const departmentStore = useDepartmentStore()

  const roleIdOptions = roleStore.roleList.map((item) => {
    return { label: item.name, value: item.id }
  })
  const departmentIdOptions = departmentStore.departmentList.map((item) => {
    return { label: item.name, value: item.id }
  })

  dialogConfig.formItems.forEach((item) => {
    if (item.prop === 'roleId') {
      item.options?.push(...roleIdOptions)
    } else if (item.prop === 'departmentId') {
      item.options?.push(...departmentIdOptions)
    }
  })
  return dialogConfig
})

// 逻辑关系
const { pageContentRef, handleQueryClick, handleResetClick } = usePageContent()
const { pageDialogRef, handleNewClick, handleEditClick } = usePageDialog()
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
