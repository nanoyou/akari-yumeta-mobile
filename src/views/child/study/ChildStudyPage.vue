<script setup lang="ts">
import {getMyTask, postTask, getTask} from '@/api'
import { ref } from 'vue'

const active = ref('')
const images = [
  '../../../../public/imgs/lesson1.png',
  '../../../../public/imgs/lesson2.png',
  '../../../../public/imgs/lesson3.png',
  '../../../../public/imgs/lesson4.png',
];

const TaskCategory = ['农业', '牧业', '语言', '科学', '卫生', '社会', '历史', '政治']


getTask().then((result) => {
  console.log(result)
})

const submit = async () => {
  const res = await postTask({
    taskName: "string",
    taskUploaderID: "string",
    startTime: "1111-11-11 11:11:11",
    endTime: "1111-11-11 11:11:11",
    description: "string",
    category: "AGRICULTURE",
    bonus: 0,
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
          class="custom-cell"
          :title="category"
      />
    </div>
  </div>

  <div>
    <van-tabs v-model:active="active">
      <van-tab title="我的学习"></van-tab>
      <van-tab title="所有课程"></van-tab>
    </van-tabs>

    <van-card
        desc="描述信息"
        title="商品标题"
        thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
    >
      <template #tags>
        <van-tag plain type="primary">标签</van-tag>
        <van-tag plain type="primary">标签</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </template>
    </van-card>
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