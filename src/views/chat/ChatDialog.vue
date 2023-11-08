<script setup lang="ts">

import ChatDialogBar from "@/components/tabbar/ChatDialogBar.vue";
import {ref} from "vue";

const message_value = ref('')
</script>

<template>
  <ChatDialogBar></ChatDialogBar>
  <div class="dialog_body">
    <div class="message_container_left">
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
      <div class="message_container_white">
        <div class="message_word_black">
          我测你妈
        </div>
      </div>
    </div>

    <div class="message_container_right">
      <div class="message_container_blue">
        <div class="message_word_white">
          我测你妈
        </div>
      </div>
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
    </div>
    <div class="message_container_right">
      <div class="message_container_blue">
        <div class="message_word_white">
          我测你妈
        </div>
      </div>
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
    </div>
    <div class="message_container_right">
      <div class="message_container_blue">
        <div class="message_word_white">
          我测你妈
        </div>
      </div>
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
    </div>

    <div class="message_container_left">
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
      <div class="message_container_white">
        <div class="message_word_black">
          我测你妈
        </div>
      </div>
    </div>
    <div class="message_container_left">
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
      <div class="message_container_white">
        <div class="message_word_black">
          我测你妈
        </div>
      </div>
    </div>
    <div style="justify-content: center; display: flex">
      <div class="time_message">10-29 14:59</div>
    </div>
    <div class="message_container_right">
      <div class="message_container_blue">
        <div class="message_word_white">
          我测你妈
        </div>
      </div>
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
    </div>
    <div class="message_container_right">
      <div class="message_container_blue">
        <div class="message_word_white">
          我测你妈
        </div>
      </div>
      <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
    </div>

    <div class="search_container">
      <van-cell-group inset>
        <van-field
            style="height: 35px; width: 260px"
            v-model="message_value"
        />
      </van-cell-group>
      <van-button class="send_button">发送</van-button>
    </div>

  </div>
</template>

<style scoped>
.send_button {
  background-color: #7ACBFA;
  color: #C0E4FC;
  border-radius: 10px;
  height: 35px;
}
.search_container {
  padding-top: 20px;
  background-color: #f3f3f3;
  display: flex;
}

.time_message {
  color: #93929A;
  margin: 8px 0px 8px 0px
}
.message_container_blue{
  background-color: #0199FE;
  margin: 10px;
  height: 46px;
  line-height: 46px;
  border-radius: 5px;
}
.message_word_black {
  margin: 0px 15px 0px 15px;
  font-weight: 500;
}
.message_word_white {
  margin: 0px 15px 0px 15px;
  font-weight: 500;
  color: white;
}
.message_container_left {
  display: flex;
}
.message_container_right {
  display: flex;
  justify-content: right;
}
.message_container_white {
  background-color: white;
  margin: 10px;
  height: 46px;
  line-height: 46px;
  border-radius: 5px;
}
.dialog_body {
  height: 85vh;
  background-color: #F1F1F1;
  padding-top: 10px;
}
.search_record_photo {
  width: 46px;
  border-radius: 23px;
  margin: 10px;
}
</style>