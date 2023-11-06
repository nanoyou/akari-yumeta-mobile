<script setup lang="ts">
import { Role } from '@/api/entity'
import { useUserStore } from '@/stores'
import { computed } from 'vue'

interface TabbarItem {
  to: string
  icon: string
  name: string
}

const userStore = useUserStore()
const user = userStore.user

const items = {
  dynamic: {
    name: '动态',
    icon: 'star-o',
    to: '/dynamic'
  },
  study: {
    name: '学习',
    icon: 'records-o',
    to: '/study'
  },
  chat: {
    name: '聊天',
    icon: 'chat-o',
    to: '/chat'
  },
  my: {
    name: '我的',
    icon: 'home-o',
    to: '/my'
  }
}

const tabbarItems = computed<TabbarItem[]>(() => {
  switch (user?.role) {
    case "VOLUNTEER":
      // 志愿者
      return [items.dynamic, items.chat, items.my]
    case "CHILD":
      // 孩子
      return [items.dynamic, items.chat, items.study, items.my]
    default:
      // 捐助者
      return [items.dynamic, items.chat, items.my]
  }
})
</script>

<template>
  <van-tabbar route>
    <van-tabbar-item
      v-for="(item, index) in tabbarItems"
      :key="index"
      :to="item.to"
      :icon="item.icon"
      >{{ item.name }}
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
