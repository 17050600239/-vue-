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


var vm = new Vue({
    el:"#app",
    data:{},
    render:c=>c(app),  //渲染app组件
    router  //挂载路由对象到vm实例上
});