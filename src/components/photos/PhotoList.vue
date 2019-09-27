<template>
    <div>
        <!-- 滑动标题 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" href="#item1mobile"
                       data-wid="tab-top-subpage-1.html" v-for="item in titles" :key="item.id" @click="getPhoto(item.id)">
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>

        <!-- 懒加载图片 -->
        <ul class="photo-list">
            <router-link v-for="item in list" :key="item.id" 
             :to="'/home/photoInfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
//1.导入mui的JS文件
import mui from '../../lib/mui/js/mui.min.js';
import {Toast} from 'mint-ui';


export default {
    data(){
        return{
            titles:[], //顶部标题列表
            list:[]   //懒加载图片
        }
    },
    created(){
        this.getTitle();
        //默认进入页面，就主动请求cateId为0的图片
        this.getPhoto(0);
    },
    mounted(){ //dom结构被渲染好后执行
        // 2.在mounted初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005  //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods:{
        getTitle(){  //获取标题
            this.axios
            .get("/api/getimgcategory")
            .then(response => {
                // console.log(response.data);
                // console.log(response.data.message);
                var msg ={
                    "title":'全部', 
                     "id":0 
                }
                response.data.message.unshift(msg);  //拼接到最前面
                this.titles = response.data.message;
            })
            .catch(err => {
                Toast("数据获取失败")
            });
        },
        getPhoto(cateId){ //获取图片
            this.axios
            .get("/api/getimages/" + cateId)
            .then(response => {
                // console.log(response.data);
                this.list = response.data.message;
            })
            .catch(err => {
                Toast("图片获取失败")
            });
        }
    }
}
</script>

<style lang="scss" scoped>
//解决谷歌浏览器Unable to preventDefault inside passive event listener due to target being treated as passive
*{  
     touch-action: pan-y;
}
.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle; //图片垂直居中
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }
        .info{
            color: white;
            text-align: left;
            background-color: rgba(0,0,0,0.4);
            position: absolute;
            bottom: 0;
            max-height: 84px;
            .info-title{
                font-size: 14px;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}
</style>
