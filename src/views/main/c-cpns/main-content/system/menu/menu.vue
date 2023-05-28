<template>
  <div class="page">
    <page-content :content-config="contentConfig"> </page-content>
  </div>
</template>

<script setup lang="ts">
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style lang="less" scoped>
.page {
  border-radius: 8px;
  overflow: hidden;
}
</style>
