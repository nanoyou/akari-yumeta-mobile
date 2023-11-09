<template>
  <div class="dynamic_container">
    <img
      class="head_photo"
      src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
    />
    <div>
      <div class="name_word">{{ dynamicInfo.commenterName }}</div>
      <van-text-ellipsis
        class="dynamic_word"
        rows="3"
        :content="dynamicInfo.contentText"
        expand-text="全文"
        collapse-text="收起"
      />

      <div class="comment_photo_container">
        <img
          v-for="(photo, index) in dynamicInfo.photos"
          :key="index"
          class="comment_photo"
          :src="photo"
        />
        <LinkCard></LinkCard>

        <div class="button_group">
          <van-icon class="like_button" size="20" name="like"></van-icon>
          <van-icon
            class="comment_button"
            size="20"
            name="comment-o"
          ></van-icon>
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

        <div >
          <div style="background-color: #f7f7f7; width: 90%; margin-top: 5px">
            <div v-for="sub_dynamic in dynamicInfo.children" class="comment_container">
              <div class="people_name">{{ sub_dynamic.commenterName }}:</div>
              <div class="comment_word">{{ sub_dynamic.contentText }}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import LinkCard from '@/components/dynamic/LinkCard.vue'
import type {PropType} from "vue";
import type {dynamicDetail} from "@/api/entity";

const props = defineProps({
  dynamicDetail: {
    type: Object as PropType<dynamicDetail>, // Use the type from your import
    required: true, // You can set this to false if the prop is optional
  },
});

const dynamicInfo: dynamicDetail = props.dynamicDetail
console.log(dynamicInfo)

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
  width: 90px;
  height: 85px;
  margin-left: 5px;
}
.comment_photo_container {
  margin-top: 8px;
}
</style>
