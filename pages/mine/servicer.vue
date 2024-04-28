<template>
    <u-navbar bgColor="#fff" title="我的客服" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="list">
            <view class="item app-flex-center" @click="goChat">
                <view class="label app-flex-item">门店客服</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="item app-flex-center" style="position: relative;">
                <button open-type="contact" style="position: absolute;width: 100%;height: 100%;left: 0;top: 0;opacity: 0;"></button>
                <view class="label app-flex-item">平台客服</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
        </view>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'

function goChat(e) {
    uni.showToast({
        title: '敬请期待',
        icon: 'none'
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