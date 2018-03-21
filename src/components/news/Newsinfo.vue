<template>
  <div class="newsinfo_container">
    <h5>{{newinfolist.title}}</h5>
    <p class="aaa">
      <span>发表时间：{{newinfolist.add_time | dateFormat}}</span>
      <span>点击次数：{{newinfolist.click}}</span>
    </p>
    <hr>
    <p class="info" v-html="newinfolist.content"></p>
    <!-- 评论区域 -->
    <comment-box :id="$route.params.id"></comment-box>
  </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    //导入评论子组件
    import comment from '../someChildComponents/comment.vue';
    export default {
      data() {
        return {
          newinfolist: {}
        }
      },
      methods: {
        getnewsinfo(id) {//获取新闻详情
          this.$http.get('api/getnew/'+id).then(resault=> {
             if(resault.body.status === 0) {
              this.newinfolist = resault.body.message[0];
              console.log(this.newinfolist);
            }else {
              Toast('获取新闻详情失败');
            }
          })
        }
      },
      created() {
        let newid = this.$route.params.id;
        this.getnewsinfo(newid);
      },
      components: {
        'comment-box': comment
      }
    }
</script>

<style lang="scss">
  .newsinfo_container {
    padding: 0 3px;
    h5 {
      margin: 15px 0;
      text-align: center;
      font-size: 16px;
      color: #000;
      font-weight: bold;
    }
    .aaa {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #22aaff
    }
    .info {
      img {
        width: 100%;
      }
    }
  } 
</style>

