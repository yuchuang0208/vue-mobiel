<template>
  <div class="movielist-container">
      <div class="search">
        <div class="mui-input-row .mui-input-search">
            <input type="search" @keyup="searchFn" class="mui-input-clear" placeholder="搜索">
        </div>
      </div>
      <!-- 列表区域 -->
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
            <!--这里放置真实显示的DOM内容-->
            <mt-loadmore :top-method="loadTop" ref="loadmore">           
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-media" v-for="item in movielist" :key="item.id">
                        <a href="javascript:;">
                            <img class="mui-media-object mui-pull-left" :src="item.image" alt="图片">
                            <div class="mui-media-body">
                                <div class='mui-ellipsis dark-big'>
                                    {{item.title}}
                                </div>
                                <div class='mui-ellipsis gray-small'>
                                    <span class="gray-small">{{item.genres}}</span>
                                    &nbsp;
                                    <span class="orange-small">{{item.rating}}分</span>
                                </div>
                                <div class="mui-ellipsis gray-small">
                                    导演: {{item.directors}}
                                </div>
                                <div class="mui-ellipsis gray-small">
                                    主演: {{item.casts}}
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </mt-loadmore>
        </div>
      </div>
  </div>
</template>

<script>
    import debounce  from 'lodash/debounce';
    import mui from '../../lib/mui/js/mui.min.js';   
    export default {
        data() {
            return {
                value: '',
                movielist: [],
                start: 0,
                count: 20,
                allLoaded: false
            }
        },
        methods: {
            searchFn:debounce(
                function() {
                    // console.log('hehehe');
                },500
            ),
            getmovielist() {
                this.$http.jsonp("https://api.douban.com/v2/movie/in_theaters",{ start: this.start,count: this.count }).then(res=> {
                   if(res.status === 200) {
                       var newlist = [];
                       res.body.subjects.forEach(function(item) {
                           //类型
                            var genres = item.genres.join("/"); 
                            //导演
                            var directors = '';
                            for(var i = 0;i<item.directors.length;i++) {
                                directors += item.directors[i].name;
                                if(i != item.directors.length - 1) {
                                    directors += '/';
                                }   
                            }
                            //演员
                            var casts = '';
                            for(var i = 0;i<item.casts.length;i++) {
                                casts += item.casts[i].name;
                                if(i != item.casts.length - 1) {
                                    casts += '/';
                                }   
                            }

                            newlist.push({
                                id: item.id,
                                title: item.title,
                                genres: genres,
                                directors: directors,
                                casts: casts,
                                rating: item.rating.average,
                                image: item.images.large
                            })                           
                       })
                       this.movielist = newlist;
                       console.log(this.movielist)
                   }
                })
            },
            loadTop() {//下拉刷新
                console.log('刷新了')
                this.count = 10;
                this.getmovielist();
                this.$refs.loadmore.onTopLoaded();
            },
            loadBottom() {
                // this.allLoaded = true;// 若数据已全部获取完毕变为true就不执行上拉请求了
                // this.$refs.loadmore.onBottomLoaded();
            }
        },
        created() {
            this.getmovielist();
        },
        mounted() {
           mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        }
    }
</script>

<style lang="scss">
    @import '../../lib/movieStyle.scss';
    .movielist-container {
        padding: 6px;
        .search {
            
        }
        .mui-scroll-wrapper {
            top: 100px;
            bottom: 50px;
            img {
                width: 60px;
                height: 90px;
                margin-right: 10px;
                max-width: 100px;
            }
        }
    }
</style>
