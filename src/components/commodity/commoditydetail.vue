<template>
  <div class="commodity-detail">
      
    <!-- 头部卡片区域 -->
    <div class="mui-card">
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <!-- 轮播图自组建 -->
                <swiper :lbt="lunbotu" :isfull="false"></swiper> 
            </div>
        </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
        <div class="mui-card-header">{{info.title}}</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p class="Price">市场价：<del>{{info.market_price | currency}}</del>&nbsp;&nbsp;&nbsp;<span>销售价：{{info.sell_price}}</span> </p>
                    <p>购买数量：<numberbox></numberbox></p>
                <p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small">加入购物车 </mt-button>
                </p>    
            </div>
        </div>
    </div>

    <!-- 商品详情区域 -->
    <div class="mui-card goodsinfo">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
                <p>商品货号：{{info.goods_no}}</p>
                <p>库存情况：{{info.stock_quantity}}件</p>
                <p>上架时间：{{info.add_time | dateFormat("YYYY-MM-DD")}}</p>
            </div>
        </div>
        <div class="mui-card-footer">
            <mt-button type="primary" size="large" plain>图文介绍</mt-button>
            <mt-button type="danger" size="large" plain>商品评论 </mt-button>
        </div>
    </div>


  </div>
</template>

<script>
import swiper from '../someChildComponents/swiper.vue';
import numberbox from "../someChildComponents/goodsinfo_numberbox.vue";
import mui from '../../lib/mui/js/mui.min.js';
export default {
  data() {
      return {
          lunbotu: [],
          imgid: this.$route.params.id,
          info: {}
      }
  },
  methods: {
      getdoodsdetail() {
          this.$http.get('api/getthumimages/' + this.imgid).then(res=> {
              if(res.body.status === 0) {
                res.body.message.forEach(item => {
                    item.img = item.src;
                });
                 this.lunbotu = res.body.message;                
              }
          })
      },
      getinfo() {
          this.$http.get('api/goods/getinfo/' + this.imgid).then(res=> {
              if(res.body.status === 0) {
                  this.info = res.body.message[0];
                  console.log(this.info);
              }
          })
      }
  },
  created() {
      this.getdoodsdetail();
      this.getinfo();
  },
  components: {
      swiper,numberbox
  }
}
</script>

<style lang="scss" scoped>
    .commodity-detail {
        background-color: #eee;
        overflow: hidden;
        .mui-card {
            .mui-card-content {
                .mui-card-content-inner {
                    .Price {
                        font-size: 12px;
                        span {
                            font-size: 14px;
                            color: red;
                            font-weight: bold;
                        }
                    }
                }
            }
        }
        .goodsinfo {
            .mui-card-footer {
                display: block;
                button {
                    margin: 5px 0;
                }
            }
        }
    }
</style>


