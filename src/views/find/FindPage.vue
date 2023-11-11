<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getUserList, isFollowed, follow, getGoodsList } from '@/api'
import { type GoodsInfo, type UserDTO } from '@/api/entity'
import { Role, Gender } from '@/api/entity'
import userCard from '@/components/UserCard.vue'
import router from '@/router'
import { type ConfigProviderThemeVars } from 'vant'

const choice = ref(true)
const childrenSortOrder = ref({
  value: 0,
  option: [
    { text: '智能排序', value: 0 },
    { text: '名称排序', value: 1 },
    { text: '积分排序', value: 2 }
  ]
})
const goodsSortOrder = ref({
  value: 0,
  option: [
    { text: '智能排序', value: 0 },
    { text: '名称排序', value: 1 },
    { text: '价格排序', value: 2 }
  ]
})
const themeVars: ConfigProviderThemeVars = {
  buttonLargeHeight: '44px',
  cardBackground: '#fff',
  cardTitleLineHeight: '22px',
  cardFontSize: '16px'
}
const checkedBoy = ref(true)
const checkedGirl = ref(true)
const checkedFollower = ref(false)
const scoreScope = ref<[number, number]>([0xfff, 0])
const maxScope = ref(0)
const minScope = ref(0xfff)
const unitPriceScope = ref<[number, number]>([0xfff, 0])
const maxUnitPrice = ref(0)
const minUnitPrice = ref(0xfff)
let childrenList = ref<UserDTO[]>([])
// let followeeList = ref<UserDTO[]>([])
let followStatusList = reactive<Boolean[]>([])
let goodList = ref<GoodsInfo[]>([])
let childrenFollowStatusList = ref<[UserDTO, Boolean][]>([]) //儿童和对应的关注状态列表
const childDescription = ref<string>('')
const goodDescription = ref<string>('')

// const tags = ref([
//   { text: '低保', value: '低保' },
//   { text: '孤儿', value: '孤儿' },
//   { text: '单亲', value: '单亲' },
//   { text: '重病', value: '重病' },
//   { text: '遭遇重大灾难', value: '遭遇重大灾难' }
// ])

async function getFollowStatus(UserID: string) {
  return !!(await isFollowed(UserID))
}

async function handleFollow(userID: string, index: number) {
  await follow(userID)
  followStatusList[index] = !followStatusList[index]
  childrenFollowStatusList.value[index][1] =
    !childrenFollowStatusList.value[index][1]
}

function zip<T, U>(array1: T[], array2: U[]): [T, U][] {
  const length = Math.min(array1.length, array2.length)
  const result: [T, U][] = []

  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]])
  }

  return result
}

async function filterChildren() {
  await initData() //初始化数据
  try {
    // 根据学习积分范围筛选
    childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
      (childAndStatus: [UserDTO, Boolean]) => {
        if (
          childAndStatus[0].score! >= scoreScope.value[0] &&
          childAndStatus[0].score! <= scoreScope.value[1]
        )
          return childAndStatus
      }
    )
    // 筛选男孩
    if (!checkedBoy.value) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          if (childAndStatus[0].gender !== Gender.Male) return childAndStatus
        }
      )
    }
    // 筛选女孩
    if (!checkedGirl.value) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          if (childAndStatus[0].gender !== Gender.Female) return childAndStatus
        }
      )
    }
    // 筛选关注者
    if (checkedFollower.value) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          if (childAndStatus[1]) return childAndStatus
        }
      )
    }
    // 根据用户输入筛选
    const childTargets: Set<string> = new Set(
      childDescription.value?.split(' ')
    )
    if (
      childTargets.size > 0 &&
      childDescription.value !== '' &&
      childDescription.value !== undefined
    ) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          // 根据用户标签筛选
          if (
            new Set(
              childAndStatus[0].tags.filter((tag: string) => {
                if (childTargets.has(tag)) {
                  console.log(tag)
                  return tag
                }
              })
            ).size > 0
          )
            return childAndStatus
          // 根据用户昵称筛选
          else if (childTargets.has(childAndStatus[0].nickname))
            return childAndStatus
          // 根据用户名筛选
          else if (childTargets.has(childAndStatus[0].username))
            return childAndStatus
          // 根据儿童学习积分筛选
          else if (childTargets.has(childAndStatus[0].score!.toString()))
            return childAndStatus
          // 根据用户个人简介筛选
          else if (
            Array.from(childTargets).filter((target) => {
              return childAndStatus[0].introduction?.includes(target)
            }).length > 0
          )
            return childAndStatus
        }
      )
    }
  } catch (error) {
    console.log(error)
  }
}

