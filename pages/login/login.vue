<template>
    <view>
        <u-navbar title="登录" leftIconSize=0 :autoBack="true" safeAreaInsetTop="false" :placeholder="true"></u-navbar>
        <view class="poster">
            <image src="/static/login/poster.png" mode="" />
        </view>
        <button class="btn" @click="onAuth">一键注册</button>
        <!-- <button class="btn btn2" @click="phoneLogin">手机验证码登录</button> -->
        <view class="agreement flex-center">
            <image src="/static/order/group.png" mode="" v-if="false" />
            <image src="/static/order/group-active.png" mode="" />
            <view>
                查看
                <text>《用户服务协议》</text>
                及
                <text>《隐私协议》</text>
            </view>
        </view>
    </view>

    <auth ref="authRef" @authed="success"></auth>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import auth from '@/components/auth'
    import { userAppStore } from '@/store/app'

    let authRef = ref(null)
    let appStore = userAppStore()

    function onAuth() {
        authRef.value.open()
    }

    function phoneLogin() {
        uni.navigateTo({
            url: '/pages/login/phone-login'
        })
    }

    function success(data) {
        uni.switchTab({
            url: '/pages/index/index'
        })
    }
</script>

<style lang="scss" scoped>
    page,
    html {
        background: #fff;
    }

    .poster {
        width: 626rpx;
        height: 470rpx;
        margin: auto;
        margin-top: 212rpx;
        margin-bottom: 204rpx;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .btn {
        width: 590rpx;
        height: 92rpx;
        border-radius: 16rpx;
        font-size: 30rpx;
        font-weight: 400;
        margin: auto;
        background: #0066ff;
        line-height: 92rpx;
        color: #ffffff;
        margin-bottom: 48rpx;
    }

    .btn2 {
        background: #ffffff;
        border-radius: 16rpx;
        border: 2rpx solid #dedede;
        color: #222222;
    }

    .agreement {
        justify-content: center;

        image {
            width: 28rpx;
            height: 28rpx;
            margin-right: 16rpx;
            margin-top: 5rpx;
        }

        view {
            font-size: 24rpx;
            font-weight: 400;
            color: #222222;

            text {
                color: #0066ff;
            }
        }
    }
</style>