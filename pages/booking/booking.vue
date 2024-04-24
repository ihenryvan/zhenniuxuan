<template>
    <view class="page-wrap">
        <u-sticky>
            <u-navbar bgColor="#fff" title="点肉" leftIcon="" :placeholder="true" />
            <view class="info-wrap">
                <view class="shop-info app-flex align-center">
                    <app-img src="/static/booking/icon-shop.png" w="40" h="40"></app-img>
                    <view class="name">牛气无语（龙华清湖店）</view>
                    <u-icon class="icon" name="arrow-right" size="16" color="#333" />
                </view>
                <view class="doc-info app-flex align-center">
                    <u-icon name="map" size="18" color="#666" />
                    <text>距离您14.10km</text>
                </view>
            </view>
        </u-sticky>
        
        <view class="work-info">
            <app-img src="/static/booking/info-bg.png" w="680" h="114"></app-img>
            <view class="work-info-cont app-flex space-between align-center">
                <view class="left">
                    <view class="item1">营业时间：08:30-21:30</view>
                    <view class="item2">地址：侨北一街橡皮树创意坊D1-4号</view>
                </view>
                <view class="right">
                    <view class="app-flex-center">
                        <u-icon name="phone" size="26" color="#333" />
                    </view>
                    <view class="label">联系门店</view>
                </view>
            </view>
        </view>
        
        <view class="nav-list">
            <view class="item">
                <view class="img app-flex-center">
                    <app-img src="/static/booking/icon-hot.png" w="64" h="64"></app-img>
                </view>
                <view class="name">热销推荐</view>
            </view>
            
            <view class="item">
                <view class="img app-flex-center">
                    <app-img src="/static/booking/icon-meat0.png" w="64" h="64"></app-img>
                </view>
                <view class="name">烤肉类</view>
            </view>
        </view>
        
        <view class="goods-list">
            <view class="goods-cate" v-for="(cate, cateIndex) in goodsList">
                <view class="cate-title">{{cate.name}}</view>
                <view class="list">
                    <view class="item" v-for="(good, goodIndex) in cate.list">
                        <app-img class="img" radius="8" @click="onDetail" src="https://p.qqan.com/up/2024-2/2024231347411942.jpg" w="176" h="176"></app-img>
                        <view class="intro">
                            <view class="name" @click="onDetail">2024款 原切澳洲安格斯 M3+上脑牛排</view>
                            <view class="m-price app-flex" @click="onDetail">
                                <view class="left">臻会员价</view>
                                <view class="right">￥17.98</view>
                            </view>
                            <view class="bottom app-flex align-center space-between">
                                <view class="price app-flex">
                                    <text>￥</text>
                                    <view class="val">18.96</view>
                                </view>
                                
                                <u-icon name="plus-circle-fill" color="#E6212B" size="22"></u-icon>
                                <!-- <u-number-box :min="0" :value="good.num" :name="`${cateIndex}-${goodIndex}`" @change="updateCarNum">
                                    <template #minus>
                                        <view class="minus">
                                            <u-icon name="minus-circle" color="#999" size="22"></u-icon>
                                        </view>
                                    </template>
                                    <template #input>
                                        <text class="amount">{{good.num}}</text>
                                    </template>
                                    <template #plus>
                                        <view class="plus">
                                            <u-icon name="plus-circle-fill" color="#E6212B" size="22"></u-icon>
                                        </view>
                                    </template>
                                </u-number-box> -->
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        
        <view class="cart-warp app-flex align-center">
            <view class="cart">
                <app-img src="/static/booking/icon-cart.png" w="104" h="104"></app-img>
            </view>
            <view class="price app-flex app-flex-item">
                <text>￥</text>
                <view class="val">18.9</view>
            </view>
            <view class="btn app-flex-center" @click="goPay">立即下单</view>
        </view>
    </view>
    
    <u-popup :show="popup.show">
        <view class="detail-popup">
            <view class="close" @click="closeDetailPopup"></view>
            <app-img src="/static/booking/test.png" w="750" h="1400"></app-img>
        </view>
    </u-popup>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getVideo } from '@/api/photo'

