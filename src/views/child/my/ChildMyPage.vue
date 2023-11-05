<script setup lang="ts">
import router from "@/router";
import {ref, onMounted} from "vue";
import {getMyInfo} from "@/api";
import type {User, Role} from "@/api/entity";

const back = () => {
  router.push('/login')
}
const tags = ref(['喜欢唱', '喜欢跳', '喜欢rap', 'music', '喜欢唱', '喜欢跳', '喜欢rap', 'music'])
let show_tags = ref(tags.value.slice(0, 3));
let is_show = ref(false)
let user_info = ref<User | null>(null);

onMounted(async () => {
  getMyInfo().then((result) => {
    user_info.value = result;
    console.log(user_info.value);
  })
});

const show_more = () => {
  show_tags.value = tags.value
  is_show.value = true
  console.log(show_tags.value)
}
</script>

<template>
  <div class="head_container">
    <div class="flex_container">
      <img class="head_photo" src="/imgs/xiaoyi.png" alt="">
    </div>
    <div class="flex_container">
      <div class="username">
        {{ user_info?.username }}
      </div>

    </div>

    <div class="tag_container">
      <div class="flex_container" v-for="tag in show_tags">
        <div class="tag_item">{{ tag }}</div>
      </div>
      <div v-if="!is_show" class="tag_item_more" @click="show_more"> > </div>
    </div>
  </div>

  <div class="info_container">
    <div class="word_container">
      <div class="number_info">0</div>
      <div class="word_info">关注</div>
    </div>
    <img class="space_line" src="/imgs/space_line.png" alt="">
    <div class="word_container">
      <div class="number_info">1</div>
      <div class="word_info">被关注</div>
    </div>
    <img class="space_line" src="/imgs/space_line.png" alt="">

    <div class="word_container">
      <div class="number_info">5</div>
      <div class="word_info">看过我</div>
    </div>
  </div>

  <van-cell-group inset>
    <van-field label="昵称" :model-value="user_info?.nickname" readonly />
    <van-field label="角色" :model-value="user_info?.role" readonly />
    <van-field label="性别" :model-value="user_info?.gender" readonly />
    <van-field
        :model-value="user_info?.introduction"
        rows="2"
        autosize
        label="自我介绍"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
    />
  </van-cell-group>

  <div class="button_container">
    <van-button class="exit_button" type="primary" @click="back">退出登录</van-button>
  </div>

</template>

<style scoped>
.head_container {
  height: 80px;
}
.head_container {
  background-image: url("../../../../public/imgs/background.jpg");
  height: 350px;
  background-size: cover;
  background-repeat: no-repeat;
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
}
.tag_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}
.head_photo {
  margin-top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 58px;
  border: 5px solid white;
}
.space_line {
  width: 80px;
}
.info_container {
  display: flex;
  justify-content: center;
  height: 100px;
  text-align:center;
}
.word_container {
  align-items: center; /* 垂直居中 */
  height: 100px;
  margin-top: 30px;
}
.word_info {
color: #BDBDBD;
}
.number_info {
  font-weight: bold;
  font-size: large;
}
.tag_item {
  margin: 0px 8px 8px 0px;
  color: white;
  background-color: #231B54;
  width: 60px;
  text-align: center;
  border-radius: 15px;
  opacity: 0.7;
  font-size: small;
  height: 30px;
  line-height: 30px;
}
.tag_item_more {
  margin: 0px 8px 8px 0px;
  color: white;
  background-color: #231B54;
  width: 30px;
  text-align: center;
  border-radius: 15px;
  opacity: 0.7;
  font-size: small;
  height: 30px;
  line-height: 30px;
}
.button_container {
  justify-content: center;
  display: flex;
}
.exit_button {
  border-radius: 25px;
  width: 100px;
}
</style>