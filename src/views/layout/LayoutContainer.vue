<script setup lang="ts">
import { useRoute } from 'vue-router'

const onClickLeft = () => history.back()
const route = useRoute()
</script>

<template>
  <div class="container-layout">
    <van-nav-bar
      v-if="route.meta.showTopBar"
      :title="route.meta.title"
      left-text="返回"
      @click-left="onClickLeft"
      left-arrow
    >
    </van-nav-bar>

    <router-view></router-view>

    <TabbarComponent v-if="$route.meta.showTabBar"></TabbarComponent>
  </div>
</template>

<style scoped></style>
