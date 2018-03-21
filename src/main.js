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
Vue.http.options.root = 'http://vue.studyit.io'; //全局配置请求根路径
Vue.http.options.emulateJSON = true; //全局配置post请求时候的表单数据类型

// 导入路由
import router from './router.js';

//导入过滤器
import './filters.js';


// vue实例
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router //挂载路由对象
})