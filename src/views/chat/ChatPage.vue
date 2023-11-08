<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'

const search_value = ref('')

const to_my = () => {
  router.push('/my')
}
</script>

<template>
  <div></div>
</template>
<style scoped>
.role_tag {
  white-space: nowrap;
  margin: 13px 0px 0px 10px;
  font-size: 13px;
  font-weight: bold;
}
.no_disturb_icon {
  width: 27px;
  height: 27px;
  margin-top: 5px;
}
.record_number {
  margin: 15px 0px 0px 10px;
  padding: 0px 8px 0px 8px;
  width: 25px;
  background-color: #d9d9d9;
  color: white;
  font-size: 15px;
  border-radius: 7px;
}
.record_time {
  margin: 15px 0px 0px 10px;
  color: #9e9e9e;
  font-size: 13px;
}
.record_first_line {
  display: flex;
  width: 265px;
  justify-content: space-between;
}
.record_content {
  font-size: 14px;
  margin: 13px 0px 0px 10px;
  color: #8e8e8e;
  white-space: nowrap;
}
.record_name {
  margin: 13px 0px 0px 10px;
  white-space: nowrap;
}
.chat_records_container {
  margin-top: 15px;
}
.search_record_photo {
  width: 60px;
  border-radius: 30px;
  margin: 10px;
}
.chat_record_container {
  background-color: white;
  display: flex;
}
.chat_record_container_important {
  background-color: #f2f2f2;
  display: flex;
}
.search_container {
  padding-top: 15px;
  background-color: #f3f3f3;
}
.body_container {
  height: 85vh;
  background-color: #f3f3f3;
}
.online_status_word {
  color: white;
  font-size: 12px;
  margin: 6px 0px 0px 0px;
}
.online_status_icon {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 8px 10px 0px 15px;
  background-color: #1fe087;
}
.flex_container {
  display: flex;
}
.head_container {
  background-color: #01b5ff;
  height: 90px;
}
.user_photo {
  margin: 30px 0px 0px 15px;
  height: 50px;
}
.user_info_container {
  display: flex;
}
.user_name {
  margin: 35px 0px 0px 15px;
  font-weight: bold;
  color: white;
  font-size: large;
}
</style>
