<script setup lang="ts">
import DynamicCard from '@/components/dynamic/DynamicCard.vue'
import router from '@/router'
import {onMounted, ref, type Ref} from "vue";
import {getAllDynamic, getDynamicDetail, getTaskDetail, getUserInfo} from "@/api";
import {type dynamicDetail, type TaskCourseDTO} from "@/api/entity";
import {useUserStore} from "@/stores";

const dynamics: Ref<dynamicDetail[]> = ref([]);

const toMy = () => {
  router.push("/my")
}
const postDynamic = () => {
  router.push('/postDynamic')
}

const load_data = async () => {
  const res = await getAllDynamic();

  let dynamics_info: dynamicDetail[] = []
  await Promise.all(res.map(async comment =>{
    if (comment.replyTo !== null) return

    const user = await getUserInfo(comment.commenterID);
    const dynamicDetail = await getDynamicDetail(comment.id);

    let taskDetail: Ref<null | TaskCourseDTO> = ref(null)
    if (comment.taskID !== null) {
      taskDetail.value = await getTaskDetail(comment.taskID)
    }

    let sub_comments: dynamicDetail[] = []
    if (dynamicDetail.children.length !== 0) {
      await Promise.all(dynamicDetail.children.map(async sub_comment =>{
        const sub_user = await getUserInfo(sub_comment.commenterID);
        const sub_dynamic = await getDynamicDetail(sub_comment.id);
        sub_comments.push({
          id: sub_dynamic.id,
          commenterName: sub_user.username,
          contentText: sub_dynamic.content,
          createTime: "",
          likes: 0,
          photos: [],
          children: [],
          taskDetail: null,
          likeUsers: [],
          my_isLike: false
        })
      }))
    }

    let like_users: string[] = []
    for (const userId of comment.likeUsers) {
      const like_user = await getUserInfo(userId)
      like_users.push(like_user.username)
    }

    const userStore = useUserStore()
    const my = userStore.user

    let flag = false
    if (my?.id) {
      flag = comment.likeUsers.includes(my?.id)
    }

    dynamics_info.push({
      id: dynamicDetail.id,
      taskDetail: taskDetail.value,
      commenterName: user.username,
      contentText: JSON.parse(dynamicDetail.content).text,
      createTime: dynamicDetail.createTime,
      likes: dynamicDetail.likes,
      photos: JSON.parse(dynamicDetail.content).photos,
      children: sub_comments,
      likeUsers: like_users,
      my_isLike: flag
    });
  }))

  dynamics.value = dynamics_info
  console.log(dynamics.value);
};


onMounted(async () => {
  await load_data()
})

</script>

<template>
  <div style="background-color: white">
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
        <span>小益</span>
        <img @click="toMy" src="/imgs/xiaoyi.png" height="80" width="80" />
      </div>
    </div>
    <DynamicCard v-for="dynamic in dynamics" :key="dynamic.id" :dynamicDetail="dynamic"></DynamicCard>
    <div style="height: 50px"></div>
  </div>
</template>

<style scoped>
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
