<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="240px">
        <main-aside />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainAside from './c-cpns/main-aside.vue'
import MainHeader from './c-cpns/main-header.vue'
</script>

<style lang="less" scoped>
.main {
  color: red;
}
.main-content {
  height: 100vh;

  .el-aside {
    background-color: #1097e091;
  }

  .el-header {
    background-color: #6ae3af;
  }

  .el-main {
    background-color: #c1ea6f;
  }
}
</style>
