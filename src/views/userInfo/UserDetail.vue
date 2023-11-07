<script setup lang="ts">
import { getUserInfo } from '@/api'
import { type UserDTO } from '@/api/entity'
import { ref } from 'vue'
import { watch } from 'vue'
const props = defineProps<{
  userID: string
  perspective: 'me' | 'others'
}>()

const user = ref<UserDTO>()
;(async () => (user.value = await getUserInfo(props.userID)))()
</script>

<template>
  <div>
    {{ user?.username }}
  </div>
  <div>视角: {{ props.perspective }}</div>
</template>

<style scoped></style>
