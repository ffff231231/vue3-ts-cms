<template>
  <div class="user-content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" width="60" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="150"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="电话号码"
          width="150"
        />
        <el-table-column align="center" prop="enable" label="状态" width="100">
          <template #default="scope">
            <el-button
              :type="scope.row.enable ? 'success' : 'danger'"
              size="small"
              plain
            >
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
          <el-button text size="small" type="primary" icon="Edit">
            编辑
          </el-button>
          <el-button text size="small" type="danger" icon="Delete">
            删除
          </el-button>
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
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/time-format'
import { ref } from 'vue'

const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)

// 为了逻辑复用，将网络请求逻辑封装到一个函数里
function fetchUsersData() {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const queryInfo = { size, offset }

  systemStore.postUsersListAction(queryInfo)
}

// 第一次进入user页面时,发送一次网络请求,请求userslist的数据
fetchUsersData()

// 获取userslist的数据,进行展示
const { usersList, usersTotalCount } = storeToRefs(systemStore)

// 当pageSize发生改变的时候，调用这个函数，发送一次网络请求
function handleSizeChange() {
  fetchUsersData()
}

// 当currentPage发生改变的时候，调用这个函数，发送一次网络请求
function handleCurrentChange() {
  fetchUsersData()
}
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
