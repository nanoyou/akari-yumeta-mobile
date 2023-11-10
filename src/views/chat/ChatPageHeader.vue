<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores'
import { computed } from 'vue'

const userStore = useUserStore()
const user = computed(() => userStore.user)
</script>

<template>
  <div class="head-container">
    <van-badge dot :offset="[-18, 18]">
      <van-image
        width="50px"
        height="50px"
        round
        fit="cover"
        :src="user?.avatarURL || '/imgs/xiaoyi.png'"
        @click="router.push('/my')"
      />
    </van-badge>
    <div class="content">
      <div class="user-name">{{ user?.nickname }}</div>
      <div class="online-status">
        <div class="online-status-icon"></div>
        <div class="online-status-word">在线</div>
      </div>
    </div>
    <div class="extra">
      <van-icon name="plus" size="24px" @click="router.push('/user')" />
    </div>
  </div>
</template>

<style scoped>
.head-container {
  background-color: #02c0fe;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

.van-image {
  margin: 8px 15px 5px 15px;
}

.content {
  flex: 1;
  color: #fefefe;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.online-status {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.online-status-icon {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #1fe087;
  margin-right: 5px;
}
.online-status-word {
  font-size: small;
}
.user-name {
  font-size: large;
  margin-bottom: 5px;
}
.extra {
  color: #fff;
  margin-right: 15px;
}
</style>
