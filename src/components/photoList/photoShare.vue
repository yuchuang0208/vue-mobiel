<template>
  <div class="photoShare-container">

    <div id="slider" class="mui-slider">
        <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a @tap="getimglistById(item.id)" :class="['mui-control-item',item.id == 0?'mui-active':'']" data-wid="tab-top-subpage-1.html" v-for="item in category" :key="item.id">
                    {{item.title}}
                </a>
            </div>
        </div>
	</div>
    
    <!-- 图片区域 -->
    <ul class="lazy-url">
        <router-link tag="li" v-for="item in imglist" :key="item.id" :to="'/home/photoinfo/'+item.id"> 
            <img v-lazy="item.img_url">
            <!-- img的具体信息 -->
            <div class="img_info">
                <p>{{item.title}}</p>
                <span>{{item.zhaiyao}}</span>
            </div>
        </router-link>
    </ul>
  </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js';   
    import { Lazyload } from 'mint-ui';
    export default {
        data() {
            return {
                category: [],//存取分类信息的数组
                imglist: [],//图片信息数组
                imgId: 0,//图片信息id
            }
        },
        methods: {
            getimgcategory() {
                this.$http.get('api/getimgcategory').then(res=> {
                    if(res.body.status === 0) {
                        res.body.message.unshift({title: '全部',id: 0});//接口需求
                        this.category = res.body.message;
                        console.log(this.category);
                    }
                })
            },
            getimglistById(id) {
                this.$http.get('api/getimages/' +id).then(res=> {
                    if(res.body.status === 0) {
                        this.imglist = res.body.message;
                        console.log(this.imglist);
                    }
                })
            }
        },
        created() {
            this.getimgcategory();
            this.getimglistById(this.imgId);
        },
        mounted() {
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            //为什么要放这里而不放created里?因为这里能进行dom操作,dom是最新的,当组件被挂载到页面后就会调用这里
        }
    }
</script>

<style lang="scss" scoped>
    * {
        touch-action: none;
    }
    .photoShare-container {
        .lazy-url {
            list-style: none;
            margin: 0;
            padding: 10px;
            padding-bottom: 0;
            li {
                background-color: #ccc;
                text-align: center;
                margin-bottom: 10px;
                box-shadow: 0 0 5px #ccc;
                position: relative;
                img {
                    width: 100%;
                    display: block;
                }
                img[lazy=loading] {
                    width: 40px;
                    height: 300px;
                    margin: auto;
                }
                .img_info {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    text-align: left;
                    color: white;
                    background-color: rgba(0,0,0,0.4);
                    max-height: 94px;
                    p {
                        font-weight: bold;
                        font-size: 14px;
                        color: white;
                    }
                    span {
                        font-size: 12px;
                    }
                }
            }
        }
    
    }
</style>

