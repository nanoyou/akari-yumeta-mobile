/**
 * GoodsInfo
 */
export interface GoodsInfo {
  /**
   * 商品描述
   */
  description: string
  /**
   * 商品 ID
   */
  id: string
  /**
   * 商品图片URL
   */
  imageURL: string
  /**
   * 商品名称
   */
  name: string
  /**
   * 商品单价，以分为单位
   */
  unitPrice: number
}
/**
 * DonateGoods
 */
export interface DonateGoods {
  /**
   * 捐助数量
   */
  amount: number
  /**
   * 创建时间，用local date time
   */
  createdTime: string
  /**
   * 捐助人ID
   */
  donatorID: string
  /**
   * 捐助物品ID
   */
  goodsID: string
  /**
   * UUID
   */
  id: string
  /**
   * 捐助总钱数，以分为单位
   */
  totalMoney: number
  /**
   * 留言祝福
   */
  wishes: string
}

/**
 * DonateMoney
 */
export interface DonateMoney {
  /**
   * 捐助金额，以分为单位
   */
  amount: number
  /**
   * 创建时间，用local date time
   */
  createdTime: string
  /**
   * 捐助人ID
   */
  donatorID: string
  /**
   * 受赠人ID
   */
  doneeID: string
  /**
   * UUID
   */
  id: string
  /**
   * 留言祝福
   */
  wishes: string
}

/**
 * DonateHistoryDTO
 */
export interface DonateHistoryDTO {
  goods: DonateGoods[]
  money: DonateMoney[]
  /**
   * 货物捐助总物品数
   */
  totalGoodsCount: number
  /**
   * 总捐款、捐物钱数，以分为单位
   */
  totalMoney: number
}
