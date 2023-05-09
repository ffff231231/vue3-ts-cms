interface IAccount {
  name: string
  password: string
}

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

export type { IAccount, ILoginState }
