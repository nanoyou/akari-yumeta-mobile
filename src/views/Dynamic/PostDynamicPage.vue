<script setup lang="ts">
import { ref } from 'vue'
import {sendTaskComment} from "@/api";
import router from "@/router";
import {showNotify} from "vant";

const dynamic_message = ref('')
const fileList = ref([
  {
    url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg',
  },
  { url: 'http://e.hiphotos.baidu.com/image/pic/item/a1ec08fa513d2697e542494057fbb2fb4316d81e.jpg',
  },
  {
    url: 'http://c.hiphotos.baidu.com/image/pic/item/30adcbef76094b36de8a2fe5a1cc7cd98d109d99.jpg',
  },
  {
    url: 'http://h.hiphotos.baidu.com/image/pic/item/7c1ed21b0ef41bd5f2c2a9e953da81cb39db3d1d.jpg'
  },
  {
    url: 'http://g.hiphotos.baidu.com/image/pic/item/55e736d12f2eb938d5277fd5d0628535e5dd6f4a.jpg'
  },
  {
    url: 'http://e.hiphotos.baidu.com/image/pic/item/4e4a20a4462309f7e41f5cfe760e0cf3d6cad6ee.jpg'
  }
])

const post_dynamic = async () => {
  let photos: string[] = []
  fileList.value.forEach(item => {
    photos.push(item.url);
  });
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
