import VueRouter from 'vue-router'

// 导入组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import Newsinfo from './components/news/Newsinfo.vue';
// 3. 创建路由对象
var router = new VueRouter({
    routes: [ // 目前这个路由是空的
        { path: '/', component: HomeContainer },
        { path: '/home', component: HomeContainer, name: 'HomeContainer' },
        { path: '/member', component: MemberContainer, name: 'MemberContainer' },
        { path: '/shopcar', component: ShopcarContainer, name: 'ShopcarContainer' },
        { path: '/search', component: SearchContainer, name: 'SearchContainer' },
        { path: '/home/newslist', component: NewsList, name: 'NewsList' },
        { path: '/home/newsinfo/:id', component: Newsinfo, name: 'Newsinfo' }
    ],
    linkActiveClass: 'mui-active'
})

// 把路由对象暴露出去
export default router