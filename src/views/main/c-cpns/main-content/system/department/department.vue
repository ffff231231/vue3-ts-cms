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
    <page-dialog ref="pageDialogRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'
import PageContent from '@/components/page-content/page-content.vue'
import PageDialog from './c-cpns/page-dialog.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import { ref } from 'vue'

// 为了拿到page-content组件，给page-content组件绑定一个ref
const pageContentRef = ref<InstanceType<typeof PageContent>>()

// 为了拿到page-dialog组件，给page-dialog组件绑定一个ref
const pageDialogRef = ref<InstanceType<typeof PageDialog>>()

// 监听page-search组件中的queryClick事件
function handleQueryClick(searchForm: any) {
  pageContentRef.value?.resetCurrentPage()
  pageContentRef.value?.fetchPageListData(searchForm)
}

// 监听page-search组件中的resetClick事件
function handleResetClick() {
  pageContentRef.value?.resetCurrentPage()
  pageContentRef.value?.fetchPageListData()
}

// 监听page-content组件中的newClick事件
function handleNewClick() {
  // 显示dialog对话框
  pageDialogRef.value?.showDialog()
}

// 监听page-content组件中的editClick事件
function handleEditClick(pageInfo: any) {
  // 在dialog对话框中回显page数据
  pageDialogRef.value?.callbackPageInfo(pageInfo)

  // 显示dialog对话框
  pageDialogRef.value?.showDialog(false)
}
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
