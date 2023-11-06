export interface Result<T> {
  ok: boolean
  code: number
  message: string
  data: T
}

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
   * 密码
   */
  password: string
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
  [property: string]: any
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
