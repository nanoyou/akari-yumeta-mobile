<template>
  <div class="dynamic_container">
    <img class="head_photo" :src="avatarURL" />
    <div class="main">
      <div class="name_word">{{ dynamicInfo.commenterName }}</div>
      <van-text-ellipsis
        class="dynamic_word"
        rows="3"
        :content="dynamicInfo.contentText"
        expand-text="全文"
        collapse-text="收起"
      />

      <div class="comment_photo_container">
        <img
          v-for="(photo, index) in dynamicInfo.photos"
          :key="index"
          @click="preview_photo(photo)"
          class="comment_photo"
          :src="photo"
        />
        <div class="button_group">
          <van-icon
            v-if="dynamicInfo.my_isLike"
            class="like_button icon-btn"
            @click="like_comment(dynamicInfo.id)"
            size="20"
            name="like"
          ></van-icon>
          <van-icon
            v-else
            @click="like_comment(dynamicInfo.id)"
            class="like_button icon-btn"
            size="20"
            name="like-o"
          ></van-icon>
          <van-icon
            class="comment_button icon-btn"
            @click="show_input(dynamicInfo.id)"
            size="20"
            name="comment-o"
          ></van-icon>
        </div>
        <div v-if="dynamicInfo.taskDetail">
          <LinkCard
            @click="check_task(dynamicInfo.taskId)"
            :TaskDetail="dynamicInfo.taskDetail"
          ></LinkCard>
        </div>

        <div
          style="
            display: flex;
            background-color: #f7f7f7;
            width: 100%;
            padding: 5px 0 5px;
          "
          v-if="dynamicInfo.likeUsers.length != 0"
        >
          <div
            v-for="like_user in dynamicInfo.likeUsers"
            :key="like_user"
            class="people_like"
          >
            <van-icon class="like_button2" size="20" name="like-o"></van-icon>
            <div class="people_name" style="margin-left: 5px">
              {{ like_user }}
            </div>
          </div>
        </div>

        <div
          @click="show_input(dynamicInfo.id)"
          v-if="dynamicInfo.children.length !== 0"
        >
          <div
            style="
              background-color: #f7f7f7;
              width: 100%;
              margin-top: 1px;
              padding: 5px 0 5px;
            "
          >
            <div
              v-for="sub_dynamic in dynamicInfo.children"
              :key="sub_dynamic.id"
              class="comment_container"
            >
              <div class="people_name">{{ sub_dynamic.commenterName }}:</div>
              <div class="comment_word">{{ sub_dynamic.contentText }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LinkCard from '@/components/dynamic/LinkCard.vue'
import type { PropType, Ref } from 'vue'
import type { dynamicDetail as dd } from '@/api/entity'
import { getUserInfo, likeComment } from '@/api'
import { useUserStore } from '@/stores'
import router from '@/router'
import { showImagePreview } from 'vant'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { onBeforeMount } from 'vue'

const props = defineProps({
  dynamicDetail: {
    type: Object as PropType<dd>,
    required: true
  }
})

const avatarURL = ref('')
onBeforeMount(async () => {
  const userInfo = await getUserInfo(props.dynamicDetail.commenterID)
  avatarURL.value = userInfo.avatarURL || '/imgs/xiaoyi.png'
})
const dynamicInfo: Ref<dd> = ref(props.dynamicDetail)

const emit = defineEmits(['show_input'])

const check_task = (task_id: string) => {
  router.push('/study/taskDetail/' + task_id)
}

const show_input = (dynamic_id: string) => {
  emit('show_input', dynamic_id)
}

const preview_photo = (url: string) => {
  showImagePreview([url])
}

const like_comment = async (commentId: string) => {
  await likeComment(commentId)
  const userStore = useUserStore()
  const user = userStore.user

  if (user?.nickname) {
    if (dynamicInfo.value.likeUsers.includes(user.nickname)) {
      dynamicInfo.value.likeUsers = dynamicInfo.value.likeUsers.filter(
        (username) => username !== user.nickname
      )
    } else {
      dynamicInfo.value.likeUsers.push(user?.nickname)
    }
  }

  dynamicInfo.value.my_isLike = !dynamicInfo.value.my_isLike
  console.log(dynamicInfo.value)
}
</script>

<style scoped>
.comment_word {
  margin-left: 5px;
  font-size: small;
}
.comment_container {
  margin-left: 15px;
  display: flex;
  align-items: baseline;
}
.button_group {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 5px 0 0 0;
  /* margin: 5px 55px 5px 0px; */
  /* width: 70vw; */
}
.icon-btn {
  margin-right: 20px;
  margin-bottom: 10px;
}
.main {
  width: 100%;
}
.people_name {
  color: #606d91;
  font-weight: bold;
  font-size: small;
  white-space: nowrap;
}
.like_button {
  color: #f55b54;
  /* margin-right: 8px; */
}

.like_button2 {
  color: #606d91;
  /* margin-right: 8px; */
}
.people_like {
  display: flex;
  align-items: center;

  margin-left: 10px;
}
.head_photo {
  object-fit: cover;
  width: 45px;
  height: 45px;
  margin-left: 20px;
  border-radius: 3px;
}
.dynamic_container {
  width: 100vw;
  margin-top: 20px;
  display: flex;
  padding-bottom: 10px;
  border-bottom: 1px solid #f7f8fa;
}
.name_word {
  color: #606d91;
  margin-left: 8px;
  font-size: 15px;
  font-weight: bold;
}
.dynamic_word {
  margin: 0 15px 0 8px;
  font-size: 15px;
}
.comment_photo {
  width: 90px;
  height: 85px;
  margin-left: 5px;
  object-fit: cover;
}
.comment_photo_container {
  margin-top: 8px;
  width: calc(100vw - 100px);
}
</style>
