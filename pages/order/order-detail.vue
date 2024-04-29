<template>
    <u-navbar bgColor="#fff" :title="orderStatus[status]" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="info-wrap">
            <view class="status-info">
                <template v-if="status == 'paid'">
                    <view class="app-flex-center">
                        <app-img src="/static/order/code.png" w="258" h="258"></app-img>
                    </view>
                    <view class="status-txt" style="padding-top: 16rpx;">核销码</view>
                    
                    <!-- <canvas id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas> -->
                </template>
                <template v-else>
                    <view class="app-flex-center">
                        <app-img src="/static/order/icon-status.png" w="258" h="258"></app-img>
                    </view>
                    <view class="status-txt">感谢您的光临</view>
                </template>
            </view>
            <view class="loc-wrap app-flex align-center space-between">
                <view class="app-flex-item">
                    <view class="shop-info app-flex align-center">
                        <app-img src="/static/booking/icon-shop.png" w="40" h="40"></app-img>
                        <view class="name">{{shopInfo.storeName}}</view>
                    </view>
                    <view class="doc-info app-flex align-center">
                        <u-icon name="map" size="18" color="#666" />
                        <text>距离您14.10km</text>
                    </view>
                </view>
                <view class="nav" @click="goMap">
                    <app-img src="/static/order/icon-nav.png" w="48" h="48"></app-img>
                    <view class="label">导航</view>
                </view>
            </view>
        </view>
        
        <view class="order-list">
            <view class="item">
                <view class="top app-flex-center">
                    <view class="app-flex-item app-flex align-center">
                        <!-- <app-img src="/static/order/icon-logo.png" w="36" h="36"></app-img> -->
                        <view class="name">订单编号：9977712562123</view>
                    </view>
                    <view class="status" :class="status">{{orderStatus[status]}}</view>
                </view>
                <view class="center app-flex space-between">
                    <view class="goods-list app-flex">
                        <view class="goods-item" v-for="item in info.productList">
                            <app-img class="img" radius="8" :src="item.productImage" w="124" h="124"></app-img>
                            <view class="goods-name">{{item.productTitle}}</view>
                        </view>
                    </view>
                    <view>
                        <view class="total">共计{{info.totalNum}}件</view>
                        <view class="price-wrap">
                            <view class="price app-flex">
                                <text>￥</text>
                                <view class="val">{{info.dueAmount}}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="bottom app-flex-center">
                    <view class="app-flex-item">
                        <view class="row app-flex align-center">
                            <view class="label">订单号：</view>
                            <view class="value">{{info.orderNo}}</view>
                        </view>
                        <view class="row app-flex align-center">
                            <view class="label">下单时间：</view>
                            <view class="value">{{info.createTime}}</view>
                        </view>
                        <view class="row app-flex align-center" v-if="status == 'paid'">
                            <view class="label">支付时间：</view>
                            <view class="value">{{info.payTime}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'
import { orderDetail, genCode } from '@/api/order'
import { userAppStore } from '@/store/app'
import { orderStatus } from '@/common/js/status'
import { onLoad } from '@dcloudio/uni-app'
// import UQRCode from '@/uni_modules/uqrcode'

onLoad(option => {
    status.value = option.status
    getDetail(option.id)
    getCode(option.id)
    
    draw()
})

let appStore = userAppStore()
let shopInfo = appStore.shopInfo
let status = ref('')
let info = ref({})

function getDetail(id) {
    orderDetail({ id }).then(data => {
        data.totalNum = data.productList.reduce((t, c) => {
            return t + c.productNum
        }, 0)
        info.value = data
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

// function draw() {
//     var qr = new UQRCode();
//     qr.data = "https://uqrcode.cn/doc";
//     qr.size = 200;
//     qr.make();
//     var canvas = document.getElementById("qrcode");
//     var canvasContext = canvas.getContext("2d");
//     // 设置uQRCode实例的canvas上下文
//     qr.canvasContext = canvasContext;
//     // 调用绘制方法将二维码图案绘制到canvas上
//     qr.drawCanvas();
// }

function getCode(id) {
    genCode({id})
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
            .status-info {
                padding: 10rpx 0 44rpx;
                .status-txt {
                    font-size: 32rpx;
                    text-align: center;
                }
            }
            .loc-wrap {
                min-height: 150rpx;
                border-top: solid 1px #F7F8FA;
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
                .nav {
                    text-align: center;
                    padding-left: 10rpx;
                    .label {
                        position: relative;
                        right: 2rpx;
                        font-size: 26rpx;
                        padding-top: 10rpx;
                    }
                }
            }
        }
        
        
        .order-list {
            padding-top: 30rpx;
            .item {
                background: #fff;
                margin-bottom: 30rpx;
                padding: 0 24rpx;
                border-radius: 16rpx;
                .top {
                    min-height: 88rpx;
                    .name {
                        padding-left: 14rpx;
                        font-size: 28rpx;
                    }
                    .status {
                        color: #bbb;
                        font-size: 28rpx;
                        &.nopay {
                            color: #E6212B;
                        }
                        &.paid {
                            color: #53c21d;
                        }
                        &.pending {
                            color: #333;
                        }
                    }
                }
                .center {
                    padding: 28rpx 0;
                    border: solid 0 #F7F8FA;
                    border-width: 1px 0;
                    align-items: flex-start;
                    .goods-list {
                        .goods-item {
                            // max-width: 124rpx;
                            margin-left: 24rpx;
                            .goods-name {
                                font-size: 26rpx;
                                text-align: center;
                                padding-top: 16rpx;
                            }
                        }
                    }
                    .total {
                        padding-top: 12rpx;
                        font-size: 28rpx;
                    }
                    .price-wrap {
                        padding-top: 20rpx;
                    }
                }
                .bottom {
                    padding: 14rpx 0;
                    .row {
                        font-size: 24rpx;
                        padding: 10rpx 0;
                    }
                    .value {
                        color: #939393;
                    }
                }
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