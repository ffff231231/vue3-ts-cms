<template>
  <div class="main">
    <h2>main: {{ counter }}-{{ doubleCounter }}</h2>
    <button @click="changeCounter">修改counter</button>
  </div>
</template>

<script setup lang="ts">
import useCounterStore from '@/store/counter'
import { storeToRefs } from 'pinia'

const counterStore = useCounterStore()
const { counter, doubleCounter } = storeToRefs(counterStore)
const { changeCounterAction } = counterStore

function changeCounter() {
  changeCounterAction(1000)
}
</script>

<style lang="less" scoped>
.main {
  color: red;
}
</style>
