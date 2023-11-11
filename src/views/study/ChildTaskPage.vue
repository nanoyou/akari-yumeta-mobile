<template>
  <div class="video_page">
    <div class="video_container">
      <video
        v-if="taskDetail !== null"
        controls
        :src="taskDetail?.videoURL"
      ></video>
    </div>
  </div>

  <van-tabs style="background-color: white" v-model:active="active">
    <van-tab title="课程详细">
      <div v-if="taskDetail !== null">
        <div class="task-details">
          <div class="class_name">{{ taskDetail?.taskName }}</div>
          <div class="class_description">{{ taskDetail?.description }}</div>
        </div>

        <div class="class_detail">
          <div class="class_detail_items">
            <div class="class_detail_items_word">积分</div>
            <div class="class_detail_items_number">{{ taskDetail?.bonus }}</div>
          </div>
          <div style="width: 30px"></div>
          <div class="class_detail_items">
            <div class="class_detail_items_word">类别</div>
            <div class="class_detail_items_number">
              {{ getCategoryStr(taskDetail?.category) }}
            </div>
          </div>
        </div>
      </div>

      <div class="teacher_team">
        <div class="teacher_team_word">教师团队</div>
        <div class="teacher_team_card">
          <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="" />
          <div class="teacher_info">
            <div class="teacher_name">楼程富</div>
            <div class="teacher_tags">浙江大学教授、博导</div>
            <div class="teacher_description">
              博导、浙江大学原教务处处长，曾任教育部动物科学教指委副主任、全国高校教学管理研究会常务理事、中国蚕学会副理事长等。
            </div>
          </div>
        </div>
        <div class="teacher_team_card">
          <img class="teacher_photo" src="/imgs/teacher2.jpg" alt="" />
          <div class="teacher_info">
            <div class="teacher_name">郑晓冬</div>
            <div class="teacher_tags">浙江大学教授、博导导</div>
            <div class="teacher_description">
              博导，浙江大学求是特聘教授，国务院政府特殊津贴获得者、浙江省生物工程学会副理事长、杭州市食品安全监督协会会长，曾任浙江大学食品科学研究所所长、农业部农产品质量安全专家委员会专家、浙江省食品学会常务理事。
            </div>
          </div>
        </div>
        <div class="teacher_team_card">
          <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="" />
          <div class="teacher_info">
            <div class="teacher_name">楼程富</div>
            <div class="teacher_tags">浙江大学教授、博导</div>
            <div class="teacher_description">
              博导、浙江大学原教务处处长，曾任教育部动物科学教指委副主任、全国高校教学管理研究会常务理事、中国蚕学会副理事长等。
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    <van-tab title="学习讨论区">
      <div
        class="comments_container"
        v-if="comments_info.length !== 0"
        v-for="comment in comments_info"
      >
        <div class="comment_card">
          <div @click="check_dynamic(comment.id)">
            <div class="flex_container">
              <img class="teacher_photo" :src="comment.photo ? comment.photo : '/imgs/teacher1.jpg'" alt="" />
              <div class="teacher_info">
                <div class="teacher_name">
                  <div class="teacher_name2">{{ comment.name }}</div>
                  <!--                <img class="teacher_icon" src="/imgs/teach_icon.png" alt="" />-->
                </div>
                <div class="teacher_tags2">
                  <div class="teacher_tags">{{ comment.introduction }}</div>
                  <div class="teacher_tags">{{ comment.time }}</div>
                </div>
              </div>
            </div>
            <div class="comment_word">{{ comment.content }}</div>
          </div>

          <div class="comment_card_foot">
            <div>{{ comment.commentNum }}回答</div>
            <div style="width: 50px"></div>
            <div>
              {{ comment.likes }}
              <van-icon
                @click="like_comment(comment.id)"
                size="20"
                name="good-job-o"
              ></van-icon>
            </div>
          </div>
        </div>
        <img class="line" src="/imgs/line.png" alt="" />
      </div>
      <div v-else class="no_comments">暂无讨论</div>
    </van-tab>
  </van-tabs>

  <van-popup v-model:show="showInput" position="bottom" class="input_container">
    <div class="input_title">提问</div>
    <van-cell-group inset>
      <van-field
        v-model="comment_input_words"
        rows="7"
        autosize
        type="textarea"
        maxlength="1000"
        style="z-index: 99999"
        placeholder="写下你的问题，以问号结尾"
        show-word-limit
      />
      <div
        @click="send_comment"
        :class="
          comment_input_words === '' ? 'send_button' : 'send_button_active'
        "
      >
        立即发布
      </div>
    </van-cell-group>
  </van-popup>

  <div @click="showPopup" class="comment_button">
    <van-icon size="30" class="edit_icon" name="edit"></van-icon>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type Ref, ref } from 'vue'
