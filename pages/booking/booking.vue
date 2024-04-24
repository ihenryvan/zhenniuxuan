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
        
        <view class="goods-list">
            <view class="goods-cate" v-for="(cate, cateIndex) in goodsList">
                <view class="cate-title">{{cate.name}}</view>
                <view class="list">
                    <view class="item" v-for="(good, goodIndex) in cate.list">
                        <app-img class="img" radius="8" src="https://p.qqan.com/up/2024-2/2024231347411942.jpg" w="176" h="176"></app-img>
                        <view class="intro">
                            <view class="name">2024款 原切澳洲安格斯 M3+上脑牛排</view>
                            <view class="m-price">
                                <view class="left">臻会员价</view>
                                <view class="right">￥17.98</view>
                            </view>
                            <view class="bottom">
                                <view class="price">
                                    <text>￥</text>
                                    <view class="val">18.96</view>
                                </view>
                                <u-number-box :min="0" :value="good.num" :name="`${cateIndex}-${goodIndex}`" @change="updateCarNum">
                                    <template #minus>
                                        <view class="minus">
                                            <u-icon name="minus-circle-fill" color="#333" size="18"></u-icon>
                                        </view>
                                    </template>
                                    <template #input>
                                        <text class="amount">{{good.num}}</text>
                                    </template>
                                    <template #plus>
                                        <view class="plus">
                                            <u-icon name="plus-circle-fill" color="#333" size="18"></u-icon>
                                        </view>
                                    </template>
                                </u-number-box>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        
        <view style="height: 2000rpx;"></view>
    </view>
    
    <u-popup :show="popup.show" mode="center">
        <view>
            <text>出</text>
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


function updateCarNum(e) {
    let indexArr = e.name.split('-')
    let val = e.value
    
    goodsList.value[indexArr[0]].list[indexArr[1]].num = val
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
        .goods-list {
            padding-left: 190rpx;
            .cate-title {
                padding: 30rpx 0;
                font-size: 32rpx;
            }
            .item {
                position: relative;
                .img {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
                .intro {
                    padding-left: 196rpx;
                    .name {
                        font-size: 28rpx;
                        min-height: 40rpx;
                    }
                }
            }
        }
    }
</style>