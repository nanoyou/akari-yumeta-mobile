<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
import type { ConfigProviderThemeVars } from 'vant'
import { getGoodsInfo } from '@/api'
import type { GoodsInfo } from '@/api/entity'

const good = ref<GoodsInfo>()
const amount = ref<number>(0)
const message = ref<string>('')
const themeVars: ConfigProviderThemeVars = {
  fieldTextAreaMinHeight: '250px'
}

onMounted(async () => {
  const instance = getCurrentInstance()
  if (instance !== null && instance.proxy !== null) {
    const goodID: string = instance.proxy.$route.params.goodID
    console.log(goodID)
    good.value = await getGoodsInfo(goodID)
  }
})
</script>

<template>
  <body>
    <div class="good-card">
      <div class="img-wrapper">
        <img :src="good?.imageURL" alt="good-image" />
      </div>
      <div class="good-choose-wrapper">
        <div class="good-name-wrapper">
          <span class="good-name-text">物品名称：</span>
          <span class="good-name">{{ good?.name }}</span>
        </div>
        <span class="stepper-wapper">
          <span class="money">¥{{ (good?.unitPrice * 0.01).toFixed(2) }}</span>
          <span class="amount-text"> 数量 </span>
          <van-stepper v-model="amount" integer class="stepper" />
        </span>
      </div>
    </div>
    <!-- <hr /> -->
    <van-config-provider :theme-vars="themeVars" class="message-wrapper">
      <van-field
        v-model="message"
        rows="1"
        type="textarea"
        placeholder="请输入留言"
        show-word-limit
        maxlength="250"
      />
      <!-- <textarea
        rows="4"
        cols="25"
        style="height: 250px; width: 300px"
      ></textarea> -->
    </van-config-provider>
    <hr />
    <span class="donate-info-wrapper">
      <span class="total-money">¥0.00</span>
      <van-button
        type="primary"
        round
        icon="gold-coin-o"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        >确定</van-button
      >
    </span>
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
}

.good-card {
  display: flex;
  flex-direction: row;
  align-content: center;
  margin-bottom: 5px;
  margin-top: 5px;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.img-wrapper {
  margin-right: 10px;
}

.img-wrapper img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}

.good-choose-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: center;
  flex-grow: 1;
}

.good-name-wrapper {
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-end;
  flex-grow: 1;
}

.good-name-text {
  margin-left: 20px;
}

.good-name {
  margin-left: 20px;
}

.stepper-wapper {
  display: inline-flex;
  justify-content: end;
  align-items: flex-end;
  flex-grow: 1;
}

.money {
  margin-right: 20px;
}

.amount-text {
  margin-right: 10px;
}

.stepper {
  margin-right: 25px;
}

.donate-info-wrapper {
  display: inline-flex;
  justify-content: space-around;
  align-items: flex-end;
  align-content: center;
}

.message-wrapper {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.total-money {
  font-size: 30px;
  color: rgb(255, 0, 0);
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  /* background-color: #f7f7f7; */
  /* border: 2px solid #ccc; */
  border-radius: 5px;
  padding: 5px 10px;
  /* box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); */
}
</style>
