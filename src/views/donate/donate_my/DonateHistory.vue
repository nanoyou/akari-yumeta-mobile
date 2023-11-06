<script setup lang="ts">
import { useUserStore } from '../../../stores/modules/user'
import { ref } from 'vue'
import axios from 'axios'
import { Tab, Tabs } from 'vant'

const userStore = useUserStore()
userStore.setID('12313131313') //根据实际情况替换即可
let userID = userStore.ID
let resultData = ref(null) // 使用 ref 创建响应式的 resultData

console.log(userID) // 打印UserID

if (userID) {
  console.log('用户已登录')

  axios
    .get(`https://mock.apifox.com/m1/3503500-0-default/donate/${userID}/info`, {
      //改为自己的接口地址即可，现在是apifox的mock地址
      method: 'get',
      params: {
        userID: userID
      }
    })
    .then((result) => {
      console.log('数据：', result)
      console.log('真正的数据：', result.data.data)
      resultData.value = result.data.data // 将数据赋值给 resultData
    })
    .catch((err) => {
      console.log(err)
    })
} else {
  console.log('用户未登录')
}
</script>
<!-- 模板部分略去 -->
<template>
  <div>这是捐助历史详细列表界面</div>
  <van-tabs>
    <van-tab title="资金">内容 1</van-tab>
    <van-tab title="物品">内容 2</van-tab>
  </van-tabs>
</template>
<style></style>
