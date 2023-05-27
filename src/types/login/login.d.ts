interface IAccount {
  name: string
  password: string
}

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

export type { IAccount, ILoginState }
