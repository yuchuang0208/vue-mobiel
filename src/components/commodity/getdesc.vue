<template>
  <div class="commodity-desc">
      <h3>{{info.title}}</h3>
      <hr>
      <div class="info_content" v-html="info.content">
          
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                info: { },
                infoid: this.$route.params.id
            }
        },
        methods: {
            getgoodsinfo() {
                this.$http.get('api/goods/getdesc/' + this.infoid).then(res=> {
                     if(res.body.status === 0) {
                         this.info = res.body.message[0];
                         console.log(this.info);
                     }
                })
            }
        },
        created() {
            this.getgoodsinfo()
        }
    }
</script>

<style lang="scss">
    .commodity-desc {
        padding: 6px;
        h3 {
            font-size: 16px;
            text-align: center;
            color: #226aff;
            margin: 10px 0;
        }
        .info_content {
            img {
                width: 100%;
            }
        }
    }
</style>
