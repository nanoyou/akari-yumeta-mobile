<script setup lang="ts">
const tabbarItems = [
  {
    name: '首页',
    icon: 'home-o',
    to: '/home'
  },
  {
    name: '登录',
    icon: 'search',
    to: '/login'
  }
]
</script>

<template>
  <div class="container-layout">
    <h1>LAYOUT1111</h1>
    <router-view></router-view>
    <TabbarComponent :tabbarItems="tabbarItems"></TabbarComponent>
  </div>
</template>

<style scoped></style>
