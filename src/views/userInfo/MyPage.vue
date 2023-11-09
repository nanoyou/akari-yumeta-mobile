<script setup lang="ts">
import { useUserStore } from '@/stores'
import UserDetail from './UserDetail.vue'
import DonateHistory from '@/views/donate/donate_my/DonateHistoryCard0.vue'
import DonateChart from '@/views/donate/donate_my/DonateChart.vue'
import { useRouter } from 'vue-router'
import type { User } from '@/api/entity'
import { Role } from '@/api/entity'
const userStore = useUserStore()
if (userStore.user == null) {
  // router.push('/login')
  // window.location.href = '/login'
}
const router = useRouter()
const handleNavigateToDetails = () => {
  // 在这里执行界面跳转逻辑
  console.log('执行界面跳转')
  router.push('/testDonateHistory')
}
</script>

<template>
  <UserDetail :userID="userStore.user!.id" perspective="me" />
</template>

<style scoped>
.user_detail_container {
  background-color: white;
  margin-top: 1px;
}
</style>
