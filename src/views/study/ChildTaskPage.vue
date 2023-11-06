<template>
  <div class="video_page">
    <div class="video_container">
      <video controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
    </div>
  </div>

  <van-tabs v-model:active="active">
    <van-tab title="课程详细">
      <div v-if="taskDetail !== null">
        <div class="task-details">
          <div class="class_name">{{ taskDetail.taskName }}</div>
          <div class="class_description">{{ taskDetail.description }}</div>
        </div>

        <div class="class_detail">
          <div class="class_detail_items">
            <div class="class_detail_items_word">积分</div>
            <div class="class_detail_items_number">{{ taskDetail.bonus }}</div>
          </div>
          <div style="width: 30px"></div>
          <div class="class_detail_items">
            <div class="class_detail_items_word">类别</div>
            <div class="class_detail_items_number">{{ Category[taskDetail.category] }}</div>
          </div>
        </div>
      </div>

      <div class="teacher_team">
        <div class="teacher_team_word">教师团队</div>
          <div class="teacher_team_card">
            <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="">
            <div class="teacher_info">
              <div class="teacher_name">楼程富</div>
              <div class="teacher_tags">浙江大学教授、博导</div>
              <div class="teacher_description">博导、浙江大学原教务处处长，曾任教育部动物科学教指委副主任、全国高校教学管理研究会常务理事、中国蚕学会副理事长等。</div>
            </div>
          </div>
          <div class="teacher_team_card">
          <img class="teacher_photo" src="/imgs/teacher2.jpg" alt="">
          <div class="teacher_info">
            <div class="teacher_name">郑晓冬</div>
            <div class="teacher_tags">浙江大学教授、博导导</div>
            <div class="teacher_description">博导，浙江大学求是特聘教授，国务院政府特殊津贴获得者、浙江省生物工程学会副理事长、杭州市食品安全监督协会会长，曾任浙江大学食品科学研究所所长、农业部农产品质量安全专家委员会专家、浙江省食品学会常务理事。</div>
          </div>
        </div>
          <div class="teacher_team_card">
          <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="">
          <div class="teacher_info">
            <div class="teacher_name">楼程富</div>
            <div class="teacher_tags">浙江大学教授、博导</div>
            <div class="teacher_description">博导、浙江大学原教务处处长，曾任教育部动物科学教指委副主任、全国高校教学管理研究会常务理事、中国蚕学会副理事长等。</div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="学习讨论区">
      <div class="comment_card">
        <div class="flex_container">
          <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="">
          <div class="teacher_info">
            <div class="teacher_name">
              <div class="teacher_name2">楼程富</div>
              <img class="teacher_icon" src="/imgs/teach_icon.png" alt="">
            </div>
            <div class="teacher_tags2">
              <div class="teacher_tags">浙江大学</div>
              <div class="teacher_tags">04月14日</div>
            </div>
          </div>
        </div>

        <div class="comment_word">请简述细菌污染食品的途径有哪些?</div>
        <div class="comment_card_foot">
          <div>3,187回答</div>
          <div style="width: 50px"></div>
          <div>310围观</div>
          <div style="width: 50px"></div>
          <div>已围观</div>
        </div>
      </div>
      <img class="line" src="/imgs/line.png" alt="">
      <div class="comment_card">
        <div class="flex_container">
          <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="">
          <div class="teacher_info">
            <div class="teacher_name">
              <div class="teacher_name2">楼程富</div>
              <img class="teacher_icon" src="/imgs/teach_icon.png" alt="">
            </div>
            <div class="teacher_tags2">
              <div class="teacher_tags">浙江大学</div>
              <div class="teacher_tags">04月14日</div>
            </div>
          </div>
        </div>

        <div class="comment_word">简述注水肉的鉴别方法，简述注水肉的鉴别方法</div>
        <div class="comment_card_foot">
          <div>3,187回答</div>
          <div style="width: 50px"></div>
          <div>310围观</div>
          <div style="width: 50px"></div>
          <div>已围观</div>
        </div>
      </div>
      <img class="line" src="/imgs/line.png" alt="">
      <div class="comment_card">
        <div class="flex_container">
          <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="">
          <div class="teacher_info">
            <div class="teacher_name">
              <div class="teacher_name2">楼程富</div>
              <img class="teacher_icon" src="/imgs/teach_icon.png" alt="">
            </div>
            <div class="teacher_tags2">
              <div class="teacher_tags">浙江大学</div>
              <div class="teacher_tags">04月14日</div>
            </div>
          </div>
        </div>

        <div class="comment_word">食品添加剂可以随便添加到食品中吗? 请详细说明，食品添加剂可以随便添加到食品中吗?请详细说明</div>
        <div class="comment_card_foot">
          <div>3,187回答</div>
          <div style="width: 50px"></div>
          <div>310围观</div>
          <div style="width: 50px"></div>
          <div>已围观</div>
        </div>
      </div>
      <img class="line" src="/imgs/line.png" alt="">
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

});
</script>

<style scoped>
.line {
  width: 350px;
}
.comment_card_foot {
  display: flex;
  margin: 10px 10px 0px 25px;
  color: #9F9EA4;
  font-size: 12px;
}
.comment_word {
  margin: 10px 10px 0px 25px;
}
.teacher_name {
  display: flex;
  justify-content: left;
}
.teacher_tags2 {
  display: flex;
  justify-content: space-between;
  width: 250px;
}
.teacher_icon {
  width: 20px;
  height: 20px;
  margin-top: 18px;
}
.comment_card {
  margin-top: 10px;
}
.teacher_description {
  margin: 8px 10px 10px 0px;
  font-size: 12px;
}
.teacher_name {
  margin-top: 8px;
}
.teacher_name2 {
  margin-top: 15px;
  font-weight: bold;
}
.teacher_tags {
  color: #9F9EA4;
  font-size: 12px;
  margin-top: 5px;
}
.teacher_photo {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin: 10px;
}
.flex_container {
  justify-content: center;
  display: flex;
}
.teacher_team_card {
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  display: flex;
}

.teacher_team {
  margin: 18px;
  font-size: 15px;
}
.class_detail_items_word {
  color: #AFAFAF;
}
.class_detail_items_number {
  margin-left: 10px;
}
.class_detail_items {
  display: flex;
}
.class_detail {
  display: flex;
  margin: 30px 0px 0px 15px;
  font-size: 12px;
}
.class_name {
  font-size: 25px;
  font-weight: bold;
  margin: 10px 0px 0px 15px;
}
.class_description {
  margin: 10px 0px 0px 15px;
  color: #696969;
  font-size: 13px;
}
.wider-col {
  width: 20%; /* 设置左侧列宽度 */
}
.video-page {
  height: 100%;
}

.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 44px);
}

video {
  max-width: 100%;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
</style>