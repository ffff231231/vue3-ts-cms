interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

interface IUserState {
  usersList: IUser[]
  usersTotalCount: number
  cacheQueryInfo: any
}

export type { IUser, IUserState }
