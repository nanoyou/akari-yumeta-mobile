<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { login } from '@/api'
import type { Result } from '@/api/entity'

const username = ref('')
const password = ref('')
const message = ref('')
const show = ref(false)

// const login = () => {
//   router.push('/home')
// }
const register = () => {
  router.push('/register')
}
const userLogin = async () => {
  // router.push('/home')

  try {
    const user = await login({
      username: username.value,
      password: password.value
    })

    console.log(user, '登录成功')

    console.log(user.data.role)

    if (user.data.role === '志愿者') {
      router.push('/volunteer')
    } else if (user.data.role === '儿童') {
      router.push('/child')
    } else if (user.data.role === '捐助者') {
      router.push('/sponsor')
    }

    console.log(user, '登录成功')
  } catch (e) {
    message.value = (e as Result<any>).message
    show.value = true
    setTimeout(() => {
      show.value = false
    }, 2000)
  }
}
</script>

<template>
  <van-notify v-model:show="show" type="danger">
    <van-icon name="bell" style="margin-right: 4px" />
    <span>{{ message }}</span>
  </van-notify>
  <div class="img_container">
    <van-image src="../../../public/imgs/xiaoyi.png" class="logo"></van-image>
  </div>
  <!-- 可以使用 CellGroup 作为容器 -->
  <van-cell-group inset class="input_container">
    <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
    <van-field
      v-model="password"
      label="密码"
      type="password"
      placeholder="请输入密码"
    />
  </van-cell-group>

  <div class="button_container">
    <van-button type="primary" class="login_button" @click="userLogin"
      >登录</van-button
    >
    <div style="width: 30px"></div>
    <van-button type="primary" class="login_button" @click="register"
      >注册</van-button
    >
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
