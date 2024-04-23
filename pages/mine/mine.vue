<template>
    <view class="page-wrap">
        <app-img src="/static/mine/top-bg.png" w="750" h="322"></app-img>
        
        <!-- <view class="info">
            <view class="left" @click="onAuth">
                <app-img src="/static/mine/avatar-bg.png" w="164" h="164"></app-img>
                <app-img v-if="appStore.hasLogin" :src="appStore.userInfo.avatar" type="avatar" w="108" h="108" class="avatar"></app-img>
                <app-img v-else src="/static/mine/avatar.png" w="108" h="108" class="avatar"></app-img>
            </view>
            <view class="right">
                <view class="name">
                    <text @click="onAuth">{{appStore.hasLogin ? appStore.userInfo.nickname : '点击登录'}}</text>
                </view>
                <view class="phone" v-if="appStore.hasLogin">{{appStore.userInfo.mobileNo}}</view>
            </view>
        </view> -->
        
        <view class="avatar app-flex-center">
            <app-img src="/static/mine/avatar.png" w="144" h="144"></app-img>
        </view>
        <view class="nickname app-flex-center">
            <text>达到爱</text>
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
        
        <view class="member-wrap">
            <app-img src="/static/mine/11.png" w="742" h="562"></app-img>
        </view>
        
        <view class="opt-list">
            <view class="opt-item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
                <view class="label app-flex-item">我的客服</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
                <view class="label app-flex-item">我的订单</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
                <view class="label app-flex-item">我的会员</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
                <view class="label app-flex-item">地址管理</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
                <view class="label app-flex-item">设置</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="opt-item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
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
    
</script>

<style lang="scss">
    page {
        // background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-wrap {
        .info {
            display: flex;
            align-items: center;
            .left {
                position: relative;
                .avatar {
                    position: absolute;
                    width: 108rpx;
                    height: 108rpx;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                }
            }
            .right {
                flex: 1;
                .name {
                    font-size: 36rpx;
                    text {
                        padding: 20rpx 0;
                        padding-left: 10rpx;
                        padding-right: 30rpx;
                    }
                }
                .phone {
                    font-size: 28rpx;
                    padding-top: 10rpx;
                }
            }
        }
        
        .avatar {
            margin-top: -72rpx;
        }
        .amount-wrap {
            padding-top: 56rpx;
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
            padding-top: 40rpx;
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