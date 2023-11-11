<template>
  <div class="user-card">
    <div class="avatarURL-wrapper">
      <img
        :src="user.avatarURL ? user.avatarURL : '/imgs/xiaoyi.png'"
        alt="user avatarURL"
      />
    </div>
    <div class="info-wrapper" @click="emitClick">
      <div class="name-wrapper">
        <div class="nickname">{{ user.nickname }}</div>
        <div class="gender">{{ checkGender }}</div>
        <div v-if="user.role === role.Child" class="score">
          积分：{{ user.score }}
        </div>
      </div>
      <div class="username">@{{ user.username }}</div>
      <div class="introduction van-multi-ellipsis--l2">
        {{
          user.introduction ? user.introduction : '这个人很懒，没有留下任何东西'
        }}
      </div>
      <div class="tag-wrapper">
        <van-tag
          v-for="(tag, index) in user.tags"
          :key="index"
          color="#7232dd"
          plain
          type="primary"
          class="tag"
        >
          {{ tag }}
        </van-tag>
      </div>
    </div>
    <div class="follow-button-wrapper">
      <van-button
        v-if="isFollowed"
        color="rgb(255, 199, 29)"
        round
        size="small"
        @click="emitFollow"
      >
        已关注
      </van-button>
      <van-button v-if="!isFollowed" round size="small" @click="emitFollow"
        >+ 关注</van-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { UserDTO } from '@/api/entity'
import { Role, Gender } from '@/api/entity'
export default defineComponent({
  props: {
    user: {
      type: Object as () => UserDTO, // 设置类型为User接口类型
      required: true // 设置为必须传入的属性
    },
    isFollowed: { type: Boolean, required: true } // 是否关注
  },
  methods: {
    emitFollow() {
      this.$emit('follow', this.user.id)
    },
    emitClick() {
      this.$emit('jump', this.user.id)
    }
  },
  data() {
    return {
      role: Role
    }
  },
  computed: {
    checkGender() {
      if (this.user.gender == Gender.Female) {
        return '女'
      } else if (this.user.gender == Gender.Male) {
        return '男'
      } else {
        return '未知'
      }
    }
  }
})
</script>

<style>
.user-card {
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.follow-button-wrapper {
  display: flex;
  align-self: flex-start;
  justify-content: flex-end;
  flex-grow: 1;
}

.avatarURL-wrapper {
  display: flex;
  align-items: center;
  width: 70px;
  height: 70px;
  margin-right: 10px;
}

.avatarURL-wrapper img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.info-wrapper {
  display: flex;
  flex-direction: column;
  flex-basis: 180px;
  flex-grow: 1;
  align-items: baseline;
}

.name-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.nickname {
  font-size: 18px;
  font-weight: bold;
}

.username {
  font-size: 10px;
  color: #cfcaca;
}

.gender {
  font-size: 10px;
  margin-left: 10px;
}

.score {
  font-size: 10px;
  margin-left: 10px;
}

.introduction {
  margin-top: 5px;
  font-size: 14px;
  color: #666;
}

.tag-wrapper {
  margin-top: 5px;
}

.tag {
  display: inline-block;
  padding: 2px 5px;
  margin-right: 5px;
  background-color: #eee;
  border-radius: 5px;
  font-size: 12px;
}
</style>
