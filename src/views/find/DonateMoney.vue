<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
import {
  type ConfigProviderThemeVars,
  showDialog,
  showConfirmDialog
} from 'vant'
import { useUserStore } from '@/stores'
import type { UserDTO } from '@/api/entity'
import { donateMoney, getUserInfo, isFollowed, follow } from '@/api'
import router from '@/router'

const userStore = useUserStore()
const donee = ref<UserDTO>()
const checkFollowed = ref<Boolean>()
let moneyStr = ref<string>()
let money = ref<number>()
const message = ref()
const themeVars: ConfigProviderThemeVars = {
  cellGroupBackground: '#fff',
  cellBackground: '#f2f3f5',
  cellBorderColor: '#323233'
}

onMounted(async () => {
  const instance = getCurrentInstance()
  if (instance !== null && instance.proxy !== null) {
    const doneeID: string = String(instance.proxy.$route.params.userID)
    // console.log(doneeID)
    donee.value = await getUserInfo(doneeID)
    checkFollowed.value = await isFollowed(doneeID)
  }
})

async function handleFollow() {
  await follow(donee.value!.id)
  checkFollowed.value = !checkFollowed.value
}

function checkMoney(moneyString: string | undefined) {
  if (typeof moneyString === 'string') {
    // 移除可能的千位分隔符
    moneyString = moneyString.replace(',', '')

    // 校验是否为数字
    if (!/^\d+(\.\d+)?$/.test(moneyString)) {
      showDialog({ message: '请输入正确的钱数' })
    }

    // 转换为数字类型
    money.value = Math.floor(parseFloat(moneyString) * 100)
    moneyStr.value = parseFloat(moneyString).toFixed(2)
  } else {
    showDialog({ message: '请输入钱数' })
  }
}

async function submitDonateInfo() {
  showConfirmDialog({
    message: '确定捐助吗？'
  })
    .then(async () => {
      // on confirm 确定捐助
      if (money.value) {
        if (message.value !== '' && message.value !== undefined) {
          const res = await donateMoney({
            doneeID: donee.value?.id || '',
            amount: money.value,
            wishes: message.value
          })
          // console.log(res)
          // console.log(res.donatorID, res.doneeID)
          // console.log(donee.value!.id, donee.value!.id)
          if (
            res.amount === money.value &&
            res.donatorID === userStore.user?.id &&
            res.doneeID === donee.value!.id
          ) {
            showConfirmDialog({
              message: `感谢您在${res.createdTime}为${donee.value
                ?.nickname}资助${
                res.amount * 0.01
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
        } else {
          showConfirmDialog({
            message: '确定不给孩子们说些什么吗？'
          })
            .then(async () => {
              const res = await donateMoney({
                doneeID: donee.value?.id || '',
                amount: money.value || 0,
                wishes: message.value
              })
              if (
                res.amount === money.value &&
                res.donatorID === userStore.user?.id &&
                res.doneeID === donee.value!.id
              ) {
                showConfirmDialog({
                  message: `感谢您在${res.createdTime}为${donee.value
                    ?.nickname}资助${
                    res.amount * 0.01
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
      } else {
        showDialog({ message: '请输入钱数' })
      }
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<template>
  <body>
    <div class="doneeInfo">
      <van-loading
        v-if="donee === undefined"
        size="24"
        vertical
        style="justify-self: center; margin-top: 38px"
        >加载中...</van-loading
      >
      <user-card
        v-if="donee !== undefined"
        :user="donee"
        :is-followed="checkFollowed"
        style="background-color: #f2f3f5"
        @follow="handleFollow"
      />
    </div>
    <van-config-provider :theme-vars="themeVars" class="input">
      <van-cell-group inset>
        <van-cell>
          <van-field
            v-model="moneyStr"
            label="金额"
            placeholder="¥0.00"
            @blur="checkMoney(moneyStr)"
          />
        </van-cell>
        <van-cell>
          <van-field
            v-model="message"
            rows="1"
            autosize
            label="留言"
            type="textarea"
            placeholder="请输入留言"
            class="message"
          />
        </van-cell>
      </van-cell-group>
    </van-config-provider>
    <span class="money">¥{{ moneyStr }}</span>
    <van-button
      type="primary"
      round
      size="large"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      class="submit"
      @click="submitDonateInfo"
      >捐助</van-button
    >
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  margin-top: 60px;
}

.doneeInfo {
  border-radius: 5px;
  margin-left: 16px;
  margin-right: 16px;
}

.input {
  margin-top: 15px;
  margin-bottom: 5px;
}

.money {
  align-self: center;
  margin-top: 30px;
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

.submit {
  justify-self: center;
  margin-top: 20px;
  /* width: 70px;
  height: 70px;
  flex-grow: 1; */
}
</style>
