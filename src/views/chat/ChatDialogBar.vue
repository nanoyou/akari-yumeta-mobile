<script setup lang="ts">
import { getUserInfo } from '@/api'
import { type UserDTO } from '@/api/entity'
import router from '@/router'
import { ref } from 'vue'
import { onBeforeMount } from 'vue'
import { computed } from 'vue'
import VideoCall from './VideoCall.vue'

const userID = computed(() => router.currentRoute.value.params.userID as string)
const videoCall = ref()

const call = async () => {
  console.log(`和 ${userID.value} 发起视频通话`)
  videoCall.value.startCall()
}

const user = ref<UserDTO>()

onBeforeMount(async () => {
  user.value = await getUserInfo(userID.value)
})
</script>

<template>
  <van-nav-bar title="标题">
    <template #left>
      <van-icon
        @click="router.back()"
        class="back_icon"
        size="20"
        name="arrow-left"
        color="white"
      />
    </template>
    <template #title>
      <div class="middle">
        <div class="bar-username">{{ user?.nickname }}</div>
        <div class="online-status">
          <div class="online-status-icon"></div>
          <div class="online-word">在线</div>
        </div>
      </div>
    </template>
    <template #right>
      <van-icon class="extra-button" size="30" name="phone-o" @click="call" />
      <van-icon
        class="extra-button"
        size="30"
        name="ellipsis"
        @click="router.push(`/user/${userID}`)"
      />
    </template>
  </van-nav-bar>
  <VideoCall ref="videoCall" />
</template>

<style scoped>
.online-word {
  font-size: 12px;
  color: white;
  font-weight: normal;
  margin-top: 2px;
}
.online-status {
  display: flex;
  justify-content: center;
  align-items: baseline;
}
.online-status-icon {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #1fe087;
  margin-right: 5px;
}
.bar-username {
  color: white;
  white-space: nowrap;
}
.icon-container {
  display: flex;
  margin-left: 15px;
}
.chat-dialog-bar {
  height: 70px;
  width: 100%;
  justify-content: space-between;

  background-color: #06b8ff;
  display: flex;
  align-items: center;
}
.back-icon {
  color: white;
}
.extra-button {
  color: white;
  margin-left: 15px;
}
.extra {
  display: flex;
  flex-direction: row;
}
.van-nav-bar {
  background-color: #02c0fe;
  --van-nav-bar-height: 70px;
}
</style>
