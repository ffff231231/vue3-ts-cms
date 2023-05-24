import hyRequest from '@/service'

// 请求pagesList数据的函数
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

// 删除page的函数
export function deletePageById(pageName: string, pageId: number) {
  return hyRequest.delete({
    url: `/${pageName}/${pageId}`
  })
}

// 新建page的函数
export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}

// 编辑page的函数
export function editPageData(pageName: string, pageId: number, pageInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${pageId}`,
    data: pageInfo
  })
}
