//入口文件
import Vue from 'vue';
//导入根组件app
import app from './App.vue';
//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';

//导入缩略图插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

//导入MUI的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//导入全部MintUI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';      
Vue.use(MintUI);

//导入axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios,axios);   //注意顺序不能乱
axios.defaults.baseURL = 'http://www.liulongbin.top:3005/' //配置axios默认域名地址

//导入格式化时间的插件
import moment from 'moment';
//定义全局的过滤器
Vue.filter("dateFormat",function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
});

//导入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
// 一进来获取本地存储的数据car
var car = JSON.parse(localStorage.getItem('car') || '[]');
// 创建一个store实例
var store = new Vuex.Store({
    state:{ //this.$store.state.***
        car:car  //存放购物车中的商品的数据数组，里面设计为一个对象，
                // {id:商品的id,count:要购买的数量,price:商品的单价,selected:false}
    },
    mutations:{ //this.$store.commit('方法名')
        addToCar(state,goodsinfo){
            //点击加入购物车，把商品信息保存到store的car上
            // 1.如果购物车中之前就有这个对应的商品了，则只需更新count
            // 2.如果没有，则直接往car数组push进商品的数据
            var flag = false;   //假设一开始在购物车没有找到对应的商品，即可以直接进行push
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;   //设置为true代表已经找到该商品
                    return true;  //找到停止some循环，不会再往下遍历
                }
            })
            if(!flag){  //若还是false，push进去
                state.car.push(goodsinfo);
            }
            // 当更新完car之后，把car数组存储到本地localStorage中
            localStorage.setItem("car",JSON.stringify(state.car));
        },
        updatedGoodsInfo (state,goodsinfo) {
            // 当购物车页面商品数量变化时调用
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            });
            // 当修改完商品的数量，把最新的购物车数据存储到本地localStorage中
            localStorage.setItem("car",JSON.stringify(state.car));

        },
        removeFormCar(state,id){
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            });
            // 当删除完商品后，把最新的购物车数据存储到本地localStorage中
            localStorage.setItem("car",JSON.stringify(state.car));
        },
        updatedGoodsSelected(state,info){
            state.car.some(item => {
                if(item.id == info.id){
                    item.selected = info.selected;
                }
            });
            // 当改变开关时，把最新的购物车数据存储到本地localStorage中
            localStorage.setItem("car",JSON.stringify(state.car));
        }
    },
    getters:{ //this.$store.getters.***
        getAllCount(state){
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            });
            return c;
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;  //id作为键，count作为值
            })
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;  //键为id，值为是否选中
            });
            return o;
        },
        getGoodsCountAndAmount(state){ //计算勾选数量和总价
            var o ={
                count:0,  //勾选的数量
                amount:0  //勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected){
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            });
            return o;
        }
    }
});


var vm = new Vue({
    el:"#app",
    data:{},
    render:c=>c(app),  //渲染app组件
    router,  //挂载路由对象到vm实例上
    store  //挂载store
});