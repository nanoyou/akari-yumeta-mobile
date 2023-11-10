<script setup lang="ts">
import { sendMessage } from '@/api'
import { MessageType } from '@/api/entity'
import router from '@/router'
import { computed } from 'vue'
import { ref } from 'vue'

const messageInput = ref('')
const userID = computed(() => router.currentRoute.value.params.userID as string)

const send = async () => {
  const msg = await sendMessage(
    userID.value,
    messageInput.value,
    MessageType.Text
  )
  console.log(msg)

  messageInput.value = ''
}
</script>

<template>
  <div class="send-bar">
    <div class="input">
      <van-cell-group inset>
        <van-field v-model="messageInput" />
      </van-cell-group>
    </div>
    <div class="send">
      <van-button type="primary" class="send-button" @click="send"
        >发送</van-button
      >
    </div>
  </div>
</template>

<style scoped>
.send-bar {
  display: flex;
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  background-color: #eee;
}

.input {
  flex: 1;
  height: 50px;
}
.send {
  margin-right: 10px;
}
.send-button {
  --van-primary-color: #0199fe;
  border-radius: 10px;
  height: 35px;
  width: 60px;
}
</style>
