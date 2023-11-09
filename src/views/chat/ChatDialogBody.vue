<script setup lang="ts">
import { onBeforeMount } from 'vue'
import ChatMessageRow from './ChatMessageRow.vue'
import { computed } from 'vue'
import router from '@/router'
import { ref } from 'vue'
import type { Message, UserDTO } from '@/api/entity'
import { getChatMessages, getUserInfo } from '@/api'
import { useUserStore } from '@/stores'
import { onUnmounted } from 'vue'

const userID = computed(() => router.currentRoute.value.params.userID as string)
const friend = ref<UserDTO>()
const userStore = useUserStore()
const user = computed(() => userStore.user)
const messages = ref<(Message & { time?: string })[]>()
let stopPolling: number

const sync = async () => {
  friend.value = await getUserInfo(userID.value)
  messages.value = await getChatMessages(userID.value)
}

onBeforeMount(async () => {
  sync()
  stopPolling = setInterval(sync, 500)
})

onUnmounted(() => {
  clearInterval(stopPolling)
})
</script>

<template>
  <div class="dialog-body">
    <ChatMessageRow
      v-for="message in messages"
      :key="message.id"
      :direction="message.senderID === user?.id ? 'right' : 'left'"
      :avatarURL="
        message.senderID === user?.id ? user?.avatarURL : friend?.avatarURL
      "
      :message="message.content"
      :time="message.time"
    />
  </div>
</template>

<style scoped>
.dialog-body {
  width: 100%;
  height: calc(100vh - 140px);
  overflow: scroll;
}
</style>
