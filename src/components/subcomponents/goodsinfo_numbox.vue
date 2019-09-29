<template>
  <div class="mui-numbox" data-numbox-min="1" >
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <!-- @change为监听文本框时调用的countChanged函数 -->
    <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js';
export default {
  methods:{
    countChanged(){
      // console.log(this.$refs.numbox.value);
      this.$emit("getcount",parseInt(this.$refs.numbox.value));
    }
  },
  props:["max"],  //可选最大值
  watch:{ //属性监听
    "max": function(newVal,oldVal){
    // 使用mui文档里的 JS API 设置 numbox 的最大值
    mui(".mui-numbox").numbox().setOption("max",newVal);
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
