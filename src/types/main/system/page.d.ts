interface IPageState {
  pageList: any[]
  pageTotalCount: number
  cacheQueryInfo: any
}

interface ISearchConfig {
  formItems: any[]
}

interface IContentConfig {
  pageName: string
  header: {
    title: string
    btnTitle: string
  }
  tableColumns: any[]
}

interface IDialogConfig {
  pageName: string
  header: {
    newTitle: string
    editTitle: string
  }
  formItems: any[]
}

export type { IPageState, ISearchConfig, IContentConfig, IDialogConfig }
