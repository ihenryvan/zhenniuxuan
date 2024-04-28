<template>
    <u-navbar bgColor="#fff" title="到店自提" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="info-wrap">
            <view class="shop-info app-flex align-center" @click="goMap">
                <app-img src="/static/booking/icon-shop.png" w="40" h="40"></app-img>
                <view class="name">{{shopInfo.storeName}}</view>
                <view class="app-flex-item"></view>
                <u-icon class="icon" name="arrow-right" size="16" color="#333" />
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
            <view class="good-list">
                <view class="good-item app-flex align-center" v-for="item in goodList">
                    <app-img class="img" radius="8" :src="item.image || item.productImage" w="112" h="112"></app-img>
                    <view class="app-flex-item" style="padding-left: 20rpx;">
                        <view class="app-flex align-center space-between">
                            <view class="name">{{item.title || item.productTitle}}</view>
                            <view class="amount">x{{item.spNum || item.productNum}}</view>
                        </view>
                        <view class="app-flex align-center space-between" style="padding-top: 10rpx;">
                            <view class="weight">{{item.weight}}{{item.unit}}</view>
                            <view class="price">
                                <text>￥</text>
                                <view class="val">{{userInfo.memberGrade == 1 ? item.discountPrice :item.sellPrice}}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="pay-amount app-flex align-center space-between">
                <view class="label">支付金额</view>
                <view class="price">
                    <text>￥</text>
                    <view class="val">{{costAmount}}</view>
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
                    <view class="val">{{costAmount}}</view>
                </view>
                <!-- <view class="redu">已优惠 ￥0</view> -->
            </view>
            <view class="btn app-flex-center" @click="surePay">立即支付</view>
        </view>
    </view>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { saveOrder, orderDetail, payOrder } from '@/api/order'
import { cartGoods } from '@/api/booking'
import { userAppStore } from '@/store/app'
import { onLoad } from '@dcloudio/uni-app'

let appStore = userAppStore()
let shopInfo = appStore.shopInfo
let userInfo = appStore.userInfo
let goodList = ref([])
let orderNo = ''

let costAmount = computed(() => {
    let isVip = userInfo.memberGrade == 1
    let total = goodList.value.reduce((t, c) => {
        return t + (c.spNum || c.productNum) * (isVip ? c.discountPrice : c.sellPrice) * 100
    }, 0)
    return (total / 100).toFixed(2)
})

onLoad(option => {
    let orderId = option.id
    orderNo = option.orderNo ?? ''
    if (orderId && orderNo) {
        getDetail(orderId)
    } else {
        getCartGoods()
    }
})

function getCartGoods() {
    cartGoods({storeId: shopInfo.id}).then(data => {
        goodList.value = data
    })
}

function getDetail(id) {
    orderDetail({id}).then(data => {
        goodList.value = data.productList
    })
}

function surePay() {
    uni.showLoading({
        title: '正在拉起支付'
    })
    
    if (orderNo) {
        payOrder({orderNo}).then(data => {
            commitPay(data)
        }).finally(() => {
            uni.hideLoading()
        })
    } else {
        saveOrder({storeId: shopInfo.id}).then(data => {
            commitPay(data)
        }).finally(() => {
            uni.hideLoading()
        })
    }
}

function commitPay(data) {
    uni.requestPayment({
        provider: 'wxpay',
        timeStamp: data.signMap.timeStamp,
        nonceStr: data.signMap.nonceStr,
        package: data.signMap.package,
        signType: data.signMap.signType,
        paySign: data.signMap.paySign,
        success(res) {
            goOrderPage()
        },
        fail(err) {
            goOrderPage()
            console.log('err:' + JSON.stringify(err))
        }
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

function goMap() {
    uni.openLocation({
        latitude: Number(shopInfo.latitude),
        longitude: Number(shopInfo.longitude),
        name: shopInfo.storeName,
        address: shopInfo.address
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
            .good-list {
                padding-top: 12rpx;
                .good-item {
                    padding-top: 20rpx;
                }
                .name {
                    font-size: 28rpx;
                }
                .amount, .weight {
                    color: #939393;
                    font-size: 26rpx;
                }
                .val {
                    font-size: 26rpx;
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
                padding-left: 10rpx;
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