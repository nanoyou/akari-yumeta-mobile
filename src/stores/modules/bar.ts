import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBarStore = defineStore('bar', () => {
  const isShowTabBar = ref<boolean>()
  const isShowTopBar = ref<boolean>()
  const setShowTabBar = (show: boolean) => (isShowTabBar.value = show)
  const unsetShowTabBar = () => (isShowTabBar.value = undefined)
  const setShowTopBar = (show: boolean) => (isShowTopBar.value = show)
  const unsetShowTopBar = () => (isShowTopBar.value = undefined)
  return {
    isShowTabBar,
    isShowTopBar,
    setShowTabBar,
    setShowTopBar,
    unsetShowTabBar,
    unsetShowTopBar
  }
})
