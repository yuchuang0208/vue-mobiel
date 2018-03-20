<template>
  <div>
    
    <!-- 图文列表区域 -->
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{item.add_time}}</span>
              <span>点击：{{item.click}}</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>

  </div>
</template>


<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        newslist: []
      }
    },
    methods: {
      //获取新闻列表
      getnewslist() {
        this.$http.get('api/getnewslist').then(result=> {
          console.log(result.body);
          if(result.body.status === 0) {
            this.newslist = result.body.message;
          }else {
            Toast('获取列表失败'); 
          }
          
        })
      }
    },
    created() {
      this.getnewslist();
    }
  }
</script>

<style lang="scss" scoped>
.mui-media-body {
  h1 {
    font-size: 14px;
  }

  .mui-ellipsis {
    color: #26a2ff;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
