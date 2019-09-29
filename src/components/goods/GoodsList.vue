<template>
  <div class="goods-list">

    <!-- 第一种：使用router-link老方法实现路由跳转到GoodsInfo组件 -->
    <!-- <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsInfo/' + item.id">
      <img :src="item.img_url" alt="图片链接失效">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 第二种：使用vue.$router.push实现路由跳转到GoodsInfo组件 -->
    <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url" alt="图片链接失效">
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
        pageindex:1, //默认展示第一页
        goodslist:[]  //存放商品列表的数组
    };
  },
  created(){
      this.getGoodsList();
  },
  methods: {
      getGoodsList(){ //获取商品列表
          this.axios
          .get("/api/getgoods?pageindex=" + this.pageindex)
          .then(response => {
              console.log(response.data);
            //   this.goodslist = response.data.message;
            this.goodslist = this.goodslist.concat(response.data.message);
          })
          .catch(err => {
              Toast("获取商品失败");
          });
      },
      getMore(){ //加载更多按钮
          this.pageindex++;
          this.getGoodsList();
      },
      goDetail(id){ //使用this.$router编程式导航实现路由跳转
        //注意区分 this.$route和this.$router
        //this.$route是路由【参数对象】，所有路由中的参数，params，query都属于它
        //this.$router 是一个路由【导航对象】，用它可以方便的使用js代码，实现路由
        //的前进，后退，跳转到新的url地址
        console.log(this);
        //1.传递字符串
        // this.$router.push("/home/goodsInfo/" + id);
        //2.传递对象
        // this.$router.push({ path: "/home/goodsInfo/" + id});
        //3.传递命名的路由,name为路由规则的 name
        this.$router.push({ name: "goodsInfo", params:{id} }); //id为简写属性即 id:id
      }
  }
};
</script>

<style lang="scss" scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goods-item{
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin-bottom: 4px;
        padding: 2px;
        // 改变主轴方向为垂直方向，再设置为顶部与底部两端对齐
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .title{
            font-size: 14px;
        }
        .info{
            background-color: #eee;
            p{
                margin: 0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-size: 16px;
                }
                .old{
                    text-decoration: line-through; //贯穿线
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>
