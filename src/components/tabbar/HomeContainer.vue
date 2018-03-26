<template>
  <div>

    <!-- 首页轮播图区域 -->
    <!-- 在组件中，使用 v-for 的时候， 一定要加上 key -->
    <swiper :lbt="lunbotu" :isfull="true"></swiper>

    <!-- 6宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
              <img src="../../images/menu1.png" alt="">
              <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoShare">
              <img src="../../images/menu2.png" alt="">
              <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/commoditylist">
              <img src="../../images/menu3.png" alt="">
              <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
              <img src="../../images/menu4.png" alt="">
              <div class="mui-media-body">留言反馈</div></a></li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/movielist">
              <img src="../../images/menu5.png" alt="">
              <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
              <img src="../../images/menu6.png" alt="">
              <div class="mui-media-body">联系我们</div></a></li>
  </ul> 


  </div>
</template>

<script>
import { Toast } from "mint-ui";
import swiper from '../someChildComponents/swiper.vue'

export default {
  data() {
    return {
      lunbotu: [] // 存放轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      // 获取轮播图的方法
      this.$http.get("api/getlunbo").then(result => {
        // 轮播图的数据，应该保存到 data 中
        // console.log(result.body);
        if (result.body.status === 0) {
          // 成功后，直接把数据保存到 data 中
          this.lunbotu = result.body.message;
          // Toast("获取轮播图数据成功！");
          // console.log(this.lunbotu);
        } else {
          // 提示用户获取轮播图失败
          Toast("获取轮播图数据失败！");
        }
      });
    }
  },
  components: {
    swiper
  }
};
</script>

<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
  img {
    width: 60px;
    height: 60px;
  }
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
}
</style>
