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
    <page-dialog :dialog-config="dialogConfig" ref="pageDialogRef" />
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

// 逻辑关系
const { pageContentRef, handleQueryClick, handleResetClick } = usePageContent()
const { pageDialogRef, handleNewClick, handleEditClick } = usePageDialog()
</script>

<style lang="less" scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
