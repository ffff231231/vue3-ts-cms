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

interface ISystemState {
  usersList: IUser[]
  usersTotalCount: number
}

export type { IUser, ISystemState }
