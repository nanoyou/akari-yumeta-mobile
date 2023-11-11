<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
import type { ConfigProviderThemeVars } from 'vant'
import { showConfirmDialog } from 'vant'
import { getGoodsInfo, donateGoods } from '@/api'
import { type GoodsInfo } from '@/api/entity'
import { useUserStore } from '@/stores'
import router from '@/router'

const userStore = useUserStore()
const good = ref<GoodsInfo>()
const amount = ref<number>(0)
const message = ref<string>('')
const themeVars: ConfigProviderThemeVars = {
  fieldTextAreaMinHeight: '200px'
}

async function submitDonateInfo() {
  showConfirmDialog({
    message: '确定捐助吗？'
  })
    .then(async () => {
      // on confirm 确定捐助

      if (message.value !== '' && message.value !== undefined) {
        const res = await donateGoods({
          goodsID: good.value!.id,
          amount: amount.value,
          wishes: message.value
        })
        if (
          res.donatorID === userStore.user?.id &&
          res.goodsID === good.value?.id &&
          res.amount === amount.value
        ) {
          showConfirmDialog({
            message: `感谢您在${res.createdTime}为孩子们资助${amount.value}个${
              good.value.name
            }，共花费${res.totalMoney * 0.01}元，你要发一条动态记录一下吗？`
          })
            .then(async () => {
              // on confirm 返回发布动态页
              router.push('/postDynamic')
            })
            .catch(async () => {
              // on cancel 返回find页
              router.push('/find')
            })
        }
      } else {
        showConfirmDialog({
          message: '确定不给孩子们说些什么吗？'
        })
          .then(async () => {
            const res = await donateGoods({
              goodsID: good.value!.id,
              amount: amount.value,
              wishes: message.value
            })
            if (
              res.donatorID === userStore.user?.id &&
              res.goodsID === good.value?.id &&
              res.amount === amount.value
            ) {
              showConfirmDialog({
                message: `感谢您在${res.createdTime}为孩子们资助${
                  amount.value
                }个${good.value.name}，共花费${
                  res.totalMoney * 0.01
                }元，你要发一条动态记录一下吗？`
              })
                .then(async () => {
                  // on confirm 返回发布动态页
                  router.push('/postDynamic')
                })
                .catch(async () => {
                  // on cancel 返回find页
                  router.push('/find')
                })
            }
          })
          .catch(() => {
            // on cancel 取消
          })
      }
    })
    .catch(() => {
      // on cancel
    })
}

onMounted(async () => {
  const instance = getCurrentInstance()
  if (instance !== null && instance.proxy !== null) {
    const goodID: string = String(instance.proxy.$route.params.goodID)
    good.value = await getGoodsInfo(goodID)
    // 测试
    // good.value = {
    //   description: '这是一个书包，好看的大大的书包，快来买它吧',
    //   name: '书包',
    //   unitPrice: 5000,
    //   id: goodID,
    //   imageURL:
    //     'http://sns-webpic-qc.xhscdn.com/202311102204/58ed4d8dbe8365e6ebf112a7113e8144/010285016hgjxvcktor011dym7ndnsd5sg!nd_whgt34_nwebp_wm_1'
    // }
  }
})
</script>

<template>
  <body>
    <van-loading
      v-if="good === undefined"
      size="24"
      vertical
      style="justify-self: center; margin-top: 41.5px; margin-bottom: 40px"
      >加载中...</van-loading
    >
    <div v-if="good !== undefined" class="good-card">
      <div class="img-wrapper">
        <img :src="good?.imageURL" alt="good-image" />
      </div>
      <div class="good-choose-wrapper">
        <div class="good-name-wrapper">
          <span class="good-name-text">物品名称：</span>
          <span class="good-name">{{ good?.name }}</span>
        </div>
        <span class="good-description-wrapper">
          <van-text-ellipsis
            :content="good?.description"
            style="flex-grow: 1"
          />
        </span>
        <span class="stepper-wapper">
          <span class="money"
            >¥{{ ((good?.unitPrice || 0) * 0.01).toFixed(2) }}</span
          >
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
      <span class="total-money"
        >¥{{ (amount * (good?.unitPrice || 0) * 0.01).toFixed(2) }}</span
      >
      <van-button
        type="primary"
        round
        icon="gold-coin-o"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="submitDonateInfo"
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

.good-description-wrapper {
  display: inline-flex;
  justify-content: start;
  align-items: flex-end;
  margin-left: 20px;
  flex-grow: 1;
  font-size: small;
  color: gray;
}

.stepper-wapper {
  display: inline-flex;
  justify-content: end;
  align-items: flex-end;
  flex-grow: 1;
}

.money {
  margin-right: 20px;
  color: brown;
  font-size: large;
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
