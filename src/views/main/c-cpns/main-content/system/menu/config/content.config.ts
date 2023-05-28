import type { IContentConfig } from '@/types'

const contentConfig: IContentConfig = {
  pageName: 'menu',
  header: {
    title: '菜单列表',
    btnTitle: '新建菜单'
  },
  tableColumns: [
    { label: '菜单名称', prop: 'name', width: '150' },
    { type: 'normal', label: '级别', prop: 'type', width: '120' },
    { type: 'normal', label: '菜单url', prop: 'url', width: '160' },
    { type: 'normal', label: '菜单icon', prop: 'icon', width: '190' },
    { type: 'normal', label: '排序', prop: 'sort', width: '120' },
    { type: 'normal', label: '权限', prop: 'permission', width: '160' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150' }
  ],
  childrenTree: {
    rowKey: 'id',
    treeProps: { hasChildren: 'hasChildren', children: 'children' }
  }
}

export default contentConfig
