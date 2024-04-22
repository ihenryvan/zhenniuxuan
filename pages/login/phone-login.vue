<template>
  <view class="box">
    <u-navbar title="手机登录" :autoBack="true" safeAreaInsetTop="false" :placeholder="true"></u-navbar>
    <view class="title wrap">
      <text>登录</text>
      <text>如未注册则自动创建账号</text>
    </view>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
  html,
  page,
  .box {
    background: #fff;
  }
  .wrap {
    margin: 0 80rpx;
  }
  .title {
    margin-top: 116rpx;
    text {
      display: block;
      &:first-child {
        font-size: 40rpx;
        font-weight: 500;
        color: #222222;
      }
      &:last-child {
        margin-top: 24rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #939393;
      }
    }
  }
</style>
