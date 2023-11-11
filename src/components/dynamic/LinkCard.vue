<script setup lang="ts">
import type { PropType } from 'vue'
import { type TaskCourseDTO } from '@/api/entity'
import { hashStr } from '@/util/hash'

const props = defineProps({
  TaskDetail: {
    type: Object as PropType<TaskCourseDTO>, // Use the type from your import
    required: true // You can set this to false if the prop is optional
  }
})

const taskDetail: TaskCourseDTO = props.TaskDetail
</script>

<template>
  <div class="like_card">
    <img
      class="link_img"
      :src="`/imgs/task${hashStr(taskDetail.id, 6) + 1}.png`"
    />
    <div class="link_word">
      {{ taskDetail.taskName }} : {{ taskDetail.description }}
    </div>
  </div>
</template>

<style scoped>
.like_card {
  margin-top: 8px;
  height: 60px;
  background-color: #f7f7f7;
  width: 90%;
  display: flex;
}
.link_img {
  height: 55px;
  width: 55px;
  object-fit: cover;
}
.link_word {
  font-size: small;
  margin: 8px 5px 0px 10px;
}
</style>
