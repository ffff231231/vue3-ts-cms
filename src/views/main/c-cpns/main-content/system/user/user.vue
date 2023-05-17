<template>
  <div class="user">
    <user-search></user-search>
    <div class="header">头部</div>
    <div class="form">表格</div>
    <div class="pages">分页</div>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
