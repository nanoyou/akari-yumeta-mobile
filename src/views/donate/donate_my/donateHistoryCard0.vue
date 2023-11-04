<script setup lang="ts">
import { useUserStore } from '../../../stores/modules/user'
const userStore = useUserStore()
console.log(userStore.ID)
 
userStore.setID('这是id')

console.log(userStore.ID)

</script>

<template>
  <h1>donateHistoryCard0</h1>
</template>

<style scoped></style>
