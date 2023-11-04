<script setup lang="ts">
import { login } from '@/api';

// login example

const loginExample = async () => {
  try {
    const user = await login({
      username: 'admin',
      password: '123456',
    })
    console.log(user, '登录成功')
  } catch (e) {
    console.log('登录失败')
  }
}

</script>

<template>
  <h1>LOGIN...</h1>
</template>

<style scoped></style>
