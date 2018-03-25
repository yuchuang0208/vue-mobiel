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
                <p>购买数量：<numberbox @getnumber="getselectednum" :max="info.stock_quantity"></numberbox></p>
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div class="ball" v-show="flag" ref="ball"></div>
                </transition>
                <p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addcar">加入购物车 </mt-button>
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
            <mt-button type="primary" size="large" plain @click="getdesc(imgid)">图文介绍</mt-button>
            <mt-button type="danger" size="large" plain @click="getpinglun(imgid)">商品评论 </mt-button>
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
          info: {},
          flag: false,
          num: 1,//加入购物车数量
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
                //   console.log(this.info);
              }
          })
      },
      getdesc(id) {
          this.$router.push({
              name: 'getdesc', params: {id: id}
          })
      },
      getpinglun(id) {
          this.$router.push({
              name: 'commoditypinglun', params: { id: id}
          })
      },
      beforeEnter(el) {
          el.style.transform = "translate(0,0)";
      },
      enter(el,done) {
        el.offsetWidth;

        const ballposition = this.$refs.ball.getBoundingClientRect();//获取小球位置

        const carposition = document.getElementById('car_num').getBoundingClientRect();//获取购物车位置
        
        

        const distanceX = carposition.left - ballposition.left;
        const distanceY = carposition.top - ballposition.top;

        // console.log(distanceX,distanceY);

        // el.style.transform = "translate("+distanceX+"px,"+distanceY+"px)";//品字符串
        
        el.style.transform = `translate( ${distanceX}px,${distanceY}px )`;//es6写法

        el.style.transition = 'all 0.5s cubic-bezier(.39,-0.27,1,.82) ';
        done();
      },
      afterEnter(el) {
          this.flag = !this.flag;
      },
      addcar() {
          //加入购物车
          this.flag = !this.flag;
        //   console.log(this.num);
      },
      getselectednum(num) {//用于获取加入购物车的数量(子组件传来的值)
            this.num = num;
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
            overflow: visible;
            .mui-card-content {
                .mui-card-content-inner {
                    position: relative;
                    .Price {
                        font-size: 12px;
                        span {
                            font-size: 14px;
                            color: red;
                            font-weight: bold;
                        }
                    }
                    .ball {
                        width: 15px;
                        height: 15px;
                        background-color: red;
                        border-radius: 50%;
                        position: absolute;
                        top: 55px;
                        left: 140px;
                        z-index: 9999999999;
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


