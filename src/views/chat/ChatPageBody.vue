<script setup lang="ts">
import { getChatMessages, myChatList } from '@/api'
import { MessageType, type ChatDTO, type UserDTO } from '@/api/entity'
import { useUserStore } from '@/stores'
import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import ChatBodyRow from './ChatBodyRow.vue'
import router from '@/router'

const userStore = useUserStore()

type MessageRow = ChatDTO & {
  unreadMessages: number
  noInterrupt: boolean
  fixed: boolean
}

const searchValue = ref('')
const messages = ref<MessageRow[]>([])

const loadMessages = async () => {
  const messageList = await myChatList()
  const tempList: MessageRow[] = messageList.map((m) => {
    m.firstMessage.sendTime = m.firstMessage.sendTime.slice(11, -3)
    return { ...m, unreadMessages: 0, noInterrupt: false, fixed: false }
  })
  await Promise.all(
    tempList.map(async (message, index) => {
      tempList[index].unreadMessages = (
        await getChatMessages(message.user.id)
      ).filter((m) => !m.read && m.receiverID === userStore.user?.id).length
    })
  )

  const topMessageList: MessageRow[] = [
    {
      firstMessage: {
        id: '',
        content: 'こんにちは',
        read: false,
        type: MessageType.Text,
        senderID: '',
        receiverID: '',
        sendTime: '19:00'
      },
      fixed: true,
      noInterrupt: true,
      unreadMessages: 0,
      user: { ...userStore.user!, tags: [] }
    }
  ]
  messages.value = topMessageList
    .concat(tempList)
    .sort((m1, m2) => (m1.fixed ? (m2.fixed ? 0 : -1) : 1))
}

onBeforeMount(() => {
  loadMessages()
})
</script>

<template>
  <div class="chat-body">
    <div class="search-container">
      <van-cell-group inset>
        <van-field center v-model="searchValue" placeholder="搜索" />
      </van-cell-group>
    </div>
    <div class="contacts">
      <ChatBodyRow
        v-for="message in messages"
        :key="message.firstMessage.id"
        :avatarURL="message.user.avatarURL"
        :title="message.user.nickname"
        :message="message.firstMessage.content"
        :role="message.user.role"
        :time="message.firstMessage.sendTime"
        :noInterrupt="message.noInterrupt"
        :unreadMessages="message.unreadMessages"
        :fixed="message.fixed"
        @click="router.push(`/chat/${message.user.id}`)"
      />
    </div>
  </div>
</template>

<style scoped>
.search-container {
  margin: 10px 0 10px;
}
</style>
