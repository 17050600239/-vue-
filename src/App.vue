<template>
  <div class="app-container">
    <!-- 顶部header区域 -->
    <mt-header fixed title="黑马程序员-vue实战">
      <!-- 返回按钮 -->
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>


    <!-- 中间路由router-view区域,四个tabber组件 -->
		<transition>
			<router-view></router-view>
		</transition>


    <!-- 底部tabber区域 -->
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-zyj" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-zyj" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-zyj" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <!-- 购物车小球徽标 -->
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-zyj" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  data(){
    return {
      flag:false
    }
  },
  created(){
    this.flag = this.$route.path === '/home' ? false : true ;
  },
  methods:{
    goBack(){
      //点击后退返回按钮事件
      this.$router.go(-1); //使用路由的go属性，-1为后退
    }
  },
  watch:{
    // 监听路由地址是否为 home首页,需要在created中
    '$route.path':function(newVal){
      // console.log(newVal);
      if(newVal === '/home'){
        this.flag = false;
      }else{
        this.flag = true;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-header.is-fixed{
  z-index: 99;
}
.app-container{
  padding-top:40px;
  padding-bottom:50px;
	overflow-x: hidden;
}
.v-enter{
	opacity: 0;
	transform: translateX(100%);  //100%适配所有机型
}
.v-leave-to{
	opacity: 0;
	transform: translateX(-100%);  //100%适配所有机型
	position: absolute;
}
.v-enter-active,
.v-leave-active{
	transition: all 0.5s ease;
}
//改类名，解决tabbar点击无法切换的问题
.mui-bar-tab .mui-tab-item-zyj.mui-active {
    color: #007aff;
}
.mui-bar-tab .mui-tab-item-zyj {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-zyj .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-zyj .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
