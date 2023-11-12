<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import {getDynamicDetail, getUserInfo, likeComment, sendDynamicComment} from "@/api";
import {type commentInfo, type subCommentInfo} from "@/api/entity";
import {showNotify} from "vant";

const { dynamicId } = defineProps(['dynamicId'])
let dynamicDetail: Ref<commentInfo | null> = ref(null);
const showInput = ref(false)
const comment_input_words = ref("")
const subComments: Ref<subCommentInfo[]> = ref([]);
const notify_message = ref("")

const send_comment = async () => {
  await sendDynamicComment(dynamicId, comment_input_words.value)

  showInput.value = false
  await load_sub_comments()
}

const showPopup = () => {
  showInput.value = true;
};

const like_comment = async (commentId: string) => {
  await likeComment(commentId)
  await load_sub_comments()
}

const load_sub_comments = async () => {
  const res = await getDynamicDetail(dynamicId)
  const user = await getUserInfo(res.commenterID);
  const time = res.createTime.slice(5,7) + "月" + res.createTime.slice(8,10) + "日"
  const data = JSON.parse(res.content);
  const content = data.text;

  dynamicDetail.value =  {
    id: res.id,
    name: user.nickname,
    introduction: user.introduction,
    role: user.role,
    time: time,
    likes: res.likes,
    content: content,
    answers: res.children,
    commentNum: res.children.length,
    photo: user.avatarURL
  };

  subComments.value = []
  for (const subComment of res.children) {
    const user = await getUserInfo(subComment.commenterID);
    subComments.value.push({
      username: user.nickname,
      content: subComment.content,
      createTime: subComment.createTime.slice(5, 7) + "月" + subComment.createTime.slice(8, 10) + "日",
      likes: subComment.likes,
      id: subComment.id,
      photo: user.avatarURL
    })
  }

  console.log(subComments.value)
  console.log(dynamicDetail.value)
}

onMounted(async () => {
  await load_sub_comments()
})

</script>

<template>
  <div style="background-color: white">
    <div v-if="dynamicDetail" class="comment_card">
      <div class="flex_container">
        <img class="teacher_photo" :src="dynamicDetail.photo ? dynamicDetail.photo : '/imgs/teacher1.jpg'" alt="" />
        <div class="teacher_info">
          <div class="teacher_name">
            <div class="teacher_name2">{{ dynamicDetail.name }}</div>
          </div>
          <div class="teacher_tags2">
            <div class="teacher_tags">{{ dynamicDetail.introduction }}</div>
            <div class="comment_time2">{{ dynamicDetail.time }}</div>
          </div>
        </div>
      </div>

      <div class="comment_word">{{ dynamicDetail.content }}</div>
      <div class="comment_card_foot">
        <div>{{ dynamicDetail.commentNum }}回答</div>
        <div style="width: 50px"></div>
        <div>{{ dynamicDetail.likes }}点赞</div>
      </div>
    </div>

    <div class="sub_comments_container">
      <div v-if="subComments.length !== 0" v-for="comment in subComments" :key="comment.id">
        <div class="comment_card">
          <div class="flex_container">
            <img class="teacher_photo" :src="comment.photo ? comment.photo : '/imgs/teacher2.jpg'" alt="" />
            <div class="teacher_info">
              <div class="commenter_info">
                <div class="teacher_name2">{{ comment.username }}</div>
                <div style="width: 300px"></div>
                <div class="comment_time">{{ comment.createTime }}</div>
              </div>
            </div>
          </div>

          <div class="comment_word">{{ comment.content }}</div>
          <div class="comment_card_foot">
            <div class="comment_likes">
              <van-icon @click="like_comment(comment.id)" class="like_icon" size="20" name="good-job-o"></van-icon>
              {{ comment.likes }}
            </div>
          </div>
        </div>
        <img class="line" src="/imgs/line.png" alt="" />
      </div>
      <div v-else>
        <div class="no_comments">暂无讨论</div>
        <div style="height: 100px"></div>
      </div>
    </div>

    <div @click="showPopup" class="input_comment_container">
      <van-icon class="edit_icon" size="20" name="edit"></van-icon>
      <div>我来回答</div>
    </div>
  </div>


  <van-popup v-model:show="showInput"
             position="bottom"
             class="input_container">
    <div class="input_title">回答</div>
    <van-cell-group inset>
      <van-field
          v-model="comment_input_words"
          rows="7"
          autosize
          type="textarea"
          maxlength="1000"
          style="z-index: 99999"
          placeholder="请输入您的回答"
          show-word-limit
      />
      <div @click="send_comment" :class="comment_input_words === '' ? 'send_button' : 'send_button_active'">发布回答</div>
    </van-cell-group>
  </van-popup>

</template>

<style scoped>
.no_comments{
  margin: 30px;
  font-size: large;
  font-weight: bold;
}
.sub_comments_container{
  margin-bottom: 50px;
}
.commenter_info {
  display: flex;
  justify-content: space-between;
  width: 250px;
}
.line {
  width: 350px;
}
.input_title {
  margin: 18px;
}
.input_container {
  height: 40%;
  border-radius: 20px 20px 0px 0px;
  z-index: 999999;
}
.edit_icon {
  color: white;
  margin-top: 7px;
}
.send_button {
  display: flex;
  justify-content: right;
  color: #C9C9C9;
}
.send_button_active {
  display: flex;
  justify-content: right;
  color: #4E83D1;
}
.edit_icon{
  margin: 15px 10px 0px 0px;
}
.input_comment_container {
  position: fixed;
  top: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 50px;
  line-height: 50px;
  background-color: #F6F7FB;
  color: #4984E0;
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

.comment_card {
  margin-top: 10px;
}

.teacher_name {
  margin-top: 8px;
}
.teacher_name2 {
  margin-top: 15px;
  font-weight: bold;
  white-space: nowrap;
}
.comment_time {
  color: #9f9ea4;
  font-size: 12px;
  margin-top: 13px;
  white-space: nowrap;
}
.comment_time2{
  color: #9f9ea4;
  font-size: 12px;
  white-space: nowrap;
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
video {
  max-width: 100%;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
</style>