<script setup lang="ts">

import {getStatusStr} from "@/util/translate";
import {onMounted, ref} from "vue";
import {getChildTasks, getMyTask} from "@/api";
import {type Task} from "@/api/entity";
import router from "@/router";
const { userId } = defineProps(['userId'])
const myTasks = ref<Task[]>([])

onMounted(async () => {
  console.log(userId)
  if (userId === '000') {
    getMyTask().then((result) => {
      myTasks.value = result
    })
  } else {
    getChildTasks(userId).then((result) => {
      myTasks.value = result
    })
  }
})

const check_task = (task_id: string) => {
  router.push('/study/taskDetail/' + task_id)
}

</script>

<template>
  <div v-for="task in myTasks" :key="task.id">
    <van-card
        :tag="'积分：' + task.bonus"
        :desc="task.description"
        :key="task.id"
        :title="task.taskName"
        :thumb="`/imgs/task${Math.floor(Math.random() * 6) + 1}.png`"
    >
      <template #tags>
        <van-tag plain type="primary">{{}}</van-tag>
        <van-tag plain type="primary">{{
            getStatusStr(task.status)
          }}</van-tag>
      </template>

      <template #footer>
        <van-button @click="check_task(task.id)" size="mini"
        >查看</van-button
        >
      </template>

      <template #bottom>
        <div>
          <div>开始时间：{{ task.startTime }}</div>
          <div>结束时间：{{ task.endTime }}</div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<style scoped>

</style>