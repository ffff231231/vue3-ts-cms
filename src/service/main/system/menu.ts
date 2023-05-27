import hyRequest from '@/service'

// menu相关的网络请求
export function postMenuListData() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
