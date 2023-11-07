<script setup lang="ts">
import { getUserInfo } from '@/api'
import { type UserDTO } from '@/api/entity'
import { ref } from 'vue'
import { watch } from 'vue'
import CommonCard from '@/components/user/CommonCard.vue'
import { useUserStore } from '@/stores'
import router from '@/router'
const props = defineProps<{
  userID: string
  perspective: 'me' | 'others'
}>()

const user = ref<UserDTO>()
;(async () => (user.value = await getUserInfo(props.userID)))()

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  window.location.href = '/login'
}
</script>

<template>
  <div class="info-page">
    <CommonCard :user="user!" />
    <van-cell-group>
      <van-cell title="退出登录" @click="logout" />
    </van-cell-group>
  </div>
</template>

<style scoped>
.info-page {
  display: flex;
  width: 100%;

  flex-direction: column;
}
</style>
