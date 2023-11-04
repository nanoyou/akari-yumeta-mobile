import { useUserStore } from '@/stores'
import axios, { AxiosResponse } from 'axios'
import { Result, User } from './entity'

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
  (res: AxiosResponse<Result<any>>) => {
    console.log(res)
    if (res.data.ok) {
      res.data = res.data.data
      return
    }
    
    // fail
    return Promise.reject(res.data)
  },
  (err) => {
    // fail
    console.log(err)
  }
)

export default instance
// export { baseURL }



export const login = async (data: {
    username: string,
    password: string,
}) => (await instance.post<User>('/login', data)).data