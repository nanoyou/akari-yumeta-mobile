<script setup lang="ts">
import ChatDialogBar from '@/views/chat/ChatDialogBar.vue'
import ChatDialogBody from './ChatDialogBody.vue'
import ChatDialogSendBar from '@/views/chat/ChatDialogSendBar.vue'
</script>

<template>
  <div class="chat-dialog">
    <ChatDialogBar />
    <ChatDialogBody />

    <ChatDialogSendBar />
  </div>
</template>

<style scoped></style>
