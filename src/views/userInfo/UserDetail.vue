<script setup lang="ts">
import { getUserInfo } from '@/api'
import { Role, type UserDTO } from '@/api/entity'
import { ref } from 'vue'
import CommonCard from '@/components/user/CommonCard.vue'
import pinia, { useUserStore, useBarStore } from '@/stores'
import { onMounted } from 'vue'
import router from '@/router'
import UserDetail from './UserDetail.vue'
import DonateHistory from '@/views/donate/donate_my/DonateHistoryCard0.vue'
import DonateChart from '@/views/donate/donate_my/DonateChart.vue'
import type { User } from '@/api/entity'
import { onUnmounted } from 'vue'
import { onBeforeMount } from 'vue'
import { computed } from 'vue'
import ActionBar from '@/components/user/ActionBar.vue'
const props = defineProps<{
  userID: string
  perspective: 'me' | 'others'
}>()

const user = ref<UserDTO>()
;(async () => (user.value = await getUserInfo(props.userID)))()

const userStore = useUserStore()
const barStore = useBarStore()

const logout = () => {
  userStore.logout()
  window.location.href = '/login'
}
onBeforeMount(() => {
  if (props.perspective === 'others') {
    barStore.setShowTopBar(true)
  }
})
onUnmounted(() => {
  if (props.perspective === 'others') {
    barStore.unsetShowTopBar()
  }
})

const navBarClass = computed(() =>
  props.perspective === 'me' ? '' : 'with-nav-bar'
)

const handleNavigateToDetails = () => {
  // 在这里执行界面跳转逻辑
  console.log('执行界面跳转')
  router.push('/testDonateHistory')
}
</script>

<template>
  <div class="info-page" :class="navBarClass">
    <CommonCard :user="user" />

    <van-cell title="个人介绍" :label="user?.introduction"></van-cell>
    <DonateHistory
      v-if="userStore.user?.role === Role.Sponsor"
      @navigate="handleNavigateToDetails"
      class="user_detail_container"
      :style="{ height: '120px' }"
    />
    <DonateChart
      v-if="userStore.user?.role === Role.Sponsor"
      class="user_detail_container"
      :style="{ height: '230px' }"
    />
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
    <ActionBar :user="user!" :perspective="perspective" />
  </div>
</template>

<style scoped>
.info-page {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.info-page.with-nav-bar {
  margin-top: 46px;
}
</style>
