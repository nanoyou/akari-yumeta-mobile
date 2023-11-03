import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const setToken = (tk: string) => (token.value = tk)
    return { token, setToken }
  },
  {
    persist: true
  }
)
