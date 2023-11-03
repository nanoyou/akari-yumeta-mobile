import { useUserStore } from '@/stores'
import axios from 'axios'

const baseURL = 'http://127.0.0.1'

const instance = axios.create({
  baseURL,
  timeout: 1000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

instance.interceptors.response.use(
  (res) => {
    console.log(res)
    // fail
    return Promise.reject(res.data)
  },
  (err) => {
    // fail
    console.log(err)
  }
)

export default instance
export { baseURL }
