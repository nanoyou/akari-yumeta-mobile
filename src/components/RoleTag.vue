<script setup lang="ts">
import { Role } from '@/api/entity'

defineProps<{
  role?: Role
}>()
</script>

<template>
  <van-tag size="medium" type="primary" v-if="role == Role.Volunteer"
    >志愿者</van-tag
  >
  <van-tag size="medium" type="warning" v-else-if="role == Role.Child"
    >儿童</van-tag
  >
  <van-tag size="medium" type="success" v-else>捐助者</van-tag>
</template>

<style scoped></style>
