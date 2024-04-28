<template>
    <u-navbar bgColor="#fff" title="设置" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="list">
            <view class="item app-flex-center" @click="goProtocal({url: '/wap/policy/agreement'})">
                <view class="label app-flex-item">服务协议</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="item app-flex-center" @click="goProtocal({url: '/wap/policy/privacy'})">
                <view class="label app-flex-item">隐私政策</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <!-- <view class="item app-flex-center" @click="goProtocal">
                <view class="label app-flex-item">关于我们</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view> -->
        </view>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'

function goProtocal(data) {
    uni.navigateTo({
        url: `/pages/mine/protocal?title=${data.title}&url=${data.url}`
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
        padding-top: 30rpx;
        .list {
            background: #fff;
            padding: 0 30rpx;
            .item {
                min-height: 100rpx;
                &:not(:last-child) {
                    border-bottom: solid 1px #F7F8FA;
                }
            }
        }
    }
</style>