import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'

function usePageContent() {
  // 为了拿到page-content组件，给page-content组件绑定一个ref
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 监听page-search组件中的queryClick事件，监听到了之后，在page-content组件中展示查询到的数据
  function handleQueryClick(searchForm: any) {
    pageContentRef.value?.resetCurrentPage()
    pageContentRef.value?.fetchPageListData(searchForm)
  }

  // 监听page-search组件中的resetClick事件，监听到了之后，在page-content组件中展示重置之后的数据
  function handleResetClick() {
    pageContentRef.value?.resetCurrentPage()
    pageContentRef.value?.fetchPageListData()
  }

  return {
    pageContentRef,
    handleQueryClick,
    handleResetClick
  }
}

export default usePageContent
