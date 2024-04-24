<template>
    <view class="page-wrap">
        <app-img src="/static/mine/top-bg.png" w="750" h="322"></app-img>
        
        <view class="avatar-wrap app-flex-center">
            <view style="padding: 0 40rpx;" @click="onAuth">
                <view class="avatar">
                    <app-img v-if="appStore.hasLogin" type="avatar" :src="appStore.userInfo.avatar" w="144" h="144"></app-img>
                    <app-img v-else src="/static/mine/avatar.png" w="144" h="144"></app-img>
                </view>
                <view class="nickname app-flex-center" v-if="!appStore.hasLogin">点击登录</view>
            </view>
        </view>
        
        <view class="nickname app-flex-center" v-if="appStore.hasLogin" style="padding-top: 20rpx;">
            <text>{{appStore.userInfo.nickname}}</text>
            <text v-if="appStore.userInfo.memberGrade == 1">（VIP）</text>
        </view>
        
        
        <view class="amount-wrap app-flex">
            <view class="item">
                <view class="label">优惠券</view>
                <view class="value">0</view>
            </view>
            <view class="item">
                <view class="label">余额</view>
                <view class="value">0</view>
            </view>
            <view class="item">
                <view class="label">消息</view>
                <view class="value">0</view>
            </view>
        </view>
        
        <view class="member-wrap" v-if="!parseInt(appStore.userInfo.memberGrade)">
            <app-member @fail="onAuth" />
        </view>
        
        <view class="opt-list">
            <view class="opt-item app-flex-center" @click="$navTo('/pages/mine/servicer?type=about')">
                <view class="label app-flex-item">我的客服</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <!-- <view class="opt-item app-flex-center" @click="goOrder">
                <view class="label app-flex-item">我的订单</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view> -->
            <view class="opt-item app-flex-center" @click="$navTo('/pages/mine/member?type=about')">
                <view class="label app-flex-item">我的会员</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/mine/address?type=about')">
                <view class="label app-flex-item">地址管理</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/mine/setup?type=about')">
                <view class="label app-flex-item">设置</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/mine/invoice')">
                <view class="label app-flex-item">我的发票</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
        </view>
    </view>
    
    <app-auth ref="authRef" />
</template>

<script setup>
    import { userAppStore } from '@/store/app'
    import { ref, defineComponent, reactive } from 'vue'
    
    
    let appStore = userAppStore()
    let authRef = ref(null)
    
    function onAuth() {
        if (!appStore.hasLogin) {
            authRef.value.open()
        }
    }
    
    
    function onPreview() {
        // popup.show = true
        if (!appStore.hasLogin) {
            return onAuth()
        }
        uni.navigateTo({
            url: '/pages/photo/detail?id=100'
        })
    }
    
    function goAbout() {
        uni.navigateTo({
            url: '/pages/mine/about'
        })
    }
    
    function $navTo(path) {
        uni.navigateTo({
            url: path,
        })
    }
    
    function goOrder() {
        uni.switchTab({
            url: '/pages/order/order'
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
        .avatar-wrap {
            margin-top: -72rpx;
        }
        .amount-wrap {
            padding: 56rpx 0 40rpx;
            .item {
                width: 33.33%;
                text-align: center;
                .label {
                    color: #939393;
                    font-size: 26rpx;
                }
                .value {
                    font-size: 36rpx;
                    padding-top: 16rpx;
                }
            }
        }
        .member-wrap {
            margin: 0 24rpx;
            overflow: hidden;
            border-radius: 16rpx;
        }
        .opt-list {
            padding: 0 24rpx;
        	.opt-item {
                height: 100rpx;
                &:not(:last-child) {
                    border-bottom: solid 1px #F7F8FA;
                }
        		.label {
        			font-size: 28rpx;
        		}
        	}
        }
    }
</style>