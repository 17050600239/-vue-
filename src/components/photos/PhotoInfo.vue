<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间:{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击:{{ photoinfo.click }}</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 放置现成的评论子组件 -->
        <cmt-box :id="this.id"></cmt-box>
    </div>
</template>

<script>
import comment from '../subcomponents/comment.vue';
export default {
    data(){
        return{
            id:this.$route.params.id, //获取url地址的id
            photoinfo:{}  //图片详情
        }
    },
    created(){
        this.getPhotoInfo();
    },
    methods:{
        getPhotoInfo(){
            this.axios
            .get("/api/getimageInfo/" + this.id)
            .then(response => {
                console.log(response.data.message[0]);
                this.photoinfo = response.data.message[0];
            })
            .catch(err => {
                Toast("获取详情失败")
            });
        }
    },
    components:{  //注册评论子组件
        'cmt-box':comment
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 3px;
    h3{
        color: #26a2ff;
        font-size: 15px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }
    .content{
        font-size: 13px;
        line-height: 30px;
    }
}
</style>

