import useLoginStore from '@/store/login/login'

function usePermissions(permissionId: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore // 这里没必要将permissions变成响应式数据
  return Boolean(permissions.find((item) => item.includes(permissionId)))
}

export default usePermissions
