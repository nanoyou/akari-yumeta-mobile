<script setup lang="ts">
import { useUserStore } from '@/stores'
import UserDetail from './UserDetail.vue'

const userStore = useUserStore()
</script>

<template>
  <UserDetail :userID="userStore.user!.id" perspective="me" />
</template>

<style scoped></style>
