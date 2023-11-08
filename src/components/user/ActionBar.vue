<script setup lang="ts">
import type { UserDTO } from '@/api/entity'
import { Role } from '@/api/entity'
import { useBarStore, useUserStore } from '@/stores'
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { isFollowed } from '@/api'
import { computed } from 'vue'

const props = defineProps<{
  user: UserDTO
  perspective: 'me' | 'others'
}>()

const userStore = useUserStore()
const userLoggedIn = computed(() => userStore.user)

const subscribed = ref(false)
const barStore = useBarStore()
onBeforeMount(() => {
  if (props.perspective == 'others') {
    barStore.setShowTabBar(false)
  }
  ;(async () => {
    subscribed.value = await isFollowed(props.user.id)
    console.log(subscribed.value)
  })()
})
onUnmounted(() => {
  if (props.perspective == 'others') {
    barStore.unsetShowTabBar()
  }
})
</script>

<template>
  <van-action-bar v-if="perspective == 'others'">
    <van-action-bar-icon
      icon="gold-coin-o"
      text="捐助"
      v-if="userLoggedIn?.role == Role.Sponsor"
    />

    <van-action-bar-icon
      v-if="subscribed"
      icon="star"
      color="#ff5000"
      text="已关注"
    />
    <van-action-bar-icon v-else icon="star-o" text="关注" />
    <van-action-bar-icon icon="good-job-o" text="点赞" />
    <van-action-bar-button type="danger" text="发消息" />
  </van-action-bar>
</template>

<style scoped></style>
