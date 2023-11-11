<script setup lang="ts">
import router from '@/router'
import { ref, onMounted } from 'vue'
import { getMyInfo } from '@/api'
import type { User } from '@/api/entity'
import { Role } from '@/api/entity'
import DonateHistory from '@/views/donate/donate_my/DonateHistoryCard0.vue'
const back = () => {
  router.push('/login')
}
const tags = ref([
  '喜欢唱',
  '喜欢跳',
  '喜欢rap',
  'music',
  '喜欢唱',
  '喜欢跳',
  '喜欢rap',
  'music'
])
let show_tags = ref(tags.value.slice(0, 3))
let is_show = ref(false)
let user_info = ref<User | null>(null)

const images = [
  '/imgs/child1.jpg',
  'imgs/child2.jpg',
  '/imgs/child3.jpg',
  '/imgs/child4.jpg'
]

onMounted(async () => {
  getMyInfo().then((result) => {
    user_info.value = result
    console.log(user_info.value)
  })
})

const show_more = () => {
  show_tags.value = tags.value
  is_show.value = true
  console.log(show_tags.value)
}
const handleNavigateToDetails = () => {
  // 在这里执行界面跳转逻辑,暴露给子组件DonateHistoryCard0的
  console.log('执行界面跳转')
  router.push('/testDonateHistory')
}
</script>

<template>
  <div class="user_info_container">
    <div class="head_container">
      <div class="flex_container">
        <img class="head_photo" src="/imgs/xiaoyi.png" alt="" />
      </div>
      <div class="flex_container">
        <div class="username">
          {{ user_info?.username }}
        </div>
      </div>

      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in images" :key="image">
          <img class="img_item" :src="image" />
        </van-swipe-item>
      </van-swipe>

      <div class="tag_container">
        <div class="flex_container" v-for="tag in show_tags" :key="tag">
          <div class="tag_item">{{ tag }}</div>
        </div>
        <div v-if="!is_show" class="tag_item_more" @click="show_more">></div>
      </div>
    </div>

    <div class="info_container">
      <div class="word_container">
        <div class="number_info">0</div>
        <div class="word_info">关注</div>
      </div>
      <img class="space_line" src="/imgs/space_line.png" alt="" />
      <div class="word_container">
        <div class="number_info">1</div>
        <div class="word_info">被关注</div>
      </div>
      <img class="space_line" src="/imgs/space_line.png" alt="" />

      <div class="word_container">
        <div class="number_info">5</div>
        <div class="word_info">积分</div>
      </div>
    </div>

    <div class="user_detail_container">
      <van-cell-group inset>
        <!--        <van-field label="昵称" :model-value="user_info?.nickname" readonly />-->
        <!--        <div class="user_detail_space"></div>-->
        <!--        <van-field label="角色" :model-value="user_info?.role" readonly />-->
        <!--        <div class="user_detail_space"></div>-->
        <!--        <van-field label="性别" :model-value="user_info?.gender" readonly />-->
        <!--        <div class="user_detail_space"></div>-->
        <van-field
          :model-value="user_info?.introduction"
          rows="3"
          autosize
          label="个人介绍"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <!-- //捐助历史卡片 -->
    <DonateHistory
      v-if="user_info?.role === Role.Sponsor"
      @navigate="handleNavigateToDetails"
      class="user_detail_container"
    />
    <div class="button_container">
      <van-button class="function_button" type="primary" @click="back"
        >退出登录</van-button
      >
    </div>

    <!--    <div class="button_group_container">-->
    <!--      <div class="function_div">-->
    <!--        <div class="left_items">-->
    <!--            <van-icon class="chat_icon" size="30" name="chat-o" />-->
    <!--            <span>聊天</span>-->
    <!--        </div>-->
    <!--        <img src="/imgs/more_icon.png" class="more_icon">-->
    <!--      </div>-->

    <!--      <div class="function_div">-->
    <!--        <div class="left_items">-->
    <!--          <van-icon class="donate_icon" size="30" name="gold-coin-o"></van-icon>-->
    <!--          <span>捐助</span>-->
    <!--        </div>-->
    <!--        <img src="/imgs/more_icon.png" class="more_icon">-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<style scoped>
.user_info_container {
  background-color: #ededed;
  height: 100vh;
}
.head_container {
  position: relative;
  background-color: transparent;
  height: 270px;
}
.img_item {
  width: 100%;
  height: 270px;
}
.van-swipe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
}

.van-swipe-item {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.chat_icon {
  margin: 0px 13px 0px 10px;
  color: #2ea86b;
}
.donate_icon {
  margin: 0px 13px 0px 10px;
  color: #f2c629;
}
.button_container {
  justify-content: center;
  display: flex;
  margin-top: 30px;
}
.flex_container {
  display: flex;
  justify-content: center;
}
.username {
  color: white;
  font-size: large;
  font-weight: bold;
  margin-top: 10px;
  z-index: 999;
}
.user_detail_space {
  height: 1px;
  background-color: #ededed;
}
.tag_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.head_photo {
  margin-top: 40px;
  width: 100px;
  height: 100px;
  border-radius: 58px;
  border: 5px solid white;
  z-index: 999;
}
.space_line {
  width: 80px;
}
.info_container {
  display: flex;
  justify-content: center;
  height: 80px;
  text-align: center;
  background-color: white;
}
.user_detail_container {
  background-color: white;
  margin-top: 10px;
}
.word_container {
  align-items: center; /* 垂直居中 */
  height: 80px;
  margin-top: 20px;
}
.word_info {
  color: #bdbdbd;
}
.number_info {
  font-weight: bold;
  font-size: large;
}
.tag_item {
  margin: 0px 8px 8px 0px;
  color: black;
  background-color: white;
  width: 60px;
  text-align: center;
  border-radius: 15px;
  opacity: 0.7;
  font-size: small;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.tag_item_more {
  margin: 0px 8px 8px 0px;
  color: black;
  background-color: white;
  width: 30px;
  text-align: center;
  border-radius: 15px;
  opacity: 0.7;
  font-size: small;
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.button_group_container {
  justify-content: center;
  margin-top: 10px;
}
.function_div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  background-color: white;
  height: 50px;
  line-height: 50px;
}
.left_items {
  display: flex;
  align-items: center;
}
.function_button {
  margin-top: 10px;
  width: 80%;
  border-radius: 20px;
}
.more_icon {
  margin-top: 10px;
  height: 30px;
}
</style>
