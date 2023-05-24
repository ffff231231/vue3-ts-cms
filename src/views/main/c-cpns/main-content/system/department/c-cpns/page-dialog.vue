<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px" size="large">
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称"></el-input>
          </el-form-item>
          <el-form-item label="部门领导" prop="leader">
            <el-input v-model="formData.leader" placeholder="请输入部门领导"></el-input>
          </el-form-item>
          <el-form-item label="选择上级部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择上级部门" style="width: 100%">
              <template v-for="item in departmentsList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useDepartmentStore from '@/store/main/system/department'
import usePageStore from '@/store/main/system/page'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const departmentStore = useDepartmentStore()
const pageStore = usePageStore()
const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
let pageId = 0

// 在dialog对话框中回显page数据
function callbackPageInfo(pageInfo: any) {
  for (const key in formData) {
    formData[key] = pageInfo[key]
  }

  // 缓存page数据中的id，因为后面发送editPageDataAction网络请求时，需要用到这个id
  pageId = pageInfo.id
}

// 显示dialog对话框的函数
function showDialog(isNew: boolean = true) {
  isNewRef.value = isNew

  // 如果是新建用户，需要将formData重置为默认值
  if (isNew) {
    for (const key in formData) {
      formData[key] = ''
    }
  }

  // 显示dialog对话框
  dialogVisible.value = true
}

// 点击确定按钮之后，执行这个函数
function handleConfirmClick() {
  if (isNewRef.value) {
    // 如果是新建page，需要发送newPageDataAction网络请求
    pageStore.newPageDataAction('department', formData)
  } else {
    // 如果是编辑page，需要发送editPageDataAction网络请求
    pageStore.editPageDataAction('department', pageId, formData)
  }

  // 关闭dialog对话框
  dialogVisible.value = false
}

// 获取departmentsList数据
const { departmentsList } = storeToRefs(departmentStore)

defineExpose({ showDialog, callbackPageInfo })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px 0 0;
}
</style>
