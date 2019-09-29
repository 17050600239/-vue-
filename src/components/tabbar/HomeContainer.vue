<template>
    <div>
        <!-- 轮播图区域 -->
        <swiper :swipeList = "swipeList" :isfull="true"></swiper>

        <!-- 用mui九宫格到六宫格布局 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/newsList">
                    <img src="../../images/menu1.png" alt="图片获取失败">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <routerLink to="/home/photoList">
                    <img src="../../images/menu2.png" alt="图片获取失败">
                    <div class="mui-media-body">图片分享</div>
                </routerLink></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <routerLink to="/home/goodsList">
                    <img src="../../images/menu3.png" alt="图片获取失败">
                    <div class="mui-media-body">商品购买</div>
                </routerLink></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu4.png" alt="图片获取失败">
                    <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu5.png" alt="图片获取失败">
                    <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                    <img src="../../images/menu6.png" alt="图片获取失败">
                    <div class="mui-media-body">联系我们</div></a></li>
		</ul> 


    </div>
</template>

<script>
import { Toast } from "mint-ui";
//导入轮播图组件
import swiper from '../subcomponents/swiper.vue';
export default {
  data() {
    return {
      swipeList: []  //存放轮播图
    };
  },
  created() {
    this.getSwipe();
  },
  methods: {
    getSwipe() {
      this.axios
        .get("api/getlunbo") //如果没有配置axios.defaults.baseURL='域名地址' 则需写完整.get("http://www.liulongbin.top:3005/api/getlunbo")
        .then(response => {
          console.log(response.data);
          console.log(response.data.message);
          this.swipeList = response.data.message;
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
      swiper  //注册导入的轮播图组件
  }
};
</script>

<style lang="scss" scoped>
.mui-grid-view.mui-grid-9{   //六宫格ul
    background-color: #fff;
    border: none;
    img{
        width: 50%;  //设置每个li的图片高宽一半
    }
    .mui-media-body{
        font-size: 13px !important;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{ //六宫格每个li
    border: none;
}
</style>

