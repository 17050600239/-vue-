<template>
    <div class="newsinfo-container">
        <!-- 大标题 -->
       <h3 class="title">{{ newsinfo.title }}</h3>
       <!-- 子标题 -->
       <p class="subtitle">
           <span>发表时间:{{ newsinfo.add_time | dateFormat }}</span>
           <span>点击:{{ newsinfo.click }}次</span>
       </p>
       <hr>
        <!-- 内容区域 -->
       <div class="content" v-html="newsinfo.content"></div>
       <!-- 评论区子组件,在xomment组件用props获取到父组件的id -->
       <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
//导入评论子组件
import comment from '../subcomponents/comment.vue';
export default {
    data(){
        return{
            //将url地址中传递过来的id值放到data中，方便以后调用
            id:this.$route.params.id ,
            newsinfo:{}  //新闻对象
        }
    },
    created(){
        this.getNewsInfo();
    },
    methods:{
        getNewsInfo(){
            this.axios
            .get("/api/getnew/" + this.id)
            .then(response => {
                console.log(response.data);
                console.log(response.data.message);
                this.newsinfo = response.data.message[0];
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
    },
    components:{
        //用来注册评论子组件的节点
        "comment-box":comment
    }
};
</script>

// 在这里不加scoped，也不会污染全局，因为都放到newsinfo-container中去了
<style lang="scss">
.newsinfo-container{
    padding:0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle{
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>


