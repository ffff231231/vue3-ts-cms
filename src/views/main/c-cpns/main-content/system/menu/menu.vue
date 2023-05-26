<template>
  <div class="page">
    <page-content
      :content-config="contentConfig"
      ref="pageContentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
    </page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
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
