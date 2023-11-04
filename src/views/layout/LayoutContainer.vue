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
      :title="$route.meta.title"
      :left-text="topBarCfg.leftText"
      left-arrow
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <router-view></router-view>

    <TabbarComponent
      v-if="$route.meta.showTabBar"
      :tabbarItems="$route.meta.tabbarItems"
    ></TabbarComponent>
  </div>
</template>

<style scoped></style>
