<template>
  <div class="page-content">
    <div class="header">
      <h3 class="title">{{ contentConfig.header.title ?? '数据列表' }}</h3>
      <template v-if="isCreate">
        <el-button type="primary" @click="handleNewPageClick">
          {{ contentConfig.header.btnTitle ?? '新建数据' }}
        </el-button>
      </template>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%" v-bind="contentConfig.childrenTree">
        <template v-for="item in contentConfig.tableColumns" :key="item.label">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  text
                  size="small"
                  type="primary"
                  icon="Edit"
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
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
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/time-format'
import { ref } from 'vue'
import usePageStore from '@/store/main/system/page'
import type { IContentConfig } from '@/types'
import usePermissions from '@/hooks/usePermissions'

// 接收属性
interface IProps {
  contentConfig: IContentConfig
}
const props = defineProps<IProps>()

// 自定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 判断是否有增删改查的权限
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)

// 定义一些组件中会用到的变量
const pageStore = usePageStore()
const currentPage = ref(1)
const pageSize = ref(10)
let cacheSearchForm: any = {}

// 为了逻辑复用，将请求pagelist数据的网络请求逻辑封装到一个函数里
function fetchPageListData(searchForm: any = {}) {
  // 如果没有查询的权限，则直接退出这个函数，不发送请求pagelist数据的网络请求
  if (!isQuery) return

  // 获取offset和size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 将page-search中的表单查询数据(searchForm)缓存起来
  cacheSearchForm = searchForm

  // 将offset、size、page-search中的表单查询数据(searchForm)组合成查询信息
  const queryInfo = { ...pageInfo, ...searchForm }

  // 发送网络请求
  pageStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

// 将currentPage重置成默认值
// 我不准备把pageSize重置成默认值，如果你想的话，可以把pageSize也重置成默认值
function resetCurrentPage() {
  currentPage.value = 1
}

// 当pageSize发生改变的时候，执行这个函数，发送一次网络请求,请求pageslist的数据
function handleSizeChange() {
  fetchPageListData(cacheSearchForm)
}

// 当currentPage发生改变的时候，执行这个函数，发送一次网络请求,请求pageslist的数据
function handleCurrentChange() {
  fetchPageListData(cacheSearchForm)
}

// 点击删除按钮之后，执行这个函数
function handleDeleteBtnClick(pageId: number) {
  // 删除数据操作
  pageStore.deletePageAction(props.contentConfig.pageName, pageId)
}

// 点击编辑按钮之后，执行这个函数
function handleEditBtnClick(pageInfo: any) {
  emit('editClick', pageInfo)
}

// 点击新建按钮后，执行这个函数
function handleNewPageClick() {
  emit('newClick')
}

// 第一次进入page页面时,发送一次网络请求,请求pagelist的数据
fetchPageListData()

// 获取pagelist的数据,进行展示
const { pageList, pageTotalCount } = storeToRefs(pageStore)

defineExpose({ fetchPageListData, resetCurrentPage })
</script>

<style lang="less" scoped>
.page-content {
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