import { getCategoryStr } from '@/util/translate'
import {
  getTaskDetail,
  getTaskDynamic,
  getUserInfo,
  likeComment,
  sendTaskComment
} from '@/api'
import { type commentInfo, type TaskCourseDTO } from '@/api/entity'
import router from '@/router'
import { showNotify } from 'vant'
import { HTTP_HOST } from '@/constants'

const { taskId } = defineProps(['taskId'])
const taskDetail = ref<TaskCourseDTO>()
const active = ref('')
const showInput = ref(false)
const comment_input_words = ref('')
const comments_info: Ref<commentInfo[]> = ref([])

const like_comment = async (commentId: string) => {
  await likeComment(commentId)
  await load_data()
}

const load_data = async () => {
  try {
    const result = await getTaskDetail(taskId)
    if (result.videoURL !== undefined && result.videoURL.startsWith('/')) {
      result.videoURL = HTTP_HOST + result.videoURL
    }
    taskDetail.value = result
    console.log(result)
  } catch (error) {
    console.error('Error fetching task detail:', error)
  }

  const comments = await getTaskDynamic(taskId)
  const userPromises = comments.map(async (comment) => {
    const user = await getUserInfo(comment.commenterID)
    const time =
      comment.createTime.slice(5, 7) +
      '月' +
      comment.createTime.slice(8, 10) +
      '日'

    const data = JSON.parse(comment.content)
    const content = data.text
    return {
      id: comment.id,
      name: user.nickname,
      introduction: user.introduction,
      role: user.role,
      time: time,
      likes: comment.likes,
      content: content,
      answers: comment.children,
      commentNum: comment.children.length,
      photo: user.avatarURL
    }
  })

  comments_info.value = await Promise.all(userPromises)

  console.log(comments_info.value)
}

onMounted(async () => {
  await load_data()
})

const check_dynamic = (dynamic_id: string) => {
  router.push('/study/dynamicDetail/' + dynamic_id)
}

const showPopup = () => {
  showInput.value = true
}

const send_comment = async () => {
  const res = await sendTaskComment({
    content: JSON.stringify({
      text: comment_input_words.value,
      photos: null
    }),
    taskID: taskId
  })
  comment_input_words.value = ''
  showInput.value = false
  await load_data()
  console.log(res)
}
</script>

<style scoped>
.like_button {
}
.comments_container {
  background-color: white;
}
.no_comments {
  margin: 30px;
  font-size: large;
  font-weight: bold;
}
.send_button {
  display: flex;
  justify-content: right;
  color: #c9c9c9;
}
.send_button_active {
  display: flex;
  justify-content: right;
  color: #4e83d1;
}
.input_title {
  margin: 18px;
}
.input_container {
  height: 40%;
  border-radius: 20px 20px 0px 0px;
}
.edit_icon {
  color: white;
  margin-top: 7px;
}
.comment_button {
  position: fixed;
  top: 600px;
  left: 300px;
  background-color: #3f85fe;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  z-index: 999;
  display: flex;
  justify-content: center;
  line-height: 60px;
}

.line {
  width: 350px;
}
.comment_card_foot {
  display: flex;
  margin: 10px 10px 0px 25px;
  color: #9f9ea4;
  font-size: 12px;
}
.comment_word {
  margin: 5px 10px 20px 25px;
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
  color: #9f9ea4;
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
  color: #afafaf;
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
