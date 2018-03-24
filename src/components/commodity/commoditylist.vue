<template>
  <div>    
    <!-- 商品列表 -->
    <div class="goods-list">

      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="godetail(item.id)">
        <img :src="item.img_url">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="new">{{item.sell_price | currency}}</span>
            <span class="old"><del>{{item.market_price | currency}}</del></span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩余{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div>

      <!-- 加载按钮 -->
      <mt-button @click="getmore" type="danger" size="large">加载更多</mt-button>
    </div>

    


  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageindex: 1,
        goodslist: []
      }
    },
    methods: {
      getgoods() {
        this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(res=> {
          if(res.body.status === 0) {
            this.goodslist = this.goodslist.concat(res.body.message);
            console.log(this.goodslist);
          }
        })
      },
      getmore() {
        this.pageindex ++;
        this.getgoods();
      },
      godetail(id) {
        this.$router.push({
          path: "/home/commoditydetail/"+id
        })
      }
    },
    created() {
      this.getgoods();
    }
  }
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 6px;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 6px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p{
        margin: 0;
        padding: 5px 0;
      }
      .price {
        .old {
          font-size: 14px;
          font-style: italic;
          margin-left: 10px;
        }
        .new {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>