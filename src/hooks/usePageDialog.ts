import { ref } from 'vue'
import type PageDialog from '@/components/page-dialog/page-dialog.vue'

type aboutMenu = (data?: any) => void
function usePageDialog(clearSelectMenuList?: aboutMenu, callbackSelectMenuList?: aboutMenu) {
  // 为了拿到page-dialog组件，给page-dialog组件绑定一个ref
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()

  // 监听page-content组件中的newClick事件，监听到了之后，弹出page-dialog组件，然后可以新建数据
  function handleNewClick() {
    // 显示dialog对话框
    pageDialogRef.value?.showDialog()

    // 如果是role组件，还额外需要在dialog对话框中清除之前选择的菜单树信息
    if (clearSelectMenuList) {
      clearSelectMenuList()
    }
  }

  // 监听page-content组件中的editClick事件，监听到了之后，弹出page-dialog组件，然后可以编辑数据
  function handleEditClick(pageInfo: any) {
    // 显示dialog对话框
    pageDialogRef.value?.showDialog(false)

    // 在dialog对话框中回显page数据
    pageDialogRef.value?.callbackPageInfo(pageInfo)

    // 如果是role组件，还额外需要在dialog对话框中回显之前选择的菜单树信息
    if (callbackSelectMenuList) {
      callbackSelectMenuList(pageInfo)
    }
  }

  return {
    pageDialogRef,
    handleNewClick,
    handleEditClick
  }
}

export default usePageDialog
