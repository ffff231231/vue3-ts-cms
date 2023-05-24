<template>
  <div class="user-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      center
    >
      <div class="form">
        <el-form :model="formData" label-width="100px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="isNewRef" label="密码" prop="realname">
            <el-input v-model="formData.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="formData.cellphone" placeholder="请输电话号码"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="enable">
            <el-select v-model="formData.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in rolesList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="enable">
            <el-select v-model="formData.departmentId" placeholder="请选择部门" style="width: 100%">
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
import useRoleStore from '@/store/main/system/role'
import useUserStore from '@/store/main/system/user'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'

const roleStore = useRoleStore()
const departmentStore = useDepartmentStore()
const userStore = useUserStore()
const dialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isNewRef = ref(true)
let userId = 0

// 在dialog对话框中回显user数据
function callbackUserInfo(userInfo: any) {
  for (const key in formData) {
    formData[key] = userInfo[key]
  }

  // 缓存user数据中的id，因为后面发送editUserDataAction网络请求时，需要用到这个id
  userId = userInfo.id
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
    // 如果是新建用户，需要发送newUserDataAction网络请求
    userStore.newUserDataAction(formData)
  } else {
    // 如果是编辑用户，需要发送editUserDataAction网络请求
    userStore.editUserDataAction(userId, formData)
  }

  // 关闭dialog对话框
  dialogVisible.value = false
}

// 获取rolesList数据
const { rolesList } = storeToRefs(roleStore)

// 获取departmentsList数据
const { departmentsList } = storeToRefs(departmentStore)

defineExpose({ showDialog, callbackUserInfo })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px 0 0;
}
</style>
