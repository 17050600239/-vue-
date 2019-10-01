<template>
  <div class="shopcar-container">

    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="(item,i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
              <!-- mint-ui开关按钮 -->
              <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id , $store.getters.getGoodsSelected[item.id])"></mt-switch>
              <img :src="item.thumb_path" >
              <div class="info">
                  <h1>{{ item.title }}</h1>
                  <p>
                    <span class="price">￥{{item.sell_price}}</span>
                    <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                     <!-- 问题：如何从购物车中获取商品的数量呢 -->
                    <!-- 我们可以先创建一个 空对象，然后循环购物车中所有商品的数据， 
                    把 当前循环这条商品的 Id， 作为 对象 的 属性名，count值作为 对象的 属性值，
                    当把所有的商品循环一遍，就会得到一个对象：id:count的形式{  88: 2, 89: 1, 90: 4 } -->  
                    <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                  </p>
              </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
            <div class="left">
                <p>总计（不含运费）</p>
                <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件,总价
                <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
            </div>
            <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>

    <p>{{$store.getters.getGoodsSelected}}</p>

  </div>
</template>

<script>
import {Toast} from 'mint-ui';
// 导入加减框组件
import numbox from '../subcomponents/shopcar_numbox.vue';
export default {
    data(){
        return {
            goodslist:[] //购物车中所有商品的数据
        }
    },
    created(){
        this.getGoodsList();
    },
    methods:{
        getGoodsList(){// 获取购物车是商品列表
            //获取到stroe中添加到购物车的id，再拼接到一个数组idArr中，用逗号分隔
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            // 如果购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length <= 0){
                return;
            }
            this.axios
            .get("/api/goods/getshopcarlist/" + idArr.join(','))
            .then(response => {
                console.log(response);
                this.goodslist = response.data.message;
            })
            .catch(err => {
                Toast("获取失败");
                console.log(err);
            })
        },
        remove(id,index){ //点击删除，根据传入的id将商品的store删除，同时根据index删除goodslist的商品
            this.goodslist.splice(index,1); //从索引位置开始删除一个
            this.$store.commit("removeFormCar",id);
        },
        selectedChanged(id,val){
            // console.log(id+'---'+val);
            this.$store.commit('updatedGoodsSelected', {id:id,selected:val})
        }
    },
    components:{
        numbox  //注册
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list{
      .mui-card-content-inner{
        display: flex;
        align-items: center; //垂直居中
      }
      img{
          width: 60px;
          height: 60px;
          margin: 0 5px;
      }
      .info{
          .price{color: red;font-weight: bold}
          h1{
              font-size: 13px;
              margin-bottom:7px;
              line-height: 18px;
            }
      }
  }
}
.jiesuan{
    display: flex;
    justify-content: space-between;
    align-items: center;  //纵向居中
    .red{
        color: red;
        font-weight: bold;
        font-size: 16px;
    }
}
</style>

