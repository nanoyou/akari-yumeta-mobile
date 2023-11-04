export interface Result<T> {
  ok: boolean
  code: number
  message: string
  data: T
}
export interface Task {
  /**
   * 奖励积分，任务完成给予的积分数
   */
  bonus: number;
  /**
   * 任务类别
   */
  category: Category;
  /**
   * 任务创建时间，课程任务一旦被确认上传的时间
   */
  createdTime: string;
  /**
   * 任务描述
   */
  description: string;
  /**
   * 任务结束时间
   */
  endTime: string;
  id: string;
  /**
   * 任务开始时间
   */
  startTime: string;
  /**
   * 任务状态，详见枚举
   */
  status: Status;
  /**
   * 任务名称
   */
  taskName: string;
  /**
   * 任务发布人ID
   */
  taskUploaderID: string;
  [property: string]: any;
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
