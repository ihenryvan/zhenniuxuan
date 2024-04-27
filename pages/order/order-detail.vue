<template>
    <u-navbar bgColor="#fff" title="已完成" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="info-wrap">
            <view class="status-info">
                <view class="app-flex-center">
                    <app-img src="/static/order/icon-status.png" w="258" h="258"></app-img>
                </view>
                <view class="status-txt">感谢您的光临</view>
            </view>
            <view class="shop-info app-flex align-center">
                <app-img src="/static/booking/icon-shop.png" w="40" h="40"></app-img>
                <view class="name">牛气无语（龙华清湖店）</view>
                <!-- <u-icon class="icon" name="arrow-right" size="16" color="#333" /> -->
            </view>
            <view class="doc-info app-flex align-center">
                <u-icon name="map" size="18" color="#666" />
                <text>距离您14.10km</text>
            </view>
        </view>
        
        <view class="order-list">
            <view class="item">
                <view class="top app-flex-center">
                    <view class="app-flex-item app-flex align-center">
                        <!-- <app-img src="/static/order/icon-logo.png" w="36" h="36"></app-img> -->
                        <view class="name">订单编号：9977712562123</view>
                    </view>
                    <view class="status">待提货</view>
                </view>
                <view class="center app-flex space-between">
                    <view class="goods-list app-flex">
                        <view class="goods-item" v-for="item in 3">
                            <app-img class="img" radius="8" src="https://p.qqan.com/up/2024-2/2024231347411942.jpg" w="124" h="124"></app-img>
                            <view class="goods-name">牛排</view>
                        </view>
                    </view>
                    <view>
                        <view class="total">共计3件</view>
                        <view class="price-wrap">
                            <view class="price app-flex">
                                <text>￥</text>
                                <view class="val">18.96</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="bottom app-flex-center">
                    <view class="app-flex-item">
                        <view class="row app-flex align-center">
                            <view class="label">下单时间：</view>
                            <view class="value">2024-04-16 16:01:01</view>
                        </view>
                        <view class="row app-flex align-center">
                            <view class="label">订单号：</view>
                            <view class="value">9777165***123</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'
import { orderDetail } from '@/api/order'
import { onLoad } from '@dcloudio/uni-app'

onLoad(option => {
    getDetail(option.id)
})

function getDetail(id) {
    orderDetail({ id }).then(data => {
        console.log(666, data);
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
            .status-info {
                padding: 10rpx 0 44rpx;
                .status-txt {
                    font-size: 32rpx;
                    text-align: center;
                }
            }
            .shop-info {
                border-top: solid 1px #F7F8FA;
                padding-top: 30rpx;
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
                        color: #E6212B;
                        font-size: 28rpx;
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
                    min-height: 146rpx;
                    .row {
                        font-size: 24rpx;
                        &:not(:first-child) {
                            margin-top: 20rpx;
                        }
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