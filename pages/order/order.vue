<template>
    <view class="page-wrap">
        <u-sticky>
            <u-navbar bgColor="#fff" title="订单" leftIcon="" :placeholder="true" />
            <view style="background: #fff;">
                <u-tabs :list="tabList" :scrollable="false" lineColor="#E6212B" :activeStyle="{ color: '#E6212B' }"></u-tabs>
            </view>
        </u-sticky>
        
        <view class="no-login" v-if="!appStore.hasLogin">
            <view class="tip">您还没有登录~</view>
            <view class="theme-btn app-flex-center" @click="goLogin">去登陆</view>
        </view>
        <view class="no-data" v-else-if="loading == 'nomore' && total == 0">
            <app-img src="/static/order/no-order.png" w="392" h="318" margin="0 auto"></app-img>
            <view class="txt">暂无订单</view>
            <view class="theme-btn app-flex-center" @click="goBooking">去下单</view>
        </view>
        <view class="order-list" v-else>
            <view class="item" v-for="item in list" @click="onPreview(item)">
                <view class="top app-flex-center">
                    <view class="app-flex-item app-flex align-center">
                        <app-img src="/static/order/icon-logo.png" w="36" h="36"></app-img>
                        <view class="name">{{shopInfo.storeName}}</view>
                    </view>
                    <view class="status" :class="item.orderStatus">{{orderStatus[item.orderStatus]}}</view>
                </view>
                <view class="center app-flex space-between">
                    <view class="goods-list app-flex">
                        <view class="goods-item" v-for="good in item.productList">
                            <app-img class="img" radius="8" :src="good.productImage" w="124" h="124"></app-img>
                            <view class="goods-name">{{good.productTitle}}</view>
                        </view>
                    </view>
                    <view>
                        <view class="total">共计{{item.totalNum}}件</view>
                        <view class="price-wrap">
                            <view class="price app-flex">
                                <text>￥</text>
                                <view class="val">{{item.dueAmount}}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="bottom app-flex-center">
                    <view class="app-flex-item">
                        <view class="row app-flex align-center">
                            <view class="label">下单时间：</view>
                            <view class="value">{{item.createTime}}</view>
                        </view>
                        <view class="row app-flex align-center">
                            <view class="label">订单号：</view>
                            <view class="value">{{item.orderNo}}</view>
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
import { userAppStore } from '@/store/app'
import { onShow, onReachBottom } from '@dcloudio/uni-app'
import { orderStatus } from '@/common/js/status'

let appStore = userAppStore()
let shopInfo = appStore.shopInfo
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
    if (appStore.hasLogin) {
        getList(true)
    }
})

onReachBottom((aa) => {
    getList()
})

function getList(isReset = false) {
    
    if (isReset) {
        params.pageNum = 1
        loading.value = 'loading'
    }
    
    if (loading.value === 'nomore') return
    orderList(params).then(data => {
        // data.total = 0
        if (data.total == 0) {
            return loading.value = 'nomore'
        }
        
        total.value = data.total
        data.rows.forEach(item => {
            let totalNum = item.productList.reduce((t, c) => {
                return t + c.productNum
            }, 0)
            item.totalNum = totalNum
        })
        list.value = isReset ? JSON.parse(JSON.stringify(data.rows)) : list.value.concat(data.rows)
        params.pageNum++
        
        if (list.value.length >= total.value) {
            loading.value = 'nomore'
        }
    })
}

function onPreview(row) {
    let status = row.orderStatus
    let payPage = '/pages/booking/pay'
    let detailPage = '/pages/order/order-detail'
    
    uni.navigateTo({
        url: `${status == 'nopay' ? payPage : detailPage}?id=${row.id}&orderNo=${row.orderNo}&status=${status}`
    })
}

function goBooking() {
    uni.switchTab({
        url: '/pages/booking/booking'
    })
}
function goLogin() {
    uni.switchTab({
        url: '/pages/mine/mine'
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
        .no-login {
            .tip {
                color: #999;
                font-size: 30rpx;
                text-align: center;
            }
            padding-top: 300rpx;
        }
        .no-data {
            padding-top: 300rpx;
            .txt {
                color: #939393;
                font-size: 28rpx;
                text-align: center;
            }
        }
        .theme-btn {
            width: 292rpx;
            height: 84rpx;
            color: #fff;
            font-size: 30rpx;
            background: #E6212B;
            border-radius: 16rpx;
            margin: 40rpx auto 0;
        }
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