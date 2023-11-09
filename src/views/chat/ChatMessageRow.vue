<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    direction: 'left' | 'right'
    avatarURL?: string
    message: string
  }>(),
  {
    avatarURL: '/imgs/xiaoyi.png'
  }
)

const directionClass = computed(() =>
  props.direction === 'right' ? 'row-right' : 'row-left'
)
</script>

<template>
  <div class="message-row" :class="directionClass">
    <div class="avatar">
      <van-image
        height="50px"
        width="50px"
        fit="cover"
        round
        :src="avatarURL"
      />
    </div>
    <div class="message" :class="directionClass">{{ message }}</div>
  </div>
</template>

<style scoped>
.message-row {
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.message-row.row-right {
  flex-direction: row-reverse;
}
.avatar {
  margin: 15px;
}
.message {
  background-color: white;
  height: 46px;
  line-height: 46px;
  border-radius: 5px;
  padding: 0 15px 0 15px;
}
.message.row-right {
  background-color: #0199fe;
  color: white;
}
</style>
