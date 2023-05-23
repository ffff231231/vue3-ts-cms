<template>
  <div class="user">
    <user-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <user-content ref="userContentRef"></user-content>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import { ref } from 'vue'

// 为了拿到user-content组件，给user-content组件绑定一个ref
const userContentRef = ref<InstanceType<typeof UserContent>>()

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
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
