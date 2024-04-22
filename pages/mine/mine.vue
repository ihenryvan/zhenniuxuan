<template>
    <view class="page-wrap">
        <app-img src="/static/mine/top-bg.png" w="750" h="678"></app-img>
        
        <view class="page-cont">
            <view class="info">
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
            </view>
            
            <view class="list">
                <view class="item" @click="onPreview">
                    <view class="left">
                        <app-img src="/static/mine/model.png" w="152" h="152"></app-img>
                    </view>
                    <view class="center">
                        <view class="title">我的3D模型</view>
                        <view class="sub-title">查看您的专属3D模型</view>
                    </view>
                    <view class="right">
                        <app-img src="/static/mine/icon-arrow.png" w="48" h="48"></app-img>
                    </view>
                </view>
                
                <view class="item" @click="goAbout">
                    <view class="left">
                        <app-img src="/static/mine/about.png" w="152" h="152"></app-img>
                    </view>
                    <view class="center">
                        <view class="title">关于我们</view>
                        <view class="sub-title">Xmate Live</view>
                    </view>
                    <view class="right">
                        <app-img src="/static/mine/icon-arrow.png" w="48" h="48"></app-img>
                    </view>
                </view>
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
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-cont {
        position: relative;
        padding: 0 32rpx;
        margin-top: -476rpx;
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
        
        .list {
            .item {
                display: flex;
                align-items: center;
                border: solid 2rpx #fff;
                background: linear-gradient( 180deg, #3A8F96 0%, #E4FDFF 0%, #E7FDFF 65%, #E7FDFF 100%);
                overflow: hidden;
                border-radius: 12rpx;
                padding: 26rpx 34rpx;
                margin: 34rpx 0;
                .left {}
                .center {
                    flex: 1;
                    padding-left: 30rpx;
                    .title {
                        color: #06285C;
                        font-size: 36rpx;
                    }
                    .sub-title {
                        color: #939393;
                        font-size: 26rpx;
                        padding-top: 20rpx;
                    }
                }
                .right {}
            }
        }
    }
</style>