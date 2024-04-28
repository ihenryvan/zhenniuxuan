<template>
    <u-navbar bgColor="#fff" title="设置" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="label">当前等级</view>
        <view class="value">{{!parseInt(appStore.userInfo.memberGrade) ? '注册会员' : 'VIP会员'}}</view>
        
        <view class="member-wrap" v-if="!parseInt(appStore.userInfo.memberGrade)">
            <app-member @fail="onAuth" />
        </view>
    </view>
    
</template>

<script setup>
import { reactive, ref } from 'vue'
import { userAppStore } from '@/store/app'

let appStore = userAppStore()
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
        background: #F7F8FA;
    }
</style>
<style scoped lang="scss">
    .page-wrap {
        padding: 30rpx 0;
        background: #fff;
        
        .label, .value {
            padding-left: 30rpx;
            padding-bottom: 30rpx;
        }
        .label {
            font-size: 28rpx;
        }
        .value {
            font-size: 36rpx;
        }
        .member-wrap {
            margin: 0 24rpx;
            overflow: hidden;
            border-radius: 16rpx;
        }
    }
</style>