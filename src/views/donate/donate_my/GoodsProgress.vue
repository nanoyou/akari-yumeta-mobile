<template>
  <div class="steps-wrapper">
    <van-steps :active="3">
      <van-step>捐款到账</van-step>
      <van-step>基金会采购</van-step>
      <van-step>基金会发放</van-step>
      <van-step>完成</van-step>
    </van-steps>
    <div style="width: 100%">
      <img src="./map.png" alt="" style="width: 100%" />
    </div>

    <van-steps direction="vertical" :active="5">
      <van-step class="steps-vertical">
        <p>2023-11-8 13:28</p>
        <h3 class="step-title">
          基金会发放完成：安庆潜山市乡村儿童举行捐赠物资仪式
        </h3>
      </van-step>
      <van-step class="steps-vertical">
        <p>2023-11-8 13:28</p>
        <h3 class="step-title">等待基金会发放</h3>
      </van-step>
      <van-step class="steps-vertical">
        <p>2023-11-8 13:28</p>
        <h3 class="step-title">基金会采购完成</h3>
      </van-step>
      <van-step class="steps-vertical">
        <p>2023-11-8 08:34</p>
        <h3 class="step-title">基金会采购中</h3>
      </van-step>
      <van-step class="steps-vertical">
        <p>2023-11-7 09:10</p>
        <h3 class="step-title">捐款已到账</h3>
      </van-step>
    </van-steps>
  </div>
</template>

<style>
.steps-wrapper {
}

.steps-vertical {
  height: 50px; /* 自定义步骤条垂直方向的高度 */
}

.step-title {
  line-height: 1; /* 自定义较小的行高值 */
  margin-top: -13px; /* 调整标题的上边距为0 */
}
</style>
