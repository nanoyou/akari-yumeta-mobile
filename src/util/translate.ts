import { Category, Gender, Role, TaskStatus } from '@/api/entity'

export const getRoleStr = (role: Role): string => {
  switch (role) {
    case Role.Admin:
      return '管理员'
    case Role.Child:
      return '儿童'
    case Role.Sponsor:
      return '捐助者'
    case Role.Volunteer:
      return '志愿者'
  }
}

export const getGenderStr = (gender: Gender): string => {
  switch (gender) {
    case Gender.Female:
      return '女'
    case Gender.Male:
      return '男'
    case Gender.Secret:
      return '未知'
  }
}

export const getStatusStr = (status: TaskStatus): string => {
  switch (status) {
    case TaskStatus.Finished:
      return '已完成'
    case TaskStatus.InProgress:
      return '进行中'
    case TaskStatus.NotStarted:
      return '未开始'
  }
}

export const getCategoryStr = (category?: Category): string => {
  switch (category) {
    case Category.Agriculture:
      return '农业'
    case Category.History:
      return '历史'
    case Category.AnimalHusbandry:
      return '牧业'
    case Category.Hygiene:
      return '卫生'
    case Category.Language:
      return '语言'
    case Category.Politics:
      return '政治'
    case Category.Science:
      return '科学'
    case Category.Society:
      return '社会'
    default:
      return ''
  }
}
