<script setup lang="ts">
const props = defineProps({
  tabbarItems: {
    type: Array<Object>
  }
})
</script>

<template>
  <van-tabbar>
    <van-tabbar-item
      v-for="(item, index) in tabbarItems"
      :key="index"
      :to="item.to"
      :icon="item.icon"
      >{{ item.name }}</van-tabbar-item
    >
  </van-tabbar>
</template>

<style scoped></style>
