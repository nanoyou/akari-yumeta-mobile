<script setup lang="ts">
const link_word = "C语言是古老而长青的编程语言，它具备了现代程序设计的基础..."
</script>

<template>
  <div class="like_card">
    <img class="link_img" src="/imgs/lesson4.png">
    <div class="link_word"> {{ link_word }}</div>
  </div>
</template>

<style scoped>
.like_card {
  margin-top: 8px;
  height: 60px;
  background-color: #f7f7f7;
  width: 90%;
  display: flex;
}
.link_img {
  height: 55px;
  width: 55px;
}
.link_word {
  font-size: small;
  margin: 8px 5px 0px 10px;
  font-weight: ;
}
</style>