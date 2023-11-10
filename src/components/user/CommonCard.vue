<script setup lang="ts">
import { Gender, Role, type UserDTO } from '@/api/entity'
import { follow, sendMessage } from '@/api'
import { getGenderStr } from '@/util/translate'
import RoleTag from '../RoleTag.vue'
import { showNotify } from 'vant'

const props = defineProps<{
  user?: UserDTO
  isFollowed?: boolean
  showFollowButton?: boolean
}>()
const emits = defineEmits<{
  (event: 'followed', userID: string): void
}>()

const clickFollow = async () => {
  if (props.user == undefined || props.isFollowed) return
  try {
    await follow(props.user.id)
    await sendMessage(props.user.id, '我们已经是好友了，让我们开始聊天吧！')
    showNotify({ type: 'success', message: '关注成功' })
    emits('followed', props.user.id)
  } catch (e) {
    showNotify({ type: 'danger', message: '关注失败' })
  }
}
</script>

<template>
  <div class="common-card">
    <div class="avatar">
      <van-image
        round
        fit="cover"
        width="80px"
        height="80px"
        :src="user?.avatarURL"
      />
    </div>
    <div class="content">
      <div class="name">
        <div class="nickname">
          {{ user?.nickname }}
        </div>
        <div class="username">{{ '@' + user?.username }}</div>
      </div>
      <div class="row-tag" v-if="user?.tags && user?.tags.length > 0">
        {{ user?.tags.join(' | ') }}
      </div>
    </div>
    <div class="extra">
      <!-- <div class="gender">{{ getGenderStr(user?.gender) }}</div> -->
      <div class="extra-top">
        <div class="gender">
          <van-icon
            size="20px"
            v-if="user?.gender == Gender.Male"
            name="/icon/gender-male.svg"
          />
          <van-icon
            size="20px"
            v-else-if="user?.gender == Gender.Female"
            name="/icon/gender-female.svg"
          />
          <div v-else style="opacity: 0">占位</div>
        </div>
        <div v-if="showFollowButton" class="follow-btn">
          <van-button plain round size="small" @click="clickFollow">{{
            props.isFollowed ? '已关注' : '+ 关注'
          }}</van-button>
        </div>
      </div>

      <div class="role">
        <RoleTag :role="user?.role" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.common-card {
  width: 100%;
  height: 110px;
  display: flex;
  background-color: white;
  margin-bottom: 1px;
}
.content {
  flex: 1;
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.name {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.nickname {
  font-weight: bold;
  font-size: larger;
  margin-right: 15px;
}
.username {
  font-size: medium;
  color: #787878;
}
.row-3 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row-tag {
  font-size: smaller;
  color: #787878;
}
.extra {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin: 15px;
}
.extra-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.avatar {
  margin: 15px;
}
.follow-btn {
  margin-left: 5px;
}
</style>
