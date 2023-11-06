<template>
  <div class="user-card">
    <div class="avatarURL-wrapper">
      <img :src="user.avatarURL" alt="user avatarURL" />
    </div>
    <div class="info-wrapper">
      <div class="name-wrapper">
        <div class="username">{{ user.username }}</div>
        <div class="gender">{{ checkGender }}</div>
      </div>
      <div class="introduction van-multi-ellipsis--l2">
        {{ user.introduction }}
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
      <van-button plain round size="small" @click="emitFollow">{{
        isFollowed ? '已关注' : '+ 关注'
      }}</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Gender, type UserDTO } from '@/api/entity'
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
}

.name-wrapper {
  display: flex;
  align-items: flex-end;
}

.username {
  font-size: 25px;
  font-weight: bold;
}

.gender {
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
