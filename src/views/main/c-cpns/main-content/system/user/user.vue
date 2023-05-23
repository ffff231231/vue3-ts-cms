<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content
      ref="userContentRef"
      @new-click="handleNewClick"
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
function handleQueryClick(formData: any) {
  userContentRef.value?.resetCurrentPage()
  userContentRef.value?.fetchUserListData(formData)
}

// 监听user-search组件中的resetClick事件
function handleResetClick() {
  userContentRef.value?.resetCurrentPage()
  userContentRef.value?.fetchUserListData()
}

// 监听user-content组件中的newClick事件
function handleNewClick() {
  userDialogRef.value?.changeDialogVisible()
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
