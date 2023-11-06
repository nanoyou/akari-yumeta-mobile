<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { login, register } from '@/api'
import { showNotify } from 'vant'
import { Role, type Result } from '@/api/entity'
import { useUserStore } from '@/stores'

const username = ref('')
const nickname = ref('')
const role = ref('')
const password = ref('')
const password_second = ref('')
const status = ref('login')
const userStore = useUserStore()

const switch_register = () => {
  username.value = ''
  password.value = ''
  nickname.value = ''
  role.value = ''
  password_second.value = ''
  status.value = 'register'
}

const switch_login = () => {
  username.value = ''
  password.value = ''
  status.value = 'login'
}
const submit = async () => {
  if (status.value === 'register') {
    if (
      username.value === '' ||
      nickname.value === '' ||
      password.value === '' ||
      password_second.value === '' ||
      role.value.length === 0
    ) {
      showNotify('请填写完整信息！')
      return
    }
    if (password.value != password_second.value) {
      showNotify('两次输入密码不一致！')
      return
    }

    try {
      const res = await register({
        username: username.value,
        nickname: nickname.value,
        password: password.value,
        role: role.value,
        gender: 'SECRET'
      })
      console.log(res)
      showNotify({ type: 'success', message: '注册成功' })
      switch_login()
    } catch (e) {
      showNotify((e as Result<any>).message)
    }
  } else {
    try {
      const user = await login({
        username: username.value,
        password: password.value
      })

      console.log(user, '登录成功')
      console.log(user.role)

      // 登录后统一跳转至聊天界面
      router.push('/chat')

      userStore.setUserDTO(user)
      console.log(user, '登录成功')
      showNotify({
        type: 'success',
        message: '登录成功'
      })
    } catch (e) {
      showNotify((e as Result<any>).message)
    }
  }
}
</script>

<template>
  <div class="img_container">
    <van-image src="/imgs/xiaoyi.png" class="logo"></van-image>
  </div>
  <div style="display: flex; justify-content: center">
    <div style="width: 50%">
      <div class="button_container">
        <van-action-bar-button
          plain
          @click="switch_login"
          type="primary"
          :class="status === 'login' ? 'login_button_active' : 'login_button'"
          text="登录"
        />
        <van-action-bar-button
          plain
          @click="switch_register"
          type="primary"
          :class="
            status === 'register' ? 'register_button_active' : 'register_button'
          "
          text="注册"
        />
      </div>
    </div>
  </div>

  <van-cell-group v-if="status === 'login'" inset class="input_container">
    <van-field v-model="username" label="用户名" placeholder="请输入用户名" />
    <van-field
      v-model="password"
      label="密码"
      type="password"
      placeholder="请输入密码"
    />
  </van-cell-group>

  <van-cell-group v-if="status === 'register'" inset class="input_container">
    <van-field
      v-model="username"
      class="input"
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="nickname"
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
      v-model="password_second"
      class="input"
      label="确认密码"
      type="password"
      placeholder="请再次输入密码"
    />

    <van-radio-group
      class="checkbox_group"
      v-model="role"
      direction="horizontal"
    >
      <van-radio name="VOLUNTEER">志愿者</van-radio>
      <van-radio name="CHILD">儿童</van-radio>
      <van-radio name="SPONSOR">捐助者</van-radio>
    </van-radio-group>
  </van-cell-group>

  <div style="display: flex; justify-content: center">
    <div style="width: 50%">
      <div class="button_container">
        <van-action-bar-button
          @click="submit"
          type="primary"
          class="submit_button"
          :text="status.valueOf() === 'login' ? '登录' : '注册'"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 25%;
}
.img_container {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
.input_container {
  margin-top: 10px;
}
.button_container {
  margin-top: 30px;
  justify-content: center;
  display: flex;
}
.login_button {
  border-radius: 20px 0px 0px 20px;
}
.login_button_active {
  border-radius: 20px 0px 0px 20px;
  background-color: #cecece;
}
.register_button {
  border-radius: 0px 20px 20px 0px;
}
.register_button_active {
  border-radius: 0px 20px 20px 0px;
  background-color: #cecece;
}
.submit_button {
  border-radius: 20px 20px 20px 20px;
}
.input {
  margin-top: 10px;
}
.checkbox_group {
  justify-content: center;
  display: flex;
  margin-top: 30px;
}
</style>
