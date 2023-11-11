<script setup lang="ts">
import { getMyTask, postTask, getAllTask, startTask } from '@/api'
import { ref, onMounted } from 'vue'
import { type Task} from '@/api/entity'
import { showNotify } from 'vant'
import router from '@/router'
import { getCategoryStr, getStatusStr } from '@/util/translate'

const images = [
  '/imgs/lesson1.png',
  '/imgs/lesson2.png',
  '/imgs/lesson3.png',
  '/imgs/lesson4.png'
]

const TaskCategory = [
  '农业',
  '牧业',
  '语言',
  '科学',
  '卫生',
  '社会',
  '历史',
  '政治'
]
const TaskCategory_en = ['AGRICULTURE', 'ANIMAL_HUSBANDRY', 'LANGUAGE', 'SCIENCE', 'HYGIENE', 'SOCIETY', 'HISTORY', 'POLITICS']

const active = ref('')
const allTasks = ref<Task[]>([])
const myTasks = ref<Task[]>([])
const allTasks_back = ref<Task[]>([])
const myTasks_back = ref<Task[]>([])

let is_select = ref(Array(8).fill(1))

const load_data = async () => {
  getAllTask().then((result) => {
    allTasks.value = result
    allTasks_back.value = allTasks.value
  })

  getMyTask().then((result) => {
    myTasks.value = result
    myTasks_back.value = myTasks.value
  })

}

onMounted(async () => {
 await load_data()
})

const check_task = (task_id: string) => {
  router.push('/study/taskDetail/' + task_id)
}

const start_task = (task_id: string) => {
  startTask(task_id).then((res) => {
    if (res !== null) {
    }
    console.log(res)
  })
  load_data()

}

const submit = async () => {
  const res = await postTask({
    taskName: '软件项目管理',
    startTime: '1111-11-11 11:11:11',
    endTime: '2222-11-11 11:11:11',
    description: '浙江大学、北京大学、中国农业大学等13校/跨校共建',
    category: 'HYGIENE',
    bonus: 10,
    videoDuration: 13,
    videoURL: 'http://vjs.zencdn.net/v/oceans.mp4'
  })
  console.log(res)
}

const select_tag = (index: number) => {
  is_select.value[index] = 1 - is_select.value[index]

  let allTask_new: Task[] = []
  TaskCategory_en.forEach((category, index) => {
    if (is_select.value[index]) {
      allTasks_back.value.forEach((task) => {
        if (task.category === category) {
          allTask_new.push(task)
        }
      })
    }

  })
  allTasks.value = allTask_new

  let myTask_new: Task[] = []
  TaskCategory_en.forEach((category, index) => {
    if (is_select.value[index]) {
      myTasks_back.value.forEach((task) => {
        if (task.category === category) {
          myTask_new.push(task)
        }
      })
    }

  })
  myTasks.value = myTask_new
}

</script>

<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img class="img_item" :src="image" />
    </van-swipe-item>
  </van-swipe>
  <div>
    <div class="task-category">任务分类</div>
    <div style="display: flex; justify-content: center">
      <div class="tag-container">
        <div
          v-for="(category, index) in TaskCategory"
          :key="index"
          @click="select_tag(index)"
          :class="is_select[index] === 1 ? 'custom_tag_active' : 'custom_tag'"
        >
          {{ category }}
        </div>
      </div>
    </div>
  </div>

  <div>
    <van-tabs v-model:active="active">
      <van-tab title="所有课程">
        <div>
          <div v-for="task in allTasks" :key="task.id">
            <van-card
                :tag="'积分：' + task.bonus"
                :desc="task.description"
                :key="task.id"
                :title="task.taskName"
                :thumb="`/imgs/task${Math.floor(Math.random() * 6) + 1}.png`"
            >
              <template #tags>
                <van-tag plain type="primary">{{
                    getCategoryStr(task.category)
                  }}</van-tag>
                <van-tag plain type="primary">{{
                    getStatusStr(task.status)
                  }}</van-tag>
              </template>

              <template #footer>
                <van-button
                    v-if="task.status === 'IN_PROGRESS'"
                    @click="start_task(task.id)"
                    size="mini"
                >开启</van-button
                >
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
        </div>

      </van-tab>
      <van-tab title="我的学习">
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
<!--              <van-button-->
<!--                v-if="task.status === 'IN_PROGRESS'"-->
<!--                @click="start_task(task.id)"-->
<!--                size="mini"-->
<!--                >开启</van-button-->
<!--              >-->
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
  color: #333; /* Custom text color for the title */
  margin: 16px 0 10px 10px;
}

.tag-container {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.custom_tag {
  flex: 1;
  width: 50px;
  height: 13px;
  line-height: 13px;
  background-color: white;
  color: #3498db;
  border: 1px solid #2980b9;
  border-radius: 20px;
  padding: 5px 20px;
  margin: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
}
.custom_tag_active {
  flex: 1;
  width: 50px;
  background-color: #3498db;
  color: #fff;
  border: 1px solid #2980b9;
  border-radius: 20px;
  padding: 5px 20px;
  margin: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;

}

.custom_tag_acitve:hover {
  background-color: #2980b9;
}
</style>
@/util/translateUtil @/util/translate
