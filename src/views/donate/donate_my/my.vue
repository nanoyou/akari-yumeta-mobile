<script setup lang="ts">
import donateHistory from '@/views/donate/donate_my/donateHistoryCard0.vue'
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
  <donateHistory @navigate="handleNavigateToDetails" />
  <!-- 引入组件 -->
</template>

<style scoped></style>
