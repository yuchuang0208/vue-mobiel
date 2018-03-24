<template>
  <div class="photoinfo-continer">
    <h3>{{info.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{ info.add_time | dateFormat }}</span>
      <span>点击：{{ info.click }}次</span>
    </p>
    <hr>

    <!-- 缩略图区域 -->
    <div class="thumbs">
      <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">
    </div>

    <!-- 内容区域 -->
     <div class="content" v-html="info.content">
     </div>

     <cmt-box :id="id"></cmt-box>
  </div>
</template>

<script>
import comment from "../someChildComponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 要查看的图片Id
      info: {}, // 图片详情
      list: [] 
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
    
  },
  methods: {
    getPhotoInfo() {
      // 获取图片详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        }
      });
    },
    getThumbs() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // 根据官方文档做这一步操作
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          this.list = result.body.message;
          console.log(this.list);
        }
      });
    }
  },
  components: {
    "cmt-box": comment
  }
};
</script>

<style lang="scss" scoped>
.photoinfo-continer {
  padding: 4px;
  h3 {
    font-size: 18px;
    color: #226aff;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
  }

  .content {
    font-size: 14px;
    line-height: 30px;
  }

  .thumbs{
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