function orderChildren() {
  switch (childrenSortOrder.value.value) {
    // 智能排序
    case 0: {
      childrenFollowStatusList.value.sort(() => Math.random() - 0.5)
      break
    }
    // 名称排序
    case 1: {
      childrenFollowStatusList.value.sort((a, b) => {
        if (a[0].nickname < b[0].nickname) {
          return -1
        }
        if (a[0].nickname > b[0].nickname) {
          return 1
        }
        return 0
      })
      break
    }
    // 积分排序
    case 2: {
      childrenFollowStatusList.value.sort((a, b) => {
        if (a[0].score! < b[0].score!) {
          return -1
        }
        if (a[0].score! > b[0].score!) {
          return 1
        }
        return 0
      })
      break
    }
  }
}

async function filterGoods() {
  await initData() //初始化数据
  try {
    // 根据用户描述筛选
    const goodTargets: string[] = goodDescription.value.split(' ')
    console.log(goodTargets)
    if (
      goodTargets.length > 0 &&
      goodDescription.value !== '' &&
      goodDescription.value !== undefined
    ) {
      goodList.value = goodList.value.filter((good: GoodsInfo) => {
        // 筛选商品简介
        if (
          goodTargets.filter((tag: string) => {
            return good.description.includes(tag)
          }).length > 0
        )
          return good
        // 筛选商品名称
        else if (
          goodTargets.filter((tag: string) => {
            return good.name.includes(tag)
          }).length > 0
        )
          return good
        // 筛选商品价格
        else if (
          goodTargets.filter((tag: string) => {
            return (good.unitPrice * 0.01).toFixed(2).includes(tag)
          }).length > 0
        )
          return good
      })
    }
  } catch (error) {
    console.log(error)
  }
}

async function filterGoodsByPriceScope() {
  await initData() //初始化数据
  // 根据价格范围筛选
  goodList.value = goodList.value?.filter((good: GoodsInfo) => {
    if (
      good.unitPrice >= unitPriceScope.value[0] * 100 &&
      good.unitPrice <= unitPriceScope.value[1] * 100
    )
      return good
  })
}

function orderGoods() {
  switch (goodsSortOrder.value.value) {
    case 0: {
      goodList.value.sort(() => Math.random() - 0.5)
      break
    }
    case 1: {
      goodList.value.sort((goodA: GoodsInfo, goodB: GoodsInfo) => {
        if (goodA.name > goodB.name) return 1
        else if (goodA.name < goodB.name) return -1
        else return 0
      })
      break
    }
    case 2: {
      goodList.value.sort((goodA: GoodsInfo, goodB: GoodsInfo) => {
        if (goodA.unitPrice > goodB.unitPrice) return 1
        else if (goodA.unitPrice < goodB.unitPrice) return -1
        else return 0
      })
      break
    }
  }
}

function jumpToGoodInfo(goodID: string) {
  router.push({
    path: `/good/${goodID}` // 跳转到物品详情页
  })
}

function jumpToUserInfo(userID: string) {
  router.push({
    path: `/user/${userID}` // 跳转到个人详情页
  })
}

// 初始化数据
async function initData() {
  console.log(childrenList.value)
  const childResult = (async () => {
    childrenList.value = await getUserList(Role.Child)
    followStatusList = new Array(childrenList.value.length)
    await Promise.all(
      childrenList.value.map(async (child, index) => {
        followStatusList[index] = await getFollowStatus(child.id)
      })
    )
    childrenFollowStatusList.value = zip(childrenList.value, followStatusList)
    childrenFollowStatusList.value.forEach(
      (childAndStatus: [UserDTO, Boolean]) => {
        if (minScope.value > childAndStatus[0].score!)
          minScope.value = childAndStatus[0].score!
        if (maxScope.value < childAndStatus[0].score!)
          maxScope.value = childAndStatus[0].score!
      }
    )
  })()

  const goodListResult = (async () => {
    goodList.value = await getGoodsList('')
    goodList.value.forEach((good: GoodsInfo) => {
      if (minUnitPrice.value > Number((good.unitPrice * 0.01).toFixed(2))) {
        minUnitPrice.value = Number((good.unitPrice * 0.01).toFixed(2))
      }
      if (maxUnitPrice.value < Number((good.unitPrice * 0.01).toFixed(2)))
        maxUnitPrice.value = Number((good.unitPrice * 0.01).toFixed(2))
    })
  })()

  await Promise.all([childResult, goodListResult])

  // minUnitPrice.value = Number((minUnitPrice.value * 0.01).toFixed(2))
  // maxUnitPrice.value = Number((maxUnitPrice.value * 0.01).toFixed(2))
  console.log(childrenFollowStatusList.value)
}

// 页面加载时即获取儿童列表和关注列表
onMounted(async () => {
  await initData()
  unitPriceScope.value = [minUnitPrice.value, maxUnitPrice.value]
  scoreScope.value = [minScope.value, maxScope.value]
})
</script>

