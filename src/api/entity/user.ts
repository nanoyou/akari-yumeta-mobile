import type {DynamicDTO} from "@/api/entity/dynamic";

/**
 * User
 */
export interface User {
  /**
   * 头像链接
   */
  avatarURL?: string
  /**
   * 性别
   */
  gender: Gender
  /**
   * UUID
   */
  id: string
  /**
   * 个人介绍
   */
  introduction?: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 角色
   */
  role: Role
  /**
   * 使用时长，APP使用时长统计，单位为秒
   */
  usageDuration: number
  /**
   * 用户名
   */
  username: string
}

/**
 * 性别
 */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  Secret = 'SECRET'
}

/**
 * 角色
 */
export enum Role {
  Admin = 'ADMIN',
  Child = 'CHILD',
  Sponsor = 'SPONSOR',
  Volunteer = 'VOLUNTEER'
}

/**
 * LoginUserDTO
 */
export interface LoginUserDTO {
  /**
   * 头像链接
   */
  avatarURL?: string
  /**
   * 性别
   */
  gender: Gender
  /**
   * UUID
   */
  id: string
  /**
   * 个人介绍
   */
  introduction?: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 角色
   */
  role: Role
  /**
   * 标签数组
   */
  tags: string[]
  token: string
  /**
   * 使用时长，APP使用时长统计，单位为秒
   */
  usageDuration: number
  /**
   * 用户名
   */
  username: string
}
/**
 * UserDTO
 */
export interface UserDTO {
  /**
   * 头像链接
   */
  avatarURL?: string
  /**
   * 性别
   */
  gender: Gender
  /**
   * UUID
   */
  id: string
  /**
   * 个人介绍
   */
  introduction?: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 角色
   */
  role: Role
  /**
   * 学习积分，课程积分，仅儿童存在
   */
  score?: number
  /**
   * 标签数组
   */
  tags: string[]
  /**
   * 使用时长，APP使用时长统计，单位为秒
   */
  usageDuration: number
  /**
   * 用户名
   */
  username: string
}

/**
 * 数据，每个请求自己定义
 *
 * Comment
 */
export interface Comment {
  /**
   * 发评论的人的ID
   */
  commenterID: string
  /**
   * 以Markdown格式存储的评论
   */
  content: string
  /**
   * 评论发表时间
   */
  createTime: string
  /**
   * Markdown评论
   */
  id: string
  /**
   * 父评论ID，被回复评论的ID，为空则为动态节点（根节点）
   */
  replyTo: string
}

export interface commentContent {
  text: string
  photos: string[] | null
}

export interface commentInfo {
    id: string,
    name: string,
    introduction: string | undefined,
    role: Role,
    time: string,
    likes: number,
    content: string,
    answers: number | DynamicDTO[],
    commentNum: number,
    photo: string | undefined
}
