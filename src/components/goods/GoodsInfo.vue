<template>
    <div class="goodsinfo-container">
        <!-- 小球动画 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :swipeList = "list" :isfull="false"></swiper>
                </div>
            </div>
		</div>

        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{goodsinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;
                        销售价:<span class="now_price">￥{{goodsinfo.sell_price}}</span>
                    </p>
                    <!-- 购买数量加减框组件占坑 -->
                    <p>购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号:{{goodsinfo.goods_no}}</p>
                        <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
//导入轮播图组件
import swiper from '../subcomponents/swiper.vue';
//导入购买数量加减框
import numbox from '../subcomponents/goodsinfo_numbox.vue';
export default {
    data(){
        return{
            id:this.$route.params.id,//获取url的id，方便使用
            list:[],  //存放轮播图数组
            goodsinfo:{},  //存放获取的商品信息，为一个对象
            ballFlag:false,  //控制小球展示隐藏
            selectedCount:1  //购买数量默认为1
        }
    },
    created(){
        this.getLunbotu();
        this.getGoodsInfo();
    },
    methods:{
        getLunbotu(){  //获取轮播图数据
            this.axios
            .get("/api/getthumimages/" + this.id)
            .then(response => {
                // console.log(response);
                this.list = response.data.message;
            })
            .catch(err => {
                Toast("获取失败");
            });
        },
        getGoodsInfo(){  //获取轮播图数据
            this.axios
            .get("/api/goods/getinfo/" + this.id)
            .then(response => {
                console.log(response);
                this.goodsinfo = response.data.message[0];
            })
            .catch(err => {
                Toast("获取失败");
            });
        },
        goDesc(id){
            //点击使用编程式导航跳转到图文介绍
            this.$router.push({ name:"goodsdesc",params:{id} });
        },
        goComment(id){
            //点击跳转到评论页面
            this.$router.push({ name:"goodscomment",params:{id} });
        },
        addToShopCar(){  //加入购物车按钮
            this.ballFlag = !this.ballFlag;
        },
        //小球加入购物车动画效果
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            //解决分辨率不同情况下小球最终到达的位置
            //获取小球在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取小球的最终位置
            const badgePosition =document.getElementById("badge").getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px,${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给父组件时，把选中的值保存到data上
            this.selectedCount = count;
            console.log("父组件拿到的数量值为："+this.selectedCount);
        }
    },
    components:{
        swiper,   //注册导入的轮播图组件
        numbox    //注册购买数量加减框
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .now_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block; //去除按钮父元素默认的 flex
        button{
            margin: 15px 0;
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 407px;
        left: 138px;
    }
}
</style>
