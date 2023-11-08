<script setup lang="ts">
import { Gender, Role, type UserDTO } from '@/api/entity'
import { getGenderStr } from '@/util/translate'

const props = defineProps<{
  user?: UserDTO
}>()
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
      <div class="role">
        <van-tag
          size="medium"
          type="primary"
          v-if="user?.role == Role.Volunteer"
          >志愿者</van-tag
        >
        <van-tag
          size="medium"
          type="warning"
          v-else-if="user?.role == Role.Child"
          >儿童</van-tag
        >
        <van-tag size="medium" type="success" v-else>捐助者</van-tag>
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
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.name {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nickname {
  font-weight: bold;
  font-size: larger;
}
.username {
  font-size: medium;
  color: #787878;
  margin-left: 15px;
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
.avatar {
  margin: 15px;
}
</style>
