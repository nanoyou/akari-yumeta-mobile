<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const confirm = () => {
  router.push('/login')
}
</script>

<template>
  <van-cell-group inset class="input_container">
    <van-field
      v-model="username"
      class="input"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="username"
      class="input"
      label="昵称"
      placeholder="请输入昵称"
    />
    <van-field
      v-model="password"
      class="input"
      label="密码"
      type="password"
      placeholder="请输入密码"
    />
    <van-field
      v-model="password"
      class="input"
      label="确认密码"
      type="password"
      placeholder="请再次输入密码"
    />
  </van-cell-group>

  <div class="button_container">
    <van-button type="primary" class="confirm_button" @click="confirm"
      >提交</van-button
    >
  </div>
</template>

<style scoped>
.input {
  font-size: large;
  margin-top: 10px;
}
.input_container {
  margin-top: 100px;
}
.confirm_button {
  width: 100px;
  border-radius: 20px;
  font-weight: bold;
}
.button_container {
  margin-top: 50px;
  justify-content: center;
  display: flex;
}
</style>
