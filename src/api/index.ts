import { useUserStore } from '@/stores'
import axios, { type AxiosResponse } from 'axios'
import type { LoginUserDTO, Result, Task, User } from './entity'

const baseURL = 'http://127.0.0.1:8080'

const instance = axios.create({
  baseURL,
  timeout: 1000
})

instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.set('Akari-Yumeta-Token', userStore.token)
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

export const getMyTask = async () =>
  (await instance.get<Task[]>('/my/task')).data

export const getMyInfo = async () => (await instance.get<User>('/my/info')).data

export const getAllTask = async () => (await instance.get<Task[]>('/task')).data

export const getTaskDetail = async (taskID: string) =>
  (await instance.get<Task>('/task/' + taskID)).data

export const getTaskDynamic = async (taskID: string) =>
  (await instance.get<Task>('/task/' + taskID + '/dynamic')).data

export const startTask = async (taskID: string) =>
  (await instance.post<Result<any>>('/task/' + taskID + '/open')).data

export const login = async (data: { username: string; password: string }) =>
  (await instance.post<LoginUserDTO>('/login', data)).data

export const register = async (data: {
  username: string
  nickname: string
  role: string
  password: string
  gender: string
}) => (await instance.post<User>('/register', data)).data

export const postTask = async (data: {
  taskName: string
  startTime: string
  endTime: string
  description: string
  category: string
  bonus: number
  videoURL: string
}) => (await instance.post<Task>('/task', data)).data
