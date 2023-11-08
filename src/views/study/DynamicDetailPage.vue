<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getDynamicDetail, getUserInfo} from "@/api";
import {type commentInfo} from "@/api/entity";

const { dynamicId } = defineProps(['dynamicId'])
let dynamicDetail: commentInfo = ref(null)

onMounted(async () => {
  const res = await getDynamicDetail(dynamicId)

  const user = await getUserInfo(res.commenterID);
  const time = res.createTime.slice(5,7) + "月" + res.createTime.slice(8,10) + "日"

  const data = JSON.parse(res.content);
  const content = data.text;
  dynamicDetail.value =  {
    id: res.id,
    name: user.username,
    introduction: user.introduction,
    role: user.role,
    time: time,
    likes: res.likes,
    content: content,
    answers: res.children,
    commentNum: res.children.length
  };
  console.log(dynamicDetail.value)
})

</script>

<template>
  <div v-if="dynamicDetail" class="comment_card">
    <div class="flex_container">
      <img class="teacher_photo" src="/imgs/teacher1.jpg" alt="" />
      <div class="teacher_info">
        <div class="teacher_name">
          <div class="teacher_name2">{{ dynamicDetail.name }}</div>
          <!--                <img class="teacher_icon" src="/imgs/teach_icon.png" alt="" />-->
        </div>
        <div class="teacher_tags2">
          <div class="teacher_tags">{{ dynamicDetail.introduction }}</div>
          <div class="teacher_tags">{{ dynamicDetail.time }}</div>
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

  <div class="input_comment_container">
    <van-icon class="edit_icon" size="20" name="edit"></van-icon>
    <div>我来回答</div>
  </div>
</template>

<style scoped>
.edit_icon{
  margin: 15px 10px 0px 0px;
}
.input_comment_container {
  position: fixed;
  top: 700px;
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
video {
  max-width: 100%;
  outline: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
}
</style>