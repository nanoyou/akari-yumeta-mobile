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
import BonusDiagram from '@/components/user/BonusDiagram.vue'
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
  router.push('/login')
}
const toMyTask = () => {
  if (props.perspective === 'others') {
    router.push('/myStudyTask/' + props.userID)
  } else {
    router.push('/myStudyTask/000')
  }

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

const images = [
  '/imgs/child1.jpg',
  '/imgs/child2.jpg',
  '/imgs/child3.jpg',
  '/imgs/child4.jpg'
]
</script>

<template>
  <div class="info-page" :class="navBarClass">
    <CommonCard :user="user" />

    <van-cell title="个人介绍" :label="user?.introduction"></van-cell>
    <van-cell-group title="捐助信息" v-if="user?.role === Role.Sponsor">
      <DonateHistory
        @navigate="handleNavigateToDetails"
        class="user_detail_container"
        :style="{ height: '120px' }"
      />

      <DonateChart class="user_detail_container" :style="{ height: '230px' }" />
    </van-cell-group>
    <van-cell-group title="学习信息" v-if="user?.role === Role.Child">
      <van-cell
        title="学习课程"
        @click="toMyTask"
        clickable
        is-link
        icon="notes-o"
      >
      </van-cell>
      <van-cell title="学习积分变化">
        <template #label>
          <div
            style="width: 100vw; height: 140px; transform: translateY(-60px)"
          >
            <BonusDiagram></BonusDiagram>
          </div>
        </template>
      </van-cell>
      <van-cell title="照片墙">
        <template #label>
          <div
            style="
              display: flex;
              margin-top: 10px;
              margin-bottom: 10px;
              width: calc(100vw - 40px);
              overflow: scroll;
            "
          >
            <img
              v-for="(photo, index) in images"
              :key="index"
              class="comment_photo"
              :src="photo"
            />
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-cell-group v-if="perspective == 'me'" title="操作">
      <van-cell title="退出登录" @click="logout" clickable is-link>
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
.info-page.with-nav-bar {
  margin-top: 46px;
}
.comment_photo {
  width: 90px;
  height: 85px;
  margin-left: 5px;
  object-fit: cover;
}
</style>
