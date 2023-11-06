<script setup lang="ts">
import { ref } from 'vue'

const search_value = ref('')
</script>

<template>
  <div class="head_container">
    <div class="user_info_container">
      <img class="user_photo" src="/imgs/xiaoyi.png" alt="" />
      <div>
        <div class="user_name">小益</div>
        <div class="flex_container">
          <div class="online_status_icon"></div>
          <div class="online_status_word">电脑在线</div>
        </div>
      </div>
    </div>
  </div>

  <div class="body_container">
    <div class="search_container">
      <van-cell-group inset>
        <van-field
          style="height: 40px"
          center
          v-model="search_value"
          placeholder="搜索"
        />
      </van-cell-group>
    </div>

    <div class="chat_records_container">
      <div v-for="i in 2">
        <div class="chat_record_container_important">
          <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
          <div class="record_right">
            <div class="record_first_line">
              <div class="record_name">neu软件2021级</div>
              <div style="width: 200px"></div>
              <div class="record_time">19:20</div>
            </div>

            <div class="record_first_line">
              <div class="record_content">戴口(辅导员):(电脑附件)</div>
              <div style="width: 200px"></div>
              <!--                <div class="record_number">8</div>-->
              <img class="no_disturb_icon" src="/imgs/no_disturb.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div v-for="i in 10">
        <div class="chat_record_container">
          <img class="search_record_photo" src="/imgs/teacher1.jpg" alt="" />
          <div class="record_right">
            <div class="record_first_line">
              <div class="record_name">neu软件2021级</div>
              <div style="width: 200px"></div>
              <div class="record_time">19:20</div>
            </div>

            <div class="record_first_line">
              <div class="record_content">戴口(辅导员):(电脑附件)</div>
              <div style="width: 200px"></div>
              <div class="record_number">8</div>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 100px"></div>
    </div>
  </div>
</template>

<style scoped>
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
