<script setup lang="ts">
import router from '@/router'
const login = () => {
  router.push('/home')
}
</script>

<template>
  <h1>LOGIN...</h1>
  <van-button type="primary" @click="login">登录</van-button>
</template>

<style scoped></style>
