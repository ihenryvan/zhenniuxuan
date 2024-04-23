<template>
    <view class="page-wrap">
        <u-sticky>
            <u-navbar bgColor="#fff" title="订单" leftIcon="" :placeholder="true" />
            <view style="background: #fff;">
                <u-tabs :list="tabList" :scrollable="false" lineColor="#E6212B" :activeStyle="{ color: '#E6212B' }"></u-tabs>
            </view>
        </u-sticky>
        
        <view class="order-list">
            <view class="item" v-for="item in 5" @click="onPreview(item.videoNo)">
                <app-img src="/static/order/order-item.png" w="750" h="468" radius="16"></app-img>
            </view>
        </view>
        
    </view>
    
    <u-popup :show="popup.show" mode="center">
        <view>
            <text>出</text>
        </view>
    </u-popup>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getVideo } from '@/api/photo'

let popup = reactive({
    show: false,
})

let list = ref([])
let tabList = ref([
    {name: '全部'},
    {name: '门店订单'},
    {name: '售后'},
])

getVideo().then(data => {
    if (data?.length) {
        list.value = data
    }
})

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
        .order-list {
            .item {
                margin-top: 24rpx;
            }
        }
    }
</style>