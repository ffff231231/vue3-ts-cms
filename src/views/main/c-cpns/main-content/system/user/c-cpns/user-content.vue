<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <ul>
        <li v-for="item in usersList" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'

// 发起action,请求userslist的数据
const systemStore = useSystemStore()
const { postUsersListAction } = systemStore
postUsersListAction()

// 获取userslist的数据,进行展示
const { usersList } = storeToRefs(systemStore)
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}
</style>
