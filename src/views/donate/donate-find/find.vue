<script setup lang="ts">
import { ref } from 'vue'
import { getUserList, getFolloweeList } from '@/api'
import type { User } from '@/api/entity'
import { Role, Gender } from '@/api/entity'
import { useUserStore } from '@/stores'
import userCard from './user-card.vue'
const userStore = useUserStore()
// 获取所有用户
async function getAllUser() {
  const res = await getUserList()
  console.log(res)
  return res
}
// 获取关注列表
async function getFollowees() {
  console.log('aaa')
  const res = await getFolloweeList()
  console.log(res)
  return res
}

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
// const tags = ref([
//   { text: '低保', value: '低保' },
//   { text: '孤儿', value: '孤儿' },
//   { text: '单亲', value: '单亲' },
//   { text: '重病', value: '重病' },
//   { text: '遭遇重大灾难', value: '遭遇重大灾难' }
// ])
const xiaoyi: User = {
  avatarURL: '../../public/imgs/xiaoyi.png',
  gender: Gender.Secret,
  id: '123456789',
  introduction: '肥肥胖胖是太阳，鼓鼓当当闹山岗，风风光光小路上，三个吊儿郎当',
  nickname: '蛋筒',
  role: Role.Child,
  usageDuration: 3600,
  username: '小益',
  tags: ['hh', 'heihei', 'yy', 'ss']
}
const goods = [
  {
    id: 'hh',
    name: '书包',
    unitPrice: 50,
    description: 'afawfawefw',
    imageURL: '../../public/imgs/xiaoyi.png'
  },
  {
    id: 'hh',
    name: '书包',
    unitPrice: 50,
    description: 'afawfawefw',
    imageURL: '../../public/imgs/xiaoyi.png'
  },
  {
    id: 'hh',
    name: '书包',
    unitPrice: 50,
    description: 'afawfawefw',
    imageURL: '../../public/imgs/xiaoyi.png'
  },
  {
    id: 'hh',
    name: '书包',
    unitPrice: 50,
    description: 'afawfawefw',
    imageURL: '../../public/imgs/xiaoyi.png'
  }
]
const children = ref([xiaoyi])
const isFollowed = ref(false)
function follow(userID: string) {
  console.log('click follow' + userID)
}
</script>

<template>
  <div id="navi-tab">
    <van-tabs sticky @click-tab="choice = !choice">
      <van-tab title="资助儿童">
        <div id="show_children" v-show="choice">
          <span class="search-bar">
            <van-search placeholder="请输入搜索关键词" />
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
                v-for="child in children"
                :key="child.id"
                :user="xiaoyi"
                :is-followed="isFollowed"
                @follow="follow"
              />
            </van-list>
          </div>
        </div>
      </van-tab>
      <van-tab title="捐助物品">
        <div id="show_goods" v-show="!choice">
          <span class="search-bar">
            <van-search placeholder="请输入搜索关键词" />
          </span>
          <div class="show_cards">
            <van-card
              v-for="good in goods"
              :key="good.id"
              :desc="good.description"
              :price="good.unitPrice"
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
