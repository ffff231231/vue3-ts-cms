<template>
  <div class="user-modal">
    <el-dialog v-model="dialogVisible" title="新建用户" width="30%" center>
      <div class="form">
        <el-form :model="formData" label-width="80px" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="formData.realname" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="realname">
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
const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 控制dialog的可见性
function changeDialogVisible() {
  dialogVisible.value = !dialogVisible.value
}

// 获取rolesList数据
const { rolesList } = storeToRefs(roleStore)

// 获取departmentsList数据
const { departmentsList } = storeToRefs(departmentStore)

// 点击确定按钮之后，执行这个函数
function handleConfirmClick() {
  dialogVisible.value = false
  userStore.newUserDataAction(formData)
}

defineExpose({ changeDialogVisible })
</script>

<style lang="less" scoped></style>
