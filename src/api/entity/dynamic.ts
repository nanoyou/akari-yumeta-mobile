/**
 * DynamicDTO
 */
export interface DynamicDTO {
  /**
   * 子评论
   */
  children: DynamicDTO[]
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
   * 点赞数
   */
  likes: number
  /**
   * 父评论ID，被回复评论的ID，为空则为动态节点（根节点）
   */
  replyTo: string
}

export interface dynamicDetail {
  children: dynamicDetail[]
  commenterName: string
  contentText: string
  createTime: string
  likes: number
  photos: string[]
}
/**
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
/**
 * Like
 */
export interface Like {
  /**
   * 被点赞的评论的ID
   */
  commentID: string
  /**
   * 被点赞的人的ID
   */
  likedID: string
  /**
   * 发起点赞的人的ID
   */
  likerID: string
}

/**
 * 数据，每个请求自己定义
 */
export interface CommentDetail {
  /**
   * 发评论的人的ID
   */
  commenterID: string;
  /**
   * 以Markdown格式存储的评论
   */
  content: string;
  /**
   * 评论发表时间
   */
  createTime: string;
  /**
   * Markdown评论
   */
  id: string;
  /**
   * 点赞数
   */
  likes: number;
  /**
   * 父评论ID，被回复评论的ID，为空则为动态节点（根节点）
   */
  replyTo: string;
  [property: string]: any;
}
