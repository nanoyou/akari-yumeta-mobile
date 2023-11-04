import { useUserStore } from '@/stores'
import axios, { type AxiosResponse } from 'axios'
import type { Result, User } from './entity'

const baseURL = 'http://127.0.0.1:8080'

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
    if (res.status === 200) {
      if (res.data.ok) {
        res.data = res.data.data
        return Promise.resolve(res)
      } else {
        return Promise.reject(res.data)
      }
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

export const login = async (data: { username: string; password: string }) =>
  (await instance.post('/login', data)).data

export const register = async (data: {
  username: string
  nickname: string
  role: string
  password: string
  gender: string
}) => (await instance.post<User>('/register', data)).data
