import VueRouter from 'vue-router';


//创建路由对象
var router = new VueRouter({
    routes:[
    ],
     //mui-active为mui选中高亮的类，覆盖默认的路由类router-link-active
    linkActiveClass:'mui-active' 
});

//把路由对象暴露出去
export default router; 