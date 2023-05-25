import type { IContentConfig } from '@/types'

const contentConfig: IContentConfig = {
  pageName: 'role',
  header: {
    title: '角色列表',
    btnTitle: '新建角色'
  },
  tableColumns: [
    { type: 'selection', label: '选择', width: '50' },
    { type: 'index', label: '序号', width: '60' },

    { type: 'normal', label: '角色名称', prop: 'name', width: '180' },
    { type: 'normal', label: '权限介绍', prop: 'intro', width: '180' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },

    { type: 'handler', label: '操作', width: '150' }
  ]
}

export default contentConfig