<template>
  <div id="navi-tab">
    <van-tabs sticky @click-tab="choice = !choice">
      <van-tab title="资助儿童">
        <div id="show_children" v-show="choice">
          <span class="search-bar">
            <van-search
              v-model="childDescription"
              placeholder="输入关键词(姓名、用户名、描述、标签、学习积分等)"
              @search="filterChildren"
            />
          </span>
          <span class="order-select-bar">
            <van-dropdown-menu>
              <van-dropdown-item
                v-model="childrenSortOrder.value"
                :options="childrenSortOrder.option"
                @closed="orderChildren"
              />

              <van-dropdown-item
                title="筛选"
                ref="custom"
                @close="filterChildren"
              >
                <van-cell title="男孩" cell-class="switch-cell">
                  <van-switch v-model="checkedBoy" />
                </van-cell>
                <van-cell title="女孩" cell-class="switch-cell">
                  <van-switch v-model="checkedGirl" />
                </van-cell>
                <van-cell title="我的关注" cell-class="switch-cell">
                  <van-switch v-model="checkedFollower" />
                </van-cell>
                <van-cell
                  title="积分范围"
                  cell-class="switch-cell"
                  style="display: flex; align-items: center"
                >
                  <van-slider
                    v-model="scoreScope"
                    range
                    :min="minScope"
                    :max="maxScope"
                    style="align-self: center; height: 20px"
                  >
                    <template #left-button>
                      <div class="custom-button">{{ scoreScope[0] }}</div>
                    </template>
                    <template #right-button>
                      <div class="custom-button">{{ scoreScope[1] }}</div>
                    </template>
                  </van-slider>
                </van-cell>
              </van-dropdown-item>

              <!-- <van-dropdown-item
          ref="tags"
          title="标签"
          multiple="true"
          :options="tags"
          @change="changeOption1"
        >
          <van-button
            type="primary"
            plain
            block
            border-color="#e2e2e2"
            class="margin-top20"
            @click="onConfirm1"
            >主按钮</van-button
          >
        </van-dropdown-item> -->
            </van-dropdown-menu>
          </span>
          <van-loading
            v-if="childrenFollowStatusList.length === 0"
            size="24"
            vertical
            style="justify-self: center; margin-top: 30px"
            >加载中...</van-loading
          >
          <div v-if="childrenFollowStatusList.length > 0" class="show-cards">
            <van-list>
              <user-card
                v-for="(childAndStatus, index) in childrenFollowStatusList"
                :key="index"
                :user="childAndStatus[0]"
                :is-followed="!!childAndStatus[1]"
                @follow="handleFollow(childAndStatus[0].id, index)"
                @jump="jumpToUserInfo(childAndStatus[0].id)"
              />
            </van-list>
          </div>
        </div>
      </van-tab>
      <van-tab title="捐助物品">
        <div id="show_goods" v-show="!choice">
          <span class="search-bar">
            <van-search
              v-model="goodDescription"
              placeholder="请输入搜索关键词(商品名称、描述、价格等)"
              @search="filterGoods"
            />
          </span>
          <span class="order-select-bar">
            <van-dropdown-menu>
              <van-dropdown-item
                v-model="goodsSortOrder.value"
                :options="goodsSortOrder.option"
                @closed="orderGoods"
              />
              <van-dropdown-item
                title="筛选"
                ref="custom"
                @close="filterGoodsByPriceScope"
              >
                <van-cell
                  title="价格范围"
                  cell-class="switch-cell"
                  style="display: flex; align-items: center"
                >
                  <van-slider
                    v-model:number="unitPriceScope"
                    range
                    :min="minUnitPrice"
                    :max="maxUnitPrice"
                    style="align-self: center; height: 20px"
                  >
                    <template #left-button>
                      <div class="custom-button">{{ unitPriceScope[0] }}</div>
                    </template>
                    <template #right-button>
                      <div class="custom-button">{{ unitPriceScope[1] }}</div>
                    </template>
                  </van-slider>
                </van-cell>
              </van-dropdown-item>
            </van-dropdown-menu>
          </span>
          <van-loading
            v-if="goodList.length === 0"
            size="24"
            vertical
            style="justify-self: center; margin-top: 30px"
            >加载中...</van-loading
          >
          <div v-if="goodList.length > 0" class="show_cards">
            <van-config-provider :theme-vars="themeVars">
              <van-card
                v-for="good in goodList"
                :key="good.id"
                :desc="good.description"
                :price="good.unitPrice * 0.01"
                :thumb="good.imageURL"
                :title="good.name"
              >
                <template #footer>
                  <van-button
                    type="danger"
                    round
                    @click="jumpToGoodInfo(good.id)"
                  >
                    <van-swipe
                      vertical
                      class="notice-swipe"
                      :autoplay="2000"
                      :touchable="false"
                      :show-indicators="false"
                    >
                      <van-swipe-item>谢谢您</van-swipe-item>
                      <van-swipe-item>捐给儿童</van-swipe-item>
                    </van-swipe>
                  </van-button>
                </template>
              </van-card>
            </van-config-provider>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped>
.custom-button {
  width: 26px;
  color: var(--van-primary-color);
  font-size: 10px;
  line-height: 20px;
  text-align: center;
  background-color: #fff;
  border-radius: 100px;
}

.notice-swipe {
  height: 20px;
  line-height: 20px;
}
</style>
