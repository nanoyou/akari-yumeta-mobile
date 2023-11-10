<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
import { donateMoney } from '@/api'
import { ConfigProviderThemeVars, showDialog, showConfirmDialog } from 'vant'
import { useUserStore } from '@/stores'
import type { UserDTO } from '@/api/entity';

const userStore = useUserStore()
const donee = ref<UserDTO>()
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
    console.log(doneeID)
    donee = await 
  }
})

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
            doneeID: userStore.user?.id,
            amount: money.value,
            wishes: message.value
          })
        } else {
          showConfirmDialog({
            message: '确定不给孩子们说些什么吗？'
          })
            .then(async () => {
              const res = await donateMoney({
                doneeID: userStore.user?.id,
                amount: money.value,
                wishes: message.value
              })
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
  margin-top: 120px;
}

.input {
  margin-top: 5px;
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
  align-items: center;
}
</style>
