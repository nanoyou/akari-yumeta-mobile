<script setup lang="ts">
import { useUserStore } from '../../../stores/modules/user'
import { ref } from 'vue'
import axios from 'axios'

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
  <div>
    <van-person-card
      title="标题"
      sub-title="信息 信息"
      tag="待审核"
      tag-type="warning"
      corner="15:30"
      :content="['辅助性文字', '辅助性文字']"
    />
  </div>
</template>
<style></style>
