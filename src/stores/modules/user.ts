import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const ID = ref('')
    const setToken = (tk: string) => (token.value = tk)
    const setID = (id: string) => (ID.value = id)
    return { token, setToken, ID, setID }
  },
  {
    persist: true
  }
)
