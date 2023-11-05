<script setup lang="ts">
import {getMyTask, postTask, getAllTask, startTask} from '@/api'
import { ref, onMounted  } from 'vue'
import {Task, Category, Status} from '@/api/entity'
import {showNotify} from "vant";
import router from "@/router";

const images = [
  '../../../../public/imgs/lesson1.png',
  '../../../../public/imgs/lesson2.png',
  '../../../../public/imgs/lesson3.png',
  '../../../../public/imgs/lesson4.png',
];
const TaskCategory = ['农业', '牧业', '语言', '科学', '卫生', '社会', '历史', '政治']
const active = ref('')
const tasks = ref<Task[]>([]);

onMounted(async () => {
  getAllTask()
      .then((result) => {
        tasks.value = result;
        console.log(result);
      })

  getMyTask()
      .then((result) => {
        tasks.value = result;
        console.log(result);
      })
});

const getMy_task = () => {
  getMyTask()
      .then((result) => {
        tasks.value = result;
        console.log(result);
      })
}

const check_task = (task_id) => {
  router.push('/child/study/taskDetail/' + task_id)
}

const start_task = (task_id) => {
  try {
    startTask(task_id).then((res) => {
      if (res !== null) {
        showNotify({ type: 'success', message: '开启成功' })
      }
      console.log(res)
    })

  } catch (e) {

  }
}

const submit = async () => {
  const res = await postTask({
    taskName: "课程222",
    taskUploaderID: "string",
    startTime: "1111-11-11 11:11:11",
    endTime: "2222-11-11 11:11:11",
    description: "阿珂is崇拜水彩笔八十次八次阿萨本次阿爸上次阿不擦啊擦拭擦拭擦拭擦拭擦拭擦擦",
    category: "HYGIENE",
    bonus: 10,
    videoURL: "string"
  })
  console.log(res)
}

</script>

<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img class="img_item" :src="image" />
    </van-swipe-item>
  </van-swipe>
  <div>
    <div class="task-category">
      任务分类
    </div>
    <div class="custom-cell-container">
      <van-cell
          v-for="(category, index) in TaskCategory"
          :key="index"
          @click="submit"
          class="custom-cell"
          :title="category"
      />
    </div>
  </div>

  <div>
    <van-tabs v-model:active="active">
      <van-tab title="所有课程">
        <div v-for="(task, index) in tasks">
          <van-card
              :tag="'积分：' + task.bonus "
              :desc="task.description"
              :title="task.taskName"
              :thumb="`../../../../public/imgs/task${Math.floor(Math.random() * 6) + 1}.png`"
          >
            <template #tags>
              <van-tag plain type="primary">{{ Category[task.category] }}</van-tag>
              <van-tag plain type="primary">{{ Status[task.status] }}</van-tag>
            </template>

            <template #footer>
              <van-button v-if="task.status === 'IN_PROGRESS'" @click="start_task(task.id)" size="mini">开启</van-button>
              <van-button @click="check_task(task.id)" size="mini">查看</van-button>

            </template>

            <template #bottom>
              <div>
                <div>开始时间：{{ task.startTime }}</div>
                <div>结束时间：{{ task.endTime }}</div>
              </div>
            </template>
          </van-card>
        </div>
      </van-tab>
      <van-tab title="我的学习">

      </van-tab>
    </van-tabs>
    <div style="height: 50px"></div>

  </div>

</template>

<style scoped>
.task-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.img_item {
  width: 100%;
  height: 150px;
}
.task-category {
  font-size: 16px; /* Custom font size for the title */
  font-weight: bold; /* Make the title bold */
  margin-bottom: 16px; /* Add some spacing below the title */
  color: #333; /* Custom text color for the title */
  margin: 10px 0 10px 10px;
}

.custom-cell-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.task-tags {
  display: flex;
  margin-bottom: 16px;
  margin-left: 10px;
}

.task-tag {
  background-color: #8ab9db;
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  margin-right: 10px;
  cursor: pointer;
  height: 10px;
  font-size: 10px;
  font-weight: bold;
}
.custom-cell {
  width: calc(25% - 16px); /* 4 items in a row with 16px spacing between */
  background: linear-gradient(135deg, #ffce32, #ff7518); /* Gradient background */
  text-align: center;
  font-size: 20px; /* Custom font size */
  padding: 10px;
  margin: 8px;
  border-radius: 8px;
  color: #333; /* Custom text color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Custom box shadow */
  transition: background 0.3s ease-in-out; /* Transition effect for background change */

  /* Hover effect */
  &:hover {
    background: linear-gradient(135deg, #ffaf00, #ff4b00); /* Custom background on hover */
  }
}
</style>