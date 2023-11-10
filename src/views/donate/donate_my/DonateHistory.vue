<script setup lang="ts">
// 导入用户store和响应式函数
import { useUserStore } from '@/stores'
import { ref, computed } from 'vue'
// 导入axios库
import axios from 'axios'
// 导入vant库的Card组件
import { Card } from 'vant'
import type { DonateHistoryDTO } from '@/api/entity'
import router from '@/router'
import instance from '@/api/index'
// 使用useUserStore函数获取用户store实例
const userStore = useUserStore()
// 获取用户ID和结果数据的响应式变量
const userID = computed(() => userStore.user?.id)
let resultData = ref(null as unknown as DonateHistoryDTO) // 使用 ref 创建响应式的 resultData
// 响应式变量用于记录是否加载完资金数据和物品数据
let isMoneyDataLoaded = ref(false)
let isGoodsDataLoaded = ref(false)
// 打印用户ID
console.log(userID)

// 如果用户已登录
if (userID.value) {
  console.log('用户已登录' + userID.value)
  // 调用fetchData函数获取数据
  fetchData(userID)
} else {
  console.log('用户未登录，使用测试ID')

  // 调用fetchData函数获取数据
  fetchData(userID)
}

// 异步函数，用于获取数据
async function fetchData(userID) {
  try {
    // 发送请求获取用户信息
    const result = await instance.get(`/donate/${userID.value}/info`)
    console.log('数据：', result)
    console.log('真正的数据：', result.data)
    // 将数据赋值给 resultData
    resultData.value = result.data

    // 遍历资金数据，每次调用fetchMoneyData异步函数
    for (let i = 0; i < resultData.value.money.length; i++) {
      await fetchMoneyData(i)
    }

    // 设置资金数据加载完成的标志为true
    isMoneyDataLoaded.value = true

    // 遍历物品数据，每次调用fetchGoodsData异步函数
    for (let i = 0; i < resultData.value.goods.length; i++) {
      await fetchGoodsData(i)
    }
    // 设置物品数据加载完成的标志为true
    isGoodsDataLoaded.value = true
    console.log('合并后的数据：', resultData.value)
  } catch (err) {
    console.log(err)
  }
}

// 异步函数，用于获取资金数据
async function fetchMoneyData(i) {
  try {
    // 获取当前资金数据的doneeID
    const doneeID = resultData.value.money[i].doneeID
    // 发送请求获取用户信息
    const moneyResult = await instance.get(`/user/${doneeID}/info`)
    // 获取用户数据
    const userData = moneyResult.data
    // 将用户数据添加到resultData的当前资金数据中
    resultData.value.money[i].userData = userData
    // 添加新属性（用户全部信息）到resultData[0].money[i]
  } catch (err) {
    console.log(err)
  }
}

// 异步函数，用于获取物品数据
async function fetchGoodsData(i) {
  try {
    // 获取当前物品数据的goodsID
    const goodsID = resultData.value.goods[i].goodsID
    // 发送请求获取物品信息
    const goodsResult = await instance.get(`/donate/goods/${goodsID}`)
    // 获取物品数据
    const goodsData = goodsResult.data.data
    // 将物品数据添加到resultData的当前物品数据中
    resultData.value.goods[i].goodsData = goodsData
  } catch (err) {
    console.log(err)
  }
}

// 函数，用于格式化金额
function formatAmount(amount) {
  // 将金额转换为元，并保留两位小数
  const amountInYuan = (amount / 100).toFixed(2)
  return `${amountInYuan}` // 返回格式化后的金额
}
function gotoProgress() {
  router.push('/GoodsProgress')
}
function goptoUser() {
  router.push('/GoodsProgress')
}
</script>

<template>
  <van-tabs sticky offset-top="46px">
    <van-tab title="资金">
      <div v-if="isMoneyDataLoaded && resultData">
        <van-card
          v-for="(item, index) in resultData.money"
          @click="router.push(`/user/${item.doneeID}`)"
          :key="index"
          :centered="true"
          :price="formatAmount(item.amount)"
          :desc="item.userData.introduction"
          :title="item.userData.username"
          :thumb="item.userData.avatarURL"
        />
      </div>
      <div v-else class="loading-container">
        <!-- 渲染加载数据时的占位内容 -->
        <van-loading />
      </div>
    </van-tab>

    <van-tab title="物品">
      <div v-if="isGoodsDataLoaded && resultData">
        <van-card
          @click="gotoProgress"
          v-for="(item, index) in resultData.goods"
          :num="item.amount"
          :key="index"
          :centered="true"
        >
          <template #footer>
            <span :style="{ fontWeight: 'bold', fontSize: '20px' }">
              ￥{{ formatAmount(item.totalMoney) }}
            </span>
          </template>
        </van-card>
        <!-- 
             :price="formatAmount(item.goodsData.unitPrice)"
          :desc="item.goodsData.description"
          :title="item.goodsData.name"
          :thumb="item.goodsData.imageURL"   由于数据库中无对应实物，接口查询不到对应物品，undefined
         -->
      </div>
      <div v-else class="loading-container">
        <!-- 渲染加载数据时的占位内容 -->
        <van-loading />
      </div>
    </van-tab>
  </van-tabs>
</template>

<style>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
