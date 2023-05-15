<template>
  <div class="main-aside">
    <!-- logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="logo" />
      <h2 v-show="!isFold" class="title">后台管理系统</h2>
    </div>

    <!-- menu -->
    <div class="menu">
      <el-menu
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
        :default-active="defaultActive"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="String(item.id)">
            <template #title>
              <el-icon>
                <component :is="item.icon.replace('el-icon-', '')" />
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children" :key="child.id">
              <el-menu-item
                :index="String(child.id)"
                @click="handleItemClick(child.url)"
                >{{ child.name }}</el-menu-item
              >
            </template>
          </el-sub-menu></template
        >
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { mapPathToMenu } from '@/utils/map-menus'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref } from 'vue'

// 定义 props
interface IProps {
  isFold: boolean
}
defineProps<IProps>()

// 获取菜单树信息
const loginStore = useLoginStore()
const { userMenus } = storeToRefs(loginStore)

// 监听菜单栏中每一项 item 的点击，然后进行路由跳转
const router = useRouter()
function handleItemClick(url: string) {
  router.push(url)
}

// main页面刷新之后，根据浏览器地址栏中的路径(path)去匹配要显示的菜单(submenu)
const route = useRoute()
const defaultActive = computed(() => {
  const submenu = mapPathToMenu(route.path, loginStore.userMenus)
  return String(submenu.id)
})
</script>

<style lang="less" scoped>
.main-aside {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
