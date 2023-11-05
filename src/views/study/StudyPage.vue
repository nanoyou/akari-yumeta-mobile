<script setup lang="ts">
import { ref } from 'vue'
import { Swipe, SwipeItem } from 'vant'
const images = [
  '../../../../public/imgs/lesson1.png',
  '../../../../public/imgs/lesson2.png',
  '../../../../public/imgs/lesson3.png',
  '../../../../public/imgs/lesson4.png'
]
</script>

<template>
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="image in images" :key="image">
      <img class="img_item" :src="image" />
    </van-swipe-item>
  </van-swipe>
  <div>
    <div>我的课程</div>
  </div>
</template>

<style scoped>
.img_item {
  width: 320px;
}
</style>
