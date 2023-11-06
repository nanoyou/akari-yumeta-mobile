<script setup lang="ts">
const onClickLeft = () => history.back()

</script>

<template>
  <div class="chat_dialog_bar">
    <div class="icon_container">
      <van-icon @click="onClickLeft" class="back_icon" size="20" name="arrow-left" />
      <div>
        <div class="bar_username">留一线</div>
        <div class="flex_container">
          <div class="online_status_icon"></div>
          <div class="online_word">在线</div>
          <van-icon class="back_icon" size="10" name="arrow-right" />
        </div>
      </div>
      <van-icon class="phone_button" size="30" name="phone-o" />
    </div>

  </div>
</template>

<style scoped>
.online_word {
  font-size: 12px;
  color: white;
  margin-top: 2px;
}
.flex_container {
  display: flex;
  justify-content: center;
}
.online_status_icon {
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 5px 10px 0px 15px;
  background-color: #1fe087;
}
.bar_username{
  margin: 60px 110px 0px 110px;
  color: white;
  white-space: nowrap;
}
.icon_container {
  display: flex;
}
.chat_dialog_bar {
  height: 110px;
  justify-content: space-between;

  background-color: #06B8FF;
}
.back_icon {
  margin: 60px 0px 0px 20px;
  color: white;
}
.phone_button {
  margin: 60px 0px 0px 20px;
  color: white;
}
</style>