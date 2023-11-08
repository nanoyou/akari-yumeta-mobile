<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import {
  getUserList,
  getFolloweeList,
  isFollowed,
  follow,
  getGoodsList
} from '@/api'
import { GoodsInfo, UserDTO } from '@/api/entity'
import { Role, Gender } from '@/api/entity'
import userCard from '@/components/UserCard.vue'

const choice = ref(true)
const sortOrder = ref({
  value: 0,
  option: [
    { text: '智能排序', value: 0 },
    { text: '名称排序', value: 1 },
    { text: '积分排序', value: 2 }
  ]
})
const checkedBoy = ref(true)
const checkedGirl = ref(true)
const checkedFollower = ref(false)
let childrenList = ref<UserDTO[]>()
let followeeList = ref<UserDTO[]>()
let followStatusList = reactive<Boolean[]>([])
let goodList = ref<GoodsInfo[]>()
let childrenFollowStatusList = ref<[UserDTO, Boolean][]>() //儿童和对应的关注状态列表
const childDescription = ref<string>()
const goodDescription = ref<string>()

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

function filterChildren() {
  initData() //初始化数据
  try {
    if (!checkedBoy.value) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          if (childAndStatus[0].gender !== Gender.Male) return childAndStatus
        }
      )
    }
    if (!checkedGirl.value) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          if (childAndStatus[0].gender !== Gender.Female) return childAndStatus
        }
      )
    }
    if (checkedFollower.value) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          if (childAndStatus[1]) return childAndStatus
        }
      )
    }
    const childTargets: Set<string> = new Set(
      childDescription.value?.split(' ')
    )
    if (childTargets.size > 0) {
      childrenFollowStatusList.value = childrenFollowStatusList.value?.filter(
        (childAndStatus: [UserDTO, Boolean]) => {
          if (
            new Set(
              childAndStatus[0].tags.filter((tag: string) =>
                childTargets.has(tag)
              )
            ).size > 0
          )
            return childAndStatus
          else if (childTargets.has(childAndStatus[0].nickname))
            return childAndStatus
          else if (childTargets.has(childAndStatus[0].username))
            return childAndStatus
          else if (childTargets.has(childAndStatus[0].score?.toString))
            return childAndStatus
        }
      )
    }
  } catch (error) {
    console.log(error)
  }
}

// 初始化数据
async function initData() {
  childrenList.value = await getUserList(Role.Child)
  followeeList.value = await getFolloweeList()
  goodList.value = await getGoodsList('')
  for (const child of childrenList.value) {
    followStatusList.push(await getFollowStatus(child.id))
  }
  childrenFollowStatusList.value = zip(childrenList.value, followStatusList)
}

// 页面加载时即获取儿童列表和关注列表
onMounted(async () => {
  initData()
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
              placeholder="请输入搜索关键词"
              @search="filterChildren"
            />
          </span>
          <span class="tag-bar">
            <van-dropdown-menu>
              <van-dropdown-item
                v-model="sortOrder.value"
                :options="sortOrder.option"
              />
              <van-dropdown-item title="筛选" ref="custom">
                <van-cell title="男孩" cell-class="switch-cell">
                  <van-switch v-model="checkedBoy" />
                </van-cell>
                <van-cell title="女孩" cell-class="switch-cell">
                  <van-switch v-model="checkedGirl" />
                </van-cell>
                <van-cell title="我的关注" cell-class="switch-cell">
                  <van-switch v-model="checkedFollower" />
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
          <div class="show-cards">
            <van-list>
              <user-card
                v-for="(childAndStatus, index) in childrenFollowStatusList"
                :key="index"
                :user="childAndStatus[0]"
                :is-followed="!!childAndStatus[1]"
                @follow="handleFollow(childAndStatus[0].id, index)"
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
              placeholder="请输入搜索关键词"
            />
          </span>
          <div class="show_cards">
            <van-card
              v-for="good in goodList"
              :key="good.id"
              :desc="good.description"
              :price="good.unitPrice * 0.01"
              :thumb="good.imageURL"
              :title="good.name"
            />
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped></style>
