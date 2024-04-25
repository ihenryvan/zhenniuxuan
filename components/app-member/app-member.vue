<template>
    <view class="join-wrap">
        <view class="title app-flex-center">
            <app-img src="/static/mine/icon-logo.png" w="40" h="40"></app-img>
            <text>99元开通臻会员年卡，享全场臻实惠价</text>
        </view>
        <view class="row">
            <app-img src="/static/mine/icon-gift.png" w="36" h="36"></app-img>
            <view class="label">活动特惠</view>
            <view class="value">臻会员年卡特惠99元一年</view>
        </view>
        <view class="row">
            <app-img src="/static/mine/icon-sign.png" w="36" h="36"></app-img>
            <view class="label">全场享受</view>
            <view class="value">臻实惠会员优惠价格</view>
        </view>
        <view class="row">
            <app-img src="/static/mine/icon-star.png" w="36" h="36"></app-img>
            <view class="label">品质优选</view>
            <view class="value">臻牛宣新鲜排酸冷鲜牛肉</view>
        </view>
        
        <view class="app-flex-center">
            <view class="btn" @click="onPay">
                <text class="unit">￥</text>
                <text class="now">{{price || 0}}</text>
                <view class="before-price">
                    <text class="unit">￥</text>
                    <text class="before">{{originPrice || 0}}</text>
                </view>
                <text class="label">开通会员</text>
            </view>
        </view>
        
        <view class="tip">
            <text>开通一次，全年享用</text>
            <u-divider class="line" text="" lineColor="#9E9A97"></u-divider>
        </view>
        <view class="protocal app-flex-center">
            <text class="label">购买即视为同意</text>
            <text class="value">《臻牛宣会员服务协议》</text>
        </view>
    </view>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import * as auth from '@/api/auth'
    import config from '@/config'
    import { userAppStore } from '@/store/app'
    import { applyVip, getConfig, getUserInfo } from '@/api/mine'

    let appStore = userAppStore()
    let emit = defineEmits(['authed'])
    let price = ref(0)
    let originPrice = ref(0)
    
    init()
    
    function init() {
        getConfig().then(data => {
            price.value = data.price
            originPrice.value = data.originPrice
        })
    }
    
    function onPay() {
        if (!appStore.hasLogin) {
            // return uni.showToast({
            //     title: '请先登陆',
            //     icon: 'none'
            // })
            return emit('fail')
        }
        
        uni.showLoading({
            title: '正在拉起支付'
        })
        applyVip().then(data => {
            uni.requestPayment({
                provider: 'wxpay',
                timeStamp: data.signMap.timeStamp,
                nonceStr: data.signMap.nonceStr,
                package: data.signMap.package,
                signType: data.signMap.signType,
                paySign: data.signMap.paySign,
                success: function(res) {
                    updateInfo()
                    console.log('success:' + JSON.stringify(res));
                },
                fail: function(err) {
                    console.log('fail:' + JSON.stringify(err));
                }
            })
        }).finally(() => {
            uni.hideLoading()
        })
    }
    
    function updateInfo() {
        getUserInfo().then(data => {
            let newGrade = data.memberGrade
            if (newGrade != appStore.userInfo.memberGrade) {
                let userInfo = { ...appStore.userInfo }
                
                userInfo.memberGrade = data.memberGrade
                appStore.storeUserInfo(userInfo)
            }
        })
    }
</script>

<style lang="scss" scoped>
    .join-wrap {
        background: #F4F1E8;
        padding: 30rpx;
        .title {
            font-size: 34rpx;
            margin-bottom: 34rpx;
            text {
                padding-left: 12rpx;
            }
        }
        .protocal {
            font-size: 24rpx;
            .label {
                color: #9E9A97;
            }
        }
        .tip {
            position: relative;
            color: #9E9A97;
            font-size: 24rpx;
            padding: 28rpx 0 0rpx;
            width: 290rpx;
            text-align: center;
            margin: 0 auto;
            .line {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                
            }
        }
        .btn {
            background: #000000;
            box-shadow: 0 12rpx 20rpx 0rpx #C7BCA6;
            border-radius: 8rpx 8rpx 8rpx 8rpx;
            color: #fff;
            padding: 24rpx 0;
            width: 98%;
            display: flex;
            align-items: baseline;
            justify-content: center;
            margin-top: 10rpx;
            .unit, .before {
                font-size: 24rpx;
            }
            .now {
                font-size: 40rpx;
            }
            .label {
                font-size: 32rpx;
                padding-left: 20rpx;
            }
            .before-price {
                text-decoration: line-through;
                padding-left: 10rpx;
            }
        }
        .row {
            display: flex;
            align-items: center;
            font-size: 28rpx;
            margin-bottom: 20rpx;
            padding-left: 10rpx;
            .label {
                color: #998C57;
                padding: 0 20rpx;
            }
            .value {
                color: #E6212B;
            }
        }
    }
</style>