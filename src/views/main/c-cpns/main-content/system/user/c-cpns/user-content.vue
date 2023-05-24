<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column align="center" prop="name" label="用户名" width="150" />
        <el-table-column align="center" prop="realname" label="真实姓名" width="150" />
        <el-table-column align="center" prop="cellphone" label="电话号码" width="150" />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'success' : 'danger'" size="small" plain>
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createAt" label="创建时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="updateAt" label="更新时间">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template #default="scope">
            <el-button text size="small" type="primary" icon="Edit"> 编辑 </el-button>
            <el-button
              text
              size="small"
              type="danger"
              icon="Delete"
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/main/system/user.js'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/time-format'
import { ref } from 'vue'

const emit = defineEmits(['newClick'])
const userStore = useUserStore()
const currentPage = ref(1)
const pageSize = ref(10)
let cacheFormData: any = {}

// 为了逻辑复用，将请求userslist数据的网络请求逻辑封装到一个函数里
function fetchUserListData(formData: any = {}) {
  // 获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 将user-search中的表单查询数据(formData)缓存起来
  cacheFormData = formData

  // 将offset、size、user-search中的表单查询数据(formData)组合成查询信息
  const queryInfo = { ...pageInfo, ...formData }

  // 发送网络请求
  userStore.postUsersListAction(queryInfo)
}

// 将currentPage重置成默认值
// 我不准备把pageSize重置成默认值，如果你想的话，可以把pageSize也重置成默认值
function resetCurrentPage() {
  currentPage.value = 1
}

// 当pageSize发生改变的时候，执行这个函数，发送一次网络请求,请求userslist的数据
function handleSizeChange() {
  fetchUserListData(cacheFormData)
}

// 当currentPage发生改变的时候，执行这个函数，发送一次网络请求,请求userslist的数据
function handleCurrentChange() {
  fetchUserListData(cacheFormData)
}

// 点击删除按钮之后，执行这个函数
function handleDeleteBtnClick(userId: number) {
  // 删除数据操作
  userStore.deleteUserAction(userId).then(() => {
    // 删除数据成功之后，重新请求新的数据
    fetchUserListData(cacheFormData)
  })
}

// 点击新建用户按钮后，执行这个函数
function handleNewUserClick() {
  emit('newClick')
}

// 第一次进入user页面时,发送一次网络请求,请求userslist的数据
fetchUserListData()

// 获取userslist的数据,进行展示
const { usersList, usersTotalCount } = storeToRefs(userStore)

defineExpose({ fetchUserListData, resetCurrentPage })
</script>

<style lang="less" scoped>
.user-content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 10px;

  .title {
    font-size: 22px;
  }
}

.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: flex-end;

  .el-pagination {
    margin-top: 10px;
  }
}
</style>
