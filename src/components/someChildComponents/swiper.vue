<template>
  <div class="swiper">
      <mt-swipe :auto="2000">
      <mt-swipe-item v-for="item in lbt" :key="item.url">
        <img :class="{full: isfull}" :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
    export default {
        props: ["lbt","isfull"],
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .mint-swipe {
        height: 200px;
        .mint-swipe-item {
            text-align: center;
            img {
            //   width: 100%;
            height: 100%;
            }
        }
        .full {
            width: 100%;
        }
    }
</style>

