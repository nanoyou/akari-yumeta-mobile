<template>
  <div class="dynamic_container">
    <img
        class="head_photo"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <div>
      <div class="name_word">留一线</div>
      <van-text-ellipsis
          class="dynamic_word"
          rows="3"
          :content="text"
          expand-text="全文"
          collapse-text="收起"
      />

      <div class="comment_photo_container">
        <img
            class="comment_photo"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <img
            class="comment_photo"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <img
            class="comment_photo"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <img
            class="comment_photo"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <img
            class="comment_photo"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <img
            class="comment_photo"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
        <div class="button_group">
          <van-icon class="like_button" size="20" name="like"></van-icon>
          <van-icon class="comment_button" size="20" name="comment-o"></van-icon>
        </div>
        <div style="display: flex; background-color: #f7f7f7; width: 90%">
          <div class="people_like">
            <van-icon class="like_button2" size="20" name="like-o"></van-icon>
            <div class="people_name">国君</div>
          </div>
          <div class="people_like">
            <van-icon class="like_button2" size="20" name="like-o"></van-icon>
            <div class="people_name">小益</div>
          </div>
          <div class="people_like">
            <van-icon class="like_button2" size="20" name="like-o"></van-icon>
            <div class="people_name">小军</div>
          </div>
        </div>

        <div>
          <div style="background-color: #f7f7f7; width: 90%;margin-top: 5px">
            <div class="comment_container">
              <div class="people_name">小军:</div>
              <div class="comment_word">我觉得说得对</div>
            </div>
            <div class="comment_container">
              <div class="people_name">小益:</div>
              <div class="comment_word">拱出去</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script setup lang="ts">
const title = "My Component";
const content = "This is my custom component!";

const text = "看完了，制作水平很高，有些改编合理目到位，情绪渲染和引导甚至让我一时间忘了这个结局有多稀烂。只能说mappa已经尽力了\n" +
    "        进击的巨人是一部传奇般的动画。尽管我对巨人的结局有非常多的意见，但是不得不说后期剧情的崩坏并不能盖过它前中期的高光。它也是一部能载入日本动画史册的动画\n" +
    "        此处转发名场面以示尊敬"
</script>

<style scoped>
.comment_word {
  margin-left: 5px;
  font-size: small;
}
.comment_container {
  margin-left: 15px;
  display: flex;
}
.button_group {
  display: flex;
  justify-content: flex-end;
  margin-right: 55px;
}
.people_name {
  color: #606d91;
  font-weight: bold;
  font-size: small;
}
.like_button {
  color: #f55b54;
  margin-right: 8px;
}

.like_button2 {
  color: #606d91;
  margin-right: 8px;
}
.people_like {
  display: flex;

  margin-left: 10px;
}
.head_photo {
  width: 45px;
  height: 45px;
  margin-left: 20px;
  border-radius: 3px;
}
.dynamic_container {
  margin-top: 20px;
  display: flex;
}
.name_word {
  color: #606d91;
  margin-left: 8px;
  font-size: 15px;
  font-weight: bold;
}
.dynamic_word {
  margin: 0 15px 0 8px;
  font-size: 15px;

}
.comment_photo {
  width: 85px;
  height: 85px;
  margin-left: 5px;
}
.comment_photo_container {
  margin-top: 8px;
}
</style>