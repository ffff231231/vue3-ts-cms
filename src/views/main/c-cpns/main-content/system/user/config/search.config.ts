import type { ISearchConfig } from '@/types'

const searchConfig: ISearchConfig = {
  pageName: 'users',
  formItems: [
    {
      type: 'input',
      label: '用户名',
      prop: 'name',
      placeholder: '请输入查询的用户名'
    },
    {
      type: 'input',
      label: '真实姓名',
      prop: 'realname',
      placeholder: '请输入查询的真实姓名'
    },
    {
      type: 'input',
      label: '电话号码',
      prop: 'cellphone',
      placeholder: '请输入查询的电话号码'
    },
    {
      type: 'select',
      label: '状态',
      prop: 'enable',
      placeholder: '请选择查询的状态',
      options: [
        { label: '禁用', value: 0 },
        { label: '启用', value: 1 }
      ]
    },
    {
      type: 'date-picker',
      label: '创建时间',
      prop: 'createAt'
    }
  ]
}

export default searchConfig
