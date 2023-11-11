<script setup lang="ts">
import { useUserStore } from '../../../stores/modules/user'
import { ref, computed } from 'vue'
import axios from 'axios'
import { getCurrentInstance } from 'vue'
import type { DonateHistoryDTO } from '@/api/entity/donate'
import instance from '@/api/index'

const userStore = useUserStore()
const userID = computed(() => userStore.user?.id)
let resultData = ref(null as unknown as DonateHistoryDTO) // 使用 ref 创建响应式的 resultData
const instance1 = getCurrentInstance()
console.log('id' + userID.value) // 打印UserID

if (userID.value) {
  console.log('用户已登录')

  instance
    .get(`/donate/${userID.value}/info`, {
      //改为自己的接口地址即可，现在是apifox的mock地址
    })
    .then((result) => {
      console.log('数据：', result)
      console.log('真正的数据：', result.data)
      resultData.value = result.data // 将数据赋值给 resultData
    })
    .catch((err) => {
      console.log(err)
    })
} else {
  console.log('用户未登录，使用测试ID')
  axios
    .get(`https://mock.apifox.com/m1/3503500-0-default/donate/{test}/info`, {
      //改为自己的接口地址即可，现在是apifox的mock地址
    })
    .then((result) => {
      console.log('数据：', result)
      console.log('真正的数据：', result.data)
      resultData.value = result.data.data[0] // 将数据赋值给 resultData
    })
    .catch((err) => {
      console.log(err)
    })
}

const handleButtonClick = () => {
  console.log('按钮被点击了！')

  console.log(instance1)
  if (instance1) {
    console.log('子组件：触发自定义的 navigate 事件')
    instance1.emit('navigate') // 触发自定义的 navigate 事件
  }
}
</script>
<!-- 模板部分略去 -->
<template>
  <div class="card-component" style="background-color: transparent">
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
    <div class="row" style="height: 35%">
      <div class="col">
        <div class="loading-wrapper" v-if="!resultData">
          <van-loading />
        </div>
        <div class="paragraph bold-text" v-else>
          <div class="red-text">
            {{ (resultData.totalMoney / 100).toFixed(0) }}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="loading-wrapper" v-if="!resultData">
          <van-loading />
        </div>
        <div class="paragraph bold-text" v-else>
          <div class="red-text">{{ resultData.goods.length }}</div>
        </div>
      </div>
      <div class="col">
        <div class="loading-wrapper" v-if="!resultData">
          <van-loading />
        </div>
        <div class="paragraph bold-text" v-else>
          <!-- 中间右侧段落内容 -->
          <div class="red-text">{{ resultData.money.length }}</div>
        </div>
      </div>
    </div>
    <div class="row" style="height: 25%; justify-content: flex-end">
      <div class="col">
        <div class="paragraph2" style="text-align: left">元</div>
      </div>
      <div class="col">
        <div class="paragraph2" style="text-align: right">次</div>
      </div>
      <div class="col">
        <div class="paragraph2" style="text-align: right">次</div>
      </div>
    </div>
    <div
      class="buttonRow"
      style="
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <van-button
        type="primary"
        size="small"
        :plain="true"
        round
        center
        @click="handleButtonClick"
      >
        查看详细>
      </van-button>
    </div>
  </div>
</template>
<style>
.card-component {
  width: 100%;
  height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;
  position: relative; /* 添加相对定位，用于定位分割线 */
}

.row {
  display: flex;
  justify-content: space-between;
  position: relative;
}

.row::before,
.row::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #7573735c;
}

.row::before {
  left: 33.3333%; /* 将第一条分割线放置在左侧 */
}

.row::after {
  right: 33.3333%; /* 将第二条分割线放置在右侧 */
}

.col {
  flex: 1;
  margin: 5px;
}

.loading-wrapper,
.paragraph {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; /* 让段落内容垂直居中 */
}
.paragraph2 {
  display: flex;
  justify-content: flex-end;
  height: 100%; /* 让段落内容垂直居中 */
  font-size: 1.1em;
}
.bold-text {
  font-weight: 800; /* 设置字体加粗 */
}
.red-text {
  color: #1989fa; /* 设置文本颜色为红色 */
  font-size: 1.7em;
}
</style>
