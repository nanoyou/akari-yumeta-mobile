import { useUserStore } from '@/stores'
import axios, { type AxiosResponse } from 'axios'
import {
  type commentContent,
  type DynamicDTO,
  type DonateGoods,
  type DonateHistoryDTO,
  type DonateMoney,
  type GoodsInfo,
  type LoginUserDTO,
  type Result,
  type Task,
  type User,
  type Role,
  type UserDTO,
  type TaskRecord,
  type ChatDTO,
  type Message,
  type Like,
  type CommentDetail,
  MessageType,
  type Subscription,
  Gender,
  type TaskCourseDTO
} from './entity'
import { HTTP_HOST } from '@/constants'
import { useRouter } from 'vue-router'
import router from '@/router'

const baseURL = HTTP_HOST
// const baseURL = 'http://127.0.0.1:8080'

const instance = axios.create({
  baseURL,
  timeout: 1145141919
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
    // console.log(res)
    if (res.status === 200) {
      if (res.data.ok) {
        res.data = res.data.data
        return Promise.resolve(res)
      } else {
        // 如果需要登录，则跳转登录页面
        if (res.data.code == 2) {
          router.push('/login')
        }
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

export const getMyInfo = async () =>
  (await instance.get<UserDTO>('/my/info')).data

export const getUserInfo = async (userID: string) =>
  (await instance.get<UserDTO>(`/user/${userID}/info`)).data

export const getChildTasks = async (userID: string) =>
    (await instance.get<Task[]>(`/user/${userID}/task`)).data

export const getAllTask = async () => (await instance.get<Task[]>('/task')).data

export const getTaskDetail = async (taskID: string) =>
  (await instance.get<TaskCourseDTO>('/task/' + taskID)).data

export const getDynamicDetail = async (DynamicId: string) =>
  (await instance.get<DynamicDTO>('/dynamic/' + DynamicId)).data

export const getTaskDynamic = async (taskID: string) =>
  (await instance.get<DynamicDTO[]>('/task/' + taskID + '/dynamic')).data

export const startTask = async (taskID: string) =>
  (await instance.post<TaskRecord>('/task/' + taskID + '/open')).data

export const finishTask = async (taskID: string) =>
  (await instance.post<TaskRecord>(`/task/${taskID}/finish`)).data

export const getUserScore = async (userID: string) =>
  (await instance.get<{ score: number }>(`/user/${userID}/score`)).data.score

export const login = async (data: { username: string; password: string }) =>
  (await instance.post<LoginUserDTO>('/login', data)).data

export const register = async (data: {
  username: string
  nickname: string
  role: string
  password: string
  gender: string
}) => (await instance.post<User>('/register', data)).data

export const getUserList = async (role?: Role) =>
  (await instance.get<UserDTO[]>(`/user`, { params: { role } })).data

export const getFolloweeList = async () =>
  (await instance.get<UserDTO[]>('/my/follow')).data

/**
 * 是否已关注某人
 * @param userID 要查询的被关注人
 * @returns 是否关注
 */
export const isFollowed = async (userID: string) =>
  (await instance.get<boolean>(`/my/follow/${userID}`)).data

/**
 * 关注某人
 * @param userID 被关注人 ID
 * @returns 关注信息
 */
export const follow = async (userID: string) =>
  (await instance.post<Subscription>(`/my/follow/${userID}`)).data

export const modifyMyInfo = async (data: {
  nickname?: string
  gender?: Gender
  introduction?: string
  avatarURL?: string
  tags?: string[]
}) => (await instance.patch(`/my/info`, data)).data

export const postTask = async (data: {
  taskName: string
  startTime: string
  endTime: string
  description: string
  category: string
  bonus: number
  videoDuration: number
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

export const sendTaskComment = async (data: {
  content: string
  taskID: string | null
}) => (await instance.post<Comment>(`/dynamic`, data)).data

export const getUsers = async () => (await instance.post<Comment>(`/user`)).data
export const getGoodsList = async (description: string) =>
  (await instance.get<GoodsInfo[]>(`/donate/goods?description=${description}`))
    .data

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

export const myChatList = async () =>
  (await instance.get<ChatDTO[]>('/my/chat')).data

/**
 * 查看和某人的历史记录
 * @param userID 聊天对象
 * @returns 消息列表
 */
export const getChatMessages = async (userID: string) =>
  (await instance.get<Message[]>(`/chat/message/${userID}`)).data

export const sendMessage = async (
  userID: string,
  content: string,
  type: MessageType = MessageType.Text
) =>
  (
    await instance.post<Message>(`/chat/message/${userID}`, {
      content,
      type
    })
  ).data

export const markRead = async (messageID: string) =>
  (await instance.post<Message>(`/chat/message/${messageID}/read`)).data

export const sendDynamicComment = async (commentID: string, content: string) =>
  (
    await instance.post<CommentDetail>(`/comment/` + commentID + `/reply`, {
      content
    })
  ).data

export const getAllDynamic = async () =>
  (await instance.get<DynamicDTO[]>(`/my/dynamic`)).data

export const likeComment = async (commentId: string) =>
  (await instance.post<Like>(`/dynamic/${commentId}/like`)).data
