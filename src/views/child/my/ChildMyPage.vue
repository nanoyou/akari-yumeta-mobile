<script setup lang="ts">
import router from "@/router";

const back = () => {
  router.push('/login')
}
</script>

<template>
  <div>儿童个人界面</div>
  <div style="display: flex; justify-content: center">
    <van-button type="primary" @click="back">退出登录</van-button>
  </div>

</template>

<style scoped>

</style>