let popup = reactive({
    show: false,
})

let list = ref([])
let goodsList = ref([
    { name: '热销推荐', list: [{num: 0}, {num: 0}, {num: 0}, {num: 0}] },
    { name: '烤牛肉', list: [{num: 0}, {num: 0}, {num: 0}, {num: 0}] },
])

// getVideo().then(data => {
//     if (data?.length) {
//         list.value = data
//     }
// })

function onDetail() {
    popup.show = true
    uni.hideTabBar()
}
function closeDetailPopup() {
    popup.show = false
    uni.showTabBar()
}
function goPay() {
    uni.navigateTo({
        url: './pay'
    })
}

function updateCarNum(e) {
    let indexArr = e.name.split('-')
    let val = e.value
    
    // goodsList.value[indexArr[0]].list[indexArr[1]].num = val
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
        // background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .detail-popup {
        position: relative;
        .close {
            position: absolute;
            top: 20rpx;
            right: 0;
            z-index: 1;
            width: 200rpx;
            height: 60rpx;
            // border: solid 1px red;
        }
    }
    .page-wrap {
        .info-wrap {
            padding: 24rpx 30rpx;
            background: #fff;
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
        }
        .work-info {
            position: relative;
            margin: 0rpx 30rpx 0;
            .work-info-cont {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                padding: 0 20rpx;
                .item1 {
                    font-size: 26rpx;
                }
                .item2 {
                    font-size: 24rpx;
                    padding-top: 10rpx;
                }
                .label {
                    font-size: 24rpx;
                }
            }
        }
        .nav-list {
            position: fixed;
            left: 0;
            top: 440rpx;
            bottom: 0rpx;
            min-width: 160rpx;
            background: #F6F6F6;
            padding-top: 20rpx;
            .item {
                padding: 20rpx 0;
                .name {
                    font-size: 28rpx;
                    text-align: center;
                }
            }
        }
        .goods-list {
            padding-left: 190rpx;
            padding-right: 24rpx;
            padding-bottom: 130rpx;
            .cate-title {
                padding: 30rpx 0;
                font-size: 32rpx;
            }
            .item {
                position: relative;
                min-height: 176rpx;
                &:not(:last-child) {
                    padding-bottom: 24rpx;
                    margin-bottom: 24rpx;
                    border-bottom: solid 1px #F7F8FA;
                }
                
                .img {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .intro {
                    padding-left: 196rpx;
                    .name {
                        font-size: 30rpx;
                        min-height: 40rpx;
                        padding-top: 4rpx;
                    }
                    .m-price {
                        overflow: hidden;
                        border-radius: 8rpx;
                        margin-top: 10rpx;
                        .left {
                            color: #EBFF00;
                            background: #000000;
                            font-size: 24rpx;
                            padding: 4rpx 10rpx;
                        }
                        .right {
                            color: #E6212B;
                            background: #F7F8FA;
                            font-size: 28rpx;
                            padding: 2rpx 10rpx 0 6rpx
                        }
                    }
                    .bottom {
                        margin-top: 10rpx;
                        .price {
                            align-items: baseline;
                            text {
                                font-size: 24rpx;
                            }
                            .val {
                                font-size: 32rpx;
                            }
                        }
                        .amount {
                            min-width: 50rpx;
                            text-align: center;
                        }
                    }
                }
            }
        }
        
        .cart-warp {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10;
            height: 110rpx;
            background: #F6F6F6;
            .cart {
                margin-left: 24rpx;
                position: relative;
                top: -24rpx;
            }
            .price {
                align-items: baseline;
                padding-left: 30rpx;
                text {
                    font-size: 24rpx;
                }
                .val {
                    font-size: 34rpx;
                }
            }
            .btn {
                width: 222rpx;
                height: 100%;
                color: #fff;
                background: #E6212B;
            }
        }
    }
</style>