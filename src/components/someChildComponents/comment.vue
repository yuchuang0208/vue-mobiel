<template>
  <div class="comment-container">
      <h4>发表评论</h4>
      <hr>
      <textarea placeholder="请输入要吐槽的内容,最多120字" maxlength="120" v-model="comment"></textarea>
      <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>

      <ul class="mui-table-view">
        <li class="mui-table-view-cell" v-for="(item,i) in commentlist" :key="item.add_time">
            <div class="comment-content">
                第<span>{{i+1}}</span>楼&nbsp;用户：<span>{{item.user_name}}</span>&nbsp;发表时间：<span>{{item.add_time | dateFormat}}</span>
            </div>
            <p>{{item.content}}</p>
        </li>
      </ul>



      <mt-button type="danger" size="large" plain @click="getMoreComment">加载更多</mt-button>
  </div>
</template>

<script>
    import {Toast} from 'mint-ui'
    export default {
        props: ["id"],
        data() {
            return {
                commentlist:[],
                page: 1,
                comment: ''
            }
        },
        methods: {
            getcommentsbyPage() {//获取平论
                this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.page).then(res=>{
                    if(res.body.status === 0) {
                        this.commentlist = this.commentlist.concat(res.body.message);
                        console.log(this.commentlist);
                    }else {
                        Toast('获取评论失败');
                    }
                })
            },
            getMoreComment() {//加载更多评论
                this.page++;
                this.getcommentsbyPage();
            },
            addComment() {
                if(this.comment.trim().length <= 0){
                    Toast('评论不能为空');
                }else{
                    this.$http.post("api/postcomment/"+this.id,{
                        content: this.comment.trim()
                    }).then(res=> {
                        if(res.body.status === 0) {
                            Toast('发表评论成功');
                            //这个接口有问题,我就手动操作,因为没有登录信息;
                            // this.page = 1;
                            // this.commentlist = [];
                            // this.getcommentsbyPage();


                            //-------------------------------------------------
                            var obj = {};
                            obj.user_name = '匿名用户';
                            obj.add_time = Date.now();
                            obj.content = this.comment;
                            this.commentlist.unshift(obj);//添加到最前面
                            this.comment = '';
                        }else {
                            Toast('发表评论失败');
                        }
                    })
                }               
            }
        },
        created() {
            this.getcommentsbyPage();
        }
    }
</script>

<style lang="scss" scoped>
    .comment-container {
        textarea {
            margin-bottom: 0;
        }
        .mint-button--primary {
            margin-bottom: 10px;
        }
        .mui-table-view {
            .mui-table-view-cell {
                padding: 0;
                .comment-content {
                    font-weight: bold;
                    font-size: 12px;
                    background-color: #ccc;
                    line-height: 30px;
                }
                p {
                    text-indent: 2em;
                    font-size: 12px;
                    line-height: 30px;
                }
            }
            .mui-table-view-cell:after{
                display: none;
            }
        }
        .mui-table-view:before {
            height: 0;
        }
    }
</style>

