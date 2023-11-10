import type { UserDTO } from '.'

/**
 * ChatDTO
 */
export interface ChatDTO {
  firstMessage: Message
  user: UserDTO
}

/**
 * Message
 */
export interface Message {
  content: string
  id: string
  /**
   * 是否已读
   */
  read: boolean
  /**
   * 接收者ID
   */
  receiverID: string
  /**
   * 发送者ID
   */
  senderID: string
  sendTime: string
  /**
   * 消息类型
   */
  type: MessageType
}

/**
 * 消息类型
 */
export enum MessageType {
  Text = 'TEXT'
}
