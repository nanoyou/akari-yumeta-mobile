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
