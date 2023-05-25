<template>
  <div class="page-search">
    <!-- 输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>

    <!-- 重置按钮和搜索按钮 -->
    <div class="btns">
      <el-button size="large" icon="Search" @click="handleResetClick">重置</el-button>
      <el-button size="large" icon="Refresh" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// 接收属性
interface IProps {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const initialSearchForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialSearchForm[item.prop] = item.initialValue ?? ''
}
const searchForm = reactive(initialSearchForm)

// 自定义事件
const emit = defineEmits(['resetClick', 'queryClick'])

// 重置表单的内容
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  emit('resetClick')
  formRef.value?.resetFields()
}
// 根据表单的内容，查询相应的数据
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.page-search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
