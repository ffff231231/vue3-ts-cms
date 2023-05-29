<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? dialogConfig.header.newTitle : dialogConfig.header.editTitle"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px" size="large">
          <template v-for="item in dialogConfig.formItems" :key="item.label">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value" />
                  </template>
                </el-select>
              </template>
              <template v-else-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
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
import usePageStore from '@/store/main/system/page'
import { reactive, ref } from 'vue'
import type { IDialogConfig } from '@/types'

const pageStore = usePageStore()
const dialogVisible = ref(false)
const isNewRef = ref(true)
let pageId = 0

// 接收属性
interface IProps {
  dialogConfig: IDialogConfig
  selectMenuList?: any
}
const props = defineProps<IProps>()
const initialFormData: any = {}
for (const item of props.dialogConfig.formItems) {
  initialFormData[item.prop] = ''
}
const formData = reactive(initialFormData)

// 显示dialog对话框的函数
function showDialog(isNew: boolean = true) {
  isNewRef.value = isNew

  // 如果是新建page，需要将formData重置为默认值
  if (isNew) {
    for (const key in formData) {
      formData[key] = ''
    }
  }

  // 显示dialog对话框
  dialogVisible.value = true
}

// 在dialog对话框中回显page数据
function callbackPageInfo(pageInfo: any) {
  for (const key in formData) {
    formData[key] = pageInfo[key]
  }

  // 缓存page数据中的id，因为后面发送editPageDataAction网络请求时，需要用到这个id
  pageId = pageInfo.id
}

// 点击确定按钮之后，执行这个函数
function handleConfirmClick() {
  let infoData = formData

  if (props.selectMenuList) {
    Object.assign(infoData, { menuList: props.selectMenuList })
  }

  if (isNewRef.value) {
    // 如果是新建page，需要发送newPageDataAction网络请求
    pageStore.newPageDataAction(props.dialogConfig.pageName, infoData)
  } else {
    // 如果是编辑page，需要发送editPageDataAction网络请求
    pageStore.editPageDataAction(props.dialogConfig.pageName, pageId, infoData)
  }

  // 关闭dialog对话框
  dialogVisible.value = false
}

defineExpose({ showDialog, callbackPageInfo })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px 0 0;
}
</style>
