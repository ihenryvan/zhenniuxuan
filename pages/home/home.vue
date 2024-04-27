<template>
    <view class="page-wrap">
        <u-navbar
            title="首页"
            bgColor="transparent"
            :safeAreaInsetTop="true"
            @leftClick="onLeftClick"
            titleStyle="color: #fff"
        >
            <template #left>
                <view
                    class="app-flex-center"
                >
                    <!-- <u-icon name="map" color="#fff"></u-icon> -->
                    <!-- <text style="font-size: 28rpx; color: #fff;">深圳</text> -->
                </view>
            </template>
        </u-navbar>
        
        <app-img src="/static/home/top-bg.png" w="750" h="678"></app-img>
        <view class="page-cont">
            <view class="grid-list">
                <u-grid :border="false">
                    <u-grid-item v-for="(item, index) in gridList" :key="index" style="margin: 14rpx 0;" @click="goMeat">
                        <!-- <view> -->
                            <app-img :src="`/static/home/grid-icon${index}.png`" w="80" h="80"></app-img>
                            <text class="grid-text">{{item}}</text>
                        <!-- </view> -->
                    </u-grid-item>
                </u-grid>
            </view>
            
            <view class="bar-wrap app-flex space-between">
                <view class="item app-flex-center">
                    <app-img src="/static/home/bar-icon0.png" w="78" h="78"></app-img>
                    <text>公司介绍</text>
                </view>
                <view class="item app-flex-center">
                    <app-img src="/static/home/bar-icon1.png" w="68" h="68"></app-img>
                    <text>品质介绍</text>
                </view>
            </view>
            
            <view class="join-wrap">
                <app-img src="/static/home/join.png" w="700" h="204"></app-img>
                <view class="join-title">
                    <view class="main">99元开通年Plus会员</view>
                    <view class="sub">即送100元立减券+全年9.5折+每月66元券包</view>
                </view>
            </view>
            
            
            <view class="activity-wrap">
                <view class="title">
                    <app-img src="/static/home/activity-title.png" w="258" h="44"></app-img>
                </view>
                <u-scroll-list :indicator="false">
                    <view class="item" v-for="(item, index) in 3" :key="index">
                        <app-img src="/static/home/activity.png" w="532" h="236"></app-img>
                        <view class="label">【臻牛宣】99元里脊牛排特价预售</view>
                    </view>
                </u-scroll-list>
            </view>
        </view>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'
// import { getShopList } from '@/api/home'

let phone = ref('15338841454')
let popup = reactive({
    show: false,
})
let gridList = ref(['吊龙', '肋条', '牛腱子', '牛腩', '牛肉', '雪花'])

// getIndexList().then(data => {
//     if (data?.length) {
//         list.value = data
//     }
// })

// getShopList({latitude: 22.67412, longitude: 114.035825})

function goMeat() {
    uni.switchTab({
        url: '/pages/booking/booking'
    })
}
function onPreview(data) {
    // popup.show = true
    uni.navigateTo({
        url: `/pages/index/share?name=${data.imageName}&path=${data.imageUrl}`
    })
}

function onCall() {
    uni.makePhoneCall({
    	phoneNumber: phone.value
    });
}

function onLeftClick() {}
</script>

<style lang="scss">
    page {
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-wrap {
        padding-bottom: 50rpx;
    }
    .page-cont {
        position: relative;
        z-index: 1;
        padding: 0 24rpx;
        margin-top: -100rpx;
        .grid-list {
            background: #fff;
            border-radius: 16rpx;
            padding: 30rpx 0 20rpx 0;
            .grid-text {
                margin: 12rpx 0 20rpx 0;
                font-size: 28rpx;
            }
        }
        .bar-wrap {
            margin-top: 30rpx;
            .item {
                width: 48.5%;
                background: #fff;
                border-radius: 16rpx;
                font-size: 32rpx;
                padding: 16rpx 0;
                text {
                    margin-left: 16rpx;
                }
            }
        }
        .join-wrap {
            position: relative;
            margin-top: 30rpx;
            .join-title {
                position: absolute;
                top: 40rpx;
                right: 20rpx;
                text-align: center;
                .main {
                    color: #FACE88;
                    font-size: 50rpx;
                }
                .sub {
                    color: #fff;
                    font-size: 24rpx;
                    margin-top: 6rpx;
                }
            }
        }
        
        .activity-wrap {
            .title {
                padding-top: 50rpx;
                padding-bottom: 30rpx;
            }
            .item {
                min-width: 532rpx;
                overflow: hidden;
                border-radius: 16rpx;
                &:not(:last-child) {
                    margin-right: 24rpx;
                }
                .label {
                    background: #fff;
                    padding: 24rpx;
                    font-size: 28rpx;
                }
            }
        }
    }
</style>