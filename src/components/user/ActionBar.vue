<script setup lang="ts">
import type { UserDTO } from '@/api/entity'
import { Role } from '@/api/entity'
import { useBarStore, useUserStore } from '@/stores'
import { ref, onBeforeMount, onUnmounted } from 'vue'
import { isFollowed } from '@/api'
import { computed } from 'vue'
import { follow } from '@/api'
import { showNotify } from 'vant'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const props = defineProps<{
  user?: UserDTO
  perspective: 'me' | 'others'
}>()

const userStore = useUserStore()
const userLoggedIn = computed(() => userStore.user)

const subscribed = ref(false)
const liked = ref(false)
const barStore = useBarStore()
onBeforeMount(() => {
  if (props.perspective == 'others') {
    barStore.setShowTabBar(false)
  }
})
onMounted(() => {
  ;(async () => {
    if (props.user === undefined) {
      return
    }
    subscribed.value = await isFollowed(props.user?.id)
    console.log(subscribed.value)
  })()
})
onUnmounted(() => {
  if (props.perspective == 'others') {
    barStore.unsetShowTabBar()
  }
})

const clickFollow = async () => {
  try {
    if (props.user === undefined) return

    await follow(props.user.id)
    subscribed.value = true
  } catch (e) {
    console.log('关注失败', e)
  }
}

const clickLike = () => {
  liked.value = true
  showNotify({
    type: 'success',
    message: '点赞成功'
  })
}

const router = useRouter()
</script>

<template>
  <van-action-bar v-if="perspective == 'others'">
    <van-action-bar-icon
      icon="gold-coin-o"
      text="捐助"
      v-if="userLoggedIn?.role == Role.Sponsor"
      @click="router.push(`/money/${user?.id}`)"
    />

    <van-action-bar-icon
      v-if="subscribed"
      icon="star"
      text="已关注"
      color="#ffc71d"
    />
    <van-action-bar-icon
      v-else
      icon="star-o"
      text="关注"
      color="#ffc71d"
      @click="clickFollow"
    />
    <van-action-bar-icon
      color="#ff5000"
      v-if="liked"
      icon="good-job"
      text="点赞"
    />
    <van-action-bar-icon
      v-else
      icon="good-job-o"
      text="点赞"
      color="#ff5000"
      @click="clickLike"
    />
    <van-action-bar-button
      type="danger"
      text="发消息"
      @click="router.push(`/chat/dialog/${user?.id}`)"
    />
  </van-action-bar>
</template>

<style scoped></style>
