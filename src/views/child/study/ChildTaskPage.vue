<template>
  <van-tabs v-model:active="active">
    <van-tab title="课程详细">
      <div v-if="taskDetail !== null" class="task-details">
        <h2>{{ taskDetail.taskName }}</h2>
        <table>
          <tr>
            <td class="wider-col">课程描述:</td>
            <td>{{ taskDetail.description }}</td>
          </tr>
          <tr>
            <td>课程分类:</td>
            <td>{{ Category[taskDetail.category] }}</td>
          </tr>
          <tr>
            <td>积分奖励:</td>
            <td>{{ taskDetail.bonus }}</td>
          </tr>
          <tr>
            <td>创建时间:</td>
            <td>{{ taskDetail.createdTime }}</td>
          </tr>
          <tr>
            <td>开始时间:</td>
            <td>{{ taskDetail.startTime }}</td>
          </tr>
          <tr>
            <td>结束时间:</td>
            <td>{{ taskDetail.endTime }}</td>
          </tr>
          <!-- 其他任务详情属性 -->
        </table>
      </div>
    </van-tab>
    <van-tab title="学习讨论区">

    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref, onMounted  } from 'vue'
import { defineProps } from 'vue';
import {getTaskDetail, getTaskDynamic} from "@/api";
import {Category, Status, Task} from "@/api/entity";
const { taskId } = defineProps(['taskId']);
const taskDetail = ref<Task>(null);
const active = ref('')


onMounted(async () => {
  try {
    const result = await getTaskDetail(taskId);
    taskDetail.value = result;
    console.log(result);
  } catch (error) {
    console.error('Error fetching task detail:', error);
  }

  // try {
  //   const result = await getTaskDynamic(taskId);
  //   taskDetail.value = result;
  //   console.log(result);
  // } catch (error) {
  //   console.error('Error fetching task detail:', error);
  // }
});
</script>

<style scoped>
.wider-col {
  width: 20%; /* 设置左侧列宽度 */
}
</style>