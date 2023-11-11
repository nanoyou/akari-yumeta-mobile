<script setup lang="ts">
import DynamicCard from '@/components/dynamic/DynamicCard.vue'
import router from '@/router'
import { nextTick, onMounted, ref, type Ref } from 'vue'
import {
  getAllDynamic,
  getDynamicDetail,
  getTaskDetail,
  getUserInfo,
  sendDynamicComment
} from '@/api'
import { type dynamicDetail, type TaskCourseDTO } from '@/api/entity'
import { useUserStore } from '@/stores'
import { showNotify } from 'vant'

const userStore = useUserStore()
const showInput = ref(false)
const dynamics: Ref<dynamicDetail[]> = ref([])
const comment_input_words = ref('')
const send_dynamic_id = ref('')

const showPopup = () => {
  showInput.value = true
}
const toMy = () => {
  router.push('/my')
}
const postDynamic = () => {
  router.push('/postDynamic')
}

const show_input = async (dynamicId: string) => {
  send_dynamic_id.value = dynamicId
  console.log(send_dynamic_id.value)
  showPopup()
}

const input_comment = async () => {
  await sendDynamicComment(send_dynamic_id.value, comment_input_words.value)
  const userStore = useUserStore()
  const user = userStore.user

  for (let dynamic of dynamics.value) {
    let dynamicId = dynamic.id
    if (dynamic.id === send_dynamic_id.value) {
      dynamic.id = dynamic.id + '0'
      dynamic.children.push({
        id: '',
        commenterName: user?.nickname || '',
        commenterID: user?.id || '',
        contentText: comment_input_words.value,
        createTime: '',
        likes: 0,
        taskId: '',
        photos: [],
        children: [],
        taskDetail: null,
        likeUsers: [],
        my_isLike: false
      })
    }
    dynamic.id = dynamicId
  }

  comment_input_words.value = ''
  showInput.value = false
}

const load_data = async () => {
  const res = await getAllDynamic()

  let dynamics_info: dynamicDetail[] = []
  await Promise.all(
    res.map(async (comment) => {
      if (comment.replyTo !== null) return

      const user = await getUserInfo(comment.commenterID)
      const dynamicDetail = await getDynamicDetail(comment.id)

      let taskDetail: Ref<null | TaskCourseDTO> = ref(null)
      if (comment.taskID !== null) {
        taskDetail.value = await getTaskDetail(comment.taskID)
      }

      let sub_comments: dynamicDetail[] = []
      if (dynamicDetail.children.length !== 0) {
        await Promise.all(
          dynamicDetail.children.map(async (sub_comment) => {
            const sub_user = await getUserInfo(sub_comment.commenterID)
            const sub_dynamic = await getDynamicDetail(sub_comment.id)
            sub_comments.push({
              id: sub_dynamic.id,
              commenterName: sub_user.nickname,
              commenterID: sub_user.id,
              taskId: '',
              contentText: sub_dynamic.content,
              createTime: '',
              likes: 0,
              photos: [],
              children: [],
              taskDetail: null,
              likeUsers: [],
              my_isLike: false
            })
          })
        )
      }

      let like_users: string[] = []
      for (const userId of comment.likeUsers) {
        const like_user = await getUserInfo(userId)
        like_users.push(like_user.nickname)
      }

      const userStore = useUserStore()
      const my = userStore.user

      let flag = false
      if (my?.id) {
        flag = comment.likeUsers.includes(my?.id)
      }

      dynamics_info.push({
        id: dynamicDetail.id,
        commenterID: dynamicDetail.commenterID,
        taskDetail: taskDetail.value,
        commenterName: user.nickname,
        contentText: JSON.parse(dynamicDetail.content).text,
        taskId: comment.taskID,
        createTime: dynamicDetail.createTime,
        likes: dynamicDetail.likes,
        photos: JSON.parse(dynamicDetail.content).photos,
        children: sub_comments,
        likeUsers: like_users,
        my_isLike: flag
      })
    })
  )

  dynamics.value = dynamics_info
  console.log(dynamics.value)
}

onMounted(async () => {
  await load_data()
})
</script>

<template>
  <div class="dynamic-page" style="background-color: white">
    <div class="content-top">
      <div class="circle-bg">
        <div style="display: flex; justify-content: flex-end">
          <van-icon
            @click="postDynamic"
            class="camera_icon"
            size="30"
            color="white"
            name="photograph"
          />
        </div>
      </div>
      <div class="user">
        <span style="transform: translateY(30px)">{{
          userStore.user?.nickname || '小益'
        }}</span>
        <van-image
          @click="toMy"
          :src="userStore.user?.avatarURL || '/imgs/xiaoyi.png'"
          height="80"
          width="80"
          fit="cover"
          radius="5px"
          style="transform: translateY(30px)"
        />
      </div>
    </div>
    <DynamicCard
      @show_input="show_input"
      v-for="dynamic in dynamics"
      :key="dynamic.id"
      :dynamicDetail="dynamic"
    ></DynamicCard>
    <!-- <div style="height: 50px"></div> -->

    <van-popup
      v-model:show="showInput"
      position="bottom"
      class="input_container"
    >
      <div class="input_title">评论</div>
      <van-cell-group inset>
        <van-field
          v-model="comment_input_words"
          rows="6"
          autosize
          type="textarea"
          maxlength="1000"
          style="z-index: 99999"
          placeholder="请输入您的评论"
          show-word-limit
        />
        <div
          @click="input_comment"
          :class="
            comment_input_words === '' ? 'send_button' : 'send_button_active'
          "
        >
          发布回答
        </div>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<style scoped>
.dynamic-page {
  width: 100vw;
}
.input_title {
  margin: 18px;
}
.input_container {
  height: 40%;
  border-radius: 20px 20px 0px 0px;
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
.edit_icon {
  color: white;
  margin-top: 7px;
}
.input_comment_container {
  position: fixed;
  top: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 50px;
  line-height: 50px;
  background-color: #f6f7fb;
  color: #4984e0;
}
.camera_icon {
  margin: 20px 10px;
}
.content-top {
  position: relative;
}
.circle-bg {
  width: 100%;
  margin-bottom: 20px;
  height: 240px;
  background-size: cover;
  background-image: url('/imgs/task6.png');
}
.user {
  position: absolute;
  bottom: 0px;
  right: 10px;
  display: flex;
  align-items: center;
  color: #fff;
}
.user span {
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 20px;
  margin-right: 14px;
}
.user img {
  border-radius: 5px;
  margin-right: 16px;
}
</style>
