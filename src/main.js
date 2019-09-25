//入口文件
import Vue from 'vue';
//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';

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

//导入MUI的样式
import './lib/mui/css/mui.min.css';
//导入mint-ui全部样式
import 'mint-ui/lib/style.css';          
//按需导入mint-ui中的组件
import { Header } from 'mint-ui';
Vue.component(Header.name,Header);  //Header为mint-ui提供好的组件模板对象
//按需导icon购物车图标
import './lib/mui/css/icons-extra.css';
//按需导入mint-ui的轮播图组件
import { Swipe, SwipeItem,Button } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//导入根组件app
import app from './App.vue';

var vm = new Vue({
    el:"#app",
    data:{},
    render:c=>c(app),  //渲染app组件
    router  //挂载路由对象到vm实例上
});