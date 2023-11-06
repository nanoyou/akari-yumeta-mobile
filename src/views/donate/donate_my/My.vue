<script setup lang="ts">
import DonateHistory from '@/views/donate/donate_my/DonateHistoryCard0.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleNavigateToDetails = () => {
  // 在这里执行界面跳转逻辑
  console.log('执行界面跳转')
  router.push('/testDonateHistory')
}
</script>

<template>
  <h1>Mine</h1>
  <DonateHistory @navigate="handleNavigateToDetails" />
  <!-- 引入组件 -->
</template>

<style scoped></style>
