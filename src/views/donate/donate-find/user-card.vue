<template>
  <div class="user-card">
    <div class="avatarURL-wrapper">
      <img :src="avatarURL" alt="user avatarURL" />
    </div>
    <div class="info-wrapper">
      <div class="name-wrapper">
        <div class="username">{{ username }}</div>
        <div class="gender">{{ gender }}</div>
      </div>
      <div class="introduction van-multi-ellipsis--l2">{{ introduction }}</div>
      <div class="tag-wrapper">
        <van-tag
          v-for="(tag, index) in tags"
          :key="index"
          color="#7232dd"
          plain
          type="primary"
          class="tag"
        >
          {{ tag }}
        </van-tag>
      </div>
    </div>
    <div class="follow-button-wrapper">
      <van-button plain round size="small">{{
        isFollowed ? '已关注' : '+ 关注'
      }}</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    avatarURL: String,
    username: String,
    gender: String,
    introduction: String,
    tags: Array,
    isFollowed: Boolean
  }
})
</script>

<style>
.user-card {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.follow-button-wrapper {
  display: flex;
  align-self: flex-start;
  justify-content: flex-end;
  flex-grow: 1;
}

.avatarURL-wrapper {
  margin-right: 10px;
}

.avatarURL-wrapper img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 180px;
}

.name-wrapper {
  display: flex;
  align-items: flex-end;
}

.username {
  font-size: 25px;
  font-weight: bold;
}

.gender {
  margin-left: 10px;
}

.introduction {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}

.tag-wrapper {
  margin-top: 5px;
}

.tag {
  display: inline-block;
  padding: 2px 5px;
  margin-right: 5px;
  background-color: #eee;
  border-radius: 5px;
  font-size: 12px;
}
</style>
