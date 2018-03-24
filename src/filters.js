import Vue from 'vue';

//定义全局的时间过滤器(moment插件)
import moment from 'moment'
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dateStr).format(pattern)
})

//货币格式化过滤器
Vue.filter('currency', function(s) {
    if (/[^0-9\.]/.test(s)) return "¥0.00";
    s = s.toString();
    // s = s.replace(/^(\d*)$/, "$1.");
    // s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    // s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
        s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return "¥" + s.replace(/^\./, "0.")
});




//这里不需要用export default暴露出去