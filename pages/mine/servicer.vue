<template>
    <u-navbar bgColor="#fff" title="我的客服" :auto-back="true" :placeholder="true" />
    <view class="page-wrap">
        <view class="list">
            <view class="item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
                <view class="label app-flex-item">门店客服</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
            <view class="item app-flex-center" @click="$navTo('/pages/user/protocol?type=about')">
                <view class="label app-flex-item">平台客服</view>
                <u-icon name="arrow-right" size="16" color="#333" />
            </view>
        </view>
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