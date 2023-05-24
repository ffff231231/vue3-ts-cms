<template>
  <div class="page">
    <page-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <page-content
      ref="pageContentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></page-content>
    <page-dialog ref="pageDialogRef" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import PageDialog from './c-cpns/page-dialog.vue'
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
</style>
