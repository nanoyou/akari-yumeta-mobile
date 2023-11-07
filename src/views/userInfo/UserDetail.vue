<script setup lang="ts">
import { getUserInfo } from '@/api'
import { type UserDTO } from '@/api/entity'
import { ref } from 'vue'
import { watch } from 'vue'
import CommonCard from '@/components/user/CommonCard.vue'
const props = defineProps<{
  userID: string
  perspective: 'me' | 'others'
}>()

const user = ref<UserDTO>()
;(async () => (user.value = await getUserInfo(props.userID)))()
</script>

<template>
  <div class="info-page">
    <CommonCard :user="user!" />
  </div>
</template>

<style scoped>
.info-page {
  display: flex;
}
</style>
