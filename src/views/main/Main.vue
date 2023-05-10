<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-aside :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header @fold-chanfe="handFoldChange" />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainAside from './c-cpns/main-aside/main-aside.vue'
import MainHeader from './c-cpns/main-header/main-header.vue'

const mainAside = ref<InstanceType<typeof MainAside>>()

// 处理 main-header 中折叠的变化
const isFold = ref(false)
function handFoldChange(value: boolean) {
  isFold.value = value
}
</script>

<style lang="less" scoped>
.main-content {
  height: 100vh;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
