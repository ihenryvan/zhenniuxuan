<template>
    <view class="page-wrap">
        <app-navbar title="关于我们" />
        
        <app-img src="/static/mine/about-bg.png" w="750" h="678"></app-img>
        
        <view class="page-cont">
            <view class="center">
                <app-img src="/static/mine/about-logo.png" w="212" h="212"></app-img>
            </view>
            <view class="center gap">
                <text class="name">XMATE LIVE</text>
            </view>
            <view class="center gap">
                <text class="co">易维空间技术（深圳）有限公司</text>
            </view>
            <view class="center gap">
                <text class="copy">版权所有 @2024-2025 欢迎惠顾！</text>
            </view>
        </view>
    </view>
</template>

<script setup>
</script>

<style lang="scss">
    page {
        background: #f7f8fa;
    }
</style>
<style scoped lang="scss">
    .page-cont {
        position: relative;
        margin-top: -376rpx;
        
        .center {
            display: flex;
            justify-content: center;
        }
        .gap {
            margin-top: 36rpx;
        }
        
        
        .name {
            font-size: 36rpx;
            font-weight: bold;
        }
        .co {
            font-size: 32rpx;
        }
        .copy {
            font-size: 28rpx;
            color: #999;
        }
    }
</style>