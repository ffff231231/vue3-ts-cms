import type { RouteRecordRaw } from 'vue-router'

// 加载本地路由对象
function loadLocalRoutes() {
  // 创建一个数组localRoutes，用来存放加载的本地路由对象
  const localRoutes: RouteRecordRaw[] = []

  // 读取src/router/main中所有的ts文件，这些ts文件中都是本地路由对象
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )

  // 将本地路由对象全都放到localRoutes数组中
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }

  // 将localRoutes数组导出
  return localRoutes
}

export let firstSubMenu: any = null

// 根据登录用户的菜单树信息,去匹配本地路由对象
export function mapMenusToRoutes(userMenus: any[]) {
  // 拿到本地路由对象数组localRoutes
  const localRoutes = loadLocalRoutes()

  // 创建一个数组matchRoutes，用来存放与登录用户的菜单树信息相匹配的本地路由对象
  const matchRoutes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find(
        (item) => item.path === submenu.url.replace('/main/', '')
      )
      if (route) {
        matchRoutes.push(route)
      }
      // 纪录第一个匹配到路由对象的菜单树信息
      if (firstSubMenu === null && route) {
        firstSubMenu = submenu
      }
    }
  }

  // 将matchRoutes数组导出
  return matchRoutes
}

/**
 * 根据浏览器地址栏中的路径去匹配要显示的菜单(submenu)
 * @param path 浏览器地址栏中的路径
 * @param userMenus 登录用户的菜单树信息
 * @returns 要显示的菜单(submenu)
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        return submenu
      }
    }
  }
}
