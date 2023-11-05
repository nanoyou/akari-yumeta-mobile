<script setup lang="ts">
import { computed, ref } from 'vue'
import userCard from './user-card.vue'
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
let children = ref([
  {
    avatarURL: '../../../public/imgs/xiaoyi.png',
    username: '小益',
    gender: '男',
    introduction:
      '肥肥胖胖是太阳，鼓鼓当当闹山岗，风风光光小路上，三个吊儿郎当',
    tags: ['1', '2', '3']
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: [
      '1',
      '2',
      '3',
      '2',
      '3',
      '2',
      '3',
      '2',
      '3',
      '2',
      '3',
      '2',
      '3',
      '2',
      '3',
      '2',
      '3',
      '2',
      '3'
    ]
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: ['1', '2', '3']
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: ['1', '2', '3']
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: ['1', '2', '3']
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: ['1', '2', '3']
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: ['1', '2', '3']
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: ['1', '2', '3']
  },
  {
    avatarURL: 'aaa',
    username: 'aaa',
    gender: 'aaa',
    introduction: 'aaa',
    tags: ['1', '2', '3']
  }
])
</script>

<template>
  <div id="navi-tab">
    <van-tabs sticky @click="choice = !choice">
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
                :key="child.username"
                :avatarURL="child.avatarURL"
                :username="child.username"
                :gender="child.gender"
                :introduction="child.introduction"
                :tags="child.tags"
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
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped></style>
