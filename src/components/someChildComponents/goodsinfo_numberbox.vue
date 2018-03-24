<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" />
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {

    };
  },
  created() {

  },
  mounted() {
    // 初始化数字框,根据mui官网http://dev.dcloud.net.cn/mui/ui/#numbox 要求
    mui(".mui-numbox").numbox();
  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>

</style>

