<template>
    <u-popup :show="isShow" @close="close">
        <view class="good-detail">
            <view class="func-wrap">
                
            </view>
            
            <app-img src="aaaa" w="750" h="480"></app-img>
            <view class="good-cont">
                <view class="title">2024款 原切澳洲谷饲眼肉盖</view>
                <view class="info">
                    <view class="row app-flex">
                        <view class="label">库存：</view>
                        <view class="value">77</view>
                    </view>
                </view>
                <view class="specs">
                    <view class="label">规格</view>
                    <view class="value app-flex">
                        <view class="val">120g</view>
                    </view>
                </view>
                
                <u-divider text="" lineColor="#eee"></u-divider>
                <view class="intro">规格规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒规格打发的撒打发的撒</view>
                <u-divider text="" lineColor="#eee"></u-divider>
                
                <view class="price-wrap app-flex-center">
                    <view class="left app-flex-center">
                        <view class="price app-flex">
                            <text>￥</text>
                            <view class="val">{{info.originPrice}}100</view>
                        </view>
                        <view class="m-price app-flex">
                            <view class="left">臻会员价</view>
                            <view class="right">￥{{info.vipDiscount}}66</view>
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
                
                <view class="btn app-flex-center">加入购物袋</view>
            </view>
        </view>
    </u-popup>
</template>

<style lang="scss" scoped>
    .good-detail {
        position: relative;
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

<script setup>
    import { ref, reactive } from 'vue'
    import * as auth from '@/api/auth'
    import config from '@/config'
    import { userAppStore } from '@/store/app'

    let appStore = userAppStore()
    let emit = defineEmits(['authed'])
    let isShow = ref(false)
    let info = ref({
        num: 1
    })
    let params = {}
    
    
    function open() {
        isShow.value = true
    }

    function close() {
        isShow.value = false
    }
    
    

    function changeNum() {
    }

    function getPhoneNumber(evt) {
        let {
            iv,
            encryptedData,
            errMsg
        } = evt.detail
        
        if (errMsg.indexOf('ok') < 0) {
            return uni.showToast({
                icon: 'none',
                title: '手机号获取失败'
            })
        }

        let queryData = {
            iv,
            encryptedData,
            openid: params.openid,
            sessionKey: params.sessionKey,
            // avatarUrl: userInfo.avatar,
            // nickName: userInfo.nickname,
        }
        
        uni.showLoading({
            title: '授权中'
        })
        auth.getPhone(queryData).then(async data => {
            data.openId = params.openid
            let info = await setUserInfo(data)
            
            data.nickname = userInfo.nickname
            data.avatar = userInfo.avatar
            
            appStore.storeUserInfo(data)
            emit('authed', data)
            close()
        }).finally(() => {
            uni.hideLoading()
        })
    }
    
    function setUserInfo(info) {
        return new Promise((resolve, reject) => {
            let params = {
                token: info.token,
                nickname: userInfo.nickname,
                avatar: userInfo.avatar
            }
            auth.updateUserInfo(params).then(data => {
                resolve(data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    defineExpose({
        open
    })
</script>

