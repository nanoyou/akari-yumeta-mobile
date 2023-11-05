<script setup lang="ts">
const props = defineProps<{
  tabbarItems: {
    to: string
    icon: string
    name: string
  }[]
}>()
</script>

<template>
  <van-tabbar route>
    <van-tabbar-item
      v-for="(item, index) in props.tabbarItems"
      :key="index"
      :to="item.to"
      :icon="item.icon"
      >{{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
