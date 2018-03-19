import Vue from 'vue';
// 导入app跟组件
import app from './App.vue';

import Mint from 'mint-ui';
Vue.use(Mint);

import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import './lib/mui/fonts/mui-icons-extra.ttf';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueResource from 'vue-resource';
Vue.use(VueResource);

// 导入路由
import router from './router.js';



// vue实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router //挂载路由对象
})