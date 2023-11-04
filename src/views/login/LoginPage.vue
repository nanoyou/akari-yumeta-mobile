<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = () => {
  router.push('/home')
}
const register = () => {
  router.push('/register')
}
</script>

<template>
  <div class="img_container">
    <van-image src="../../../public/imgs/xiaoyi.png" class="logo"></van-image>
  </div>
  <!-- 可以使用 CellGroup 作为容器 -->
  <van-cell-group inset class="input_container">
    <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
    <van-field v-model="password" label="密码" type="password" placeholder="请输入密码" />
  </van-cell-group>

  <div class="button_container">
    <van-button type="primary" class="login_button" @click="login">登录</van-button>
    <div style="width: 30px"></div>
    <van-button type="primary" class="login_button" @click="register">注册</van-button>
  </div>
</template>

<style scoped>
.logo {
  width: 70%;
}
.img_container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.input_container {
  margin-top: 40px;
}
.button_container {
  margin-top: 30px;
  justify-content: center;
  display: flex;
}
.login_button {
  width: 80px;
  border-radius: 20px;
  font-weight: bold;
}
</style>
