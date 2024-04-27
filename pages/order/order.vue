<template>
    <view class="page-wrap">
        <u-sticky>
            <u-navbar bgColor="#fff" title="订单" leftIcon="" :placeholder="true" />
            <view style="background: #fff;">
                <u-tabs :list="tabList" :scrollable="false" lineColor="#E6212B" :activeStyle="{ color: '#E6212B' }"></u-tabs>
            </view>
        </u-sticky>
        
        <view class="order-list">
            <view class="item" v-for="item in list" @click="onPreview(item.videoNo)">
                <view class="top app-flex-center">
                    <view class="app-flex-item app-flex align-center">
                        <app-img src="/static/order/icon-logo.png" w="36" h="36"></app-img>
                        <view class="name">牛气无语（龙华清湖店）</view>
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
            
            <view style="padding-bottom: 10rpx;">
                <u-loadmore :status="loading" />
            </view>
        </view>
        
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'
import { orderList } from '@/api/order'
import { onShow, onReachBottom } from '@dcloudio/uni-app'

let list = ref([])
let total = ref(0)
let loading = ref('loading')
let tabList = ref([
    {name: '全部'},
    {name: '门店订单'},
    {name: '售后'},
])
let params = {
    pageNum: 1,
    pageSize: 8,
}

onShow(() => {
    getList()
})

onReachBottom((aa) => {
    getList()
})

function getList(isReset = false) {
    
    if (isReset) {
        params.pageNum = 1
    }
    
    loading.value = 'loading'
    orderList(params).then(data => {
        console.log(123, data);
        
        if (data.total == 0) return
        
        total.value = data.total
        
        list.value = isReset ? JSON.parse(JSON.stringify(data.rows)) : list.value.concat(data.rows)
        
        if (list.value) {}
    }).finally(() => {
        // loading.value = false
    })
}


function onPreview(no) {
    // popup.show = true
    uni.navigateTo({
        url: `/pages/order/order-detail?no=${no}`
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
        .order-list {
            .item {
                background: #fff;
                margin-bottom: 30rpx;
                padding: 0 24rpx;
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
    }
    
    .price {
        align-items: baseline;
        text {
            font-size: 24rpx;
        }
        .val {
            font-size: 32rpx;
        }
    }
</style>