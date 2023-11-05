<script setup lang="ts">
import { useUserStore } from '../../../stores/modules/user'
import { ref } from 'vue'
import axios from 'axios'

const userStore = useUserStore()
userStore.setID('12313131313')
let userID = userStore.ID
let resultData = ref(null) // 使用 ref 创建响应式的 resultData

console.log(userID) // 打印UserID

if (userID) {
  console.log('用户已登录')

  axios
    .get(`https://mock.apifox.com/m1/3503500-0-default/donate/${userID}/info`, {
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
<template>
  <div class="card-component" style="background-color: #fdedec">
    <!-- 模板内容 -->
    <div class="row" style="height: 20%">
      <div class="col">
        <div class="paragraph">我的总捐助</div>
      </div>
      <div class="col">
        <div class="paragraph">捐助物品次数</div>
      </div>
      <div class="col">
        <div class="paragraph">捐助资金次数</div>
      </div>
    </div>
    <div class="row" style="height: 40%">
      <div class="col">
        <div class="loading-wrapper" v-if="!resultData">
          <van-loading />
        </div>
        <div class="paragraph bold-text" v-else>
          <div class="red-text">{{ resultData[0].totalMoney }}</div>
          <div>元</div>
        </div>
      </div>
      <div class="col">
        <div class="loading-wrapper" v-if="!resultData">
          <van-loading />
        </div>
        <div class="paragraph bold-text" v-else>
          <div class="red-text">{{ resultData[0].goods.length }}</div>
          <div>次</div>
        </div>
      </div>
      <div class="col">
        <div class="loading-wrapper" v-if="!resultData">
          <van-loading />
        </div>
        <div class="paragraph bold-text" v-else>
          <!-- 中间右侧段落内容 -->
          <div class="red-text">{{ resultData[0].money.length }}</div>
          <div>次</div>
        </div>
      </div>
    </div>
    <div
      class="buttonRow"
      style="
        height: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <van-button type="primary" round center> 查看详细 </van-button>
    </div>
  </div>
</template>
<style>
.card-component {
  width: 100%;
  height: 15vh; /* 设置为1/5普通手机高度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px; /* 可根据需要调整边距 */
}

.row {
  display: flex;
  justify-content: space-between;
}

.col {
  flex: 1;
  margin: 5px; /* 可根据需要调整边距 */
}

.loading-wrapper,
.paragraph {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* 让段落内容垂直居中 */
}
.bold-text {
  font-weight: 800; /* 设置字体加粗 */
}
.red-text {
  color: red; /* 设置文本颜色为红色 */
}
</style>
