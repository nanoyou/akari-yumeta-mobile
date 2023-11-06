import { useUserStore } from '@/stores'
import axios, { type AxiosResponse } from 'axios'
import {
  type DynamicDTO,
  type DonateGoods,
  type DonateHistoryDTO,
  type DonateMoney,
  type GoodsInfo,
  type LoginUserDTO,
  type Result,
  type Task,
  type User,
  type UserDTO
} from './entity'

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
  (await instance.post<Task>('/task/' + taskID + '/open')).data

export const login = async (data: { username: string; password: string }) =>
  (await instance.post<LoginUserDTO>('/login', data)).data

export const register = async (data: {
  username: string
  nickname: string
  role: string
  password: string
  gender: string
}) => (await instance.post<User>('/register', data)).data

export const getUserList = async () =>
  (await instance.get<UserDTO>('/user')).data

export const getFolloweeList = async () =>
  (await instance.get<UserDTO[]>('/my/follow')).data
export const postTask = async (data: {
  taskName: string
  startTime: string
  endTime: string
  description: string
  category: string
  bonus: number
  videoURL: string
}) => (await instance.post<Task>('/task', data)).data

export const getDonateGoods = async () =>
  (await instance.get<GoodsInfo>('/donate/goods')).data

export const donateMoney = async (data: {
  doneeID: string
  amount: number
  wishes: string
}) => (await instance.post<DonateMoney>('/donate/money', data)).data

export const donateGoods = async (data: {
  goodsID: string
  amount: number
  wishes: string
}) => (await instance.post<DonateGoods>('/donate/goods', data)).data

export const getDonateHistory = async (userID: string) =>
  (await instance.get<DonateHistoryDTO[]>(`/donate/${userID}/info`)).data

export const getGoodsInfo = async (goodsID: string) =>
  (await instance.get<GoodsInfo>(`/donate/goods/${goodsID}`)).data

export const postDynamic = async (data: { content: string; taskID?: string }) =>
  (await instance.post<Comment>('/dynamic', data)).data

export const getMyDynamic = async () =>
  (await instance.get<DynamicDTO>('/my/dynamic')).data

export const getDynamic = async (dynamicID: string) =>
  (await instance.get<DynamicDTO>(`/dynamic/${dynamicID}`)).data

export const replyCommentOrDynamic = async (
  commentID: string,
  content: string
) =>
  (await instance.post<DynamicDTO>(`/comment/${commentID}/reply`, { content }))
    .data
