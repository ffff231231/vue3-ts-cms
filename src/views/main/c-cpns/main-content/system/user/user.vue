<template>
  <div class="user">
    <user-search @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <user-content
      ref="userContentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></user-content>
    <user-dialog ref="userDialogRef" />
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserDialog from './c-cpns/user-dialog.vue'
import { ref } from 'vue'

// 为了拿到user-content组件，给user-content组件绑定一个ref
const userContentRef = ref<InstanceType<typeof UserContent>>()

// 为了拿到user-dialog组件，给user-dialog组件绑定一个ref
const userDialogRef = ref<InstanceType<typeof UserDialog>>()

// 监听user-search组件中的queryClick事件
function handleQueryClick(searchForm: any) {
  userContentRef.value?.resetCurrentPage()
  userContentRef.value?.fetchUsersListData(searchForm)
}

// 监听user-search组件中的resetClick事件
function handleResetClick() {
  userContentRef.value?.resetCurrentPage()
  userContentRef.value?.fetchUsersListData()
}

// 监听user-content组件中的newClick事件
function handleNewClick() {
  // 显示dialog对话框
  userDialogRef.value?.showDialog()
}

// 监听user-content组件中的editClick事件
function handleEditClick(userInfo: any) {
  // 在dialog对话框中回显user数据
  userDialogRef.value?.callbackUserInfo(userInfo)

  // 显示dialog对话框
  userDialogRef.value?.showDialog(false)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
