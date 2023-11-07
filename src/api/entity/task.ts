/**
 * Task
 */
export interface Task {
  /**
   * 奖励积分，任务完成给予的积分数
   */
  bonus: number
  /**
   * 任务类别
   */
  category: Category
  /**
   * 任务创建时间，课程任务一旦被确认上传的时间
   */
  createdTime: string
  /**
   * 任务描述
   */
  description: string
  /**
   * 任务结束时间
   */
  endTime: string
  id: string
  /**
   * 任务开始时间
   */
  startTime: string
  /**
   * 任务状态，详见枚举
   */
  status: TaskStatus
  /**
   * 任务名称
   */
  taskName: string
  /**
   * 任务发布人ID
   */
  taskUploaderID: string
}

/**
 * 任务类别
 */
export enum Category {
  Agriculture = 'AGRICULTURE',
  AnimalHusbandry = 'ANIMAL_HUSBANDRY',
  History = 'HISTORY',
  Hygiene = 'HYGIENE',
  Language = 'LANGUAGE',
  Politics = 'POLITICS',
  Science = 'SCIENCE',
  Society = 'SOCIETY'
}

/**
 * 任务状态，详见枚举
 */
export enum TaskStatus {
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotStarted = 'NOT_STARTED'
}
/**
 * TaskRecord
 */
export interface TaskRecord {
  /**
   * 受困儿童的ID
   */
  childID: string
  /**
   * 任务结束时间，指的受困儿童看完这个视频的时间
   */
  endTime?: string
  /**
   * 任务开启时间，指的受困儿童点开这个任务的时间
   */
  startTime: string
  /**
   * 任务状态，详见枚举
   */
  status: TaskRecordStatus
  /**
   * 关联的Task的ID
   */
  taskID: string
}

/**
 * 任务状态，详见枚举
 */
export enum TaskRecordStatus {
  Completed = 'COMPLETED',
  Uncompleted = 'UNCOMPLETED'
}
