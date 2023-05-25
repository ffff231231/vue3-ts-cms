import hyRequest from '@/service'

// department相关的网络请求
export function postDepartmentListData() {
  return hyRequest.post({
    url: '/department/list'
  })
}
