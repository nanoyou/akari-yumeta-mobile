<script setup lang="ts">
import { getUserInfo } from '@/api'
import { Role, type UserDTO } from '@/api/entity'
import { ref } from 'vue'
import CommonCard from '@/components/user/CommonCard.vue'
import pinia, { useUserStore, useBarStore } from '@/stores'
import { onMounted } from 'vue'
import router from '@/router'
import { onUnmounted } from 'vue'
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

    <van-cell title="个人介绍" :label="user?.introduction"></van-cell>
    <van-cell-group>
      <van-cell
        v-if="perspective == 'me'"
        title="退出登录"
        @click="logout"
        clickable
        is-link
      >
        <template #icon>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 5px;
            "
          >
            <van-icon name="/icon/quit.svg" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <ActionBar :user="user" :perspective="perspective" />
  </div>
</template>

<style scoped>
.info-page {
  display: flex;
  width: 100%;

  flex-direction: column;
}
</style>
