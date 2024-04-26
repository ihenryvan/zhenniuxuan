<template>
    <view class="page-wrap">
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
        
        <u-transition :show="isShowRefer" mode="slide-down">
            <view class="work-info" id="reference">
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
        </u-transition>
        
        <view class="scroll-wrap" :style="`top: ${isShowRefer ? referInfo.bottom+14 : referInfo.bottom-referInfo.height}px; transition: all ${isInitial ? 0.3 : 0}s;`">
            <view class="nav-list">
                <scroll-view scroll-y class="scroll-cont">
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
                </scroll-view>
            </view>
            
            <view class="goods-list">
                <scroll-view scroll-y class="scroll-cont" @scroll="onRightScroll">
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
                                            <view class="val">{{good.price}}</view>
                                        </view>
                                        
                                        <u-number-box :min="0" :value="good.num" :name="`${cateIndex}-${goodIndex}`" @change="updateCarNum">
                                            <template #minus v-if="good.num > 0">
                                                <view class="minus">
                                                    <u-icon name="minus-circle" color="#999" size="24"></u-icon>
                                                </view>
                                            </template>
                                            <template #input v-show="good.num > 0">
                                                <text class="amount">{{good.num || ''}}</text>
                                            </template>
                                            <template #plus>
                                                <view class="plus">
                                                    <u-icon name="plus-circle-fill" color="#E6212B" size="24"></u-icon>
                                                </view>
                                            </template>
                                        </u-number-box>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <u-gap height="20rpx" />
                    <u-gap v-if="cartLen > 0" height="110rpx" />
                </scroll-view>
            </view>
        </view>
        
        <u-transition :show="cartLen > 0" mode="fade">
            <view class="cart-warp app-flex align-center">
                <view class="cart">
                    <view class="num">
                        <u-badge :value="cartLen" bgColor="#E6212B"></u-badge>
                    </view>
                    <app-img src="/static/booking/icon-cart.png" w="110" h="110"></app-img>
                </view>
                <view class="price app-flex app-flex-item">
                    <text>￥</text>
                    <view class="val">18.9</view>
                </view>
                <view class="btn app-flex-center" @click="goPay">立即下单</view>
            </view>
        </u-transition>
    </view>
    
    <!-- <u-popup :show="popup.show">
        <view class="detail-popup">
            <view class="close" @click="closeDetailPopup"></view>
            <app-img src="/static/booking/test.png" w="750" h="1400"></app-img>
        </view>
    </u-popup> -->
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { getVideo } from '@/api/photo'


let isInitial = ref(false)
let referInfo = reactive({
    bottom: 0,
    height: 0,
})
let isShowRefer = ref(true)

let list = ref([])
let goodsList = ref([
    { name: '热销推荐', list: [{num: 0, price: 10}, {num: 0, price: 20}, {num: 0, price: 30}] },
    { name: '吊龙肉', list: [{num: 0, price: 10}, {num: 0, price: 20}, {num: 0, price: 30}] },
    { name: '肋条肉', list: [{num: 0, price: 10}, {num: 0, price: 20}, {num: 0, price: 30}] },
    { name: '牛腱子肉', list: [{num: 0, price: 10}, {num: 0, price: 20}, {num: 0, price: 30}] },
    { name: '牛腩肉', list: [{num: 0, price: 10}, {num: 0, price: 20}, {num: 0, price: 30}] },
    { name: '雪花肉', list: [{num: 0, price: 10}, {num: 0, price: 20}, {num: 0, price: 30}] },
    { name: '烤全牛', list: [{num: 0, price: 10}, {num: 0, price: 20}, {num: 0, price: 30}] },
])
let cartLen = computed(() => {
    return goodsList.value.reduce((tol1, cur1) => {
        let val = cur1.list.reduce((tol2, cur2) => {
            return tol2 + cur2.num
        }, 0)
        return tol1 + val;
    }, 0)
})
// let popup = reactive({
//     show: false,
// })

initPage()

function initPage() {
    uni.createSelectorQuery().select('#reference').fields({
        size: true,
        rect: true,
    }, data => {
        referInfo.bottom = data.bottom
        referInfo.height = data.height
    }).exec()
    
    setTimeout(() => {
        isInitial.value = true
    }, 1000)
}

function onRightScroll(e) {
    let {scrollTop} = e.detail
    if (scrollTop > 10 && isShowRefer.value) {
        isShowRefer.value = false
    } else if (scrollTop <= 10 && !isShowRefer.value) {
        isShowRefer.value = true
    }
}

// uni.getSystemInfo({
//     success(data) {
//         console.log(456, data);
//         console.log('windowHeight', data.windowHeight);
//         console.log('statusBarHeight', data.statusBarHeight);
//         console.log('screenTop', data.screenTop);
//         console.log('screenHeight', data.screenHeight);
//     }
// })

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
    
    console.log(456, e.value);
    let val = e.value ?? 1
    
    goodsList.value[indexArr[0]].list[indexArr[1]].num = val
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
            position: relative;
            padding: 24rpx 30rpx;
            background: #fff;
            z-index: 10;
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
        .scroll-wrap {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: #fff;
            .scroll-cont {
                height: 100%;
            }
        }
        .nav-list {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
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
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            width: 564rpx;
            padding-right: 24rpx;
            .cate-title {
                padding: 30rpx 0;
                font-size: 32rpx;
            }
            .goods-cate:first-child .cate-title {
                padding-top: 10rpx;
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
                            min-width: 60rpx;
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
                position: relative;
                margin-left: 24rpx;
                top: -24rpx;
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    z-index: 1;
                }
            }
            .price {
                align-items: baseline;
                padding-left: 30rpx;
                margin-bottom: 6rpx;
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