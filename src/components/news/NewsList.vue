<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
                <!-- 传入id需要将其改为 v-bind绑定表达式 -->
                <router-link :to="'/home/newsInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发表时间：{{item.add_time | dateFormat}}</span>
                            <span>点击：{{item.click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {Toast} from "mint-ui";
export default {
    data(){
        return{
            newsList:[]
        }
    },
    created(){
        this.getNewsList();
    },
    methods:{
        getNewsList(){
            this.axios
            .get("/api/getnewslist")
            .then(response => {
            console.log(response.data);
            console.log(response.data.message);
            this.newsList = response.data.message;
        })
            .catch(error => {
            console.log("获取失败"+error); //若要使用mint-ui组件里的Toast消息弹框,则需先import引入
            Toast({
                message: "获取失败",
                position: "top",
                duration: 3000
          });
        });
        }
    }
}
</script>

<style lang="scss" scoped>
.mui-media-body > h1{
    font-size: 14px;
}
.mui-ellipsis{
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between; // 改造为伸缩盒子，让其两端对齐
}
</style>


