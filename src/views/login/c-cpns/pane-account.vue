<template>
  <div class="pane-account">
    <el-form
      ref="formRef"
      :model="account"
      label-width="55px"
      size="large"
      :rules="accountRules"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types/index'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1.定义account数据
const account = reactive<IAccount>({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? ''
})

// 2.定义校验规则
const accountRules = reactive<FormRules>({
  name: [
    { required: true, message: '请输入账号信息', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9\u4e00-\u9fa5]{3,10}$/,
      message: '用户名应为 3 到 10 位数字或字母或汉字组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '密码应为 6 到 20 位数字或字母组成',
      trigger: 'blur'
    }
  ]
})

// 3.执行帐号的登录逻辑
const loginStore = useLoginStore()
const { accountLoginAction } = loginStore
const formRef = ref<FormInstance>()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password
      accountLoginAction({ name, password }).then(() => {
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('验证失败!')
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.pane-account {
  color: red;
}
</style>
