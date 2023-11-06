import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginUserDTO, User } from '@/api/entity'

// 使用pinia库定义一个名为useUserStore的状态管理器
export const useUserStore = defineStore(
  'user', // 状态管理器的名称
  () => {
    // 定义一个名为token的响应式变量，并初始化为空字符串
    const token = ref('')
    // 定义一个名为ID的响应式变量，并初始化为空字符串
    const ID = ref('')
    // 定义一个名为setToken的函数，接收一个字符串参数tk，并将token变量的值设置为传入的参数tk
    const setToken = (tk: string) => (token.value = tk)
    // 定义一个名为setID的函数，接收一个字符串参数id，并将ID变量的值设置为传入的参数id
    const setID = (id: string) => (ID.value = id)
    // 返回一个包含token、setToken、ID和setID的对象
    return { token, setToken, ID, setID }
  },
  // 设置状态管理器的额外选项
  {
    persist: true // 指定状态管理器应该保持持久化
  }
)
