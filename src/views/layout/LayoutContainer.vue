<script setup lang="ts">
const onClickLeft = () => history.back();
</script>

<template>
  <div class="container-layout">
    <van-nav-bar
      v-if="$route.meta.showTopBar"
      :title="$route.meta.title"
      left-text="返回"
      @click-left="onClickLeft"
      left-arrow
    >
    </van-nav-bar>

    <router-view></router-view>

    <TabbarComponent
      v-if="$route.meta.showTabBar"
      :tabbarItems="$route.meta.tabbarItems"
    ></TabbarComponent>
  </div>
</template>

<style scoped></style>
