<template>
  <view class="nav">
    <image src="/static/logo.png" mode="" />
  </view>
</template>

<script>
  import { defineComponent } from "vue";
  export default defineComponent({});
</script>

<style lang="scss" scoped>
  .nav {
    width: 100%;
    background: #FFFFFF;
    image {
      display: block;
      margin: auto;
      padding-top: 118rpx;
      width: 140rpx;
      height: 30rpx;
      padding-bottom: 30rpx;
    }
  }
</style>
