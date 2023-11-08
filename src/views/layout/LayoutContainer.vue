<script setup lang="ts">
import { useBarStore } from '@/stores'
import { watch } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const onClickLeft = () => history.back()
const route = useRoute()
const barStore = useBarStore()
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

const showTabBar = computed(() => {
  if (barStore.isShowTabBar !== undefined) {
    return barStore.isShowTabBar
  }
  return route.meta.showTabBar
})

const showTopBar = computed(() => {
  if (barStore.isShowTopBar !== undefined) {
    return barStore.isShowTopBar
  }
  return route.meta.showTopBar
})
</script>

<template>
  <div class="container-layout">
    <van-nav-bar
      v-if="showTopBar"
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

    <TabbarComponent v-if="showTabBar"></TabbarComponent>
  </div>
</template>

<style scoped></style>
