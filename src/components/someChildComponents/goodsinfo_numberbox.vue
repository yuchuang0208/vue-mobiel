<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="getnum"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  props: [
    'max'
  ],
  data() {
    return {
      num: null
    };
  },
  created() {

  },
  mounted() {
    // 初始化数字框,根据mui官网http://dev.dcloud.net.cn/mui/ui/#numbox 要求
    mui(".mui-numbox").numbox();
  },
  methods: {
    getnum() {
      // 试过用v-model绑定num值,不行.
      // this.num = ;
      //调用父组件方法并传参
      this.$emit('getnumber', parseInt(this.$refs.numbox.value));
    }
  },
  watch: {//检测数据的变化
    max: function(newVal,oldVal) {
      mui('.mui-numbox').numbox().setOption('max', newVal);
      //参考mui的numberbox文档js-API更新选项(http://dev.dcloud.net.cn/mui/ui/#numbox)
    }
  }
};
</script>

<style lang="scss" scoped>

</style>

