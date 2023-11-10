<script setup lang="ts">
import type { Role } from '@/api/entity'
import RoleTag from '@/components/RoleTag.vue'
import type { BadgePosition } from 'vant'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    avatarURL: string
    title: string
    message: string
    role: Role
    time: string
    noInterrupt: boolean
    unreadMessages?: number
    fixed: boolean
  }>(),
  {
    avatarURL: '/imgs/xiaoyi.png',
    message: '',
    noInterrupt: false,
    fixed: false
  }
)

const fixedClass = computed(() => (props.fixed ? 'fixed' : ''))
const position = '' as BadgePosition
</script>

<template>
  <div class="row-body" :class="fixedClass">
    <div class="avatar">
      <van-image
        :src="avatarURL"
        round
        fit="cover"
        width="50px"
        height="50px"
      />
    </div>
    <div class="main">
      <div class="primary-row">
        <div class="title">{{ title }}</div>
        <div></div>
        <RoleTag :role="role" />
        <div class="time">{{ time }}</div>
      </div>
      <div class="secondary-row">
        <div class="message">{{ message }}</div>
        <van-icon v-if="noInterrupt" name="/icon/bell-no.svg" />
        <van-badge
          v-else
          :content="unreadMessages"
          :position="position"
          :showZero="false"
        />
      </div>
    </div>
    <!-- 填充右侧空隙 -->
    <div style="width: 20px"></div>
  </div>
</template>

<style scoped>
.row-body {
  display: flex;
  background-color: #fff;
  flex-direction: row;
  width: 100%;
  height: 65px;
  align-items: center;
}
.row-body.fixed {
  background-color: #f7f8fa;
}
.avatar {
  margin: 0 20px 0 15px;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 15px);
}
.primary-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.secondary-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.time {
  margin-left: 10px;
  color: #9e9e9e;
  font-size: small;
}

.title {
  flex: 1;
  font-size: large;
}
.message {
  color: #9e9e9e;
  font-size: small;
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(100vw - 150px);
}
</style>
