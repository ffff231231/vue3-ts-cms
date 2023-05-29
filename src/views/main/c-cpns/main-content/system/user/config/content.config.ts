import type { IContentConfig } from '@/types'

const contentConfig: IContentConfig = {
  pageName: 'users',
  header: {
    title: '用户列表',
    btnTitle: '新建用户'
  },
  tableColumns: [
    { type: 'selection', label: '选择', width: '50' },
    { type: 'index', label: '序号', width: '60' },
    { type: 'normal', label: '用户名', prop: 'name', width: '150' },
    { type: 'normal', label: '真实姓名', prop: 'realname', width: '150' },
    { type: 'normal', label: '电话号码', prop: 'cellphone', width: '150' },
    { type: 'custom', label: '状态', prop: 'enable', width: '100', slotName: 'enable' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150' }
  ]
}

export default contentConfig
