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
    <h1>LAYOUT</h1>
    <router-view></router-view>
    <tabbar-component :tabbarItems="tabbarItems"></tabbar-component>
  </div>
</template>

<style scoped></style>
