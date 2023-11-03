<script setup lang="ts">
const tabbarItems = [
  {
    name: '首页',
    icon: 'home-o',
    to: '/home'
  },
  {
    name: '退出登录 ',
    icon: 'close',
    to: '/login'
  }
]
const topBarCfg = {
  title: 'AAA',
  leftText: 'Back'
}
</script>

<template>
  <div class="container-layout">
    <van-nav-bar
      v-if="$route.meta.showTopBar"
      :title="topBarCfg.title"
      :left-text="topBarCfg.leftText"
      left-arrow
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
    <h1>LAYOUT1111</h1>
    <router-view></router-view>
    <TabbarComponent
      v-if="$route.meta.showTabBar"
      :tabbarItems="tabbarItems"
    ></TabbarComponent>
  </div>
</template>

<style scoped></style>
