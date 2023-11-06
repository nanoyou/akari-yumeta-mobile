<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const fileList = ref([
  {
    url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
    isImage: true
  },
  { url: 'https://cloud-image', isImage: true }
])
</script>

<template>
  <div style="display: flex; justify-content: flex-end">
    <van-button class="submit_button">发表</van-button>
  </div>
  <van-cell-group inset>
    <van-field
      v-model="message"
      rows="8"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="这一刻的想法..."
      show-word-limit
    />
    <van-uploader v-model="fileList" multiple />
  </van-cell-group>
</template>

<style scoped>
.submit_button {
  margin-right: 10px;
  height: 30px;
  background-color: #07c062;
  color: white;
  font-weight: bold;
}
</style>
