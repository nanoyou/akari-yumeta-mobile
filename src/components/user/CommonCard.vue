<script setup lang="ts">
import type { UserDTO } from '@/api/entity'

const props = defineProps<{
  user: UserDTO
}>()
</script>

<template>
  <div class="common-card">
    <div class="avatar">avatar</div>
    <div class="content">xxx</div>
  </div>
</template>

<style scoped>
.common-card {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
}
</style>
