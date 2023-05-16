import type { RouteRecordRaw } from 'vue-router'

/**
 * 加载本地路由对象
 * @returns 本地路由对象数组(localRoutes)
 */
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
/**
 * 根据登录用户的菜单树信息,去匹配本地的路由对象
 * @param userMenus 登录用户的菜单树信息
 * @returns 与登录用户的菜单树信息相匹配的本地路由对象数组(matchRoutes)
 */
export function mapMenusToRoutes(userMenus: any[]) {
  // 拿到本地路由对象数组localRoutes
  const localRoutes = loadLocalRoutes()

  // 创建一个数组matchRoutes，用来存放与登录用户的菜单树信息相匹配的本地路由对象
  const matchRoutes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 将登录用户的一级菜单映射为一个路由对象，并增加重定向功能，然后将其添加到matchRoutes数组。
        // 每个一级菜单映射的路由对象只需要向matchRoutes数组中添加一次。
        // 这一步是给main-header中，面包屑的一级菜单用的。
        if (!matchRoutes.find((item) => item.path === menu.url)) {
          matchRoutes.push({ path: menu.url, redirect: menu.children[0].url })
        }
        // 将登录用户的二级菜单对应的本地路由对象添加到matchRoutes数组
        matchRoutes.push(route)
      }
      // 纪录第一个匹配到本地路由对象的二级菜单信息
      if (firstSubMenu === null && route) {
        firstSubMenu = submenu
      }
    }
  }

  // 将matchRoutes数组导出
  return matchRoutes
}

/**
 * 根据浏览器地址栏中的路径(path)去匹配对应的二级菜单(submenu)
 * @param path 浏览器地址栏中的路径
 * @param userMenus 登录用户的菜单树信息
 * @returns 对应的二级菜单(submenu)
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

interface IBreadCrumbs {
  name: string
  path: string
}
/**
 * 根据浏览器地址栏中的路径(path)生成对应的面包屑(breadcrumbs)信息
 * @param path 浏览器地址栏中的路径
 * @param userMenus 登录用户的菜单树信息
 * @returns 对应的面包屑(breadcrumbs)信息
 */
export function mapPathToBreadcrumbs(path: string, userMenus: any[]) {
  // 创建一个数组breadcrumbs，用来存放面包屑信息
  const breadcrumbs: IBreadCrumbs[] = []

  // 遍历获取面包屑信息
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        // 一级菜单信息
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 二级菜单信息
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  // 将breadcrumbs数组导出
  return breadcrumbs
}
