<script setup lang="ts">
import { getUserList } from '@/api'
import type { UserDTO } from '@/api/entity'
import { isFollowed } from '@/api'
import UserCardW from '@/components/UserCard.vue'
import { onBeforeMount, ref } from 'vue'
import CommonCard from '@/components/user/CommonCard.vue'
import { useUserStore } from '@/stores'
import router from '@/router'
type User = UserDTO & { isFollowed?: boolean }

const userStore = useUserStore()
const users = ref<User[]>([])
onBeforeMount(async () => {
  const tempList: User[] = (await getUserList()).filter(
    (u) => u.id !== userStore.user?.id
  )
  await Promise.all(
    tempList.map(async (user, index) => {
      tempList[index].isFollowed = await isFollowed(user.id)
    })
  )
  users.value = tempList
})

const followed = (userID: string) => {
  users.value.forEach((u) => {
    if (u.id == userID) {
      u.isFollowed = true
    }
  })
}
</script>

<template>
  <div class="user-list">
    <div class="search-box"></div>
    <CommonCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      :isFollowed="user.isFollowed || false"
      :showFollowButton="true"
      @followed="followed"
      @click="router.push(`/user/${user.id}`)"
    />
  </div>
</template>

<style scoped>
.user-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
