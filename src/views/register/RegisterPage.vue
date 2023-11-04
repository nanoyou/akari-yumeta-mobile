<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue';
import {register} from "@/api";
import { showNotify, closeNotify } from 'vant';

const username = ref('');
const nickname = ref('');
const role = ref([]);
const password = ref('');
const password_second = ref('');


const submit = async () => {
  if (password.value != password_second.value) {
    showNotify('两次输入密码不一致');
    return
  }
  const res = await register({
    username: username.value,
    nickname: nickname.value,
    password: password.value,
    role: role.value[0],
    gender: 'SECRET',
  })
  console.log(res)
  if(res.code) {
    showNotify(res.message);
  } else {
    showNotify({type: 'success', message: '注册成功'});
    router.push('/login')
  }
}


</script>

<template>
  <van-cell-group inset class="input_container">
    <van-field v-model="username" class="input" label="用户名" placeholder="请输入用户名" />
    <van-field v-model="nickname" class="input" label="昵称" placeholder="请输入昵称" />
    <van-field v-model="password" class="input" label="密码" type="password" placeholder="请输入密码" />
    <van-field v-model="password_second" class="input" label="确认密码" type="password" placeholder="请再次输入密码" />

    <van-checkbox-group class="checkbox_group" v-model="role" :max="1" direction="horizontal">
      <van-checkbox name="VOLUNTEER">志愿者</van-checkbox>
      <van-checkbox name="CHILD">儿童</van-checkbox>
      <van-checkbox name="SPONSOR">捐助者</van-checkbox>
    </van-checkbox-group>
  </van-cell-group>

  <div class="button_container">
    <van-button type="primary" class="confirm_button" @click="submit">提交</van-button>
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
.checkbox_group {
  justify-content: center;
  display: flex;
  margin-top: 30px;
}
</style>
