import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginUserDTO, User } from '@/api/entity'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const user = ref<User>()
    const setUserDTO = (u: LoginUserDTO) => {
      user.value = u
      token.value = u.token
      console.log(token.value)
    }
    return { token, user, setUserDTO }
  },
  {
    persist: true
  }
)
