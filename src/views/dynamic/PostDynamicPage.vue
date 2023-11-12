<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { sendTaskComment } from '@/api'
import router from '@/router'
import { showNotify } from 'vant'
import type { Photo } from '@/api/entity'

const dynamic_message = ref('')
const fileList: Ref<Photo[]> = ref([])

const post_dynamic = async () => {
  let photos: string[] = []
  fileList.value.forEach((item) => {
    photos.push(item.content)
  })

  console.log(photos)

  const res = await sendTaskComment({
    content: JSON.stringify({
      text: dynamic_message.value,
      photos: photos
    }),
    taskID: null
  })
  showNotify({ type: 'success', message: '发布成功' })

  await router.push('/dynamic')
  console.log(res)
}
</script>

<template>
  <div style="display: flex; justify-content: flex-end">
    <van-button @click="post_dynamic" class="submit_button">发表</van-button>
  </div>
  <van-cell-group inset>
    <van-field
      v-model="dynamic_message"
      rows="8"
      autosize
      type="textarea"
      maxlength="100"
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
