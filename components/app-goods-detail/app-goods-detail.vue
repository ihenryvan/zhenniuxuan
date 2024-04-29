<template>
    <u-popup :show="isShow" @close="close">
        <view v-if="!isInit" class="app-flex-center" style="min-height: 30vh;">
            <u-loading-icon text="加载中" textSize="15" mode="circle"></u-loading-icon>
        </view>
        <view class="good-detail" v-else>
            <view class="func-wrap app-flex-center">
                <view class="func-icon">
                    <!-- <app-img src="/static/common/icon-share.png" w="52" h="52"></app-img> -->
                </view>
                <view class="func-icon" @click="close">
                    <app-img src="/static/common/icon-close.png" w="52" h="52"></app-img>
                </view>
            </view>
            
            <swiper circular autoplay style="height: 480rpx;" v-if="info.banners">
                <swiper-item v-for="img in info.banners.split(',')">
                    <app-img :src="img" w="750" h="480"></app-img>
                </swiper-item>
            </swiper>
            
            <view class="good-cont">
                <view class="title">{{info.title}}</view>
                <view class="info">
                    <view class="row app-flex">
                        <view class="label">库存：</view>
                        <view class="value">{{info.stock}}</view>
                    </view>
                </view>
                <view class="specs">
                    <view class="label">规格</view>
                    <view class="value app-flex">
                        <view class="val">{{info.weight}}{{info.unit}}</view>
                    </view>
                </view>
                
                <u-divider text="" lineColor="#eee"></u-divider>
                <view class="intro">
                    <view v-if="info.details" v-html="info.details"></view>
                    <view v-else>暂无简介~</view>
                </view>
                <u-divider text="" lineColor="#eee"></u-divider>
                
                <view class="price-wrap app-flex-center">
                    <view class="left app-flex-center">
                        <view class="price app-flex">
                            <text>￥</text>
                            <view class="val">{{info.sellPrice}}</view>
                        </view>
                        <view class="m-price app-flex">
                            <view class="left">臻会员价</view>
                            <view class="right">￥{{info.vipPirce ?? '--'}}</view>
                        </view>
                    </view>
                    <view class="app-flex-item"></view>
                    <view class="right">
                        <u-number-box :min="1" :value="info.num" @change="changeNum">
                            <template #minus>
                                <view class="minus">
                                    <u-icon name="minus-circle" color="#999" size="24"></u-icon>
                                </view>
                            </template>
                            <template #input>
                                <text class="amount">{{info.num}}</text>
                            </template>
                            <template #plus>
                                <view class="plus">
                                    <u-icon name="plus-circle-fill" color="#E6212B" size="24"></u-icon>
                                </view>
                            </template>
                        </u-number-box>
                    </view>
                </view>
                
                <view class="btn app-flex-center" @click="addToCart">加入购物袋</view>
            </view>
        </view>
    </u-popup>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import config from '@/config'
    import { goodsDetail, addCart } from '@/api/booking'
    import { userAppStore } from '@/store/app'

    let appStore = userAppStore()
    let emit = defineEmits(['closed', 'changed'])
    let isInit = ref(false)
    let isShow = ref(false)
    let info = ref({})
    let props = defineProps({
        id: {
            required: true,
            type: [Number, String]
        }
    })
    
    function getDetail(spId) {
        goodsDetail({spId}).then(data => {
            info.value = data ?? {}
            info.value.num = 1
        }).finally(() => {
            isInit.value = true
        })
    }
    
    function open(id) {
        getDetail(id)
        isShow.value = true
    }

    function close() {
        isShow.value = false
        info.value = {}
        emit('closed')
    }
    
    function changeNum(data) {
        info.value.num = data.value
    }
    
    function addToCart() {
        let { id, num } = info.value
        close()
        addCart({spId: id, storeId: appStore.shopInfo.id, spNum: num}).then(() => {
            emit('changed', id, num)
        })
    }

    defineExpose({
        open
    })
</script>

<style lang="scss" scoped>
    .good-detail {
        position: relative;
        .func-wrap {
            position: absolute;
            top: 4rpx;
            right: 8rpx;
            z-index: 1;
            .func-icon {
                padding: 10rpx;
                margin: 10rpx;
            }
        }
        .good-cont {
            padding: 0 30rpx 20rpx;
            .title {
                font-size: 46rpx;
                padding-top: 30rpx;
            }
            .info {
                color: #939393;
                font-size: 26rpx;
                padding-top: 24rpx;
            }
            .specs {
                padding: 40rpx 0 0;
                .label {
                    font-size: 32rpx;
                }
                .value {
                    padding-top: 24rpx;
                }
                .val {
                    color: #fff;
                    padding: 12rpx;
                    font-size: 28rpx;
                    min-width: 140rpx;
                    background: #E6212B;
                    text-align: center;
                }
            }
            .intro {
                font-size: 28rpx;
                line-height: 44rpx;
                margin: -8rpx 0;
                image {
                    max-width: 100%;
                }
            }
            .price-wrap {
                margin-top: -10rpx;
                .price {
                    align-items: baseline;
                    text {
                        font-size: 24rpx;
                    }
                    .val {
                        font-size: 32rpx;
                    }
                }
                .m-price {
                    overflow: hidden;
                    border-radius: 8rpx;
                    margin-top: 6rpx;
                    margin-left: 20rpx;
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
                .amount {
                    min-width: 60rpx;
                    text-align: center;
                }
            }
            
            .btn {
                color: #fff;
                background: #E6212B;
                height: 90rpx;
                font-size: 30rpx;
                margin-top: 30rpx;
            }
        }
    }
</style>