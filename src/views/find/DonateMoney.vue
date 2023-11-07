<script setup lang="ts">
import { ref } from 'vue'
import type { ConfigProviderThemeVars } from 'vant'
const money = ref()
const message = ref()
const themeVars: ConfigProviderThemeVars = {
  cellGroupBackground: '#fff',
  cellBackground: '#f2f3f5',
  cellBorderColor: '#323233'
}
</script>

<template>
  <body>
    <van-config-provider :theme-vars="themeVars" class="input">
      <van-cell-group inset>
        <van-cell>
          <van-field v-model="money" label="金额" placeholder="¥0.00" />
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
    <span class="money">¥{{ money }}</span>
    <van-button
      type="primary"
      round
      size="large"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
      class="submit"
      >捐助</van-button
    >
  </body>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
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
