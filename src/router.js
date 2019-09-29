import VueRouter from 'vue-router';
//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue';
import MemberContainer from './components/tabbar/MemberContainer.vue';
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue';
import SearchContainer from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photos/PhotoList.vue';
import PhotoInfo from './components/photos/PhotoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';
import GoodsComment from './components/goods/GoodsComment.vue';

//创建路由对象
var router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newsList',component:NewsList},
        //用params方式传递参数，获取id即 this.$route.params.id
        {path:'/home/newsInfo/:id',component:NewsInfo},
        {path:'/home/photoList',component:PhotoList},
        {path:'/home/photoInfo/:id',component:PhotoInfo},
        {path:'/home/goodsList',component:GoodsList},
        {path:'/home/goodsInfo/:id',component:GoodsInfo,name:'goodsInfo'},
        {path:'/home/goodsDesc/:id',component:GoodsDesc,name:'goodsdesc'},
        {path:'/home/goodsComment/:id',component:GoodsComment,name:'goodscomment'}
    ],
     //mui-active为mui选中高亮的类，覆盖默认的路由类router-link-active
    linkActiveClass:'mui-active' 
});

//把路由对象暴露出去
export default router; 