<template>
  <div class="main">
    <h1>main</h1>
    <button @click="quit">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()

function quit() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
