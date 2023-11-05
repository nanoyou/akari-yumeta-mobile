<script setup lang="ts">
import  DynamicCard  from '../../../components/child/DynamicCard.vue'
import router from "@/router";
const postDynamic = () => {
  router.push('/postDynamic')
}
</script>

<template>
  <div class="content-top">
    <div class="circle-bg">
      <div style="display: flex; justify-content: flex-end;">
        <van-icon @click="postDynamic" class="camera_icon" size="30" color="white" name="photograph" />
      </div>

    </div>
    <div class="user">
      <span>小益</span>
      <img src="../../../../public/imgs/xiaoyi.png" height="80" width="80" />
    </div>
  </div>
  <DynamicCard></DynamicCard>
  <DynamicCard></DynamicCard>
  <DynamicCard></DynamicCard>
  <div style="height: 130px"></div>
</template>



<style scoped>
.camera_icon {
  margin: 20px 10px;
}
.content-top{
  position: relative;
}
.circle-bg{
  width: 100%;
  margin-bottom: 20px;
  height: 240px;
  background-size: cover;
  background-image: url("../../../../public/imgs/task6.png");
}
.user{
  position: absolute;
  bottom: 0px;
  right: 10px;
  display: flex;
  align-items: center;
  color: #fff;
}
.user span{
  font-size: 16px;
  font-weight: bold;
  padding-bottom: 20px;
  margin-right: 14px;
}
.user img{
  border-radius: 5px;
  margin-right: 16px;
}

</style>
