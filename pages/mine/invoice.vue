<template>
    <u-navbar bgColor="#fff" title="设置" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="history app-flex space-between">
            <view class=""></view>
            <text>历史开票记录</text>
        </view>
        <view class="list">
            <view class="item app-flex align-center" v-for="item in 5">
                <u-icon size="18" :name="`checkmark-circle${item.isDefault == 1 ? '-fill' : '-fill'}`"
                    :color="item.isDefault || true ? '#E6212B' : '#E6212B'" />
                    
                <view class="info app-flex-item">
                    <view class="name">牛气无语（龙华清湖店）</view>
                    <view class="no">订单号：9991122255122</view>
                </view>
                
                <view class="price-wrap">
                    <view class="label">可开金额</view>
                    <view class="price app-flex">
                        <text>￥</text>
                        <view class="val">18.96</view>
                    </view>
                </view>
            </view>
        </view>
    </view>
    
    <view class="bottom-btn-warp app-flex align-center">
        <view class="app-flex-item">
            <view class="select-all app-flex align-center">
                <u-icon size="20" :name="`checkmark-circle`" color="#E6212B" />
                <text>全选</text>
            </view>
        </view>
        <view class="btn app-flex-center" @click="goPay">立即下单</view>
    </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getVideo } from '@/api/photo'

let popup = reactive({
    show: false,
})

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
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-wrap {
        padding: 0 24rpx;
        .history {
            text {
                color: #E6212B;
                padding: 24rpx;
                font-size: 30rpx;
            }
        }
        .list {
            .item {
                background: #fff;
                padding: 30rpx 24rpx;
                &:not(:last-child) {
                    margin-bottom: 30rpx;
                }
                .info {
                    padding-left: 20rpx;
                    .name {
                        font-size: 30rpx;
                    }
                    .no {
                        color: #939393;
                        font-size: 26rpx;
                        padding-top: 20rpx;
                    }
                }
                .price-wrap {
                    .label {
                       color: #939393;
                       font-size: 26rpx; 
                    }
                    .price {
                        padding-top: 10rpx;
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
    
    
    .bottom-btn-warp {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        height: 110rpx;
        background: #fff;
        .select-all {
            padding: 24rpx;
            text {
                font-size: 30rpx;
                margin-left: 10rpx;
            }
        }
        .btn {
            width: 222rpx;
            height: 100%;
            color: #fff;
            background: #E6212B;
        }
    }
</style>