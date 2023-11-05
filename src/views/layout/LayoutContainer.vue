<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const onClickLeft = () => history.back()
const route = useRoute()
const mainStyle = computed(() => {
  const s: string[] = []
  if (route.meta.showTopBar) {
    s.push('margin-top: 46px')
  }
  if (route.meta.showTabBar) {
    s.push('margin-bottom: 50px')
  }
  return s
})
</script>

<template>
  <div class="container-layout">
    <van-nav-bar
      v-if="route.meta.showTopBar"
      :title="route.meta.title"
      left-text="返回"
      @click-left="onClickLeft"
      left-arrow
      fixed
    >
    </van-nav-bar>

    <main :style="mainStyle">
      <router-view></router-view>
    </main>

    <TabbarComponent v-if="$route.meta.showTabBar"></TabbarComponent>
  </div>
</template>

<style scoped></style>
