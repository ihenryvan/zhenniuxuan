<template>
    <u-navbar bgColor="#fff" title="到店自提" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="info-wrap">
            <view class="shop-info app-flex align-center">
                <app-img src="/static/booking/icon-shop.png" w="40" h="40"></app-img>
                <view class="name">{{shopInfo.storeName}}</view>
                <!-- <u-icon class="icon" name="arrow-right" size="16" color="#333" /> -->
            </view>
            <!-- <view class="doc-info app-flex align-center">
                <u-icon name="map" size="18" color="#666" />
                <text>距离您14.10km</text>
            </view> -->
            <view class="time-info app-flex space-between">
                <view class="label">自提时间</view>
                <view class="value">约14:39可取</view>
            </view>
        </view>
        
        <view class="goods-wrap">
            <view class="title">商品信息</view>
            <view class="goods-cont app-flex align-center">
                <app-img class="img" radius="8" src="https://p.qqan.com/up/2024-2/2024231347411942.jpg" w="112" h="112"></app-img>
                <view class="app-flex-item" style="padding-left: 20rpx;">
                    <view class="app-flex align-center space-between">
                        <view class="name">2024款 原切澳洲谷饲眼肉盖（烤）</view>
                        <view class="amount">x1</view>
                    </view>
                    <view class="app-flex align-center space-between" style="padding-top: 10rpx;">
                        <view class="weight">200g</view>
                        <view class="price">
                            <text>￥</text>
                            <view class="val">18.9</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="pay-amount app-flex align-center space-between">
                <view class="label">支付金额</view>
                <view class="price">
                    <text>￥</text>
                    <view class="val">18.9</view>
                </view>
            </view>
        </view>
        
        <view class="pay-wrap app-flex-center">
            <view class="label app-flex-item">支付方式</view>
            <view class="app-flex-center">
                <app-img src="/static/booking/pay-wechat.png" w="40" h="40"></app-img>
                <text>微信支付</text>
            </view>
        </view>
        
        <view class="cart-warp app-flex align-center">
            <view class="price-wrap app-flex-item">
                <view class="price">
                    <text>￥</text>
                    <view class="val">18.9</view>
                </view>
                <view class="redu">已优惠 ￥0</view>
            </view>
            <view class="btn app-flex-center" @click="surePay">立即支付</view>
        </view>
    </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { saveOrder } from '@/api/order'
import { cartGoods } from '@/api/booking'
import { userAppStore } from '@/store/app'
import { onLoad } from '@dcloudio/uni-app'

let appStore = userAppStore()
let shopInfo = appStore.shopInfo
let list = ref([])

onLoad(option => {
    if (option.id) { // 从订单列表页进入
        
    } else { // 从下单页进入
        getCartGoods()
    }
})

function getCartGoods() {
    cartGoods({storeId: shopInfo.id}).then(data => {
    })
}

function surePay() {
    uni.showLoading({
        title: '正在拉起支付'
    })
    saveOrder({storeId: shopInfo.id}).then(data => {
        uni.requestPayment({
            provider: 'wxpay',
            timeStamp: data.signMap.timeStamp,
            nonceStr: data.signMap.nonceStr,
            package: data.signMap.package,
            signType: data.signMap.signType,
            paySign: data.signMap.paySign,
            success: function(res) {
                goOrderPage()
            },
            fail: function(err) {
                goOrderPage()
                console.log('err:' + JSON.stringify(err))
            }
        })
    }).finally(() => {
        uni.hideLoading()
    })
}

function goOrderPage() {
    uni.switchTab({
        url: '/pages/order/order'
    })
}

function onPreview(no) {
    // popup.show = true
    uni.navigateTo({
        url: `/pages/photo/detail?no=${no}`
    })
}
</script>

<style lang="scss">
    page {
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-wrap {
        padding: 24rpx;
        .info-wrap {
            background: #fff;
            padding: 28rpx 24rpx;
            border-radius: 16rpx;
            .shop-info {
                .name {
                    font-size: 30rpx;
                    padding-left: 16rpx;
                }
                .icon {
                    position: relative;
                    top: 4rpx;
                }
            }
            .doc-info {
                padding-top: 16rpx;
                padding-left: 2rpx;
                text {
                    color: #939393;
                    font-size: 28rpx;
                    margin-left: 14rpx;
                }
            }
            .time-info {
                font-size: 28rpx;
                padding-top: 24rpx;
                border-top: solid 1px #F7F8FA;
                margin-top: 24rpx;
            }
        }
        
        .goods-wrap {
            background: #fff;
            padding: 28rpx 24rpx;
            border-radius: 16rpx;
            margin-top: 24rpx;
            .title {
                font-size: 32rpx;
            }
            .goods-cont {
                padding-top: 32rpx;
                .name {
                    font-size: 28rpx;
                }
                .amount, .weight {
                    color: #939393;
                    font-size: 26rpx;
                }
                .weight {
                }
            }
            .pay-amount {
                margin-top: 28rpx;
                padding-top: 28rpx;
                border-top: solid 1px #F7F8FA;
                .label {
                    font-size: 28rpx;
                }
            }
        }
        
        .pay-wrap {
            background: #fff;
            padding: 28rpx 24rpx;
            border-radius: 16rpx;
            margin-top: 24rpx;
            .label {
                font-size: 32rpx;
            }
            text {
                font-size: 28rpx;   
            }
        }
        
        .cart-warp {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
            height: 110rpx;
            background: #fff;
            .price-wrap {
                padding-left: 30rpx;
                .redu {
                    color: #939393;
                    font-size: 24rpx;
                }
            }
            .btn {
                width: 222rpx;
                height: 100%;
                color: #fff;
                background: #E6212B;
            }
        }
        
        .price {
            display: flex;
            align-items: baseline;
            text {
                font-size: 24rpx;
            }
            .val {
                font-size: 34rpx;
            }
        }
    }
</style>