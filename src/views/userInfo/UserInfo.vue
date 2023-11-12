<script setup lang="ts">
import { useRouter } from 'vue-router'
import UserDetail from './UserDetail.vue'
import { computed } from 'vue'

const route = useRouter()
const userID = computed(() => route.currentRoute.value.params.userID as string)


</script>

<template>
  <UserDetail :userID="userID" perspective="others" />
</template>

<style scoped></style>
