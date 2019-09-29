<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 图片数据获取成功则v-for循环输出，src需要用:绑定作变量 -->
            <mt-swipe-item v-for="item in swipeList" :key="item.name">
                <img :src="item.img || item.src" alt="图片加载失败" :class="{full:isfull}"> 
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:["swipeList","isfull"] //父组件向子组件传值
}
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 200px;

    .mint-swipe-item{
        text-align: center;
        img{
            // width:100%;
            height: 100%;
        }
    }
}
.full{ //解决两个不同轮播图宽高
    width:100%;
}
</style>
