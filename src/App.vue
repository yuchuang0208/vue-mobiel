<template>
  <div class="app-container">
    <mt-header class="header" fixed title="固定在顶部"></mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部的 Tabbar 区域使用的是 MUI 中的 Tabbar -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-yc" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-yc" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-yc" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
        <span class="mui-badge" id="car_num">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-yc" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>  
</template>

<script>
</script>


<style lang="scss" scoped>
  .app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    overflow: hidden;
  }
  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  .mui-bar-tab .mui-tab-item-yc.mui-active {
    color: #007aff;
  }
  .mui-bar-tab .mui-tab-item-yc {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }
  .mui-bar-tab .mui-tab-item-yc .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mui-bar-tab .mui-tab-item-yc .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .header {
    z-index: 9999999999999;
  }
</style>
