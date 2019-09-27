<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
        <!-- 使用mint-ui制作按钮 -->
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <!-- 评论渲染 -->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;
                    发表时间:{{item.add_time | dateFormat}}
                </div>
                <div class="cmt-body">
                    {{item.content === 'undefined'? '此用户很懒，嘛都没说':item.content}}
                </div>
            </div>
        </div>

        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';
export default {
    data(){
        return{
            pageIndex:1 , //默认为评论第一页数据
            comments:[] ,  //所有的评论数据
            msg:""   //评论输入的内容
        }
    },
    created(){
        this.getComments();
    },
    methods:{
        getComments(){
            this.axios
            .get("/api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
            .then(response => {
                // console.log(response);
                // console.log(response.data.message);
                //每当点加载更多的时候，不要把老数据给覆盖
                this.comments = this.comments.concat(response.data.message);
            })
            .catch(error => {
            console.log("获取失败"+error); //若要使用mint-ui组件里的Toast消息弹框,则需先import引入
            Toast({
                message: "获取失败",
                position: "top",
                duration: 3000
             });
          });
        },
        getMore(){  //加载更多
            this.pageIndex++;
            this.getComments();
        },
        postComment(){ //发表评论
            if(this.msg.trim().length === 0){
                return Toast("评论内容不能为空");
            }
            this.axios
            .post("/api/postcomment/"+this.$route.params.id, {content: this.msg.trim()})
            .then(response => {
            //数据传到后台即可，手动在前端创建这条数据对象，添加到comments数组头部。优点：流畅
            var cmt = {
                user_name: "匿名用户",
                add_time: Date.now(),
                content: this.msg.trim()  //trim去除字符串空格
                };
                this.comments.unshift(cmt); //添加到最前面
                Toast("发表成功");
                this.msg = "";
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
    props:['id']  //获取父组件的id，注册
    
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 14px;
           .cmt-title{
                line-height: 30px;
                background-color: #ccc;
           } 
           .cmt-body{
               line-height: 35px;
               text-indent: 2em;
           }
        }
    }
}
</style>
