<template>
    <div class="goodsdesc-container">
        <h3>{{ info.title }}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.params.id, //获取id
            info:{}  //存放获取的图文数据
        }
    },
    created(){
        this.getGoodsDesc();
    },
    methods:{
        getGoodsDesc(){
            this.axios
            .get("/api/goods/getdesc/" + this.id)
            .then(response => {
                console.log(response);
                this.info = response.data.message[0];
            })
            .catch(err => {
                Toast("数据获取失败");
            })
        }
    }
}
</script>

<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>

