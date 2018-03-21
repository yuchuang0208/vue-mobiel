import Vue from 'vue';

//定义全局的时间过滤器
import moment from 'moment'
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern)
})




//这里不需要用export default暴露出去